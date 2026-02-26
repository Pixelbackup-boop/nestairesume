import requests
import base64
import os
import time

try:
    from PyPDF2 import PdfReader
    import io
    HAS_PYPDF2 = True
except ImportError:
    HAS_PYPDF2 = False

API_URL = "http://localhost:4444/api/v1/pdf/preview"

TARGET_TEMPLATES = [
    "sidebar-dark-navy",
    "sidebar-monogram",
    "sidebar-narrow-yellow"
]

# Sample data mimicking the frontend state
payload = {
    "data": {
        "personalInfo": {
            "fullName": "Kayes Mahmud",
            "email": "kayes.mahmud@email.com",
            "phone": "+1 (555) 000-0000",
            "location": "New York, USA",
            "website": "www.mysite.com",
            "jobTitle": "Software Engineer",
            "summary": "Strategic technology leader with 15+ years of experience driving digital transformation and technical innovation. Managed budgets exceeding $2M and teams of 20+ engineers. Successfully delivered projects that generated $10M+ in revenue growth."
        },
        "experience": [
            {
                "id": "1",
                "title": "Director of Software Engineering",
                "company": "TechCorp Solutions",
                "city": "New York",
                "country": "USA",
                "startDate": "2020-01",
                "current": True,
                "description": "• Led development of microservices architecture, improving system scalability by 300%\n• Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes\n• Mentored team of 15 junior developers, conducting code reviews and technical training\n• Collaborated with product managers to define technical requirements and sprint planning"
            },
            {
                "id": "2",
                "title": "Senior Software Engineer",
                "company": "InnovateTech Inc.",
                "city": "San Francisco",
                "country": "USA",
                "startDate": "2016-06",
                "endDate": "2019-12",
                "description": "• Developed RESTful APIs serving 1M+ daily requests with 99.9% uptime\n• Built responsive web applications using React and TypeScript\n• Integrated third-party services and payment gateways"
            }
        ],
        "education": [
            {
                "id": "1",
                "school": "Graduate School of Business",
                "degree": "Master of Science in Computer Science",
                "startDate": "2011-09",
                "endDate": "2013-05"
            }
        ],
        "skills": [
            {"name": "JavaScript", "level": 5},
            {"name": "TypeScript", "level": 5},
            {"name": "React", "level": 5},
            {"name": "Node.js", "level": 5},
            {"name": "Python", "level": 4},
            {"name": "SQL", "level": 4}
        ],
        "languages": [
            {"name": "Nepali", "proficiency": "Native", "level": 100},
            {"name": "English", "proficiency": "Basic", "level": 80},
        ],
        "certifications": [],
        "awards": [],
        "socialLinks": {
            "linkedin": "linkedin.com/in/kayesmahmud",
            "github": "github.com/yyyymmm"
        },
        "references": [],
        "customFields": [],
        "fonts": {"heading": "Inter", "body": "Inter", "size": "medium"}
    },
    "templateId": "",
    "theme": {
        "name": "custom",
        "primary": "#1e3a8a",
        "text": "#1f2937",
        "background": "#ffffff",
        "heading": "#1e3a8a",
        "secondary": "#4b5563",
        "accent": "#93c5fd"
    }
}

def verify_template(template_id):
    current_payload = payload.copy()
    current_payload["templateId"] = template_id
    
    try:
        response = requests.post(API_URL, json=current_payload, headers={"Content-Type": "application/json"})
        
        if response.status_code == 200:
            data = response.json()
            if "pdf" in data:
                pdf_bytes = base64.b64decode(data["pdf"])
                
                if HAS_PYPDF2:
                    reader = PdfReader(io.BytesIO(pdf_bytes))
                    num_pages = len(reader.pages)
                    if num_pages == 1:
                        print(f"✅ {template_id.ljust(25)} -> 🟢 1 page")
                    else:
                        print(f"❌ {template_id.ljust(25)} -> 🔴 {num_pages} pages (failed)")
                else:
                    # Write to file and check manually
                    out_path = f"/tmp/test_{template_id.replace('-', '_')}.pdf"
                    with open(out_path, "wb") as f:
                        f.write(pdf_bytes)
                    print(f"✅ Generated {template_id} to {out_path} (PyPDF2 missing to verify locally)")
                return True
            else:
                print(f"❌ Error on {template_id}: No 'pdf' key in response")
        else:
            print(f"❌ Error on {template_id}: Status {response.status_code}")
            
    except Exception as e:
        print(f"❌ Connection failed for {template_id}: {e}")
    
    return False

print("Starting PDF generation test...")
if not HAS_PYPDF2:
    print("Warning: PyPDF2 not installed. PDFs will be written to /tmp but page counts won't be calculated automatically.")
print("-" * 40)

for template in TARGET_TEMPLATES:
    verify_template(template)
    time.sleep(5)  # bypass rate limits

print("-" * 40)
print("Done!")
