# Testing the Startup MVP Builder API with Postman

This guide will walk you through testing all the API routes in the Startup MVP Builder using Postman, step by step.

## Prerequisites

1. Make sure the FastAPI server is running:
   ```powershell
   cd c:\Users\bhumi\OneDrive\Desktop\startup-mvp-builder\mvp\backend_fastapi
   uvicorn main:app --reload
   ```

2. Have [Postman](https://www.postman.com/downloads/) installed

## Setting Up Postman

1. Open Postman
2. Create a new collection named "Startup MVP Builder API"
3. Create environment variables to reuse throughout your requests:
   - `base_url`: `http://127.0.0.1:8000`
   - `user_id`: A string to identify yourself (e.g., `"test_user_1"`)
   - `session_id`: A unique identifier for the testing session (e.g., `"test_session_1"`)

## Step 1: Test Root Endpoint

**GET /** - Check if the API is running and get available endpoints

1. Create a new request in your collection
2. Set the method to `GET`
3. Set the URL to `{{base_url}}/`
4. Send the request

You should receive a welcome message with a list of available endpoints.

## Step 2: Market Analysis

**POST /market-analyst** - Generate a market analysis report for a startup idea

1. Create a new request in your collection
2. Set the method to `POST`
3. Set the URL to `{{base_url}}/market-analyst`
4. Select the "Body" tab and choose "raw" with "JSON" format
5. Enter the following JSON:
   ```json
   {
     "startup_idea": "AI-powered fitness app that creates personalized workout plans",
     "user_id": "{{user_id}}",
     "session_id": "{{session_id}}"
   }
   ```
6. Send the request

This endpoint will take some time to process (30 seconds to a couple of minutes) as it performs comprehensive market research. You should see real-time progress indicators in your FastAPI terminal.

**Important:** When you get the response, save it to a file or copy to a variable as you'll need it for the next step. In Postman, you can use the "Tests" tab to save the response:

```javascript
var jsonData = pm.response.json();
pm.environment.set('market_report', JSON.stringify(jsonData));
```

## Step 3: Product Planning

**POST /product-manager** - Generate a product roadmap based on the market analysis

1. Create a new request in your collection
2. Set the method to `POST`
3. Set the URL to `{{base_url}}/product-manager`
4. Select the "Body" tab and choose "raw" with "JSON" format
5. Enter the following JSON:
   ```json
   {
     "market_report": {{market_report}},
     "user_id": "{{user_id}}",
     "session_id": "{{session_id}}"
   }
   ```
   Note: If you saved the market report response using the Tests tab, you can reference it directly as shown above. Otherwise, paste the entire JSON response from the previous step in place of `{{market_report}}`.

6. Send the request

This endpoint will also take some time to process. You should see real-time progress indicators in your FastAPI terminal.

**Important:** Save the response for the next step:

```javascript
var jsonData = pm.response.json();
pm.environment.set('product_roadmap', JSON.stringify(jsonData));
```

## Step 4: Technical Architecture

**POST /technical-architect** - Generate a technical blueprint based on the product roadmap

1. Create a new request in your collection
2. Set the method to `POST`
3. Set the URL to `{{base_url}}/technical-architect`
4. Select the "Body" tab and choose "raw" with "JSON" format
5. Enter the following JSON:
   ```json
   {
     "product_roadmap": {{product_roadmap}},
     "user_id": "{{user_id}}",
     "session_id": "{{session_id}}"
   }
   ```
   Note: If you saved the product roadmap response using the Tests tab, you can reference it directly as shown above. Otherwise, paste the entire JSON response from the previous step in place of `{{product_roadmap}}`.

6. Send the request

This endpoint will also take some time to process. You should see real-time progress indicators in your FastAPI terminal.

## Step 5: Retrieve User Outputs

**GET /outputs/user/{user_id}** - Get all agent outputs for a specific user

1. Create a new request in your collection
2. Set the method to `GET`
3. Set the URL to `{{base_url}}/outputs/user/{{user_id}}`
4. Send the request

You should receive all the agent outputs for the specified user.

## Step 6: Retrieve Session Output

**POST /outputs/session** - Get agent outputs for a specific session

1. Create a new request in your collection
2. Set the method to `POST`
3. Set the URL to `{{base_url}}/outputs/session`
4. Select the "Body" tab and choose "raw" with "JSON" format
5. Enter the following JSON:
   ```json
   {
     "session_id": "{{session_id}}"
   }
   ```
6. Send the request

You should receive the agent outputs for the specified session.

## Alternative: Using the Provided Postman Collection

For your convenience, two JSON files have been created for you:

1. `startup_mvp_builder_postman_collection.json` - Contains all the API requests
2. `startup_mvp_builder_postman_environment.json` - Contains the environment variables

To use these files:

1. Open Postman
2. Click on "Import" in the top left
3. Select the two JSON files (collection and environment)
4. After importing, select the "Startup MVP Builder Environment" from the environment dropdown in the top right
5. Open the "Startup MVP Builder API" collection and you can run the requests in order

This approach is especially useful if you plan to test frequently or want to share the testing workflow with others.

## Troubleshooting

### Error: "Failed to connect to 127.0.0.1:8000"
- Make sure your FastAPI server is running

### Error: "Failed to generate market analysis report"
- Check the FastAPI server logs for more detailed error information
- Ensure your OpenAI API key is properly set in your environment variables
- Check any rate limiting or quota issues with the OpenAI API

### Error: "Error storing agent outputs in database"
- Ensure your Supabase credentials are correctly configured
- Check if the required tables have been created in Supabase

## Additional Notes

- The FastAPI server has CORS enabled, so you can also test these endpoints from a web application
- All agent outputs are stored in Supabase, so you can review them later through the Supabase interface
- The real-time progress indicators will appear in the terminal window where the FastAPI server is running, not in Postman
