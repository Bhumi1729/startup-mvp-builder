from supabase import create_client
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://limulfiulpknetugotaz.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpbXVsZml1bHBrbmV0dWdvdGF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1Mzc0MTQsImV4cCI6MjA2NTExMzQxNH0.i5VQp_hIsIrHFUD0P4PmKFS9Q9YG6SYmpYlvvg0GHjo")

# Create Supabase client
supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_supabase_client():
    """
    Return the Supabase client instance.
    
    Returns:
        SupabaseClient: The Supabase client instance
    """
    return supabase_client

def store_agent_outputs(user_id, session_id, market_analyst_response, product_manager_response, tech_architect_response):
    """
    Store the agent outputs in Supabase.
    
    Args:
        user_id (str): The ID of the user
        session_id (str): The ID of the session
        market_analyst_response (dict): The market analyst agent's response
        product_manager_response (dict): The product manager agent's response
        tech_architect_response (dict): The technical architect agent's response
        
    Returns:
        dict: The response from Supabase
    """
    try:
        # Insert the data into the agent_outputs table
        response = supabase_client.table('agent_outputs').insert({
            'user_id': user_id,
            'session_id': session_id,
            'market_analyst_response': market_analyst_response,
            'product_manager_response': product_manager_response,
            'tech_architect_response': tech_architect_response,
            'created_at': 'now()'  # Use SQL now() function for the current timestamp
        }).execute()
        
        return response.data
    except Exception as e:
        print(f"Error storing agent outputs: {str(e)}")
        raise e

def get_agent_outputs_by_user(user_id):
    """
    Get all agent outputs for a specific user.
    
    Args:
        user_id (str): The ID of the user
        
    Returns:
        list: A list of agent outputs
    """
    try:
        response = supabase_client.table('agent_outputs')\
            .select('*')\
            .eq('user_id', user_id)\
            .order('created_at', desc=True)\
            .execute()
        
        return response.data
    except Exception as e:
        print(f"Error retrieving agent outputs: {str(e)}")
        raise e

def get_agent_output_by_session(session_id):
    """
    Get agent outputs for a specific session.
    
    Args:
        session_id (str): The ID of the session
        
    Returns:
        dict: The agent outputs for the session
    """
    try:
        response = supabase_client.table('agent_outputs')\
            .select('*')\
            .eq('session_id', session_id)\
            .limit(1)\
            .execute()
        
        if response.data and len(response.data) > 0:
            return response.data[0]
        return None
    except Exception as e:
        print(f"Error retrieving agent outputs: {str(e)}")
        raise e
