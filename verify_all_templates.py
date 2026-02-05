import requests
import base64
import json
import os
import time

API_URL = "http://localhost:4444/api/v1/pdf/preview"
OUTPUT_DIR = "verification_output"

# Ensure output directory exists
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

# Full list of templates from frontend registry
TEMPLATES = [
    # Header
    'header-bold-creative',
    'header-dark',
    'header-diagonal-yellow',
    'header-dark-box',
    'header-geometric',
    'header-dark-banner',
    'header-decorative',
    'header-green-centered',
    'header-ribbon-yellow',
    'header-icon-sections',
    'header-light-gray',
    'header-blue-clean',

    # Sidebar
    'sidebar-modern',
    'sidebar-dark-gray',
    'sidebar-dark-minimal',
    'sidebar-dark-navy-compact',
    'sidebar-dark-navy',
    'sidebar-green-teal',
    'sidebar-green-v1',
    'sidebar-green-v2',
    'sidebar-green-v3',
    'sidebar-green-v4',
    'sidebar-monogram',
    'sidebar-narrow-yellow',
    'sidebar-orange',
    'sidebar-yellow',

    # Classic
    'classic-professional',
    'europass-classic',
    'classic-accent-bars',
    'classic-beige',
    'classic-green',
    'classic-icons-teal',
    'classic-labels-left',
    'classic-photo-left',
    'classic-soft-pills',
    'classic-strength-bars',

    # Minimal
    'minimal-clean',
    'minimal-blue-sections',
    'minimal-centered',
    'minimal-labels-tan',
    'minimal-section-bars',
    'minimal-simple',
    'minimal-timeline',
    'minimal-underline',
]

# Standard test data
PAYLOAD_DATA = {
    "personalInfo": {
        "fullName": "Sarah Johnson",
        "email": "sarah.johnson@example.com",
        "phone": "+1 (555) 123-4567",
        "location": "San Francisco, CA",
        "website": "www.sarahj.com",
        "jobTitle": "Product Manager",
        "summary": "Experienced product manager with a track record of successful launches and team leadership. Skilled in agile methodologies, data analysis, and user-centric design."
    },
    "experience": [
        {
            "id": "exp1",
            "title": "Senior Product Manager",
            "company": "Tech Innovations Inc.",
            "startDate": "2020-03",
            "endDate": "Present",
            "current": True,
            "description": "Leading the core product team. Increased user engagement by 40% through new feature launches. Mentoring junior PMs."
        },
        {
            "id": "exp2",
            "title": "Product Analyst",
            "company": "DataCorp",
            "startDate": "2018-01",
            "endDate": "2020-02",
            "current": False,
            "description": "Conducted market research and data analysis to support product strategy. specialized in user behavior tracking."
        }
    ],
    "education": [
        {
            "id": "edu1",
            "school": "University of Technology",
            "degree": "B.S. Computer Science",
            "city": "Boston, MA",
            "startDate": "2014",
            "endDate": "2018"
        }
    ],
    "skills": [
        {"id": "s1", "name": "Product Strategy", "level": 5},
        {"id": "s2", "name": "Agile / Scrum", "level": 5},
        {"id": "s3", "name": "Data Analysis", "level": 4},
        {"id": "s4", "name": "UX Design", "level": 3}
    ],
    "languages": [
        {"id": "l1", "name": "English", "proficiency": "Native"},
        {"id": "l2", "name": "Spanish", "proficiency": "Intermediate"}
    ],
    "interests": [
        {"id": "i1", "name": "Hiking"},
        {"id": "i2", "name": "Photography"}
    ],
    "fonts": {"heading": "Inter", "body": "Inter", "size": "medium"}
}

def generate_pdf(template_id):
    filename = f"{OUTPUT_DIR}/{template_id}.pdf"
    print(f"Generating {template_id}...", end="", flush=True)
    
    payload = {
        "data": PAYLOAD_DATA,
        "templateId": template_id,
        "theme": {
            "name": "custom",
            "primary": "#3b82f6", # Default blueish
            "text": "#1f2937",
            "background": "#ffffff",
            "heading": "#111827",
            "secondary": "#dbeafe",
            "accent": "#3b82f6"
        }
    }

    try:
        start_time = time.time()
        response = requests.post(API_URL, json=payload, headers={"Content-Type": "application/json"})
        
        if response.status_code == 200:
            data = response.json()
            if "pdf" in data:
                pdf_bytes = base64.b64decode(data["pdf"])
                with open(filename, "wb") as f:
                    f.write(pdf_bytes)
                elapsed = time.time() - start_time
                print(f" Done ({len(pdf_bytes)} bytes) in {elapsed:.2f}s")
                return True
            else:
                print(f" Error: No PDF data. Response: {data}")
        else:
            print(f" Error: HTTP {response.status_code} - {response.text}")
            
    except Exception as e:
        print(f" Exception: {e}")
    
    return False

def main():
    print(f"Starting PDF generation for {len(TEMPLATES)} templates...")
    success_count = 0
    for template in TEMPLATES:
        if generate_pdf(template):
            success_count += 1
    
    print("-" * 40)
    print(f"Completed! {success_count}/{len(TEMPLATES)} PDFs generated.")
    print(f"Output directory: {os.path.abspath(OUTPUT_DIR)}")

if __name__ == "__main__":
    main()
