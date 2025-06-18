# Fix validation errors in the tech architect response

from tech_architect_updated import TechnicalArchitectAgent, TechnicalBlueprint, DatabaseSchema, DeploymentStrategy
from product_manager import ProductRoadmap
import json

def load_sample_product_roadmap():
    """Load a sample product roadmap for testing."""
    return ProductRoadmap(
        startup_idea="A marketplace for homemade crafts",
        mvp_features=["User authentication", "Product listings", "Shopping cart"],
        milestone_1_features=["User profiles", "Reviews", "Messaging"],
        milestone_2_features=["Advanced search", "Recommendations", "Mobile app"],
        user_personas=[
            {
                "name": "Crafty Creator",
                "description": "People who create handmade items",
                "demographics": {"age": "25-55", "gender": "Any", "occupation": "Various"},
                "pain_points": ["Difficulty finding customers"],
                "goals": ["Sell handmade items"],
                "behaviors": ["Creates unique handmade items regularly"],
                "needs": ["Platform to showcase work"],
                "tech_savviness": "Medium"
            }
        ],
        features=[
            {
                "name": "User authentication",
                "description": "Allows users to register and login",
                "priority": "HIGH",
                "effort": 5,
                "impact": 8,
                "user_stories": ["As a user, I want to create an account"],
                "target_personas": ["Crafty Creator"],
                "technical_complexity": 4,
                "metrics": ["User registration rate"]
            }
        ],
        validation_experiments=[
            {
                "name": "User signup test",
                "description": "Test if users will sign up for the platform"
            }
        ],
        success_metrics={"user_acquisition": "Number of new users per week"}
    )

def fix_deployment_strategy_conversion(tech_architect_agent):
    """Apply fixes to ensure deployment strategy fields are properly converted."""
    product_roadmap = load_sample_product_roadmap()
    
    # Generate a deployment strategy
    deployment_strategy = tech_architect_agent.define_deployment_strategy(product_roadmap)
    
    # Verify the data types
    assert isinstance(deployment_strategy.scaling_strategy, str), f"scaling_strategy should be string but is {type(deployment_strategy.scaling_strategy)}"
    assert isinstance(deployment_strategy.estimated_costs, str), f"estimated_costs should be string but is {type(deployment_strategy.estimated_costs)}"
    
    print("✅ Deployment strategy conversion is working correctly")
    print(f"   - scaling_strategy (type: {type(deployment_strategy.scaling_strategy).__name__})")
    print(f"   - estimated_costs (type: {type(deployment_strategy.estimated_costs).__name__})")

def fix_database_schema_conversion(tech_architect_agent):
    """Apply fixes to ensure database schema fields are properly converted."""
    product_roadmap = load_sample_product_roadmap()
    
    # Generate a database schema
    database_schema = tech_architect_agent.design_database_schema(product_roadmap)
    
    # Check each table for proper data types
    for table in database_schema:
        # Check indexes
        assert isinstance(table.indexes, list), f"indexes should be list but is {type(table.indexes)}"
        for idx in table.indexes:
            assert isinstance(idx, str), f"each index should be string but found {type(idx)}"
        
        # Check constraints
        assert isinstance(table.constraints, list), f"constraints should be list but is {type(table.constraints)}"
        for const in table.constraints:
            assert isinstance(const, str), f"each constraint should be string but found {type(const)}"
    
    print("✅ Database schema conversion is working correctly")
    print(f"   - Found {len(database_schema)} tables")
    if database_schema:
        print(f"   - Sample table: {database_schema[0].name}")
        print(f"   - Sample indexes: {database_schema[0].indexes[:2]}")
        print(f"   - Sample constraints: {database_schema[0].constraints[:2]}")

def generate_and_validate_technical_blueprint():
    """Generate a complete technical blueprint and validate all fields."""
    product_roadmap = load_sample_product_roadmap()
    tech_architect = TechnicalArchitectAgent()
    
    print("🔄 Generating technical blueprint...")
    blueprint = tech_architect.generate_technical_blueprint(product_roadmap)
    
    # Validate blueprint can be converted to JSON without errors
    try:
        blueprint_json = json.loads(blueprint.json())
        print("✅ Blueprint successfully converted to JSON")
        
        # Check specific fields that had validation issues
        assert isinstance(blueprint_json["deployment_strategy"]["scaling_strategy"], str)
        assert isinstance(blueprint_json["deployment_strategy"]["estimated_costs"], str)
        
        for table in blueprint_json["database_schema"]:
            assert isinstance(table["indexes"], list)
            for idx in table["indexes"]:
                assert isinstance(idx, str)
                
            assert isinstance(table["constraints"], list)
            for const in table["constraints"]:
                assert isinstance(const, str)
                
        print("✅ All previously problematic fields now have correct types")
        
    except Exception as e:
        print(f"❌ Error during JSON validation: {e}")
        raise

def main():
    """Main function to execute validation fixes."""
    tech_architect = TechnicalArchitectAgent()
    
    print("🔧 Applying fixes to tech architect validation issues...")
    print("\n1. Fixing deployment strategy conversion")
    fix_deployment_strategy_conversion(tech_architect)
    
    print("\n2. Fixing database schema conversion")
    fix_database_schema_conversion(tech_architect)
    
    print("\n3. Validating complete technical blueprint")
    generate_and_validate_technical_blueprint()
    
    print("\n✅ All validation issues have been fixed.")

if __name__ == "__main__":
    main()
