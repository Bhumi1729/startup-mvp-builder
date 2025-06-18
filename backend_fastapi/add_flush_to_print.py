# Helper script to add flush=True to print statements in market_agent.py and product_manager.py

import re
import os

def add_flush_to_print(filepath):
    """Add flush=True to print statements in a file"""
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Process the file line by line to avoid incorrectly modifying class definitions or function parameters
    lines = content.split('\n')
    for i, line in enumerate(lines):
        # Only process lines that have a print statement and don't already have flush=True
        if 'print(' in line and 'flush=True' not in line:
            # Check if this is actually a print statement and not a class/function definition
            if line.strip().startswith('print(') or ' print(' in line:
                # Add flush=True before the closing parenthesis
                pos = line.rfind(')')
                if pos > 0:
                    lines[i] = line[:pos] + ', flush=True' + line[pos:]
    
    # Rejoin the modified lines
    modified_content = '\n'.join(lines)
    
    # Save to a backup file
    backup_path = filepath + '.bak'
    with open(backup_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    # Write modified content back to the original file
    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(modified_content)
    
    return True

def main():
    """Main function to add flush=True to print statements in files"""
    # Define the files to process
    project_dir = os.path.dirname(os.path.abspath(__file__))
    
    files_to_process = [
        os.path.join(project_dir, 'market_agent.py'),
        os.path.join(project_dir, 'product_manager.py'),
        os.path.join(project_dir, 'tech_architect.py'),
        os.path.join(project_dir, 'tech_architect_updated.py')
    ]
    
    modified_files = []
    
    # Process each file
    for file_path in files_to_process:
        if os.path.exists(file_path):
            print(f"Processing {os.path.basename(file_path)}...")
            if add_flush_to_print(file_path):
                modified_files.append(os.path.basename(file_path))
        else:
            print(f"File not found: {file_path}")
    
    # Print results
    if modified_files:
        print("\nSuccessfully added flush=True to print statements in:")
        for file in modified_files:
            print(f"- {file}")
        print("\nBackup files were created with .bak extension")
        print("\nRestart your FastAPI server to apply the changes.")
    else:
        print("No files were modified.")

if __name__ == "__main__":
    main()
