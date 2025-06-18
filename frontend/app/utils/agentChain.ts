// File: app/utils/agentChain.ts
'use client';

import { generateSessionId } from '../actions/auth';

// Types for the agent responses
export type MarketAnalystResponse = {
  startup_idea: string;
  analysis_date: string;
  executive_summary: string;
  market_sizing: {
    total_addressable_market?: string;
    serviceable_addressable_market?: string;
    serviceable_obtainable_market?: string;
    market_growth_rate?: string;
    geographic_distribution?: Record<string, string>;
  };
  market_trends: {
    emerging_trends: string[];
    technology_trends: string[];
    consumer_behavior: string[];
    regulatory_factors: string[];
  };
  competitors: Array<{
    name: string;
    website?: string;
    description: string;
    features: string[];
    pricing_model?: string;
    pricing_details?: string;
    target_audience?: string;
    strengths: string[];
    weaknesses: string[];
    competitive_score: number;
    market_share?: string;
    funding_info?: string;
    founded_year?: string;
    team_size?: string;
    social_presence?: Record<string, string>;
    user_reviews?: Record<string, string | number>;
  }>;
  competitive_landscape_summary: string;
  market_leaders: string[];
  opportunity_analysis: {
    market_gaps: string[];
    underserved_segments: string[];
    differentiation_opportunities: string[];
    barrier_to_entry: Record<string, string>;
    success_factors: string[];
  };
  opportunity_score: number;
  risk_analysis: {
    market_risks: string[];
    competitive_risks: string[];
    technology_risks: string[];
    regulatory_risks: string[];
    mitigation_strategies: string[];
  };
  target_audience_segments: Array<Record<string, string>>;
  go_to_market_insights: string[];
  strategic_recommendations: string[];
  next_steps: string[];
  user_id: string;
  session_id: string;
};

export type ProductManagerResponse = {
  startup_idea: string;
  user_personas: Array<{
    name: string;
    description: string;
    demographics: Record<string, string>;
    pain_points: string[];
    goals: string[];
    behaviors: string[];
    needs: string[];
    tech_savviness: string;
  }>;
  features: Array<{
    name: string;
    description: string;
    priority: string;
    effort: number;
    impact: number;
    user_stories: string[];
    target_personas: string[];
    technical_complexity: number;
    dependencies: string[];
    metrics: string[];
  }>;
  mvp_features: string[];
  milestone_1_features: string[];
  milestone_2_features: string[];
  validation_experiments: Array<Record<string, string>>;
  success_metrics: Record<string, string>;
  user_id: string;
  session_id: string;
  _market_analyst_data: MarketAnalystResponse; // Store the market analysis data for chaining
};

export type TechArchitectResponse = {
  startup_idea: string;
  tech_stack: Record<string, Array<{
    name: string;
    version?: string;
    justification: string;
    alternatives_considered: string[];
    learning_curve: string;
    community_support: string;
    documentation_quality: string;
  }>>;
  database_schema: Array<{
    name: string;
    type: string;
    fields: Array<Record<string, any>>;
    relationships: Array<Record<string, string>>;
    indexes: string[];
    constraints: string[];
    description: string;
  }>;
  api_endpoints: Array<{
    path: string;
    method: string;
    description: string;
    request_body?: Record<string, any>;
    response_structure: Record<string, any>;
    auth_required: boolean;
    related_features: string[];
  }>;  deployment_strategy: {
    recommended_approach: string;
    infrastructure: string;
    ci_cd_pipeline: Record<string, string>;
    scaling_strategy: string;
    estimated_costs: string | Record<string, string>; // Can be either a string or object
    monitoring_tools: string[];
    backup_strategy: string;
  };
  security_considerations: {
    authentication_method: string;
    authorization_approach: string;
    data_encryption: Record<string, string>;
    security_best_practices: string[];
    compliance_considerations: string[];
    security_testing: string[];
  };
  third_party_services: Record<string, Array<Record<string, string>>>;
  development_tools: Array<Record<string, string>>;
  implementation_roadmap: Array<Record<string, any>>;
  architecture_diagram: string;
  user_id: string;
  session_id: string;
};

export async function runMarketAnalysisAgent(startupIdea: string) {
  // Get authentication info and session ID using the server action
  const { userId, sessionId } = await generateSessionId();
  
  // Call the market analyst API
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/market-analyst`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startup_idea: startupIdea,
      user_id: userId,
      session_id: sessionId,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return await response.json() as MarketAnalystResponse;
}

export async function runProductManagerAgent(marketAnalysis: MarketAnalystResponse) {
  // Call the product manager API
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product-manager`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      market_report: marketAnalysis,
      user_id: marketAnalysis.user_id,
      session_id: marketAnalysis.session_id,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  const productManagerResponse = await response.json();
  
  // Store the market analysis data in the response for chaining
  return {
    ...productManagerResponse,
    _market_analyst_data: marketAnalysis
  } as ProductManagerResponse;
}

export async function runTechArchitectAgent(productRoadmap: ProductManagerResponse) {
  // Call the technical architect API
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/technical-architect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_roadmap: productRoadmap,
      user_id: productRoadmap.user_id,
      session_id: productRoadmap.session_id,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return await response.json() as TechArchitectResponse;
}

export async function runFullAgentChain(startupIdea: string) {
  // Step 1: Run market analysis
  const marketAnalysis = await runMarketAnalysisAgent(startupIdea);
  
  // Step 2: Run product manager
  const productRoadmap = await runProductManagerAgent(marketAnalysis);
  
  // Step 3: Run technical architect
  const techBlueprint = await runTechArchitectAgent(productRoadmap);
  
  return {
    marketAnalysis,
    productRoadmap,
    techBlueprint,
  };
}
