# Vercel Deployment Guide

This guide explains how to configure Supabase environment variables for Vercel deployment.

## Problem

The photo gallery works locally but not on Vercel because environment variables from `.env.local` are not available in production. Vercel needs environment variables configured in its dashboard.

## Solution: Configure Environment Variables in Vercel

### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project

2. **Navigate to Settings**
   - Click on your project
   - Go to **Settings** tab
   - Click on **Environment Variables** in the left sidebar

3. **Add Environment Variables**
   - Click **Add New** button
   - Add the following variables:

   **Variable 1:**
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)
   - **Environment**: Select all (Production, Preview, Development)
   - Click **Save**

   **Variable 2:**
   - **Name**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: Your Supabase anon key
   - **Environment**: Select all (Production, Preview, Development)
   - Click **Save**

4. **Redeploy**
   - After adding variables, go to **Deployments** tab
   - Click the three dots (⋯) on your latest deployment
   - Click **Redeploy**
   - Or push a new commit to trigger a new deployment

### Method 2: Via Vercel CLI

If you have Vercel CLI installed:

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link your project (if not already linked)
vercel link

# Set environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Redeploy
vercel --prod
```

### Method 3: Via vercel.json (Not Recommended)

You can also add environment variables to `vercel.json`, but this is less secure and not recommended for sensitive values.

## Getting Your Supabase Credentials

1. **Go to Supabase Dashboard**
   - Visit [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Get Project URL**
   - Go to **Settings** → **API**
   - Copy **Project URL** under "Project URL"

3. **Get Anon Key**
   - In the same page, copy **anon public** key under "Project API keys"

## Verify Configuration

After redeploying, check:

1. **Check Environment Variables**
   - In Vercel dashboard, go to **Settings** → **Environment Variables**
   - Verify both variables are set for Production, Preview, and Development

2. **Check Build Logs**
   - Go to **Deployments** tab
   - Click on your latest deployment
   - Check the build logs for any errors

3. **Test the Site**
   - Visit your deployed site
   - Navigate to `/photography` page
   - Check browser console for errors
   - Photos should load from Supabase

## Troubleshooting

### Photos Still Not Loading

1. **Check Browser Console**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Look for "Missing Supabase environment variables" warning

2. **Verify Environment Variables**
   - In Vercel dashboard, confirm variables are set correctly
   - Check that variable names match exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   - Note: Variable names must start with `VITE_` for Vite to expose them

3. **Check Supabase Configuration**
   - Verify Supabase project is active
   - Check that `photos` table exists
   - Verify `photos` storage bucket is public
   - Check Row Level Security policies

4. **Clear Cache and Redeploy**
   - In Vercel, click **Redeploy** to clear build cache
   - Or add a commit to trigger a fresh deployment

### Images Not Loading on Mobile

If images load on desktop but not on mobile devices:

1. **Check CORS Configuration in Supabase**
   - Go to Supabase Dashboard → **Storage** → **Settings**
   - Click on **CORS Configuration**
   - Add your Vercel domain (e.g., `https://your-domain.vercel.app`)
   - Allow **GET** and **HEAD** methods
   - Allow headers: `Origin`, `X-Requested-With`, `Content-Type`, `Accept`
   - Save the configuration
   - Redeploy your Vercel application

2. **Check Browser Console on Mobile**
   - Open browser DevTools on mobile device (or use remote debugging)
   - Check Console tab for CORS errors
   - Look for errors like "Access to image at ... has been blocked by CORS policy"
   - Check Network tab to see if image requests are failing

3. **Verify Image URLs**
   - Check that Supabase storage bucket is public
   - Verify image paths in database match storage paths
   - Test image URLs directly in mobile browser

4. **Check Network Issues**
   - Mobile networks may have different restrictions
   - Test on different mobile networks (WiFi vs cellular)
   - Check if images are too large for mobile networks
   - Consider optimizing images before upload

5. **Image Error Handling**
   - The application now includes automatic retry logic (up to 3 retries)
   - Failed images will show an error message with a retry button
   - Check browser console for detailed error messages

### Build Errors

If you see build errors:

1. **Check Build Logs**
   - Look for TypeScript errors
   - Check for missing dependencies

2. **Verify Package.json**
   - Ensure `@supabase/supabase-js` is in dependencies
   - Run `npm install` locally to verify

3. **Check Vite Configuration**
   - Ensure `vite.config.ts` is correct
   - Check that path aliases are configured

## Important Notes

- **Environment Variables**: Vercel environment variables are only available at build time for Vite projects
- **Variable Prefix**: Vite only exposes variables prefixed with `VITE_` to the client
- **Security**: Never commit `.env.local` file (it's already in `.gitignore`)
- **Different Environments**: You can set different values for Production, Preview, and Development

## Quick Checklist

- [ ] Added `VITE_SUPABASE_URL` to Vercel environment variables
- [ ] Added `VITE_SUPABASE_ANON_KEY` to Vercel environment variables
- [ ] Set variables for all environments (Production, Preview, Development)
- [ ] Redeployed the application
- [ ] Verified photos load on deployed site
- [ ] Checked browser console for errors

## Support

If you continue to have issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify Supabase project is active and accessible
4. Ensure Supabase storage bucket is public

