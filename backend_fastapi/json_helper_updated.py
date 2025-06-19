"""Helper functions for JSON processing."""
import json
import re
from typing import Any, Dict, List, Union

def extract_json_from_response(text: str) -> Any:
    """
    Helper method to extract JSON from model responses that may include explanatory text.
    Handles common JSON formatting issues from LLM outputs.
    
    Args:
        text (str): The text containing JSON somewhere within it
        
    Returns:
        Any: The parsed JSON data or an empty dict/list if extraction fails
    """
    try:
        # Remove JavaScript comments before processing
        # Remove single-line comments (// comment)
        text = re.sub(r'//.*?$', '', text, flags=re.MULTILINE)
        
        # First, try to find JSON between triple backticks
        json_match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text)
        if json_match:
            json_text = json_match.group(1)
            # Clean up the JSON
            json_text = re.sub(r',\s*}', '}', json_text)  # Remove trailing commas in objects
            json_text = re.sub(r',\s*]', ']', json_text)  # Remove trailing commas in arrays
            return json.loads(json_text)
        
        # Next, try to find any JSON object or array
        json_match = re.search(r"({[\s\S]*}|\[[\s\S]*\])", text)
        if json_match:
            json_text = json_match.group(0)
            # Clean up the JSON
            json_text = re.sub(r',\s*}', '}', json_text)
            json_text = re.sub(r',\s*]', ']', json_text)
            return json.loads(json_text)
        
        # If all else fails, try to parse the entire text as JSON
        return json.loads(text)
    except Exception as e:
        print(f"Error extracting JSON: {e}")
        print(f"Raw text: {text[:500]}...") # Print only first 500 chars to avoid log overflow
        # Return empty dict or list based on context instead of raising an exception
        if text.strip().startswith('['):
            return []
        return {}

def normalize_tech_stack_json(data: Dict) -> Dict[str, List[Dict]]:
    """
    Normalizes tech stack JSON data to ensure it has all required fields.
    
    Args:
        data (Dict): The raw tech stack JSON data
        
    Returns:
        Dict[str, List[Dict]]: Normalized tech stack data with all required fields
    """
    normalized_data = {}
    
    # Handle common wrapper structures
    if "tech_stack" in data:
        data = data["tech_stack"]
    elif "technologies" in data:
        data = data["technologies"]
    
    for category, technologies in data.items():
        normalized_technologies = []
        
        for tech in technologies:
            # Ensure all required fields are present
            normalized_tech = {
                "name": tech.get("name", "Unknown"),
                "version": tech.get("version", "Latest"),
                "justification": tech.get("justification", "No justification provided"),
                "alternatives_considered": tech.get("alternatives_considered", ["None"]),
                "learning_curve": tech.get("learning_curve", "Medium"),
                "community_support": tech.get("community_support", "Medium"),
                "documentation_quality": tech.get("documentation_quality", "Good")
            }
            
            # Convert string alternatives to list if needed
            if isinstance(normalized_tech["alternatives_considered"], str):
                alternatives = normalized_tech["alternatives_considered"]
                normalized_tech["alternatives_considered"] = [alt.strip() for alt in alternatives.split(",") if alt.strip()]
                if not normalized_tech["alternatives_considered"]:
                    normalized_tech["alternatives_considered"] = ["None"]
            
            normalized_technologies.append(normalized_tech)
        
        normalized_data[category] = normalized_technologies
    
    return normalized_data

def normalize_api_endpoints(data: List[Dict]) -> List[Dict]:
    """
    Normalizes API endpoint data to ensure it has all required fields.
    
    Args:
        data (List[Dict]): The raw API endpoint data
        
    Returns:
        List[Dict]: Normalized API endpoint data with all required fields
    """
    # Handle common wrapper structures
    if isinstance(data, dict):
        if "api_endpoints" in data:
            data = data["api_endpoints"]
        elif "endpoints" in data:
            data = data["endpoints"]
    
    normalized_endpoints = []
    
    for endpoint in data:
        # Ensure all required fields are present
        normalized_endpoint = {
            "path": endpoint.get("path", "/api/unknown"),
            "method": endpoint.get("method", "GET"),
            "description": endpoint.get("description", "No description provided"),
            "request_body": endpoint.get("request_body"),
            "response_structure": endpoint.get("response_structure", {}),
            "auth_required": endpoint.get("auth_required", False),
            "related_features": endpoint.get("related_features", ["General"])
        }
        
        # Ensure response_structure is a dict
        if not normalized_endpoint["response_structure"]:
            normalized_endpoint["response_structure"] = {"message": "Success"}
        
        # Convert string related_features to list if needed
        if isinstance(normalized_endpoint["related_features"], str):
            features = normalized_endpoint["related_features"]
            normalized_endpoint["related_features"] = [f.strip() for f in features.split(",") if f.strip()]
            if not normalized_endpoint["related_features"]:
                normalized_endpoint["related_features"] = ["General"]
        
        normalized_endpoints.append(normalized_endpoint)
    
    return normalized_endpoints

def normalize_deployment_strategy(data: Dict) -> Dict:
    """
    Normalizes deployment strategy data to ensure it has all required fields.
    
    Args:
        data (Dict): The raw deployment strategy data
        
    Returns:
        Dict: Normalized deployment strategy data with all required fields
    """
    # Handle common wrapper structures
    if "deployment_strategy" in data:
        data = data["deployment_strategy"]
    elif "deployment" in data:
        data = data["deployment"]
    
    # Ensure all required fields are present
    normalized_data = {
        "recommended_approach": data.get("recommended_approach", "Cloud-based containerized deployment"),
        "infrastructure": data.get("infrastructure", "AWS or Azure cloud services"),
        "ci_cd_pipeline": data.get("ci_cd_pipeline", {}),
        "scaling_strategy": data.get("scaling_strategy", "Auto-scaling based on load"),
        "estimated_costs": data.get("estimated_costs", {}),
        "monitoring_tools": data.get("monitoring_tools", ["CloudWatch", "Prometheus"]),
        "backup_strategy": data.get("backup_strategy", "Daily automated backups with 30-day retention")
    }
    
    # Ensure ci_cd_pipeline is a dict
    if not normalized_data["ci_cd_pipeline"] or not isinstance(normalized_data["ci_cd_pipeline"], dict):
        normalized_data["ci_cd_pipeline"] = {
            "Source Control": "GitHub",
            "CI": "GitHub Actions",
            "CD": "AWS CodeDeploy"
        }
    
    # Convert scaling_strategy to string if it's a dictionary
    if isinstance(normalized_data["scaling_strategy"], dict):
        strategy_parts = []
        for key, value in normalized_data["scaling_strategy"].items():
            strategy_parts.append(f"{key}: {value}")
        normalized_data["scaling_strategy"] = "; ".join(strategy_parts) if strategy_parts else "Auto-scaling based on load"
    
    # Convert estimated_costs to string if it's a dictionary
    if isinstance(normalized_data["estimated_costs"], dict):
        cost_parts = []
        for component, cost in normalized_data["estimated_costs"].items():
            cost_parts.append(f"{component}: {cost}")
        normalized_data["estimated_costs"] = "; ".join(cost_parts) if cost_parts else "Infrastructure: $200-400/month; Services: $50-100/month"
    
    # Convert string monitoring_tools to list if needed
    if isinstance(normalized_data["monitoring_tools"], str):
        tools = normalized_data["monitoring_tools"]
        normalized_data["monitoring_tools"] = [t.strip() for t in tools.split(",") if t.strip()]
        if not normalized_data["monitoring_tools"]:
            normalized_data["monitoring_tools"] = ["CloudWatch", "Prometheus"]
    
    return normalized_data

def normalize_security_considerations(data: Dict) -> Dict:
    """
    Normalizes security considerations data to ensure it has all required fields and correct types.
    Handles cases where fields are dicts (as returned by AI) instead of strings/lists.
    
    Args:
        data (Dict): The raw security considerations data
        
    Returns:
        Dict: Normalized security considerations data with all required fields
    """
    # Handle common wrapper structures
    if "security_considerations" in data:
        data = data["security_considerations"]
    elif "securityConsiderations" in data:
        data = data["securityConsiderations"]
    elif "security" in data:
        data = data["security"]

    # --- Robust normalization for AI dict responses ---
    # authentication_method: string or dict
    auth_method = data.get("authentication_method", "JWT-based authentication")
    if isinstance(auth_method, dict):
        auth_method = auth_method.get("recommended", "JWT-based authentication")
    # authorization_approach: string or dict
    authz_approach = data.get("authorization_approach", "Role-based access control")
    if isinstance(authz_approach, dict):
        authz_approach = authz_approach.get("recommended", "Role-based access control")
    # data_encryption: dict with at_rest/in_transit as string or dict
    data_encryption = data.get("data_encryption", {})
    if not data_encryption or not isinstance(data_encryption, dict):
        data_encryption = {"in_transit": "TLS 1.3", "at_rest": "AES-256"}
    else:
        at_rest = data_encryption.get("at_rest", "AES-256")
        if isinstance(at_rest, dict):
            at_rest = at_rest.get("recommended", "AES-256")
        in_transit = data_encryption.get("in_transit", "TLS 1.3")
        if isinstance(in_transit, dict):
            in_transit = in_transit.get("recommended", "TLS 1.3")
        data_encryption = {"in_transit": in_transit, "at_rest": at_rest}
    # security_best_practices, compliance_considerations, security_testing: list or string or dict
    def normalize_list_field(val, default):
        if isinstance(val, dict):
            # e.g. {"recommendations": [..]}
            val = val.get("recommendations", default)
        if isinstance(val, str):
            val = [item.strip() for item in val.split(",") if item.strip()]
        if not val:
            return default
        return val
    security_best_practices = normalize_list_field(data.get("security_best_practices"), ["Input validation", "CSRF protection", "Regular updates"])
    compliance_considerations = normalize_list_field(data.get("compliance_considerations"), ["GDPR", "CCPA"])
    security_testing = normalize_list_field(data.get("security_testing"), ["Penetration testing", "Vulnerability scanning"])

    normalized_data = {
        "authentication_method": auth_method,
        "authorization_approach": authz_approach,
        "data_encryption": data_encryption,
        "security_best_practices": security_best_practices,
        "compliance_considerations": compliance_considerations,
        "security_testing": security_testing
    }
    return normalized_data

def normalize_third_party_services(data: Dict) -> Dict[str, List[Dict[str, str]]]:
    """
    Normalizes third party services data to ensure it has all required fields.
    
    Args:
        data (Dict): The raw third-party services data
        
    Returns:
        Dict[str, List[Dict[str, str]]]: Normalized third-party services data with all required fields
    """
    # Handle common wrapper structures
    if "third_party_services" in data:
        data = data["third_party_services"]
    elif "services" in data:
        data = data["services"]
    
    normalized_data = {}
    
    for category, services in data.items():
        normalized_services = []
        
        for service in services:
            # Ensure all required fields are present
            normalized_service = {
                "name": service.get("name", "Unknown Service"),
                "description": service.get("description", "No description provided"),
                "pricing_tier": service.get("pricing_tier", service.get("pricing", "Freemium")),
                "integration_complexity": service.get("integration_complexity", 
                                               service.get("complexity", "Medium"))
            }
            
            normalized_services.append(normalized_service)
        
        normalized_data[category] = normalized_services
    
    # If data is still empty after processing, provide a default service
    if not normalized_data:
        normalized_data = {
            "Authentication": [
                {
                    "name": "Auth0",
                    "description": "Identity platform for web, mobile, IoT",
                    "pricing_tier": "Freemium",
                    "integration_complexity": "Low"
                }
            ],
            "Email": [
                {
                    "name": "SendGrid",
                    "description": "Email delivery and marketing service",
                    "pricing_tier": "Freemium",
                    "integration_complexity": "Low"
                }
            ]
        }
    
    return normalized_data
