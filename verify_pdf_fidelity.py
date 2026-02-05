import requests
import base64
import json
import os

API_URL = "http://localhost:4444/api/v1/pdf/preview"
OUTPUT_FILE = "/Users/elw/.gemini/antigravity/brain/c8555056-f6e1-4edc-b25a-2206dd4ae16a/comparisons/backend_pdf_preview.pdf"

# Sample data mimicking the frontend state
payload = {
    "data": {
        "personalInfo": {
            "fullName": "Sarah Johnson",
            "email": "sarah.johnson@example.com",
            "jobTitle": "Product Manager",
            "summary": "Experienced product manager with a track record of successful launches."
        },
        "experience": [],
        "education": [],
        "skills": [{"name": "Product Strategy", "level": 5}],
        "languages": [],
        "interests": [],
        "fonts": {"heading": "Inter", "body": "Inter", "size": "medium"}
    },
    "templateId": "header-bold", # Mapped from header-diagonal-yellow
    "theme": {
        "name": "yellow",
        "primary": "#eab308",
        "text": "#1f2937",
        "background": "#ffffff",
        "heading": "#111827",
        "secondary": "#fef08a",
        "accent": "#eab308"
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
