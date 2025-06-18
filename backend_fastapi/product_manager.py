from openai import OpenAI
import os
import json
from typing import List, Dict, Optional, Union, Any
from pydantic import BaseModel, Field
from datetime import datetime
from dotenv import load_dotenv

# Import the EnhancedMarketAnalysisReport model from market_agent
from market_agent import EnhancedMarketAnalysisReport

# Load environment variables
load_dotenv()

class UserPersona(BaseModel):
    name: str = Field(description="Name of the user persona")
    description: str = Field(description="Brief description of the persona")
    demographics: Dict[str, str] = Field(description="Demographic information like age, gender, occupation")
    pain_points: List[str] = Field(description="Key pain points and challenges faced by this persona")
    goals: List[str] = Field(description="Primary goals and objectives of this persona")
    behaviors: List[str] = Field(description="Key behaviors and preferences")
    needs: List[str] = Field(description="Specific needs that the product should address")
    tech_savviness: str = Field(description="Level of technical expertise (Low, Medium, High)")

class Feature(BaseModel):
    name: str = Field(description="Name of the feature")
    description: str = Field(description="Detailed description of the feature")
    priority: str = Field(description="Priority level (HIGH, MEDIUM, LOW)")
    effort: int = Field(description="Estimated effort to implement (1-10 scale)")
    impact: int = Field(description="Estimated impact on users (1-10 scale)")
    user_stories: List[str] = Field(description="User stories associated with this feature")
    target_personas: List[str] = Field(description="Names of user personas this feature targets")
    technical_complexity: int = Field(description="Technical complexity (1-10 scale)")
    dependencies: List[str] = Field(default=[], description="Dependencies on other features")
    metrics: List[str] = Field(description="Metrics to measure success of this feature")

class ProductRoadmap(BaseModel):
    startup_idea: str = Field(description="The startup idea being analyzed")
    user_personas: List[UserPersona] = Field(description="Detailed user personas")
    features: List[Feature] = Field(description="Complete list of features with prioritization")
    mvp_features: List[str] = Field(description="List of feature names that are part of the MVP")
    milestone_1_features: List[str] = Field(default=[], description="Features planned for the first milestone after MVP")
    milestone_2_features: List[str] = Field(default=[], description="Features planned for the second milestone")
    validation_experiments: List[Dict[str, str]] = Field(description="Experiments to validate key assumptions")
    success_metrics: Dict[str, str] = Field(description="Key metrics to measure product success")

class ProductManagerAgent:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.model = "gpt-4o-mini"  # Using the same model as the market analysis agent
    
    def generate_user_personas(self, market_report: EnhancedMarketAnalysisReport) -> List[UserPersona]:
        """Generate detailed user personas based on market analysis"""
        print("👤 Generating user personas based on market analysis...", flush=True)
        
        # Extract relevant information from market report
        target_segments = market_report.target_audience_segments
        market_gaps = market_report.opportunity_analysis.market_gaps
        underserved_segments = market_report.opportunity_analysis.underserved_segments
        consumer_behavior = market_report.market_trends.consumer_behavior
        
        # Create personas template to match the expected structure
        personas_template = {
            "personas": [
                {
                    "name": "Name",
                    "description": "Description",
                    "demographics": {"age": "range", "gender": "distribution", "occupation": "typical jobs"},
                    "pain_points": ["pain point 1", "pain point 2"],
                    "goals": ["goal 1", "goal 2"],
                    "behaviors": ["behavior 1", "behavior 2"],
                    "needs": ["need 1", "need 2"],
                    "tech_savviness": "High/Medium/Low"
                }
            ]
        }
        
        persona_prompt = f"""
        You are a product manager specializing in user persona creation. Based on the market analysis data provided, 
        create 3-5 detailed user personas for a startup with the idea: {market_report.startup_idea}.
        
        Ensure each persona is distinct and represents a different target audience segment.
        
        MARKET ANALYSIS DATA:
        - Target Audience Segments: {json.dumps(target_segments)}
        - Market Gaps: {json.dumps(market_gaps)}
        - Underserved Segments: {json.dumps(underserved_segments)}
        - Consumer Behavior: {json.dumps(consumer_behavior)}
        - Competitive Landscape: {market_report.competitive_landscape_summary}
        
        Generate your response as a JSON object that EXACTLY matches this structure:
        {json.dumps(personas_template, indent=2)}
        
        The personas should be realistic, detailed, and directly relevant to the startup idea.
        Ensure diversity in the personas to cover different age groups, technical abilities, and needs.
        """
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                response_format={"type": "json_object"},
                messages=[
                    {"role": "system", "content": "You are a product manager expert who creates detailed user personas based on market analysis."},
                    {"role": "user", "content": persona_prompt}
                ],
                temperature=0.5,
                max_tokens=3000
            )
            
            result = json.loads(response.choices[0].message.content)
            personas = [UserPersona(**persona) for persona in result["personas"]]
            return personas
            
        except Exception as e:
            print(f"Error generating personas: {str(e, flush=True)}", flush=True)
            # Create a fallback persona if API fails
            return [UserPersona(
                name="Primary User",
                description=f"Primary user of {market_report.startup_idea}",
                demographics={"age": "25-45", "gender": "All", "occupation": "Various"},
                pain_points=[gap[:100] for gap in market_report.opportunity_analysis.market_gaps[:2]],
                goals=["Solve main problem", "Improve efficiency"],
                behaviors=["Mobile-first", "Values simplicity"],
                needs=["Ease of use", "Reliable solution"],
                tech_savviness="Medium"
            )]
    
    def generate_features(self, market_report: EnhancedMarketAnalysisReport, personas: List[UserPersona]) -> List[Feature]:
        """Generate feature list based on market analysis and user personas"""
        print("✨ Generating product features...", flush=True)
        
        # Extract competitor features for inspiration
        competitor_features = []
        for competitor in market_report.competitors[:3]:
            for feature in competitor.features[:3]:
                competitor_features.append({
                    "competitor": competitor.name,
                    "feature": feature
                })
        
        # Template for features to ensure proper structure
        features_template = {
            "features": [
                {
                    "name": "Feature Name",
                    "description": "Detailed description",
                    "priority": "HIGH/MEDIUM/LOW",
                    "effort": 5, # 1-10 scale
                    "impact": 8, # 1-10 scale
                    "user_stories": ["As a user, I want to..."],
                    "target_personas": ["Persona Name"],
                    "technical_complexity": 6, # 1-10 scale
                    "dependencies": ["Another Feature"],
                    "metrics": ["Metric to measure success"]
                }
            ]
        }
        
        # Extract persona information for the prompt
        persona_summaries = []
        for persona in personas:
            persona_summaries.append({
                "name": persona.name,
                "pain_points": persona.pain_points,
                "goals": persona.goals,
                "needs": persona.needs
            })
        
        features_prompt = f"""
        You are a product manager tasked with generating a comprehensive feature list for a new product.
        
        STARTUP IDEA: {market_report.startup_idea}
        
        USER PERSONAS:
        {json.dumps(persona_summaries, indent=2)}
        
        COMPETITOR FEATURES (for inspiration):
        {json.dumps(competitor_features, indent=2)}
        
        MARKET GAPS:
        {json.dumps(market_report.opportunity_analysis.market_gaps, indent=2)}
        
        DIFFERENTIATION OPPORTUNITIES:
        {json.dumps(market_report.opportunity_analysis.differentiation_opportunities, indent=2)}
        
        Generate 10-15 well-defined features for this product that address the personas' needs and pain points.
        Each feature should be assigned to at least one persona.
        Prioritize features that address key market gaps and differentiation opportunities.
        Include both basic features needed for the product category AND innovative features that would differentiate the product.
        
        Generate your response as a JSON object that EXACTLY matches this structure:
        {json.dumps(features_template, indent=2)}
        
        Ensure each feature has:
        1. A clear, concise name
        2. A detailed description
        3. Reasonable effort and impact scores
        4. At least one user story
        5. The names of target personas (must match the exact names you were provided)
        6. Relevant success metrics
        """
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                response_format={"type": "json_object"},
                messages=[
                    {"role": "system", "content": "You are a product manager expert who creates comprehensive feature lists based on user personas and market analysis."},
                    {"role": "user", "content": features_prompt}
                ],
                temperature=0.5,
                max_tokens=4000
            )
            
            result = json.loads(response.choices[0].message.content)
            features = [Feature(**feature) for feature in result["features"]]
            return features
            
        except Exception as e:
            print(f"Error generating features: {str(e, flush=True)}", flush=True)
            # Create fallback features
            return [Feature(
                name="Core Functionality",
                description="The main functionality of the product",
                priority="HIGH",
                effort=5,
                impact=8,
                user_stories=["As a user, I want to solve my main problem"],
                target_personas=[personas[0].name if personas else "Primary User"],
                technical_complexity=5,
                dependencies=[],
                metrics=["User Adoption"]
            )]
    
    def prioritize_features(self, features: List[Feature], personas: List[UserPersona]) -> Dict:
        """Prioritize features using an impact/effort framework"""
        print("📊 Prioritizing features...", flush=True)
        
        # Score each feature based on impact/effort ratio and other factors
        scored_features = []
        
        for feature in features:
            # Calculate base score using impact/effort ratio
            base_score = feature.impact / feature.effort if feature.effort > 0 else feature.impact
            
            # Apply weights to different personas (could be enhanced with persona importance weighting)
            persona_count = len(feature.target_personas)
            persona_weight = min(persona_count / len(personas), 1) if personas else 0.5
            
            # Adjust for technical complexity
            complexity_factor = 1 - (feature.technical_complexity / 20)  # Higher complexity reduces score a bit
            
            # Calculate final score
            final_score = base_score * (1 + persona_weight) * complexity_factor
            
            scored_features.append({
                "feature": feature,
                "score": final_score,
                "impact_effort_ratio": feature.impact / feature.effort if feature.effort > 0 else 0
            })
        
        # Sort features by score
        scored_features.sort(key=lambda x: x["score"], reverse=True)
        
        # Categorize features into MVP and future milestones
        mvp_threshold = len(scored_features) // 3  # Top third goes to MVP
        if mvp_threshold < 3 and len(scored_features) > 3:  # Ensure at least 3 features in MVP if available
            mvp_threshold = 3
            
        mvp_features = [sf["feature"].name for sf in scored_features[:mvp_threshold]]
        milestone_1_features = [sf["feature"].name for sf in scored_features[mvp_threshold:mvp_threshold*2]]
        milestone_2_features = [sf["feature"].name for sf in scored_features[mvp_threshold*2:]]
        
        # Create priority matrix (HIGH/MEDIUM/LOW in each quadrant)
        priority_matrix = {
            "high_impact_low_effort": [],
            "high_impact_high_effort": [],
            "low_impact_low_effort": [],
            "low_impact_high_effort": []
        }
        
        for feature in features:
            # Define thresholds (can be adjusted)
            high_impact = feature.impact >= 7
            high_effort = feature.effort >= 6
            
            if high_impact and not high_effort:
                priority_matrix["high_impact_low_effort"].append(feature.name)
            elif high_impact and high_effort:
                priority_matrix["high_impact_high_effort"].append(feature.name)
            elif not high_impact and not high_effort:
                priority_matrix["low_impact_low_effort"].append(feature.name)
            else:
                priority_matrix["low_impact_high_effort"].append(feature.name)
        
        return {
            "scored_features": scored_features,
            "mvp_features": mvp_features,
            "milestone_1_features": milestone_1_features,
            "milestone_2_features": milestone_2_features,
            "priority_matrix": priority_matrix
        }
    
    def generate_validation_experiments(self, personas: List[UserPersona], mvp_features: List[str]) -> List[Dict[str, str]]:
        """Generate experiments to validate key assumptions"""
        experiments = []
        
        # For each persona, create a validation experiment
        for persona in personas:
            experiments.append({
                "name": f"Validate {persona.name} Needs",
                "description": f"Conduct user interviews with {persona.name} persona to validate their pain points and needs",
                "method": "User Interviews",
                "success_criteria": "Confirm at least 3 pain points with 80% of interviewees"
            })
        
        # For key MVP features, create validation experiments
        for feature_name in mvp_features[:3]:  # Focus on top 3 MVP features
            experiments.append({
                "name": f"Validate {feature_name}",
                "description": f"Create a prototype of {feature_name} and test with target users",
                "method": "Usability Testing",
                "success_criteria": "80% of users can complete the core task without assistance"
            })
        
        return experiments
    
    def create_product_roadmap(self, market_report: EnhancedMarketAnalysisReport) -> ProductRoadmap:
        """Create complete product roadmap based on market analysis"""
        print(f"🗺️ Creating product roadmap for: {market_report.startup_idea}", flush=True)
        print("=" * 80, flush=True)
        
        # Step 1: Generate user personas
        personas = self.generate_user_personas(market_report)
        
        # Step 2: Generate features based on personas and market analysis
        features = self.generate_features(market_report, personas)
        
        # Step 3: Prioritize features
        prioritization = self.prioritize_features(features, personas)
        
        # Step 4: Generate validation experiments
        validation_experiments = self.generate_validation_experiments(personas, prioritization["mvp_features"])
        
        # Step 5: Define success metrics
        success_metrics = {
            "user_acquisition": "Number of new users per month",
            "user_retention": "Percentage of users active after 30 days",
            "user_engagement": "Average time spent in app per week",
            "revenue": "Monthly recurring revenue",
            "user_satisfaction": "Net Promoter Score"
        }
        
        # Create the product roadmap
        roadmap = ProductRoadmap(
            startup_idea=market_report.startup_idea,
            user_personas=personas,
            features=features,
            mvp_features=prioritization["mvp_features"],
            milestone_1_features=prioritization["milestone_1_features"],
            milestone_2_features=prioritization["milestone_2_features"],
            validation_experiments=validation_experiments,
            success_metrics=success_metrics
        )
        
        return roadmap

def run_product_planning(market_analysis_result: EnhancedMarketAnalysisReport) -> ProductRoadmap:
    """Run the complete product planning process"""
    agent = ProductManagerAgent()
    try:
        roadmap = agent.create_product_roadmap(market_analysis_result)
        return roadmap
        
    except Exception as e:
        print(f"❌ Error during product planning: {str(e, flush=True)}", flush=True)
        return None
