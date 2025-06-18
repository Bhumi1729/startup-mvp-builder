# Startup MVP Builder API

This project provides a FastAPI backend for the Startup MVP Builder, which includes three agents: Market Analyst, Product Manager, and Technical Architect. These agents work together to transform a startup idea into a comprehensive MVP blueprint.

## Setup Instructions

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Create a `.env` file based on `.env.example` and add your API keys:

```
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_SEARCH_API_KEY=your_google_search_api_key_here
```

## Running the Server

To start the FastAPI server, run:

```bash
uvicorn main:app --reload
```

The server will start at http://127.0.0.1:8000

## API Endpoints

### GET /

Returns a welcome message and available endpoints to confirm the server is running.

### POST /market-analyst

Endpoint to run market analysis for a startup idea.

### POST /product-manager

Endpoint to generate a product roadmap based on a market analysis report.

### POST /technical-architect

Endpoint to generate a technical blueprint based on a product roadmap.

#### Request Format

```json
{
  "product_roadmap": {
    "startup_idea": "AI-powered fitness app that creates personalized workout plans",
    "user_personas": [...],
    "features": [...],
    "mvp_features": [...],
    "milestone_1_features": [...],
    "milestone_2_features": [...],
    "validation_experiments": [...],
    "success_metrics": {...}
  }
}
```

#### Response Format

The response will be a comprehensive technical blueprint JSON object with the following structure:

```json
{
  "startup_idea": "AI-powered fitness app that creates personalized workout plans",
  "tech_stack": {
    "Frontend": [
      {
        "name": "React",
        "version": "18.x",
        "justification": "Popular, well-supported framework",
        "alternatives_considered": ["Vue.js", "Angular"],
        "learning_curve": "Medium",
        "community_support": "Excellent",
        "documentation_quality": "High"
      }
    ],
    "Backend": [...],
    "Database": [...],
    "DevOps": [...]
  },
  "database_schema": [...],
  "api_endpoints": [...],
  "deployment_strategy": {...},
  "security_considerations": {...},
  "third_party_services": {...},
  "development_tools": [...],
  "implementation_roadmap": [...],
  "architecture_diagram": "..."
}
```

#### Response Format

The response will be a detailed market analysis JSON object with the following structure:

```json
{
  "startup_idea": "AI-powered fitness app that creates personalized workout plans",
  "analysis_date": "2025-06-10 12:34:56",
  "executive_summary": "Market analysis shows...",
  "market_sizing": {
    "total_addressable_market": "...",
    "serviceable_addressable_market": "...",
    "serviceable_obtainable_market": "...",
    "market_growth_rate": "...",
    "geographic_distribution": {...}
  },
  "market_trends": {...},
  "competitors": [...],
  "competitive_landscape_summary": "...",
  "market_leaders": [...],
  "opportunity_analysis": {...},
  "opportunity_score": 7.5,
  "risk_analysis": {...},
  "target_audience_segments": [...],
  "go_to_market_insights": [...],
  "strategic_recommendations": [...],
  "next_steps": [...]
}
```

## Testing with Postman

### Testing the Market Analyst Endpoint

1. Open Postman
2. Create a new POST request to `http://127.0.0.1:8000/market-analyst`
3. Go to the "Body" tab, select "raw" and "JSON" format
4. Enter your request body:

```json
{
  "startup_idea": "AI-powered fitness app that creates personalized workout plans"
}
```

5. Click "Send" to submit the request
6. The response will be a detailed market analysis in JSON format
7. Save this response for the next step, as it will be used as input for the Product Manager endpoint

### Testing the Product Manager Endpoint

1. Create another POST request to `http://127.0.0.1:8000/product-manager`
2. Go to the "Body" tab, select "raw" and "JSON" format
3. Take the entire response from the Market Analyst endpoint and paste it inside a "market_report" field:

```json
{
  "market_report": {
    "startup_idea": "AI-powered fitness app that creates personalized workout plans",
    "analysis_date": "2025-06-10 12:34:56",
    ... [rest of the market analysis response] ...
  }
}
```

4. Click "Send" to submit the request
5. The response will be a comprehensive product roadmap in JSON format

### Testing the Technical Architect Endpoint

1. Open Postman
2. Create a new POST request to `http://127.0.0.1:8000/technical-architect`
3. Go to the "Body" tab, select "raw" and "JSON" format
4. Enter the product roadmap response from the Product Manager endpoint as the request body
5. Click "Send" to submit the request
6. The response will be a comprehensive technical blueprint in JSON format

## Response Format for Product Manager Endpoint

```json
{
  "startup_idea": "AI-powered fitness app that creates personalized workout plans",
  "user_personas": [
    {
      "name": "Fitness Beginner",
      "description": "New to fitness routines, looking for guidance",
      "demographics": {
        "age": "25-35",
        "gender": "All",
        "occupation": "Office workers"
      },
      "pain_points": [
        "Overwhelmed by fitness options",
        "Lack of personalized guidance"
      ],
      "goals": [
        "Improve overall health",
        "Build consistent workout habits"
      ],
      "behaviors": [
        "Uses smartphone frequently",
        "Researches before committing"
      ],
      "needs": [
        "Simple, clear instructions",
        "Motivation and encouragement"
      ],
      "tech_savviness": "Medium"
    },
    ...
  ],
  "features": [
    {
      "name": "AI Workout Generator",
      "description": "Algorithm that creates personalized workout plans",
      "priority": "HIGH",
      "effort": 8,
      "impact": 10,
      "user_stories": [
        "As a user, I want personalized workouts that match my fitness level"
      ],
      "target_personas": [
        "Fitness Beginner",
        "Busy Professional"
      ],
      "technical_complexity": 9,
      "dependencies": [],
      "metrics": [
        "User retention",
        "Workout completion rate"
      ]
    },
    ...
  ],
  "mvp_features": [
    "AI Workout Generator",
    "Progress Tracking",
    "Exercise Library"
  ],
  "milestone_1_features": [
    "Social Sharing",
    "Premium Subscription"
  ],
  "milestone_2_features": [
    "Nutrition Integration",
    "Community Challenges"
  ],
  "validation_experiments": [
    {
      "name": "Validate Fitness Beginner Needs",
      "description": "Conduct user interviews with Fitness Beginner persona",
      "method": "User Interviews",
      "success_criteria": "Confirm at least 3 pain points with 80% of interviewees"
    },
    ...
  ],
  "success_metrics": {
    "user_acquisition": "Number of new users per month",
    "user_retention": "Percentage of users active after 30 days",
    "user_engagement": "Average time spent in app per week",
    "revenue": "Monthly recurring revenue",
    "user_satisfaction": "Net Promoter Score"
  }
}
```

## Notes

- Both analysis processes may take some time (30-60 seconds) as they involve multiple API calls and complex processing
- The Market Analyst agent requires active internet connectivity to perform searches
- The Product Manager agent requires a valid market analysis report as input
- All environment variables must be configured correctly for the API to function
