from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import json
from datetime import datetime

# Import the market agent functionality
from market_agent import analyze_startup_market, EnhancedMarketAnalysisReport

# Import JSON helper functions
from json_helper_updated import extract_json_from_response, normalize_tech_stack_json, normalize_api_endpoints

# Import the product manager functionality
from product_manager import run_product_planning, ProductRoadmap

# Import the technical architect functionality
from tech_architect_updated import TechnicalBlueprint, TechnicalArchitectAgent

# Define a function to run the technical architecture analysis
def run_technical_architecture(product_roadmap: ProductRoadmap) -> TechnicalBlueprint:
    """Run the technical architect agent to generate a technical blueprint."""
    tech_architect = TechnicalArchitectAgent()
    return tech_architect.generate_technical_blueprint(product_roadmap)

# Import Supabase client
from supabase_client import store_agent_outputs, get_agent_outputs_by_user, get_agent_output_by_session

app = FastAPI(title="Startup MVP Builder API", 
              description="API for analyzing startup ideas using AI agents", 
              version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the allowed origins explicitly
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StartupIdeaRequest(BaseModel):
    startup_idea: str
    user_id: str
    session_id: str

class MarketReportRequest(BaseModel):
    market_report: Dict[str, Any]
    user_id: str
    session_id: str
    
class ProductRoadmapRequest(BaseModel):
    product_roadmap: Dict[str, Any]
    user_id: str
    session_id: str

class SessionIdRequest(BaseModel):
    session_id: str

@app.get("/")
async def root():
    return {
        "message": "Welcome to Startup MVP Builder API",
        "endpoints": [
            {
                "path": "/market-analyst",
                "method": "POST",
                "description": "Run market analysis agent"
            },
            {
                "path": "/product-manager",
                "method": "POST",
                "description": "Run product manager agent using market analysis results"
            },
            {
                "path": "/technical-architect",
                "method": "POST",
                "description": "Run technical architect agent using product manager results"
            },
            {
                "path": "/outputs/user/{user_id}",
                "method": "GET",
                "description": "Get all agent outputs for a user"
            },
            {
                "path": "/outputs/session",
                "method": "POST", 
                "description": "Get agent outputs for a specific session"
            }
        ]
    }

@app.post("/market-analyst")
async def market_analyst(request: StartupIdeaRequest):
    """
    Analyze market opportunities for a startup idea.
    
    This endpoint runs the Market Analyst agent to perform comprehensive market research
    on the provided startup idea. It returns a detailed report on market size, competitors,
    opportunities, and strategic recommendations.
    
    The user_id and session_id are used to track the request through the agent chain.
    """
    if not request.startup_idea or len(request.startup_idea.strip()) < 5:
        raise HTTPException(status_code=400, detail="Please provide a valid startup idea with at least 5 characters")
    
    try:
        # Run the market analysis
        report = analyze_startup_market(request.startup_idea)
        
        if not report:
            raise HTTPException(status_code=500, detail="Failed to generate market analysis report")
        
        # Convert the Pydantic model to a dictionary
        report_dict = report.dict()
        
        # Include user_id and session_id in the response for chaining
        response = {
            **report_dict,
            "user_id": request.user_id,
            "session_id": request.session_id
        }
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing market: {str(e)}")

@app.post("/product-manager")
async def product_manager(request: MarketReportRequest):
    """
    Generate product roadmap based on market analysis report.
    
    This endpoint runs the Product Manager agent to analyze the market report 
    and create a comprehensive product roadmap with user personas, features, 
    and prioritization.
    
    The input should be the JSON output from the market-analyst endpoint.
    The user_id and session_id are used to track the request through the agent chain.
    """
    try:
        # Remove user_id and session_id from market_report before conversion
        market_data = {k: v for k, v in request.market_report.items() 
                     if k not in ['user_id', 'session_id']}
        
        # Convert the input JSON to an EnhancedMarketAnalysisReport
        market_report = EnhancedMarketAnalysisReport(**market_data)
        
        # Run the product manager agent
        product_roadmap = run_product_planning(market_report)
        
        if not product_roadmap:
            raise HTTPException(status_code=500, detail="Failed to generate product roadmap")
        
        # Convert the Pydantic model to a dictionary
        roadmap_dict = product_roadmap.dict()
        
        # Include user_id and session_id in the response for chaining
        response = {
            **roadmap_dict,
            "user_id": request.user_id,
            "session_id": request.session_id,
            "_market_analyst_data": market_data  # Include market analyst data for storage
        }
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating product roadmap: {str(e)}")

@app.post("/technical-architect")
async def technical_architect(request: ProductRoadmapRequest):
    """
    Generate technical blueprint based on product roadmap.
    
    This endpoint runs the Technical Architect agent to analyze the product roadmap
    and create a comprehensive technical blueprint with technology stack recommendations,
    database schema design, API endpoints, deployment strategy, and more.
    
    The input should be the JSON output from the product-manager endpoint.
    The user_id and session_id are used to track the request through the agent chain.
    After generating the blueprint, all agent outputs are stored in Supabase.
    
    This endpoint uses an enhanced implementation that ensures all JSON responses
    are properly normalized before being parsed into Pydantic models, which prevents
    validation errors that might occur with inconsistent AI model responses.
    """
    try:
        user_id = request.user_id
        session_id = request.session_id
        
        # Remove user_id and session_id from product_roadmap before conversion
        roadmap_data = {k: v for k, v in request.product_roadmap.items() 
                      if k not in ['user_id', 'session_id', '_market_analyst_data']}
        
        # Extract market analyst data
        market_analyst_data = request.product_roadmap.get("_market_analyst_data", {})
        
        # Convert the input JSON to a ProductRoadmap object
        product_roadmap = ProductRoadmap(**roadmap_data)
        
        # Run the technical architect agent
        tech_blueprint = run_technical_architecture(product_roadmap)
        
        if not tech_blueprint:
            raise HTTPException(status_code=500, detail="Failed to generate technical blueprint")
        
        # Convert the Pydantic model to a dictionary
        blueprint_dict = tech_blueprint.dict()
        
        # Include user_id and session_id in the response
        response = {
            **blueprint_dict,
            "user_id": user_id,
            "session_id": session_id
        }
        
        # Store all agent outputs in Supabase
        try:
            # Store all outputs in Supabase
            store_agent_outputs(
                user_id=user_id,
                session_id=session_id,
                market_analyst_response=market_analyst_data,
                product_manager_response=roadmap_data,
                tech_architect_response=blueprint_dict
            )
        except Exception as db_error:
            # Log the error but don't fail the request
            print(f"Error storing agent outputs in database: {str(db_error)}")
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating technical blueprint: {str(e)}")

@app.get("/outputs/user/{user_id}")
async def get_user_outputs(user_id: str):
    """
    Get all agent outputs for a specific user.
    
    Args:
        user_id (str): The ID of the user
        
    Returns:
        list: A list of agent outputs
    """
    try:
        outputs = get_agent_outputs_by_user(user_id)
        return {"outputs": outputs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving agent outputs: {str(e)}")

@app.post("/outputs/session")
async def get_session_output(request: SessionIdRequest):
    """
    Get agent outputs for a specific session.
    
    Args:
        session_id (str): The ID of the session
        
    Returns:
        dict: The agent outputs for the session
    """
    try:
        output = get_agent_output_by_session(request.session_id)
        if not output:
            raise HTTPException(status_code=404, detail=f"No output found for session {request.session_id}")
        return output
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Error retrieving agent outputs: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
