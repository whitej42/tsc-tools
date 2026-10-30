terraform {
  required_version = ">= 1.11.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Remote state. Configured at init time via `-backend-config` so no secrets
  # or account-specific values live in the repo. See the pipeline / README.
  # S3 native state locking (TF >= 1.11) — no DynamoDB table to bootstrap.
  backend "s3" {
    use_lockfile = true
  }
}

# Default provider — region for the S3 bucket and most resources.
provider "aws" {
  region = var.aws_region
}

# CloudFront requires ACM certificates to live in us-east-1, so we keep a
# dedicated aliased provider for the (optional) custom-domain certificate.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
