variable "aws_region" {
  description = "AWS region for the S3 bucket."
  type        = string
  default     = "us-east-1"
}

variable "project" {
  description = "Short project name, used to build resource names and tags."
  type        = string
  default     = "tsc-tools"
}

variable "environment" {
  description = "Deployment environment (e.g. prod, staging). Part of resource names."
  type        = string
  default     = "production"
}

variable "bucket_name" {
  description = "Globally-unique S3 bucket name for the app's static assets (hero images live under a hero/ prefix). Leave empty to auto-generate from project/environment plus a random suffix."
  type        = string
  default     = ""
}

variable "price_class" {
  description = "CloudFront price class. PriceClass_100 = NA + EU only (cheapest), PriceClass_All = global."
  type        = string
  default     = "PriceClass_100"

  validation {
    condition     = contains(["PriceClass_100", "PriceClass_200", "PriceClass_All"], var.price_class)
    error_message = "price_class must be one of PriceClass_100, PriceClass_200, PriceClass_All."
  }
}

variable "tags" {
  description = "Additional tags applied to all resources."
  type        = map(string)
  default     = {}
}
