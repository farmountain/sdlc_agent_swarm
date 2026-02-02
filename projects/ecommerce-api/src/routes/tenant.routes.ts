import { Router } from 'express';
import { ConflictError, ValidationError } from '../lib/errors';
import { prisma } from '../index';

const router = Router();

// POST /api/v1/tenants - Register new tenant
router.post('/', async (req, res) => {
  const { name, subdomain, contactEmail } = req.body;

  if (!name || !subdomain || !contactEmail) {
    throw new ValidationError('Missing required fields: name, subdomain, contactEmail');
  }

  // Validate subdomain format
  const subdomainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
  if (!subdomainRegex.test(subdomain)) {
    throw new ValidationError(
      'Subdomain must contain only lowercase letters, numbers, and hyphens'
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contactEmail)) {
    throw new ValidationError('Invalid email format');
  }

  // Check if subdomain already exists
  const existing = await prisma.tenant.findUnique({
    where: { subdomain },
  });

  if (existing) {
    throw new ConflictError(`Subdomain '${subdomain}' is already taken`);
  }

  const tenant = await prisma.tenant.create({
    data: {
      name,
      subdomain,
      contactEmail,
      isActive: true,
    },
  });

  res.status(201).json({
    success: true,
    data: tenant,
    message: `Tenant ${name} created successfully`,
  });
});

// GET /api/v1/tenants/:subdomain - Get tenant by subdomain (public)
router.get('/:subdomain', async (req, res) => {
  const { subdomain } = req.params;

  const tenant = await prisma.tenant.findUnique({
    where: { subdomain },
    select: {
      id: true,
      name: true,
      subdomain: true,
      isActive: true,
      createdAt: true,
      // Don't expose contactEmail publicly
    },
  });

  if (!tenant) {
    throw new ValidationError(`Tenant '${subdomain}' not found`);
  }

  if (!tenant.isActive) {
    throw new ValidationError(`Tenant '${subdomain}' is inactive`);
  }

  res.json({
    success: true,
    data: tenant,
  });
});

export const tenantRoutes = router;
