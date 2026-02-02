import { Router } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { NotFoundError, ValidationError, ConflictError } from '../lib/errors';
import { prisma } from '../index';

const router = Router();

// GET /api/v1/orders - List orders for user/tenant
router.get('/', async (req: AuthRequest, res) => {
  const tenantId = req.user?.tenantId;
  const userId = req.user?.userId;
  const role = req.user?.role;

  if (!tenantId || !userId) {
    throw new ValidationError('Authentication required');
  }

  // Admins/Merchants see all orders for tenant, Customers see only their orders
  const where =
    role === 'ADMIN' || role === 'MERCHANT'
      ? { tenantId }
      : { tenantId, userId };

  const orders = await prisma.order.findMany({
    where,
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json({
    success: true,
    data: orders,
    count: orders.length,
  });
});

// GET /api/v1/orders/:id - Get single order
router.get('/:id', async (req: AuthRequest, res) => {
  const { id } = req.params;
  const tenantId = req.user?.tenantId;
  const userId = req.user?.userId;
  const role = req.user?.role;

  if (!tenantId || !userId) {
    throw new ValidationError('Authentication required');
  }

  const where =
    role === 'ADMIN' || role === 'MERCHANT'
      ? { id, tenantId }
      : { id, tenantId, userId };

  const order = await prisma.order.findFirst({
    where,
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    throw new NotFoundError(`Order ${id} not found`);
  }

  res.json({
    success: true,
    data: order,
  });
});

// POST /api/v1/orders - Create order with transaction safety
router.post('/', async (req: AuthRequest, res) => {
  const tenantId = req.user?.tenantId;
  const userId = req.user?.userId;

  if (!tenantId || !userId) {
    throw new ValidationError('Authentication required');
  }

  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new ValidationError('Order must contain at least one item');
  }

  // Validate items structure
  for (const item of items) {
    if (!item.productId || !item.quantity || item.quantity <= 0) {
      throw new ValidationError(
        'Each item must have productId and positive quantity'
      );
    }
  }

  // Use transaction for atomicity (database-expert pattern)
  const order = await prisma.$transaction(async (tx) => {
    // 1. Verify all products exist and belong to tenant
    const productIds = items.map((item: any) => item.productId);
    const products = await tx.product.findMany({
      where: {
        id: { in: productIds },
        tenantId,
      },
      include: {
        inventory: true,
      },
    });

    if (products.length !== productIds.length) {
      throw new NotFoundError('One or more products not found');
    }

    // 2. Check inventory availability
    const productMap = new Map(products.map((p) => [p.id, p]));
    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product || !product.inventory) {
        throw new ConflictError(`Product ${item.productId} has no inventory`);
      }

      const available = product.inventory.quantity - product.inventory.reservedQuantity;
      if (available < item.quantity) {
        throw new ConflictError(
          `Insufficient inventory for ${product.name}. Available: ${available}`
        );
      }
    }

    // 3. Calculate total
    let total = 0;
    for (const item of items) {
      const product = productMap.get(item.productId);
      if (product) {
        total += product.price * item.quantity;
      }
    }

    // 4. Create order
    const newOrder = await tx.order.create({
      data: {
        tenantId,
        userId,
        total,
        status: 'PENDING',
        items: {
          create: items.map((item: any) => {
            const product = productMap.get(item.productId);
            return {
              productId: item.productId,
              quantity: item.quantity,
              price: product!.price,
            };
          }),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // 5. Reserve inventory
    for (const item of items) {
      await tx.inventory.update({
        where: { productId: item.productId },
        data: {
          reservedQuantity: {
            increment: item.quantity,
          },
        },
      });
    }

    return newOrder;
  });

  res.status(201).json({
    success: true,
    data: order,
  });
});

// PATCH /api/v1/orders/:id/status - Update order status (merchant/admin only)
router.patch('/:id/status', async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const tenantId = req.user?.tenantId;
  const role = req.user?.role;

  if (!tenantId) {
    throw new ValidationError('Tenant ID required');
  }

  if (role !== 'ADMIN' && role !== 'MERCHANT') {
    throw new ValidationError('Only merchants and admins can update order status');
  }

  const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
  if (!validStatuses.includes(status)) {
    throw new ValidationError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
  }

  const order = await prisma.order.findFirst({
    where: { id, tenantId },
  });

  if (!order) {
    throw new NotFoundError(`Order ${id} not found`);
  }

  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { status },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  res.json({
    success: true,
    data: updatedOrder,
  });
});

export const orderRoutes = router;
