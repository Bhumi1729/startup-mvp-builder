# manual_update_prints.py
"""
Manual script to update specific print statements to include flush=True 
for real-time output in the terminal.
"""

import os
import re

def update_market_agent():
    """Update market_agent.py print statements"""
    file_path = "market_agent.py"
    
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found")
        return False
    
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Create a backup
    with open(file_path + '.bak', 'w', encoding='utf-8') as file:
        file.write(content)
    
    # Replace specific print statements
    replacements = [
        (r'print\("🔍 Conducting comprehensive market research\.\.\."\)',
         r'print("🔍 Conducting comprehensive market research...", flush=True)'),
        
        (r'print\(f"  Searching: {category}"\)',
         r'print(f"  Searching: {category}", flush=True)'),
        
        (r'print\("🏢 Conducting deep competitor analysis\.\.\."\)',
         r'print("🏢 Conducting deep competitor analysis...", flush=True)'),
        
        (r'print\(f"  Analyzing: {result\[\'title\'\]} \({i\+1}/{max_competitors}\)"\)',
         r'print(f"  Analyzing: {result[\'title\']} ({i+1}/{max_competitors})", flush=True)'),
        
        (r'print\(f"🚀 Starting enhanced market analysis for: {startup_idea}"\)',
         r'print(f"🚀 Starting enhanced market analysis for: {startup_idea}", flush=True)'),
        
        (r'print\("=" \* 80\)',
         r'print("=" * 80, flush=True)'),
        
        (r'print\("🧠 Generating comprehensive market analysis\.\.\."\)',
         r'print("🧠 Generating comprehensive market analysis...", flush=True)')
    ]
    
    modified_content = content
    for pattern, replacement in replacements:
        modified_content = re.sub(pattern, replacement, modified_content)
    
    # Write modified content
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(modified_content)
    
    return True

def update_product_manager():
    """Update product_manager.py print statements"""
    file_path = "product_manager.py"
    
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found")
        return False
    
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Create a backup
    with open(file_path + '.bak', 'w', encoding='utf-8') as file:
        file.write(content)
    
    # Replace specific print statements
    replacements = [
        (r'print\("👤 Generating user personas based on market analysis\.\.\."\)',
         r'print("👤 Generating user personas based on market analysis...", flush=True)'),
        
        (r'print\("✨ Generating product features\.\.\."\)',
         r'print("✨ Generating product features...", flush=True)'),
        
        (r'print\("📊 Prioritizing features\.\.\."\)',
         r'print("📊 Prioritizing features...", flush=True)'),
        
        (r'print\(f"🗺️ Creating product roadmap for: {market_report.startup_idea}"\)',
         r'print(f"🗺️ Creating product roadmap for: {market_report.startup_idea}", flush=True)'),
        
        (r'print\("=" \* 80\)',
         r'print("=" * 80, flush=True)')
    ]
    
    modified_content = content
    for pattern, replacement in replacements:
        modified_content = re.sub(pattern, replacement, modified_content)
    
    # Write modified content
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(modified_content)
    
    return True

def update_tech_architect():
    """Update tech_architect.py and tech_architect_updated.py print statements"""
    for file_path in ["tech_architect.py", "tech_architect_updated.py"]:
        if not os.path.exists(file_path):
            print(f"Error: {file_path} not found")
            continue
        
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Create a backup
        with open(file_path + '.bak', 'w', encoding='utf-8') as file:
            file.write(content)
        
        # Simple approach: add flush=True to any print statement that doesn't have it
        lines = content.split('\n')
        modified = False
        
        for i, line in enumerate(lines):
            if 'print(' in line and 'flush=True' not in line:
                # Only modify if it's a print statement and not a class/function definition
                if line.strip().startswith('print(') or ' print(' in line:
                    # Add flush=True before the closing parenthesis
                    pos = line.rfind(')')
                    if pos > 0:
                        lines[i] = line[:pos] + ', flush=True' + line[pos:]
                        modified = True
        
        # Fix any improper class or method definitions
        for i, line in enumerate(lines):
            if 'class ' in line and ', flush=True' in line:
                lines[i] = line.replace(', flush=True', '')
                modified = True
            elif 'def ' in line and ', flush=True' in line:
                lines[i] = line.replace(', flush=True', '')
                modified = True
        
        # Write modified content
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write('\n'.join(lines))
        
        print(f"✅ Updated {file_path} with flush=True in print statements")
    
    return True

def main():
    """Main function to update print statements"""
    # Change to the backend directory
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(backend_dir)
    
    print(f"Working directory: {os.getcwd()}")
    
    # Update files
    market_updated = update_market_agent()
    product_updated = update_product_manager()
    tech_updated = update_tech_architect()
    
    # Print results
    if market_updated:
        print("✅ Updated market_agent.py with flush=True in print statements")
    else:
        print("❌ Failed to update market_agent.py")
    
    if product_updated:
        print("✅ Updated product_manager.py with flush=True in print statements")
    else:
        print("❌ Failed to update product_manager.py")
    
    print("\nRestart your FastAPI server to apply the changes.")

if __name__ == "__main__":
    main()
