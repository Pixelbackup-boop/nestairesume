import requests
import base64
import json
import os

API_URL = "http://localhost:4444/api/v1/pdf/preview"
OUTPUT_FILE = "/Users/elw/.gemini/antigravity/brain/7c3fd92f-ae69-4b01-a93d-2f70008f9e84/classic_pro_test.pdf"

# Sample data mimicking the frontend state for Classic Professional
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
                "description": "• Led development of microservices architecture, improving system scalability by 300%\n• Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes\n• Mentored team of 15 junior developers, conducting code reviews and technical training\n• Collaborated with product managers to define technical requirements and sprint planning\n• Reduced application load time by 40% through performance optimization"
            },
            {
                "id": "2",
                "title": "Senior Software Engineer",
                "company": "InnovateTech Inc.",
                "city": "San Francisco",
                "country": "USA",
                "startDate": "2016-06",
                "endDate": "2019-12",
                "description": "• Developed RESTful APIs serving 1M+ daily requests with 99.9% uptime\n• Built responsive web applications using React and TypeScript\n• Integrated third-party services and payment gateways\n• Participated in agile ceremonies and contributed to sprint planning"
            },
            {
                "id": "3",
                "title": "Software Engineer",
                "company": "CloudWorks Systems",
                "city": "Chicago",
                "country": "USA",
                "startDate": "2013-05",
                "endDate": "2016-05",
                "description": "• Contributed to codebase maintenance and bug fixes\n• Assisted senior developers with feature implementation\n• Wrote unit tests improving code coverage by 25%"
            }
        ],
        "education": [
            {
                "id": "1",
                "school": "Graduate School of Business",
                "degree": "Master of Science in Computer Science",
                "startDate": "2011-09",
                "endDate": "2013-05"
            },
            {
                "id": "2",
                "school": "University of Technology",
                "degree": "Bachelor of Science in Computer Science",
                "startDate": "2007-09",
                "endDate": "2011-05"
            }
        ],
        "skills": [
            {"name": "JavaScript", "level": 5},
            {"name": "TypeScript", "level": 5},
            {"name": "React", "level": 5},
            {"name": "Node.js", "level": 5},
            {"name": "Python", "level": 4},
            {"name": "SQL", "level": 4},
            {"name": "Git", "level": 3},
            {"name": "AWS", "level": 3}
        ],
        "languages": [
            {"name": "Nepali", "proficiency": "Native", "level": 100},
            {"name": "English", "proficiency": "Basic", "level": 80},
            {"name": "Hindi", "proficiency": "Intermediate", "level": 60},
            {"name": "German", "proficiency": "Intermediate", "level": 40}
        ],
        "certifications": [
            {"name": "Safety Training", "issuer": "Group 4", "date": "2022"},
            {"name": "Test Certificate", "issuer": "my own", "date": "2021"}
        ],
        "awards": [
            {"title": "test awards", "issuer": "Award group", "date": "2015", "description": "dfsadfsdfdsfds"}
        ],
        "socialLinks": {
            "linkedin": "linkedin.com/in/kayesmahmud",
            "x": "x.com/user",
            "github": "github.com/yyyymmm",
            "dribbble": "vpqrpowrvqrqrw",
            "instagram": "adsfdsfsd"
        },
        "references": [
            {"name": "bahadur shahi", "title": "Prince", "company": "POP group"}
        ],
        "customFields": [
            {"id": "1", "label": "CUSTOM FIELD 1", "content": "Custom field 1"},
            {"id": "2", "label": "CUSTOM FIELD 2", "content": "Custom field2"},
            {"id": "3", "label": "CUSTOM FIELD 3", "content": "Custom field3"}
        ],
        "fonts": {"heading": "Inter", "body": "Inter", "size": "medium"}
    },
    "templateId": "classic-professional",
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

try:
    print(f"Sending request to {API_URL}...")
    response = requests.post(API_URL, json=payload, headers={"Content-Type": "application/json"})
    
    if response.status_code == 200:
        data = response.json()
        if "pdf" in data:
            pdf_bytes = base64.b64decode(data["pdf"])
            with open(OUTPUT_FILE, "wb") as f:
                f.write(pdf_bytes)
            print(f"Success! PDF saved to {OUTPUT_FILE}")
            print(f"PDF Size: {len(pdf_bytes)} bytes")
        else:
            print("Error: No 'pdf' key in response")
            print(response.text)
    else:
        print(f"Error: Status {response.status_code}")
        print(response.text)

except Exception as e:
    print(f"Connection failed: {e}")
    print("Ensure the backend server is running on port 4444.")
