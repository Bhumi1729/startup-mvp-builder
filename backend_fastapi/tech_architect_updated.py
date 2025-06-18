from openai import OpenAI
import os
import json
from typing import List, Dict, Optional, Any, Tuple
from pydantic import BaseModel, Field
from datetime import datetime
from dotenv import load_dotenv

# Import the ProductRoadmap model from product_manager.py
from product_manager import ProductRoadmap
# Import the JSON helper functions
from json_helper_updated import extract_json_from_response, normalize_tech_stack_json, normalize_api_endpoints, normalize_deployment_strategy, normalize_security_considerations, normalize_third_party_services

# Load environment variables
load_dotenv()

# Model definitions for the Technical Architect

class TechStackComponent(BaseModel):
    """A component of the tech stack with name, version, and justification."""
    name: str = Field(description="Name of the technology")
    version: Optional[str] = Field(default=None, description="Version of the technology")
    justification: str = Field(description="Why this technology was selected")
    alternatives_considered: List[str] = Field(description="Alternative technologies that were considered")
    learning_curve: str = Field(description="Estimated learning curve (Low, Medium, High)")
    community_support: str = Field(description="Level of community support")
    documentation_quality: str = Field(description="Quality of documentation")

class DatabaseSchema(BaseModel):
    """Database schema design with tables and relationships."""
    name: str = Field(description="Name of the table or collection")
    type: str = Field(description="Type of database object (table, collection, etc.)")
    fields: List[Dict[str, Any]] = Field(description="Fields/columns in this table")
    relationships: List[Dict[str, str]] = Field(default=[], description="Relationships with other tables")
    indexes: List[str] = Field(default=[], description="Recommended indexes")
    constraints: List[str] = Field(default=[], description="Constraints on this table")
    description: str = Field(description="Purpose of this table")

class APIEndpoint(BaseModel):
    """API endpoint definition with path, method, and parameters."""
    path: str = Field(description="The endpoint path")
    method: str = Field(description="HTTP method (GET, POST, PUT, DELETE, etc.)")
    description: str = Field(description="Description of what the endpoint does")
    request_body: Optional[Dict[str, Any]] = Field(default=None, description="Request body structure")
    response_structure: Dict[str, Any] = Field(description="Response structure")
    auth_required: bool = Field(description="Whether authentication is required")
    related_features: List[str] = Field(description="Features this endpoint supports")

class DeploymentStrategy(BaseModel):
    """Deployment strategy for the application."""
    recommended_approach: str = Field(description="Recommended deployment approach")
    infrastructure: str = Field(description="Infrastructure recommendations")
    ci_cd_pipeline: Dict[str, str] = Field(description="CI/CD pipeline recommendations")
    scaling_strategy: str = Field(description="How the application should scale")
    estimated_costs: str = Field(description="Estimated costs for different components")
    monitoring_tools: List[str] = Field(description="Recommended monitoring tools")
    backup_strategy: str = Field(description="Backup and disaster recovery strategy")

class SecurityConsiderations(BaseModel):
    """Security considerations for the application."""
    authentication_method: str = Field(description="Recommended authentication method")
    authorization_approach: str = Field(description="Recommended authorization approach")
    data_encryption: Dict[str, str] = Field(description="Data encryption recommendations")
    security_best_practices: List[str] = Field(description="Security best practices to follow")
    compliance_considerations: List[str] = Field(description="Compliance considerations")
    security_testing: List[str] = Field(description="Security testing recommendations")

class TechnicalBlueprint(BaseModel):
    """Complete technical blueprint for the application."""
    startup_idea: str = Field(description="The startup idea")
    tech_stack: Dict[str, List[TechStackComponent]] = Field(description="Recommended technology stack by category")
    database_schema: List[DatabaseSchema] = Field(description="Database schema design")
    api_endpoints: List[APIEndpoint] = Field(description="API endpoints")
    deployment_strategy: DeploymentStrategy = Field(description="Deployment strategy")
    security_considerations: SecurityConsiderations = Field(description="Security considerations")
    third_party_services: Dict[str, List[Dict[str, str]]] = Field(description="Recommended third-party services")
    development_tools: List[Dict[str, str]] = Field(description="Recommended development tools")
    implementation_roadmap: List[Dict[str, Any]] = Field(description="Implementation roadmap")
    architecture_diagram: str = Field(description="Mermaid.js diagram code for system architecture visualization")

class TechnicalArchitectAgent:
    """Technical Architect agent that generates a technical blueprint based on a product roadmap."""
    
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.model = "gpt-4o-mini"  # Using the same model as the other agents
    
    def recommend_tech_stack(self, product_roadmap: ProductRoadmap) -> Dict[str, List[TechStackComponent]]:
        """Recommend a technology stack based on the product roadmap."""
        try:
            prompt = f"""
            As a Technical Architect, recommend a technology stack for the following startup idea:
            
            Startup Idea: {product_roadmap.startup_idea}
            
            MVP Features:
            {', '.join(product_roadmap.mvp_features)}
            
            Consider:
            1. The nature of the application
            2. Scalability requirements
            3. Time to market
            4. Development team expertise (assume a small team)
            5. Cost constraints
            
            Provide recommendations for the following categories:
            - Frontend
            - Backend
            - Database
            - DevOps/Infrastructure
            - Mobile (if applicable)
            
            For each technology, include:
            - Name
            - Version
            - Justification
            - Alternatives considered
            - Learning curve (Low, Medium, High)
            - Community support
            - Documentation quality
            
            Format as a JSON object with categories as keys and arrays of technology objects as values.
            """
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "system", "content": "You are a Technical Architect specialized in designing technical solutions for startups."},
                          {"role": "user", "content": prompt}],
                max_tokens=2000,
                temperature=0.7
            )
            
            tech_stack_json = extract_json_from_response(response.choices[0].message.content)
            # Apply normalization to ensure all required fields are present
            normalized_tech_stack = normalize_tech_stack_json(tech_stack_json)
            tech_stack = {}
            
            # Convert the JSON to TechStackComponent objects
            for category, technologies in normalized_tech_stack.items():
                tech_stack[category] = [TechStackComponent(**tech) for tech in technologies]
            
            return tech_stack
        except Exception as e:
            print(f"Error recommending tech stack: {e}", flush=True)
            # Return a minimal default tech stack
            return {
                "Frontend": [TechStackComponent(
                    name="React", 
                    version="18.x", 
                    justification="Popular, well-supported framework",
                    alternatives_considered=["Vue.js", "Angular"],
                    learning_curve="Medium",
                    community_support="Excellent",
                    documentation_quality="Excellent"
                )],
                "Backend": [TechStackComponent(
                    name="Node.js/Express", 
                    version="18.x", 
                    justification="Fast development, large ecosystem",
                    alternatives_considered=["Django", "Flask", "Spring Boot"],
                    learning_curve="Low",
                    community_support="Excellent",
                    documentation_quality="Good"
                )],
                "Database": [TechStackComponent(
                    name="PostgreSQL", 
                    version="15.x", 
                    justification="Reliable, feature-rich relational database",
                    alternatives_considered=["MongoDB", "MySQL"],
                    learning_curve="Medium",
                    community_support="Excellent",
                    documentation_quality="Excellent"
                )]
            }
    
    def design_database_schema(self, product_roadmap: ProductRoadmap) -> List[DatabaseSchema]:
        """Design a database schema based on the product roadmap."""
        try:
            prompt = f"""
            As a Technical Architect, design a database schema for the following startup idea:
            
            Startup Idea: {product_roadmap.startup_idea}
            
            MVP Features:
            {', '.join(product_roadmap.mvp_features)}
            
            For each table/collection, provide:
            - Name
            - Type (table, collection, etc.)
            - Fields/columns with data types
            - Relationships with other tables
            - Recommended indexes
            - Constraints
            - Brief description
            
            Format as a JSON array of database objects.
            """
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "system", "content": "You are a Technical Architect specialized in database design."},
                          {"role": "user", "content": prompt}],
                max_tokens=2000,
                temperature=0.7            )
            
            schema_json = extract_json_from_response(response.choices[0].message.content)
            
            # Handle the case where the model returns a wrapper object
            if isinstance(schema_json, dict) and "tables" in schema_json:
                schema_json = schema_json["tables"]
            elif isinstance(schema_json, dict) and "database_schema" in schema_json:
                schema_json = schema_json["database_schema"]

            # Process each table to ensure it matches the expected schema format
            processed_tables = []
            for table in schema_json:
                # Convert fields to list format if it's a dict
                if isinstance(table.get("fields"), dict):
                    fields_list = []
                    for field_name, field_type in table["fields"].items():
                        if isinstance(field_type, str):
                            fields_list.append({"name": field_name, "type": field_type})
                        else:
                            # If field_type is already a dict with details
                            field_dict = {"name": field_name}
                            field_dict.update(field_type)
                            fields_list.append(field_dict)
                    table["fields"] = fields_list

                # Convert relationships to list format if it's a dict
                if isinstance(table.get("relationships"), dict):
                    relationships_list = []
                    for rel_name, rel_type in table["relationships"].items():
                        relationships_list.append({"table": rel_name, "type": rel_type})
                    table["relationships"] = relationships_list                # Convert indexes to list format if it's not already
                if "indexes" in table:
                    if not isinstance(table["indexes"], list):
                        if isinstance(table["indexes"], dict):
                            indexes_list = []
                            for idx_name, idx_info in table["indexes"].items():
                                if isinstance(idx_info, dict):
                                    # Format as a more readable string
                                    index_str = f"{idx_name} on columns {', '.join(idx_info.get('columns', ['unknown']))}"
                                    if 'type' in idx_info:
                                        index_str += f" ({idx_info['type']})"
                                else:
                                    index_str = f"{idx_name}: {idx_info}"
                                indexes_list.append(index_str)
                            table["indexes"] = indexes_list
                        else:
                            table["indexes"] = [str(table["indexes"])]
                    # Convert any non-string items in the list to properly formatted strings
                    formatted_indexes = []
                    for idx in table["indexes"]:
                        if isinstance(idx, str):
                            formatted_indexes.append(idx)
                        elif isinstance(idx, dict):
                            # Convert dict to formatted string
                            idx_name = list(idx.keys())[0] if idx else "index"
                            idx_info = idx[idx_name] if idx_name in idx else idx
                            if isinstance(idx_info, dict):
                                columns = ', '.join(idx_info.get('columns', ['unknown']))
                                idx_type = idx_info.get('type', '')
                                formatted_indexes.append(f"{idx_name} on {columns} {idx_type}")
                            else:
                                formatted_indexes.append(f"{idx_name}: {idx_info}")
                        else:
                            formatted_indexes.append(str(idx))
                    table["indexes"] = formatted_indexes

                # Convert constraints to list format if it's not already
                if "constraints" in table:
                    if not isinstance(table["constraints"], list):
                        if isinstance(table["constraints"], dict):
                            constraints_list = []
                            for const_name, const_info in table["constraints"].items():
                                if isinstance(const_info, dict):
                                    # Format as a more readable string
                                    if 'columns' in const_info:
                                        columns = ', '.join(const_info['columns'])
                                        const_type = const_info.get('type', const_name)
                                        const_str = f"{const_type} on columns {columns}"
                                    else:
                                        const_str = f"{const_name} ({', '.join(str(k) + ': ' + str(v) for k, v in const_info.items())})"
                                else:
                                    const_str = f"{const_name}: {const_info}"
                                constraints_list.append(const_str)
                            table["constraints"] = constraints_list
                        else:
                            table["constraints"] = [str(table["constraints"])]
                    # Convert any non-string items in the list to properly formatted strings
                    formatted_constraints = []
                    for const in table["constraints"]:
                        if isinstance(const, str):
                            formatted_constraints.append(const)
                        elif isinstance(const, dict):
                            # Convert dict to formatted string
                            const_name = list(const.keys())[0] if const else "constraint"
                            const_info = const[const_name] if const_name in const else const
                            if isinstance(const_info, dict):
                                columns = ', '.join(const_info.get('columns', ['unknown']))
                                const_type = const_info.get('type', const_name)
                                formatted_constraints.append(f"{const_type} on {columns}")
                            else:
                                formatted_constraints.append(f"{const_name}: {const_info}")
                        else:
                            formatted_constraints.append(str(const))
                    table["constraints"] = formatted_constraints

                processed_tables.append(table)

            return [DatabaseSchema(**table) for table in processed_tables]
        except Exception as e:
            print(f"Error designing database schema: {e}", flush=True)
            # Return a minimal default database schema
            return [
                DatabaseSchema(
                    name="users",
                    type="table",
                    fields=[
                        {"name": "id", "type": "uuid", "primary_key": True},
                        {"name": "email", "type": "varchar", "unique": True},
                        {"name": "password_hash", "type": "varchar"},
                        {"name": "created_at", "type": "timestamp"}
                    ],
                    description="Stores user account information"
                ),
                DatabaseSchema(
                    name="products",
                    type="table",
                    fields=[
                        {"name": "id", "type": "uuid", "primary_key": True},
                        {"name": "name", "type": "varchar"},
                        {"name": "description", "type": "text"},
                        {"name": "price", "type": "decimal"}
                    ],
                    description="Stores product information"
                )
            ]
    
    def define_api_endpoints(self, product_roadmap: ProductRoadmap) -> List[APIEndpoint]:
        """Define API endpoints based on the product roadmap."""
        try:
            prompt = f"""
            As a Technical Architect, define API endpoints for the following startup idea:
            
            Startup Idea: {product_roadmap.startup_idea}
            
            MVP Features:
            {', '.join(product_roadmap.mvp_features)}
            
            For each endpoint, provide:
            - Path
            - HTTP method
            - Description
            - Request body structure (if applicable)
            - Response structure
            - Whether authentication is required
            - Related features
            
            Format as a JSON array of endpoint objects.
            """
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "system", "content": "You are a Technical Architect specialized in API design."},
                          {"role": "user", "content": prompt}],
                max_tokens=2000,
                temperature=0.7
            )
            
            endpoints_json = extract_json_from_response(response.choices[0].message.content)
            # Apply normalization to ensure all required fields are present
            normalized_endpoints = normalize_api_endpoints(endpoints_json)
            return [APIEndpoint(**endpoint) for endpoint in normalized_endpoints]
        except Exception as e:
            print(f"Error defining API endpoints: {e}", flush=True)
            # Return minimal default API endpoints
            return [
                APIEndpoint(
                    path="/api/auth/login",
                    method="POST",
                    description="User login endpoint",
                    request_body={"email": "string", "password": "string"},
                    response_structure={"token": "string", "user": {"id": "string", "email": "string"}},
                    auth_required=False,
                    related_features=["Authentication"]
                ),
                APIEndpoint(
                    path="/api/users/me",
                    method="GET",
                    description="Get current user profile",
                    response_structure={"id": "string", "email": "string", "name": "string"},                    auth_required=True,
                    related_features=["User Management"]
                )
            ]
    
    def define_deployment_strategy(self, product_roadmap: ProductRoadmap) -> DeploymentStrategy:
        """Define deployment strategy based on the product roadmap."""
        try:
            prompt = f"""
            As a Technical Architect, define a deployment strategy for the following startup idea:
            
            Startup Idea: {product_roadmap.startup_idea}
            
            MVP Features:
            {', '.join(product_roadmap.mvp_features)}
            
            Provide:
            - Recommended deployment approach
            - Infrastructure recommendations
            - CI/CD pipeline recommendations
            - Scaling strategy
            - Estimated costs for different components
            - Recommended monitoring tools
            - Backup and disaster recovery strategy
            
            Format as a JSON object with these properties.
            """
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "system", "content": "You are a Technical Architect specialized in deployment strategies."},
                          {"role": "user", "content": prompt}],
                max_tokens=1500,
                temperature=0.7
            )
            
            deployment_json = extract_json_from_response(response.choices[0].message.content)
            # Apply normalization to ensure all required fields are present
            normalized_deployment = normalize_deployment_strategy(deployment_json)
            
            # Additional conversion to handle edge cases
            if isinstance(normalized_deployment.get("scaling_strategy"), dict):
                strategy_parts = []
                for key, value in normalized_deployment["scaling_strategy"].items():
                    strategy_parts.append(f"{key}: {value}")
                normalized_deployment["scaling_strategy"] = "; ".join(strategy_parts) if strategy_parts else "Auto-scaling based on load"
                
            if isinstance(normalized_deployment.get("estimated_costs"), dict):
                cost_parts = []
                for component, cost in normalized_deployment["estimated_costs"].items():
                    cost_parts.append(f"{component}: {cost}")
                normalized_deployment["estimated_costs"] = "; ".join(cost_parts) if cost_parts else "Infrastructure: $200-400/month; Services: $50-100/month"
            
            return DeploymentStrategy(**normalized_deployment)
        except Exception as e:
            print(f"Error defining deployment strategy: {e}", flush=True)
            # Return default deployment strategy
            return DeploymentStrategy(
                recommended_approach="Containerized deployment on a managed Kubernetes service",
                infrastructure="AWS EKS or GKE",
                ci_cd_pipeline={"CI": "GitHub Actions", "CD": "ArgoCD", "Registry": "Amazon ECR"},
                scaling_strategy="Horizontal pod autoscaling based on CPU and memory usage",
                estimated_costs="Compute: $150-300/month; Storage: $20-50/month; Network: $10-30/month",
                monitoring_tools=["Prometheus", "Grafana", "CloudWatch"],
                backup_strategy="Daily automated snapshots with 7-day retention policy"
            )
    
    def define_security_considerations(self, product_roadmap: ProductRoadmap) -> SecurityConsiderations:
        """Define security considerations based on the product roadmap."""
        try:
            prompt = f"""
            As a Technical Architect, define security considerations for the following startup idea:
            
            Startup Idea: {product_roadmap.startup_idea}
            
            MVP Features:
            {', '.join(product_roadmap.mvp_features)}
            
            Provide:
            - Recommended authentication method
            - Recommended authorization approach
            - Data encryption recommendations
            - Security best practices to follow
            - Compliance considerations
            - Security testing recommendations
            
            Format as a JSON object with these properties.
            """
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "system", "content": "You are a Technical Architect specialized in security."},
                          {"role": "user", "content": prompt}],
                max_tokens=1500,
                temperature=0.7
            )
            
            security_json = extract_json_from_response(response.choices[0].message.content)
            # Apply normalization to ensure all required fields are present
            normalized_security = normalize_security_considerations(security_json)
            return SecurityConsiderations(**normalized_security)
        except Exception as e:
            print(f"Error defining security considerations: {e}", flush=True)
            # Return default security considerations
            return SecurityConsiderations(
                authentication_method="JWT tokens with OAuth 2.0",
                authorization_approach="Role-based access control (RBAC)",
                data_encryption={"at_rest": "AES-256", "in_transit": "TLS 1.3"},
                security_best_practices=[
                    "Input validation",
                    "Sanitize user inputs",
                    "Rate limiting",
                    "Regular security updates"
                ],
                compliance_considerations=["GDPR", "CCPA"],
                security_testing=["Regular penetration testing", "OWASP Top 10 scanning"]
            )
    
    def recommend_third_party_services(self, product_roadmap: ProductRoadmap) -> Dict[str, List[Dict[str, str]]]:
        """Recommend third-party services based on the product roadmap."""
        try:
            prompt = f"""
            As a Technical Architect, recommend third-party services for the following startup idea:
            
            Startup Idea: {product_roadmap.startup_idea}
            
            MVP Features:
            {', '.join(product_roadmap.mvp_features)}
            
            Provide recommendations for categories such as:
            - Payment processing
            - Email services
            - Authentication
            - Analytics
            - Mapping
            - Storage
            - Etc.
            
            For each service, include:
            - Name
            - Description
            - Pricing tier (Free, Freemium, Paid)
            - Integration complexity (Low, Medium, High)
            
            Format as a JSON object with categories as keys and arrays of service objects as values.
            """
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "system", "content": "You are a Technical Architect specialized in third-party services."},
                          {"role": "user", "content": prompt}],
                max_tokens=1500,
                temperature=0.7
            )
            
            services_json = extract_json_from_response(response.choices[0].message.content)
            # Apply normalization to ensure all required fields are present
            normalized_services = normalize_third_party_services(services_json)
            return normalized_services
        except Exception as e:
            print(f"Error recommending third-party services: {e}", flush=True)
            # Return default services
            return {
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
                        "description": "Email delivery service",
                        "pricing_tier": "Freemium",
                        "integration_complexity": "Low"
                    }
                ],
                "Payment": [
                    {
                        "name": "Stripe",
                        "description": "Payment processing platform",
                        "pricing_tier": "Paid (per transaction)",
                        "integration_complexity": "Medium"
                    }
                ]
            }
    
    def recommend_development_tools(self, product_roadmap: ProductRoadmap) -> List[Dict[str, str]]:
        """Recommend development tools based on the product roadmap."""
        try:
            prompt = f"""
            As a Technical Architect, recommend development tools for the following startup idea:
            
            Startup Idea: {product_roadmap.startup_idea}
            
            MVP Features:
            {', '.join(product_roadmap.mvp_features)}
            
            For each tool, include:
            - Name
            - Category (IDE, Testing, Collaboration, etc.)
            - Description
            - Pricing tier (Free, Freemium, Paid)
            
            Format as a JSON array of tool objects.
            """
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "system", "content": "You are a Technical Architect specialized in development tools."},
                          {"role": "user", "content": prompt}],
                max_tokens=1500,
                temperature=0.7
            )
            
            tools_json = extract_json_from_response(response.choices[0].message.content)
            
            # Handle the case where the model returns a wrapper object
            if isinstance(tools_json, dict) and "tools" in tools_json:
                tools_json = tools_json["tools"]
            elif isinstance(tools_json, dict) and "development_tools" in tools_json:
                tools_json = tools_json["development_tools"]
            
            # Ensure each tool has the required fields
            normalized_tools = []
            for tool in tools_json:
                normalized_tool = {
                    "name": tool.get("name", "Unknown"),
                    "category": tool.get("category", "General"),
                    "description": tool.get("description", "No description provided"),
                    "pricing": tool.get("pricing", tool.get("pricing_tier", "Free"))
                }
                normalized_tools.append(normalized_tool)
            
            return normalized_tools
        except Exception as e:
            print(f"Error recommending development tools: {e}", flush=True)
            # Return default development tools
            return [
                {
                    "name": "Visual Studio Code",
                    "category": "IDE",
                    "description": "Lightweight, extensible code editor",
                    "pricing": "Free"
                },
                {
                    "name": "GitHub",
                    "category": "Version Control",
                    "description": "Code hosting and collaboration",
                    "pricing": "Freemium"
                },
                {
                    "name": "Jira",
                    "category": "Project Management",
                    "description": "Issue tracking and project management",
                    "pricing": "Freemium"
                }
            ]
    
    def create_implementation_roadmap(self, product_roadmap: ProductRoadmap) -> List[Dict[str, Any]]:
        """Create an implementation roadmap based on the product roadmap."""
        try:
            prompt = f"""
            As a Technical Architect, create an implementation roadmap for the following startup idea:
            
            Startup Idea: {product_roadmap.startup_idea}
            
            MVP Features:
            {', '.join(product_roadmap.mvp_features)}
              Post-MVP Features (Milestone 1):
            {', '.join(product_roadmap.milestone_1_features)}
            
            Post-MVP Features (Milestone 2):
            {', '.join(product_roadmap.milestone_2_features)}
            
            For each phase, include:
            - Name
            - Description
            - Duration (in weeks)
            - Features to be implemented
            - Technical deliverables
            
            Format as a JSON array of phase objects.
            """
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "system", "content": "You are a Technical Architect specialized in project planning."},
                          {"role": "user", "content": prompt}],
                max_tokens=1500,
                temperature=0.7
            )
            
            roadmap_json = extract_json_from_response(response.choices[0].message.content)
            
            # Handle the case where the model returns a wrapper object
            if isinstance(roadmap_json, dict) and "roadmap" in roadmap_json:
                roadmap_json = roadmap_json["roadmap"]
            elif isinstance(roadmap_json, dict) and "phases" in roadmap_json:
                roadmap_json = roadmap_json["phases"]
            
            return roadmap_json
        except Exception as e:
            print(f"Error creating implementation roadmap: {e}", flush=True)
            # Return default implementation roadmap
            return [
                {
                    "name": "Foundation",
                    "description": "Set up basic infrastructure and project structure",
                    "duration": 2,
                    "features": ["Project setup", "CI/CD pipeline", "Basic authentication"],
                    "technical_deliverables": ["Repository", "Infrastructure as Code", "Authentication system"]
                },
                {
                    "name": "Core MVP Features",
                    "description": "Implement essential features for MVP",
                    "duration": 4,
                    "features": product_roadmap.mvp_features[:3] if len(product_roadmap.mvp_features) > 3 else product_roadmap.mvp_features,
                    "technical_deliverables": ["Database schema", "Backend API", "Frontend components"]
                },                {
                    "name": "MVP Completion",
                    "description": "Complete remaining MVP features and testing",
                    "duration": 3,
                    "features": product_roadmap.mvp_features[3:] if len(product_roadmap.mvp_features) > 3 else ["Testing", "Bug fixes"],
                    "technical_deliverables": ["Complete application", "Test suite", "Deployment"]
                },
                {
                    "name": "Milestone 1",
                    "description": "Implement first set of post-MVP features",
                    "duration": 4,
                    "features": product_roadmap.milestone_1_features[:3] if len(product_roadmap.milestone_1_features) > 3 else product_roadmap.milestone_1_features,
                    "technical_deliverables": ["Feature extensions", "Enhanced UI/UX", "Performance optimizations"]
                },
                {
                    "name": "Milestone 2",
                    "description": "Implement second set of post-MVP features",
                    "duration": 4,                    "features": product_roadmap.milestone_2_features[:3] if len(product_roadmap.milestone_2_features) > 3 else product_roadmap.milestone_2_features,
                    "technical_deliverables": ["Advanced features", "Integrations", "Scalability improvements"]
                }
            ]
    
    def design_architecture_diagram(self, product_roadmap: ProductRoadmap) -> str:
        """Design an architecture diagram based on the product roadmap."""
        try:
            prompt = f"""
            As a Technical Architect, create a system architecture diagram for the following startup idea:
            
            Startup Idea: {product_roadmap.startup_idea}
            
            MVP Features:
            {', '.join(product_roadmap.mvp_features)}
            
            Generate a Mermaid.js diagram that represents the system architecture. The diagram should:
            
            1. Use flowchart LR or TB notation (left-to-right or top-to-bottom)
            2. Include all main components (frontend, backend, databases, third-party services)
            3. Show connections between components with appropriate arrows and labels
            4. Group related components together where appropriate
            5. Include a title and brief descriptions
            
            The output should be ONLY the complete Mermaid.js code that can be directly rendered by a Mermaid renderer.
            Do not include any explanations or markdown code blocks around the Mermaid code.
              Important: Make the diagram clean and professional, avoiding too much detail that would make it cluttered.
            """
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "system", "content": "You are a Technical Architect specialized in system design."},
                          {"role": "user", "content": prompt}],
                max_tokens=1500,
                temperature=0.7
            )
            
            diagram_code = response.choices[0].message.content.strip()
            
            # If the model wrapped the code in markdown code blocks, remove them
            if diagram_code.startswith("```mermaid"):
                diagram_code = diagram_code.replace("```mermaid", "").replace("```", "").strip()
            
            # If it tried to return JSON, extract just the mermaid code
            try:
                diagram_json = json.loads(diagram_code)
                if "architecture_diagram" in diagram_json:
                    diagram_code = diagram_json["architecture_diagram"]
                elif "mermaid" in diagram_json:
                    diagram_code = diagram_json["mermaid"]
                elif "diagram" in diagram_json:
                    diagram_code = diagram_json["diagram"]
            except:
                # Not a JSON response, just use the raw text which should be the Mermaid code
                pass
                  # Ensure the diagram code starts with a valid Mermaid directive
            if not (diagram_code.startswith("graph ") or diagram_code.startswith("flowchart ") or 
                   diagram_code.startswith("sequenceDiagram") or diagram_code.startswith("classDiagram")):
                # Add a default flowchart directive if missing
                diagram_code = "flowchart TB\n" + diagram_code
            
            return diagram_code
        except Exception as e:
            print(f"Error designing architecture diagram: {e}", flush=True)            # Return a default architecture diagram as Mermaid code
            return """flowchart TB
    subgraph Client
        UI[User Interface]
        Mobile[Mobile App]
    end
    
    subgraph Backend
        API[API Gateway]
        Auth[Authentication]
        Logic[Business Logic]
    end
    
    subgraph Database
        DB[(Primary Database)]
        Cache[(Cache)]
    end
    
    UI --> API
    Mobile --> API
    API --> Auth
    API --> Logic
    Logic --> DB
    Logic --> Cache
            
            4. External Integrations:
               - Third-party APIs: For specific functionalities
               - Payment Processor: For handling payments
            
            5. Infrastructure:
               - Cloud Provider: Hosts all components
               - CDN: Delivers static content efficiently
               - Monitoring and Logging: Tracks system performance and issues
            """
    
    def generate_technical_blueprint(self, product_roadmap: ProductRoadmap) -> TechnicalBlueprint:
        """Generate a complete technical blueprint based on the product roadmap."""
        
        tech_stack = self.recommend_tech_stack(product_roadmap)
        database_schema = self.design_database_schema(product_roadmap)
        api_endpoints = self.define_api_endpoints(product_roadmap)
        deployment_strategy = self.define_deployment_strategy(product_roadmap)
        security_considerations = self.define_security_considerations(product_roadmap)
        third_party_services = self.recommend_third_party_services(product_roadmap)
        development_tools = self.recommend_development_tools(product_roadmap)
        implementation_roadmap = self.create_implementation_roadmap(product_roadmap)
        architecture_diagram = self.design_architecture_diagram(product_roadmap)
        
        return TechnicalBlueprint(
            startup_idea=product_roadmap.startup_idea,
            tech_stack=tech_stack,
            database_schema=database_schema,
            api_endpoints=api_endpoints,
            deployment_strategy=deployment_strategy,
            security_considerations=security_considerations,
            third_party_services=third_party_services,
            development_tools=development_tools,
            implementation_roadmap=implementation_roadmap,
            architecture_diagram=architecture_diagram
        )
    
    def _extract_json_from_response(self, text: str) -> Any:
        """
        Helper method to extract JSON from model responses that may include explanatory text.
        
        @deprecated: Use extract_json_from_response from json_helper instead
        """
        return extract_json_from_response(text)
