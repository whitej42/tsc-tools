terraform {
  required_version = ">= 1.11.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Remote state — shared backend bucket, same as the other projects.
  backend "s3" {
    bucket       = "smej-backend-bucket"
    key          = "tsc-tools"
    region       = "us-east-1"
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
