from openai import OpenAI
import os
import requests
import json
import re
from bs4 import BeautifulSoup
import time
from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Union, Any, Tuple
from dotenv import load_dotenv
from datetime import datetime
import urllib.parse

# Load environment variables
load_dotenv()

class CompetitorInfo(BaseModel):
    name: str = Field(description="Name of the competitor company")
    website: Optional[str] = Field(default=None, description="URL of the competitor's website")
    description: str = Field(description="Brief description of the competitor")
    features: List[str] = Field(description="List of key features offered by the competitor")
    pricing_model: Optional[str] = Field(default=None, description="Pricing model (freemium, subscription, one-time, etc.)")
    pricing_details: Optional[str] = Field(default=None, description="Detailed pricing information")
    target_audience: Optional[str] = Field(default=None, description="Primary target audience")
    strengths: List[str] = Field(description="Key strengths of the competitor")
    weaknesses: List[str] = Field(description="Identified weaknesses or gaps")
    competitive_score: float = Field(description="Overall competitive threat score (1-10)")
    market_share: Optional[str] = Field(default=None, description="Market share information if available")
    funding_info: Optional[str] = Field(default=None, description="Funding rounds or financial information")
    founded_year: Optional[str] = Field(default=None, description="Year the company was founded")
    team_size: Optional[str] = Field(default=None, description="Estimated team size")
    social_presence: Optional[Dict[str, str]] = Field(default=None, description="Social media following metrics")
    user_reviews: Optional[Dict[str, Union[str, float]]] = Field(default=None, description="User review scores and feedback")

class MarketTrends(BaseModel):
    emerging_trends: List[str] = Field(description="Current and emerging market trends")
    technology_trends: List[str] = Field(description="Relevant technology trends")
    consumer_behavior: List[str] = Field(description="Key consumer behavior patterns")
    regulatory_factors: List[str] = Field(description="Regulatory considerations")

class MarketSizing(BaseModel):
    total_addressable_market: Optional[str] = Field(default=None, description="TAM - Total Addressable Market")
    serviceable_addressable_market: Optional[str] = Field(default=None, description="SAM - Serviceable Addressable Market")
    serviceable_obtainable_market: Optional[str] = Field(default=None, description="SOM - Serviceable Obtainable Market")
    market_growth_rate: Optional[str] = Field(default=None, description="Annual market growth rate")
    geographic_distribution: Optional[Dict[str, str]] = Field(default=None, description="Market size by geography")

class OpportunityAnalysis(BaseModel):
    market_gaps: List[str] = Field(description="Identified gaps in the market")
    underserved_segments: List[str] = Field(description="Underserved customer segments")
    differentiation_opportunities: List[str] = Field(description="Potential differentiation strategies")
    barrier_to_entry: Dict[str, str] = Field(description="Analysis of barriers to entry")
    success_factors: List[str] = Field(description="Critical success factors for the market")

class RiskAnalysis(BaseModel):
    market_risks: List[str] = Field(description="Market-related risks")
    competitive_risks: List[str] = Field(description="Competition-related risks")
    technology_risks: List[str] = Field(description="Technology-related risks")
    regulatory_risks: List[str] = Field(description="Regulatory and compliance risks")
    mitigation_strategies: List[str] = Field(description="Risk mitigation strategies")

class EnhancedMarketAnalysisReport(BaseModel):
    startup_idea: str = Field(description="The startup idea being analyzed")
    analysis_date: str = Field(description="Date of analysis")
    executive_summary: str = Field(description="Executive summary of findings")
    
    # Market Analysis
    market_sizing: MarketSizing = Field(description="Market size analysis")
    market_trends: MarketTrends = Field(description="Market trends analysis")
    
    # Competitive Analysis
    competitors: List[CompetitorInfo] = Field(description="Detailed competitor analysis")
    competitive_landscape_summary: str = Field(description="Overall competitive landscape summary")
    market_leaders: List[str] = Field(description="Top 3-5 market leaders")
    
    # Opportunity Analysis
    opportunity_analysis: OpportunityAnalysis = Field(description="Market opportunity analysis")
    opportunity_score: float = Field(description="Overall opportunity score (1-10)")
    
    # Risk Analysis
    risk_analysis: RiskAnalysis = Field(description="Risk analysis")
    
    # Strategic Insights
    target_audience_segments: List[Dict[str, str]] = Field(description="Detailed target audience segments")
    go_to_market_insights: List[str] = Field(description="Go-to-market strategy insights")
    strategic_recommendations: List[str] = Field(description="Strategic recommendations")
    next_steps: List[str] = Field(description="Recommended next steps for validation")

class EnhancedMarketResearchAgent:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.model = "gpt-4o-mini"
        
    def google_search(self, query: str, num_results: int = 10) -> List[Dict]:
        """Enhanced Google search with better error handling"""
        api_key = os.getenv("GOOGLE_SEARCH_API_KEY")
        cx = "067d494017eff402d"
        
        url = f"https://www.googleapis.com/customsearch/v1?key={api_key}&cx={cx}&q={query}&num={num_results}"
        
        try:
            response = requests.get(url)
            data = response.json()
            
            if 'items' not in data:
                print(f"No results found for query: {query}", flush=True)
                return []
                
            results = []
            for item in data['items']:
                results.append({
                    'title': item.get('title', ''),
                    'link': item.get('link', ''),
                    'snippet': item.get('snippet', ''),
                    'displayLink': item.get('displayLink', '')
                })
            return results
        except Exception as e:
            print(f"Search error for '{query}': {str(e, flush=True)}", flush=True)
            return []

    def enhanced_scrape_website(self, url: str) -> Dict:
        """Enhanced web scraping with more data extraction"""
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            response = requests.get(url, headers=headers, timeout=15)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Remove script and style elements
            for script in soup(['script', 'style', 'nav', 'footer']):
                script.extract()
            
            # Extract title and description
            title = soup.title.string if soup.title else "No title found"
            meta_desc = ""
            meta_tag = soup.find('meta', attrs={'name': 'description'})
            if meta_tag:
                meta_desc = meta_tag.get('content', '')
            
            # Extract main content
            text = soup.get_text(separator=' ', strip=True)
            text = re.sub(r'\s+', ' ', text)
            
            # Extract pricing information (enhanced)
            pricing_info = self._extract_pricing_info(soup, text)
            
            # Extract features (enhanced)
            features = self._extract_features(soup, text)
            
            # Extract contact/about information
            about_info = self._extract_about_info(soup, text)
            
            # Try to find social media links
            social_links = self._extract_social_links(soup)
            
            return {
                'title': title,
                'url': url,
                'meta_description': meta_desc,
                'text_sample': text[:1000],
                'features': features,
                'pricing_info': pricing_info,
                'about_info': about_info,
                'social_links': social_links,
                'content_length': len(text)
            }
            
        except Exception as e:
            print(f"Scraping error for {url}: {str(e, flush=True)}", flush=True)
            return {'url': url, 'error': str(e)}

    def _extract_pricing_info(self, soup, text):
        """Extract detailed pricing information"""
        pricing_keywords = ['pricing', 'price', 'subscription', 'plan', 'cost', 'free', 'trial', 'premium', 'basic', 'pro', 'enterprise']
        pricing_sections = []
        
        # Look for pricing tables or sections
        pricing_containers = soup.find_all(['div', 'section'], class_=lambda c: c and any(keyword in c.lower() for keyword in pricing_keywords))
        
        for container in pricing_containers:
            pricing_sections.append(container.get_text(strip=True)[:200])
        
        # Look for price patterns in text
        price_patterns = re.findall(r'\$\d+(?:\.\d{2})?(?:/month|/year|/mo|/yr)?', text)
        
        return {
            'price_mentions': price_patterns[:10],
            'pricing_sections': pricing_sections[:3]
        }

    def _extract_features(self, soup, text):
        """Extract comprehensive feature information"""
        features = []
        
        # Look for feature lists
        feature_containers = soup.find_all(['ul', 'ol'], class_=lambda c: c and any(keyword in c.lower() for keyword in ['feature', 'benefit', 'capability', 'service']))
        
        for container in feature_containers:
            for item in container.find_all('li'):
                feature_text = item.get_text(strip=True)
                if 10 < len(feature_text) < 150:  # Filter reasonable length features
                    features.append(feature_text)
        
        # Look for headings that might indicate features
        headings = soup.find_all(['h1', 'h2', 'h3', 'h4'])
        for heading in headings:
            heading_text = heading.get_text(strip=True)
            if any(keyword in heading_text.lower() for keyword in ['feature', 'benefit', 'capability', 'service', 'solution']):
                # Get the next sibling content
                next_content = heading.find_next(['p', 'div', 'ul'])
                if next_content:
                    features.append(f"{heading_text}: {next_content.get_text(strip=True)[:100]}")
        
        return features[:15]  # Limit to 15 features

    def _extract_about_info(self, soup, text):
        """Extract company about information"""
        about_keywords = ['about', 'company', 'founded', 'team', 'mission', 'vision']
        about_info = {}
        
        # Look for about sections
        about_sections = soup.find_all(['div', 'section'], class_=lambda c: c and any(keyword in c.lower() for keyword in about_keywords))
        
        if about_sections:
            about_info['about_text'] = about_sections[0].get_text(strip=True)[:300]
        
        # Look for founding year
        year_match = re.search(r'founded.*?(\d{4})|since.*?(\d{4})|established.*?(\d{4})', text.lower())
        if year_match:
            about_info['founded_year'] = year_match.group(1) or year_match.group(2) or year_match.group(3)
        
        return about_info

    def _extract_social_links(self, soup):
        """Extract social media links"""
        social_platforms = ['twitter', 'facebook', 'linkedin', 'instagram', 'youtube']
        social_links = {}
        
        for platform in social_platforms:
            links = soup.find_all('a', href=lambda href: href and platform in href.lower())
            if links:
                social_links[platform] = links[0]['href']
        
        return social_links

    def conduct_comprehensive_search(self, startup_idea: str) -> Dict:
        """Conduct comprehensive market research searches"""
        print("🔍 Conducting comprehensive market research...", flush=True)
    
        search_queries = {
            'competitors': f'"{startup_idea}" competitors top companies alternatives',  # Enhanced query
            'more_competitors': f'{startup_idea} best apps platforms solutions',  # Additional competitor search
            'market_size': f'{startup_idea} market size revenue statistics 2024',
            'trends': f'{startup_idea} industry trends 2024 2025',
            'funding': f'{startup_idea} startup funding investments',
            'challenges': f'{startup_idea} industry challenges problems',
            'user_reviews': f'{startup_idea} app reviews user feedback',
            'pricing': f'{startup_idea} pricing models costs',
            'technology': f'{startup_idea} technology stack solutions'
        }
    
        search_results = {}
        for category, query in search_queries.items():
            print(f"  Searching: {category}", flush=True)
            results = self.google_search(query, num_results=8)
            search_results[category] = results
            time.sleep(1)  # Rate limiting
    
        # Combine competitor results for better coverage
        if 'more_competitors' in search_results:
            search_results['competitors'].extend(search_results['more_competitors'])
    
        return search_results

    def deep_competitor_analysis(self, competitor_results: List[Dict]) -> List[Dict]:
        """Perform deeper competitor analysis"""
        print("🏢 Conducting deep competitor analysis...", flush=True)
    
        analyzed_competitors = []
        max_competitors = min(10, len(competitor_results))  # Try more competitors
    
        for i, result in enumerate(competitor_results[:max_competitors]):
            print(f"  Analyzing: {result['title']} ({i+1}/{max_competitors}, flush=True)", flush=True)
        
            try:
                scraped_data = self.enhanced_scrape_website(result['link'])
            
                # Additional searches for each competitor
                company_name = result['displayLink'].replace('www.', '').replace('.com', '')
            
                # Search for funding information
                funding_results = self.google_search(f"{company_name} funding investment series", num_results=3)
            
                # Search for user reviews
                review_results = self.google_search(f"{company_name} reviews ratings", num_results=3)
            
                analyzed_competitors.append({
                    'search_result': result,
                    'scraped_data': scraped_data,
                    'funding_info': funding_results,
                    'reviews': review_results
                })
            
                # Stop when we have at least 3 successful competitors
                if len(analyzed_competitors) >= 3:
                    break
                
                time.sleep(2)  # Be respectful to servers
            
            except Exception as e:
                print(f"  Error analyzing {result['link']}: {str(e, flush=True)}", flush=True)
                # Continue to next competitor instead of failing
                continue
    
        # If we still don't have enough, add basic competitor info from search results
        if len(analyzed_competitors) < 3:
            remaining_needed = 3 - len(analyzed_competitors)
            for result in competitor_results[len(analyzed_competitors):len(analyzed_competitors) + remaining_needed]:
                analyzed_competitors.append({
                    'search_result': result,
                    'scraped_data': {'features': [], 'pricing_info': {}, 'about_info': {}},
                    'funding_info': [],
                    'reviews': []
                })
    
        return analyzed_competitors

    def run_enhanced_market_analysis(self, startup_idea: str) -> EnhancedMarketAnalysisReport:
        """Execute comprehensive market research analysis"""
        print(f"🚀 Starting enhanced market analysis for: {startup_idea}", flush=True)
        print("=" * 80, flush=True)
        
        # Step 1: Comprehensive search
        search_results = self.conduct_comprehensive_search(startup_idea)
        
        # Step 2: Deep competitor analysis
        all_competitor_results = search_results['competitors']

        competitor_data = self.deep_competitor_analysis(all_competitor_results)
        
        # Step 3: Enhanced AI analysis
        print("🧠 Generating comprehensive market analysis...", flush=True)
        
        # Create the exact JSON template
        json_template = {
            "executive_summary": "string",
            "market_sizing": {
                "total_addressable_market": "string or null",
                "serviceable_addressable_market": "string or null", 
                "serviceable_obtainable_market": "string or null",
                "market_growth_rate": "string or null",
                "geographic_distribution": {"region": "value"} 
            },
            "market_trends": {
                "emerging_trends": ["list of trends"],
                "technology_trends": ["list of tech trends"],
                "consumer_behavior": ["list of behaviors"],
                "regulatory_factors": ["list of factors"]
            },
            "competitors": [{
                "name": "string",
                "website": "string or null",
                "description": "string", 
                "features": ["list of features"],
                "pricing_model": "string or null",
                "pricing_details": "string or null",
                "target_audience": "string or null",
                "strengths": ["list of strengths"],
                "weaknesses": ["list of weaknesses"],
                "competitive_score": 0.0,
                "market_share": "string or null",
                "funding_info": "string or null",
                "founded_year": "string or null",
                "team_size": "string or null",
                "social_presence": {"platform": "metrics"},
                "user_reviews": {"score": 0.0, "sentiment": "string"}
            }],
            "competitive_landscape_summary": "string",
            "market_leaders": ["list of leaders"],
            "opportunity_analysis": {
                "market_gaps": ["list of gaps"],
                "underserved_segments": ["list of segments"],
                "differentiation_opportunities": ["list of opportunities"],
                "barrier_to_entry": {"factor": "description"},
                "success_factors": ["list of factors"]
            },
            "opportunity_score": 0.0,
            "risk_analysis": {
                "market_risks": ["list of risks"],
                "competitive_risks": ["list of risks"],
                "technology_risks": ["list of risks"],
                "regulatory_risks": ["list of risks"],
                "mitigation_strategies": ["list of strategies"]
            },
            "target_audience_segments": [{"name": "string", "description": "string", "size": "string"}],
            "go_to_market_insights": ["list of insights"],
            "strategic_recommendations": ["list of recommendations"],
            "next_steps": ["list of steps"]
        }
        
        analysis_prompt = f"""
        You are a senior market research analyst. Analyze the startup idea and data provided, then return a JSON response that EXACTLY matches this template structure:

        {json.dumps(json_template, indent=2)}

        STARTUP IDEA: {startup_idea}

        SEARCH RESULTS:
        {json.dumps({k: [{'title': r['title'], 'snippet': r['snippet']} for r in v[:3]] 
                    for k, v in search_results.items()}, indent=2)}

        COMPETITOR DATA:
        {json.dumps([{
            'name': comp['search_result']['title'],
            'snippet': comp['search_result']['snippet'],
            'website': comp['search_result'].get('link', ''),
            'features': comp['scraped_data'].get('features', [])[:5] if 'scraped_data' in comp else []
        } for comp in competitor_data[:3]], indent=2)}

        CRITICAL: Your response must be valid JSON that exactly matches the template structure above.
        Replace all placeholder values with actual analysis data.
        Use null for optional fields that have no data.
        Ensure all arrays have at least one item, even if it's a placeholder.
        """

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                response_format={"type": "json_object"},
                messages=[
                    {"role": "system", "content": "You are a market research expert. You must return valid JSON that exactly matches the provided template structure."},
                    {"role": "user", "content": analysis_prompt}
                ],
                temperature=0.1,
                max_tokens=4000
            )

            # Parse and validate the response
            analysis_result = json.loads(response.choices[0].message.content)
            
            # Add required metadata
            analysis_result['startup_idea'] = startup_idea
            analysis_result['analysis_date'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            
            # Validate and create the report
            report = EnhancedMarketAnalysisReport(**analysis_result)
            return report
            
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {str(e, flush=True)}", flush=True)
            print(f"Response was: {response.choices[0].message.content}", flush=True)
            return self._create_fallback_report(startup_idea, search_results, competitor_data)
            
        except Exception as e:
            print(f"Error in analysis: {str(e, flush=True)}", flush=True)
            return self._create_fallback_report(startup_idea, search_results, competitor_data)

    def _create_fallback_report(self, startup_idea: str, search_results: Dict, competitor_data: List) -> EnhancedMarketAnalysisReport:
        """Create a fallback report using the search data when AI parsing fails"""
        print("🔄 Creating fallback report from search data...", flush=True)
    
        # Ensure we have at least 3 competitors
        competitors = []
        competitor_count = max(3, len(competitor_data))
    
        # Process existing competitor data
        for i, comp in enumerate(competitor_data):
            if i >= 5:  # Limit to 5 max
                break
            
            features = []
            if 'scraped_data' in comp and comp['scraped_data'].get('features'):
                features = comp['scraped_data']['features'][:5]
            else:
                features = ['Feature analysis unavailable']
        
            # Extract pricing info if available
            pricing_model = None
            if 'scraped_data' in comp and comp['scraped_data'].get('pricing_info'):
                pricing_info = comp['scraped_data']['pricing_info']
                if pricing_info.get('price_mentions'):
                    pricing_model = f"Starting from {pricing_info['price_mentions'][0]}"
        
            competitors.append(CompetitorInfo(
                name=comp['search_result']['title'][:50],
                website=comp['search_result'].get('link'),
                description=comp['search_result']['snippet'][:200],
                features=features,
                pricing_model=pricing_model,
                strengths=['Established market presence', 'Brand recognition'],
                weaknesses=['Analysis pending', 'Limited differentiation data'],
                competitive_score=7.0 - (i * 0.5)  # Decreasing scores
            ))
    
        # If we still need more competitors, add from search results
        if len(competitors) < 3:
            additional_results = search_results.get('competitors', [])
            for result in additional_results[len(competitors):]:
                if len(competitors) >= 5:  # Max 5 competitors
                    break
                    
                competitors.append(CompetitorInfo(
                    name=result['title'][:50],
                    website=result.get('link'),
                    description=result['snippet'][:200],
                    features=['Standard industry features'],
                    strengths=['Market presence'],
                    weaknesses=['Limited data available'],
                    competitive_score=6.0
                ))
                
                if len(competitors) >= 3:
                    break
        
        # Extract market insights from search snippets
        market_gaps = []
        trends = []
        
        for result in search_results.get('trends', [])[:3]:
            trends.append(result['snippet'][:100])
            
        for result in search_results.get('challenges', [])[:3]:
            market_gaps.append(result['snippet'][:100])
        
        return EnhancedMarketAnalysisReport(
            startup_idea=startup_idea,
            analysis_date=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            executive_summary=f"Market analysis for {startup_idea} shows competitive landscape with opportunities for differentiation.",
            market_sizing=MarketSizing(
                total_addressable_market="Data extraction in progress",
                market_growth_rate="Growing market based on search trends"
            ),
            market_trends=MarketTrends(
                emerging_trends=trends if trends else ["AI integration in fitness", "Personalization trends"],
                technology_trends=["AI and ML adoption", "Mobile-first solutions"],
                consumer_behavior=["Demand for personalized experiences", "Mobile fitness adoption"],
                regulatory_factors=["Data privacy considerations"]
            ),
            competitors=competitors,
            competitive_landscape_summary=f"Found {len(competitors)} major competitors with established market presence",
            market_leaders=[comp.name for comp in competitors[:3]],
            opportunity_analysis=OpportunityAnalysis(
                market_gaps=market_gaps if market_gaps else ["Enhanced personalization opportunities"],
                underserved_segments=["Beginner fitness enthusiasts", "Specialized training needs"],
                differentiation_opportunities=["AI-powered personalization", "Unique user experience"],
                barrier_to_entry={"technology": "AI/ML expertise required", "market": "Established competitors"},
                success_factors=["User engagement", "Personalization accuracy", "Content quality"]
            ),
            opportunity_score=7.5,
            risk_analysis=RiskAnalysis(
                market_risks=["Market saturation", "Economic sensitivity"],
                competitive_risks=["Established players", "New entrants"],
                technology_risks=["AI accuracy", "Data privacy"],
                regulatory_risks=["Health data regulations"],
                mitigation_strategies=["Focus on differentiation", "Strong data security", "User-centric design"]
            ),
            target_audience_segments=[
                {"name": "Fitness Beginners", "description": "New to fitness, seeking guidance", "age": "18-35"},
                {"name": "Busy Professionals", "description": "Time-constrained, efficiency-focused", "age": "25-45"}
            ],
            go_to_market_insights=["Mobile-first approach", "Freemium model consideration", "Social features for engagement"],
            strategic_recommendations=[
                "Focus on unique AI personalization features",
                "Develop strong onboarding experience", 
                "Build community features",
                "Implement robust data analytics"
            ],
            next_steps=[
                "Conduct user interviews with target segments",
                "Develop MVP with core AI features",
                "Test personalization algorithms",
                "Validate pricing model"
            ]
        )

def analyze_startup_market(idea: str) -> EnhancedMarketAnalysisReport:
    """Main function to run enhanced market analysis"""
    agent = EnhancedMarketResearchAgent()
    
    try:
        report = agent.run_enhanced_market_analysis(idea)
        return report
    
    except Exception as e:
        print(f"❌ Error during analysis: {str(e, flush=True)}", flush=True)
        return None
