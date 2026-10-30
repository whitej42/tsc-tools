# infra/ — Hero asset CDN (S3 + CloudFront)

Terraform for the hero-image CDN used by the home page. It creates:

- A **private** S3 bucket (public access blocked, encrypted, versioned) holding the hero JPGs.
- A **CloudFront** distribution that serves the bucket over HTTPS, using an **Origin Access Control** so the bucket is only reachable through CloudFront — never directly.

The React app points at this via `REACT_APP_HERO_BASE_URL` (see the `hero_base_url` output).

## Layout

| File | Purpose |
|------|---------|
| `versions.tf` | Provider + Terraform version constraints, S3 remote-state backend. |
| `variables.tf` | Input variables (all have sensible defaults). |
| `main.tf` | S3 bucket, bucket policy, OAC, CloudFront distribution. |
| `outputs.tf` | Bucket name, distribution ID, and the base URL for the app. |
| `terraform.tfvars` | Project inputs (region, project, environment, tags). |

## Pipeline setup

No bootstrap needed. State lives in the shared `smej-backend-bucket`
(us-east-1) under the `tsc-tools` key, with S3 native lockfile locking
(Terraform >= 1.11) — no DynamoDB table.

The only repo variable the pipeline reads is `AWS_DEPLOY_ROLE_ARN` (the
GitHub OIDC role). Everything else comes from `terraform.tfvars`.

## Running locally

```bash
cd infra
terraform init

terraform plan
terraform apply
```

Then upload the images and read the base URL:

```bash
aws s3 sync ../src/assets/images/hero/ "s3://$(terraform output -raw bucket_name)/hero/" \
  --cache-control "public, max-age=604800"

terraform output -raw hero_base_url   # -> set REACT_APP_HERO_BASE_URL to "<this>/hero"
```

## CI/CD pipeline

`.github/workflows/infra.yml` runs `plan` on pull requests and `apply` on push to `main`
(only when `infra/**` changes). It authenticates to AWS via **GitHub OIDC** — no static
access keys are stored. The workflow requests a short-lived token (`id-token: write`) and
assumes the deployer role. It is otherwise configured **entirely through one repo
variable** — no static access keys are committed.

### Required GitHub **Variables**

| Variable | Example | Purpose |
| `AWS_DEPLOY_ROLE_ARN` | `arn:aws:iam::212892117339:role/TerraformPipelineDeployerRole` | IAM role assumed via OIDC to manage S3 + CloudFront. |

The resource region is pinned to `eu-west-2` in the workflow's `env:`; the
state bucket's own region is set in `versions.tf`.

### Terraform inputs

Set in `terraform.tfvars`, not as GitHub variables — tfvars takes precedence
over `TF_VAR_*` env anyway. See `variables.tf` for the full list and defaults.


