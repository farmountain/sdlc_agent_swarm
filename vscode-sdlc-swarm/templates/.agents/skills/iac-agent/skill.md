# Skill: Infrastructure-as-Code (IaC) Agent

## Purpose
The Infrastructure-as-Code (IaC) Agent is responsible for defining, provisioning, and managing cloud infrastructure using declarative configuration files. Specializes in Terraform, AWS CloudFormation, Azure Resource Manager (ARM), and ensures infrastructure is version-controlled, reproducible, and automated.

**Core Principle:** "Infrastructure as Code—every resource is defined, version-controlled, and deployable via automation."

---

## Core Responsibilities

1. **Infrastructure Provisioning**: Define cloud resources (VPCs, subnets, EC2, RDS, S3, etc.) as code
2. **Terraform Modules**: Create reusable, composable Terraform modules for common patterns
3. **State Management**: Manage Terraform state (remote backends, locking, encryption)
4. **Multi-Environment Support**: Separate configurations for dev/staging/production
5. **Drift Detection**: Detect and remediate infrastructure drift (manual changes vs IaC)
6. **Cost Optimization**: Estimate infrastructure costs, recommend cost-saving measures
7. **Security Hardening**: Apply security best practices (least privilege, encryption, network segmentation)
8. **Disaster Recovery**: Implement backup/restore strategies, failover configurations

---

## Inputs

1. **Application Requirements**
   - Compute needs (CPU, memory, GPU)
   - Storage needs (database, object storage, block storage)
   - Network requirements (VPC, subnets, load balancers)
   - Security requirements (encryption, compliance)

2. **Environment Specifications**
   - Cloud provider (AWS, Azure, GCP)
   - Regions (multi-region for HA)
   - Budget constraints
   - SLA requirements (uptime, RTO/RPO)

3. **Existing Infrastructure**
   - Legacy resources to migrate
   - Current architecture diagrams
   - Terraform state files (if any)

---

## Output: Infrastructure-as-Code (Terraform)

### 1. Project Structure

```
infrastructure/
├── README.md                    # Setup instructions
├── terraform.tfvars.example     # Example variable values
├── backend.tf                   # Remote state configuration
├── versions.tf                  # Provider versions
├── main.tf                      # Root module
├── variables.tf                 # Input variables
├── outputs.tf                   # Output values
├── environments/
│   ├── dev/
│   │   ├── terraform.tfvars     # Dev environment variables
│   │   └── backend.tf           # Dev state backend
│   ├── staging/
│   │   ├── terraform.tfvars
│   │   └── backend.tf
│   └── production/
│       ├── terraform.tfvars
│       └── backend.tf
├── modules/
│   ├── vpc/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── README.md
│   ├── ecs/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── README.md
│   ├── rds/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── README.md
│   └── alb/
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── README.md
└── scripts/
    ├── init.sh                  # Initialize Terraform
    ├── plan.sh                  # Generate plan
    └── apply.sh                 # Apply changes
```

---

### 2. Example: AWS VPC Module

**File: `modules/vpc/main.tf`**

```hcl
# ============================================================
# VPC Module
# Purpose: Create VPC with public/private subnets across multiple AZs
# Best Practices: Multi-AZ for HA, NAT Gateway in each AZ
# ============================================================

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = merge(
    var.tags,
    {
      Name = "${var.environment}-vpc"
    }
  )
}

# ============================================================
# Internet Gateway (for public subnets)
# ============================================================
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = merge(
    var.tags,
    {
      Name = "${var.environment}-igw"
    }
  )
}

# ============================================================
# Public Subnets (one per AZ)
# ============================================================
resource "aws_subnet" "public" {
  count = length(var.availability_zones)

  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 8, count.index)
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = merge(
    var.tags,
    {
      Name = "${var.environment}-public-subnet-${var.availability_zones[count.index]}"
      Tier = "public"
    }
  )
}

# ============================================================
# Private Subnets (one per AZ)
# ============================================================
resource "aws_subnet" "private" {
  count = length(var.availability_zones)

  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index + 100)
  availability_zone = var.availability_zones[count.index]

  tags = merge(
    var.tags,
    {
      Name = "${var.environment}-private-subnet-${var.availability_zones[count.index]}"
      Tier = "private"
    }
  )
}

# ============================================================
# NAT Gateways (one per AZ for HA)
# ============================================================
resource "aws_eip" "nat" {
  count = length(var.availability_zones)

  domain = "vpc"

  tags = merge(
    var.tags,
    {
      Name = "${var.environment}-nat-eip-${var.availability_zones[count.index]}"
    }
  )
}

resource "aws_nat_gateway" "main" {
  count = length(var.availability_zones)

  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id

  tags = merge(
    var.tags,
    {
      Name = "${var.environment}-nat-${var.availability_zones[count.index]}"
    }
  )

  depends_on = [aws_internet_gateway.main]
}

# ============================================================
# Route Tables
# ============================================================

# Public route table (routes to Internet Gateway)
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = merge(
    var.tags,
    {
      Name = "${var.environment}-public-rt"
    }
  )
}

# Private route tables (one per AZ, routes to NAT Gateway)
resource "aws_route_table" "private" {
  count = length(var.availability_zones)

  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main[count.index].id
  }

  tags = merge(
    var.tags,
    {
      Name = "${var.environment}-private-rt-${var.availability_zones[count.index]}"
    }
  )
}

# ============================================================
# Route Table Associations
# ============================================================

resource "aws_route_table_association" "public" {
  count = length(var.availability_zones)

  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count = length(var.availability_zones)

  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}

# ============================================================
# VPC Flow Logs (for network traffic analysis)
# ============================================================
resource "aws_flow_log" "main" {
  count = var.enable_flow_logs ? 1 : 0

  iam_role_arn    = aws_iam_role.flow_logs[0].arn
  log_destination = aws_cloudwatch_log_group.flow_logs[0].arn
  traffic_type    = "ALL"
  vpc_id          = aws_vpc.main.id

  tags = merge(
    var.tags,
    {
      Name = "${var.environment}-vpc-flow-logs"
    }
  )
}

resource "aws_cloudwatch_log_group" "flow_logs" {
  count = var.enable_flow_logs ? 1 : 0

  name              = "/aws/vpc/${var.environment}-flow-logs"
  retention_in_days = 7

  tags = var.tags
}

resource "aws_iam_role" "flow_logs" {
  count = var.enable_flow_logs ? 1 : 0

  name = "${var.environment}-vpc-flow-logs-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "vpc-flow-logs.amazonaws.com"
        }
      }
    ]
  })

  tags = var.tags
}

resource "aws_iam_role_policy" "flow_logs" {
  count = var.enable_flow_logs ? 1 : 0

  name = "${var.environment}-vpc-flow-logs-policy"
  role = aws_iam_role.flow_logs[0].id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "logs:DescribeLogGroups",
          "logs:DescribeLogStreams"
        ]
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}
```

**File: `modules/vpc/variables.tf`**

```hcl
variable "environment" {
  description = "Environment name (dev, staging, production)"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
}

variable "enable_flow_logs" {
  description = "Enable VPC Flow Logs"
  type        = bool
  default     = true
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}
```

**File: `modules/vpc/outputs.tf`**

```hcl
output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "vpc_cidr" {
  description = "CIDR block of the VPC"
  value       = aws_vpc.main.cidr_block
}

output "public_subnet_ids" {
  description = "List of public subnet IDs"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "List of private subnet IDs"
  value       = aws_subnet.private[*].id
}

output "nat_gateway_ids" {
  description = "List of NAT Gateway IDs"
  value       = aws_nat_gateway.main[*].id
}
```

---

### 3. Example: Complete Infrastructure (Root Module)

**File: `main.tf`**

```hcl
# ============================================================
# E-Commerce Platform Infrastructure
# Cloud Provider: AWS
# Terraform Version: >= 1.5
# ============================================================

terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-lock"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "Terraform"
      Project     = var.project_name
    }
  }
}

# ============================================================
# VPC
# ============================================================
module "vpc" {
  source = "./modules/vpc"

  environment        = var.environment
  vpc_cidr           = var.vpc_cidr
  availability_zones = var.availability_zones
  enable_flow_logs   = true

  tags = {
    Component = "networking"
  }
}

# ============================================================
# RDS Database (PostgreSQL)
# ============================================================
module "database" {
  source = "./modules/rds"

  environment        = var.environment
  vpc_id             = module.vpc.vpc_id
  subnet_ids         = module.vpc.private_subnet_ids
  
  engine             = "postgres"
  engine_version     = "16.1"
  instance_class     = var.db_instance_class
  allocated_storage  = var.db_allocated_storage
  
  database_name      = "ecommerce"
  master_username    = "dbadmin"
  
  backup_retention_period = 7
  multi_az                = var.environment == "production"

  tags = {
    Component = "database"
  }
}

# ============================================================
# Application Load Balancer
# ============================================================
module "alb" {
  source = "./modules/alb"

  environment = var.environment
  vpc_id      = module.vpc.vpc_id
  subnet_ids  = module.vpc.public_subnet_ids

  certificate_arn = var.ssl_certificate_arn

  tags = {
    Component = "load-balancer"
  }
}

# ============================================================
# ECS Cluster (Fargate)
# ============================================================
module "ecs" {
  source = "./modules/ecs"

  environment       = var.environment
  vpc_id            = module.vpc.vpc_id
  subnet_ids        = module.vpc.private_subnet_ids
  
  container_image   = var.container_image
  container_port    = 3000
  
  cpu               = var.ecs_task_cpu
  memory            = var.ecs_task_memory
  desired_count     = var.ecs_desired_count
  
  target_group_arn  = module.alb.target_group_arn

  environment_variables = {
    NODE_ENV     = var.environment
    DATABASE_URL = module.database.connection_string
  }

  tags = {
    Component = "compute"
  }
}

# ============================================================
# S3 Bucket (for static assets)
# ============================================================
resource "aws_s3_bucket" "assets" {
  bucket = "${var.project_name}-${var.environment}-assets"

  tags = {
    Component = "storage"
  }
}

resource "aws_s3_bucket_public_access_block" "assets" {
  bucket = aws_s3_bucket.assets.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "assets" {
  bucket = aws_s3_bucket.assets.id

  versioning_configuration {
    status = "Enabled"
  }
}

# ============================================================
# CloudFront Distribution (CDN)
# ============================================================
resource "aws_cloudfront_distribution" "main" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  origin {
    domain_name = aws_s3_bucket.assets.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.assets.id}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.main.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.assets.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Component = "cdn"
  }
}

resource "aws_cloudfront_origin_access_identity" "main" {
  comment = "OAI for ${var.project_name}-${var.environment}"
}
```

**File: `variables.tf`**

```hcl
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t4g.micro"
}

variable "db_allocated_storage" {
  description = "RDS allocated storage (GB)"
  type        = number
  default     = 20
}

variable "ecs_task_cpu" {
  description = "ECS task CPU units"
  type        = number
  default     = 256
}

variable "ecs_task_memory" {
  description = "ECS task memory (MB)"
  type        = number
  default     = 512
}

variable "ecs_desired_count" {
  description = "Desired number of ECS tasks"
  type        = number
  default     = 2
}

variable "container_image" {
  description = "Docker image for ECS"
  type        = string
}

variable "ssl_certificate_arn" {
  description = "ARN of SSL certificate"
  type        = string
}
```

**File: `outputs.tf`**

```hcl
output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "alb_dns_name" {
  description = "Load balancer DNS name"
  value       = module.alb.dns_name
}

output "database_endpoint" {
  description = "RDS endpoint"
  value       = module.database.endpoint
  sensitive   = true
}

output "cloudfront_url" {
  description = "CloudFront distribution URL"
  value       = "https://${aws_cloudfront_distribution.main.domain_name}"
}
```

---

### 4. Environment-Specific Configuration

**File: `environments/production/terraform.tfvars`**

```hcl
environment    = "production"
project_name   = "ecommerce-platform"
aws_region     = "us-east-1"

vpc_cidr       = "10.0.0.0/16"
availability_zones = ["us-east-1a", "us-east-1b", "us-east-1c"]

# Database (production-grade)
db_instance_class    = "db.r6g.large"  # 2 vCPU, 16GB RAM
db_allocated_storage = 100

# ECS (production-grade)
ecs_task_cpu      = 1024  # 1 vCPU
ecs_task_memory   = 2048  # 2GB RAM
ecs_desired_count = 5     # 5 tasks for HA

container_image = "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:v1.2.3"

ssl_certificate_arn = "arn:aws:acm:us-east-1:123456789012:certificate/abc123"
```

**File: `environments/dev/terraform.tfvars`**

```hcl
environment    = "dev"
project_name   = "ecommerce-platform"
aws_region     = "us-east-1"

vpc_cidr       = "10.1.0.0/16"
availability_zones = ["us-east-1a"]  # Single AZ for cost savings

# Database (dev, cost-optimized)
db_instance_class    = "db.t4g.micro"  # 2 vCPU, 1GB RAM
db_allocated_storage = 20

# ECS (dev, cost-optimized)
ecs_task_cpu      = 256   # 0.25 vCPU
ecs_task_memory   = 512   # 512MB RAM
ecs_desired_count = 1     # Single task

container_image = "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:latest"

ssl_certificate_arn = "arn:aws:acm:us-east-1:123456789012:certificate/dev123"
```

---

### 5. Deployment Scripts

**File: `scripts/init.sh`**

```bash
#!/bin/bash
set -e

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
  echo "Usage: ./scripts/init.sh <environment>"
  exit 1
fi

echo "Initializing Terraform for environment: $ENVIRONMENT"

cd "environments/$ENVIRONMENT"
terraform init -upgrade
```

**File: `scripts/plan.sh`**

```bash
#!/bin/bash
set -e

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
  echo "Usage: ./scripts/plan.sh <environment>"
  exit 1
fi

echo "Generating Terraform plan for environment: $ENVIRONMENT"

cd "environments/$ENVIRONMENT"
terraform plan -out=tfplan
```

**File: `scripts/apply.sh`**

```bash
#!/bin/bash
set -e

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
  echo "Usage: ./scripts/apply.sh <environment>"
  exit 1
fi

echo "Applying Terraform plan for environment: $ENVIRONMENT"

cd "environments/$ENVIRONMENT"
terraform apply tfplan
```

---

## Integration with SDLC Swarm

### Position Card Output

```yaml
position_card:
  agent: iac_agent
  
  claims:
    - "Created Terraform modules for VPC, RDS, ECS, ALB (4 modules, 800+ lines)"
    - "Configured multi-AZ HA setup (3 AZs, NAT Gateway per AZ)"
    - "Implemented security best practices (VPC Flow Logs, S3 encryption, RLS)"
    - "Estimated monthly cost: $450/month (dev), $2,200/month (production)"
    - "Tested infrastructure deployment in dev environment (success)"
  
  plan:
    - "Infrastructure supports auto-scaling (ECS tasks, RDS read replicas)"
    - "Disaster recovery: Multi-AZ RDS, 7-day backups, point-in-time recovery"
    - "Cost optimization: Spot instances for non-critical workloads (future)"
    - "State managed in S3 with DynamoDB locking (secure, collaborative)"
  
  evidence_pointers:
    - "infrastructure/main.tf"
    - "infrastructure/modules/"
    - "infrastructure/environments/production/terraform.tfvars"
    - "infrastructure/docs/DEPLOYMENT.md"
  
  confidence: 0.87
  risks:
    - "RDS master password stored in tfvars (should use AWS Secrets Manager)"
    - "NAT Gateway costs high in multi-AZ setup (~$100/month per gateway)"
```

---

## Rules (Non-Negotiable)

1. **State Management:** Always use remote state (S3 + DynamoDB lock) for team collaboration

2. **Secrets Management:** Never hardcode secrets in Terraform files (use AWS Secrets Manager)

3. **Multi-Environment:** Separate configurations for dev/staging/production (no shared state)

4. **Version Pinning:** Pin provider versions to avoid breaking changes

5. **Cost Estimation:** Run `terraform cost` before applying changes to production

6. **Drift Detection:** Schedule daily drift detection jobs (detect manual changes)

7. **Disaster Recovery:** Enable backups, multi-AZ for critical resources (RDS, etc.)

---

## Skills Validated

- **C5: SDLC Workflows** - Infrastructure provisioning automated in CI/CD
- **C6: Security & Privacy** - Network segmentation, encryption, least privilege
- **C7: Reliability** - Multi-AZ HA, backups, disaster recovery

---

## Invariants Satisfied

- **INV-032:** Operational excellence (IaC, version control, automation)
- **INV-033:** Cost optimization (right-sizing, spot instances)
- **INV-036:** Security (encryption, least privilege, network segmentation)

---

**End of Infrastructure-as-Code (IaC) Agent Skill**
