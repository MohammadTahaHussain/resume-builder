This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Authentication Setup

This project uses NextAuth.js for authentication with Google and GitHub providers.

### 1. Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# MongoDB Configuration
MONGODB_URI=your-mongodb-connection-string
```

### 2. Generate NextAuth Secret

Generate a secure secret for NextAuth:

```bash
openssl rand -base64 32
```

Or use an online generator and add it to your `.env.local` file as `NEXTAUTH_SECRET`.

### 3. Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (or Google Identity API)
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Add `http://localhost:3000/api/auth/callback/google` to the authorized redirect URIs
6. Copy the Client ID and Client Secret to your `.env.local` file

### 4. GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Set the Authorization callback URL to `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your `.env.local` file

### 5. MongoDB Setup

#### Option A: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Get your connection string from "Connect" → "Connect your application"
5. Add it to your `.env.local` file as `MONGODB_URI`

#### Option B: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/resume-builder`

### 6. Testing Authentication

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000/auth/signin`
3. You should see the sign-in options for configured providers
4. If no providers are configured, you'll see a warning message

### 7. Troubleshooting

**Error: "Cannot read properties of undefined (reading 'custom')"**
- This usually means the NextAuth secret is not properly configured
- Make sure `NEXTAUTH_SECRET` is set in your `.env.local` file

**No sign-in buttons appear**
- Check that your OAuth provider credentials are correctly set in `.env.local`
- Verify that the callback URLs match exactly what's configured in your OAuth apps

**Authentication works locally but not in production**
- Update `NEXTAUTH_URL` to your production domain
- Ensure all environment variables are set in your production environment
- Update callback URLs in your OAuth provider settings

**MongoDB connection issues**
- Verify your `MONGODB_URI` is correct
- Check that your MongoDB cluster is running
- Ensure your IP address is whitelisted in MongoDB Atlas

## Features

- ✅ Google OAuth Authentication
- ✅ GitHub OAuth Authentication  
- ✅ MongoDB Database Integration
- ✅ User Resume Management
- ✅ Protected Routes (Builder, Dashboard)
- ✅ User Profile Management
- ✅ Responsive Navigation
- ✅ Beautiful UI with Tailwind CSS
- ✅ PDF Generation with Watermarks
- ✅ Multiple Resume Templates
- ✅ CRUD Operations for Resumes

## Database Schema

### Users
- Basic user information (name, email, image)
- Linked to OAuth accounts
- Associated with multiple resumes

### Resumes
- User-specific resume data
- Template information
- Download tracking
- Public/private settings

### Accounts & Sessions
- NextAuth OAuth account data
- Session management

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
