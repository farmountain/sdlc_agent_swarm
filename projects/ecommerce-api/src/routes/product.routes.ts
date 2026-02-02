import { Router } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { NotFoundError, ValidationError } from '../lib/errors';
import { prisma } from '../index';

const router = Router();

// GET /api/v1/products - List products for tenant
router.get('/', async (req: AuthRequest, res) => {
  const tenantId = req.user?.tenantId;
  if (!tenantId) {
    throw new ValidationError('Tenant ID required');
  }

  const products = await prisma.product.findMany({
    where: { tenantId },
    include: {
      inventory: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json({
    success: true,
    data: products,
    count: products.length,
  });
});

// GET /api/v1/products/:id - Get single product
router.get('/:id', async (req: AuthRequest, res) => {
  const { id } = req.params;
  const tenantId = req.user?.tenantId;

  if (!tenantId) {
    throw new ValidationError('Tenant ID required');
  }

  const product = await prisma.product.findFirst({
    where: {
      id,
      tenantId, // Tenant isolation enforced
    },
    include: {
      inventory: true,
    },
  });

  if (!product) {
    throw new NotFoundError(`Product ${id} not found`);
  }

  res.json({
    success: true,
    data: product,
  });
});

// POST /api/v1/products - Create product (merchant/admin only)
router.post('/', async (req: AuthRequest, res) => {
  const tenantId = req.user?.tenantId;
  const role = req.user?.role;

  if (!tenantId) {
    throw new ValidationError('Tenant ID required');
  }

  if (role !== 'ADMIN' && role !== 'MERCHANT') {
    throw new ValidationError('Only merchants and admins can create products');
  }

  const { name, description, price, sku } = req.body;

  if (!name || !price || !sku) {
    throw new ValidationError('Missing required fields: name, price, sku');
  }

  if (typeof price !== 'number' || price <= 0) {
    throw new ValidationError('Price must be a positive number');
  }

  const product = await prisma.product.create({
    data: {
      tenantId,
      name,
      description: description || '',
      price,
      sku,
      inventory: {
        create: {
          quantity: 0,
          reservedQuantity: 0,
        },
      },
    },
    include: {
      inventory: true,
    },
  });

  res.status(201).json({
    success: true,
    data: product,
  });
});

export const productRoutes = router;
