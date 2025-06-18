# Start the backend FastAPI server
Write-Host "Starting Startup MVP Builder backend API server..."
Write-Host "This will start the backend API server on http://localhost:8000"
Write-Host "Press Ctrl+C to stop the server"
Write-Host ""

# Navigate to the backend directory
Set-Location -Path "..\backend_fastapi"

# Start the server
uvicorn main:app --reload

# Return to the original directory when script is stopped
Set-Location -Path "..\frontend"
