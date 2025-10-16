# AWS Amplify Deployment Guide

This document outlines the steps required to deploy this Next.js portfolio application using AWS Amplify.

## Prerequisites

- An AWS account
- AWS CLI installed and configured
- Access to AWS Amplify console

## Deployment Steps

### 1. Connect your repository to AWS Amplify

1. Log in to the AWS Management Console and navigate to the AWS Amplify service.
2. Click on "New app" and select "Host web app".
3. Choose your git provider where this repository is hosted (GitHub, BitBucket, GitLab, etc.).
4. Select the repository and branch you want to deploy.

### 2. Configure the build settings

AWS Amplify will detect that this is a Next.js application. Our `amplify.yml` file is already set up with the correct build settings:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install -g pnpm
        - pnpm install
    build:
      commands:
        - env | grep -e NEXT_PUBLIC_ >> .env.production
        - pnpm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### 3. Set environment variables

In the AWS Amplify Console:

1. Navigate to your app
2. Go to "App settings" > "Environment variables"
3. Add the following environment variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://13.233.237.62:5000/api/v1`

### 4. Deploy

1. Click "Save and deploy" to start the deployment process.
2. AWS Amplify will build and deploy your application.

### 5. Custom domain (Optional)

1. In the AWS Amplify Console, go to "App settings" > "Domain management".
2. Follow the instructions to set up a custom domain for your application.

## Troubleshooting

If you encounter issues during deployment:

1. Check the build logs in the AWS Amplify Console.
2. Ensure your environment variables are correctly set.
3. Verify that the API endpoint at `https://13.233.237.62:5000/api/v1` is accessible and correctly configured with CORS headers to accept requests from your Amplify domain.

## Note on SSL/TLS and Port Configuration

If your API at `13.233.237.62:5000` does not have a valid SSL certificate, you might need to use `http://` instead of `https://` for the API URL. However, this is not recommended for production environments.

## Port Configuration

The backend API is running on port 5000. Make sure:

1. Port 5000 is open in the security group/firewall of your server at 13.233.237.62
2. Your backend application is configured to listen on port 5000
3. If you're using a reverse proxy (like Nginx or Apache), it's properly configured to forward requests to port 5000