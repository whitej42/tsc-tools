output "bucket_name" {
  description = "Name of the S3 bucket holding the app's static assets."
  value       = aws_s3_bucket.assets.id
}

output "bucket_arn" {
  description = "ARN of the app assets bucket."
  value       = aws_s3_bucket.assets.arn
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (used for cache invalidations)."
  value       = aws_cloudfront_distribution.assets.id
}

output "cloudfront_domain_name" {
  description = "Default *.cloudfront.net domain for the distribution."
  value       = aws_cloudfront_distribution.assets.domain_name
}

output "hero_base_url" {
  description = "Base URL to set as REACT_APP_HERO_BASE_URL."
  value       = "https://${aws_cloudfront_distribution.assets.domain_name}"
}
