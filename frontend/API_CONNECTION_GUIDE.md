# API Connection Guide

## Production Backend

The production backend is deployed at:
```
https://startup-mvp-builder.onrender.com
```

You can verify the API is working by accessing the Swagger UI at:
```
https://startup-mvp-builder.onrender.com/docs
```

## Local Development

### Common Error: "Failed to fetch" / API Connection Issues

If you're seeing "Failed to fetch" errors in your dashboard during local development, it likely means the backend API server is not running or not accessible. Follow these steps to resolve the issue:

### Step 1: Start the Backend Server

The frontend dashboard needs to connect to the backend API to fetch your project data. Make sure the backend server is running:

**Option 1: Using the convenience script from the frontend directory:**

```powershell
# From the frontend directory
.\start-backend.ps1
```

**Option 2: Starting directly from the backend directory:**

```powershell
cd ..\backend_fastapi
.\start_server.ps1
```

**Expected output:** You should see output indicating the backend server has started on https://startup-mvp-builder.onrender.com.

### Step 2: Verify Environment Configuration

For local development, make sure your environment variables are set correctly:

1. Create a `.env.local` file in the frontend directory that contains:
   ```
   NEXT_PUBLIC_API_URL=https://startup-mvp-builder.onrender.com
   ```

2. Verify that the backend server's `.env` file has all required API keys and Supabase credentials.

### Step 3: Reload the Dashboard

After starting the backend server, refresh the dashboard page in your browser.

### Still Having Issues?

- Check if the server is listening on the expected port (8000)
- Check if there are any errors in the terminal where the backend server is running
- Verify that you can access the backend API directly by navigating to `https://startup-mvp-builder.onrender.com/docs` in your browser
- Make sure your network settings aren't blocking local connections

## Production Configuration

The production environment is configured to use the deployed backend URL:
```
NEXT_PUBLIC_API_URL=https://startup-mvp-builder.onrender.com
```

This is set directly in `next.config.js` so no additional environment configuration is needed for production deployments.
