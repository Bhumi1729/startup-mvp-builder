# API Connection Troubleshooting

## Common Error: "Failed to fetch" / API Connection Issues

If you're seeing "Failed to fetch" errors in your dashboard, it likely means the backend API server is not running or not accessible. Follow these steps to resolve the issue:

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

**Expected output:** You should see output indicating the backend server has started on http://localhost:8000.

### Step 2: Verify Environment Configuration

Make sure your environment variables are set correctly:

1. Check that the `.env.local` file in the frontend directory contains:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

2. Verify that the backend server's `.env` file has all required API keys and Supabase credentials.

### Step 3: Reload the Dashboard

After starting the backend server, refresh the dashboard page in your browser.

### Still Having Issues?

- Check if the server is listening on the expected port (8000)
- Check if there are any errors in the terminal where the backend server is running
- Verify that you can access the backend API directly by navigating to `http://localhost:8000/docs` in your browser
- Make sure your network settings aren't blocking local connections

## Note for Production Deployments

For production environments, make sure to update the `NEXT_PUBLIC_API_URL` in your environment configuration to point to your production backend URL.
