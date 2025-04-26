# StyleCraft - Vercel Deployment Guide

## Prerequisites

- A [Vercel](https://vercel.com) account
- [Git](https://git-scm.com/) installed on your machine
- Node.js installed on your machine

## Deployment Steps

### 1. Prepare your project

Your project has been configured with necessary files for Vercel deployment:
- `vercel.json` - Configures build processes and routing rules
- `api/index.ts` - Serverless API entry point for Vercel
- Updated build scripts in `package.json`

### 2. Install Vercel CLI (optional)

```bash
npm install -g vercel
```

### 3. Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Log in to your Vercel account
3. Click "Add New" > "Project"
4. Select your repository
5. Configure your project:
   - Framework Preset: Select "Other"
   - Build Command: npm run build
   - Output Directory: dist
   - Install Command: npm install
6. Click "Deploy"

#### Option B: Using Vercel CLI

1. Login to Vercel:
```bash
vercel login
```

2. Navigate to your project and run:
```bash
vercel
```

3. Follow the CLI prompts and confirm your settings

### 4. Environment Variables

Set these environment variables in the Vercel dashboard:
- `DATABASE_URL`: Your database connection string
- `SESSION_SECRET`: Secret key for session encryption
- `STRIPE_SECRET_KEY`: If using Stripe payments
- `STRIPE_PUBLISHABLE_KEY`: If using Stripe payments
- `STRIPE_WEBHOOK_SECRET`: If using Stripe webhooks
- `NODE_ENV`: Set to "production" for production environment

### 5. Verify Deployment

After deployment completes, Vercel will provide you with a URL where your application is hosted. Visit this URL to verify your deployment.

## Troubleshooting

- **Build Errors**: Check Vercel build logs for specific errors
- **Runtime Errors**: Check Vercel function logs
- **Database Connection Issues**: Verify your environment variables and network settings

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Express.js on Vercel](https://vercel.com/guides/using-express-with-vercel) 