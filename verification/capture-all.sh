#!/bin/bash

# List of all 46 templates
TEMPLATES=(
  # Classic (12)
  "classic-professional"
  "europass-classic"
  "classic-accent-bars"
  "classic-beige"
  "classic-green"
  "classic-icons-teal"
  "classic-labels-left"
  "classic-minimalist"
  "classic-modern"
  "classic-photo-left"
  "classic-soft-pills"
  "classic-strength-bars"
  # Header (12)
  "header-bold"
  "header-dark"
  "header-dark-banner"
  "header-dark-box"
  "header-blue-clean"
  "header-geometric"
  "header-green-centered"
  "header-diagonal-yellow"
  "header-decorative"
  "header-icon-sections"
  "header-light-gray"
  "header-ribbon-yellow"
  # Minimal (8)
  "minimal-clean"
  "minimal-centered"
  "minimal-blue-sections"
  "minimal-labels-tan"
  "minimal-section-bars"
  "minimal-simple"
  "minimal-timeline"
  "minimal-underline"
  # Sidebar (14)
  "sidebar-modern"
  "sidebar-yellow"
  "sidebar-orange"
  "sidebar-narrow-yellow"
  "sidebar-dark-gray"
  "sidebar-dark-minimal"
  "sidebar-dark-navy"
  "sidebar-dark-navy-compact"
  "sidebar-green-teal"
  "sidebar-green-v1"
  "sidebar-green-v2"
  "sidebar-green-v3"
  "sidebar-green-v4"
  "sidebar-monogram"
)

BASE_DIR="/Users/elw/Documents/Test/AI/AI-Resume-Builder/verification"

for template in "${TEMPLATES[@]}"; do
  echo "Processing: $template"

  # Generate PDF
  jq --arg t "$template" '.templateId = $t' "$BASE_DIR/test-data.json" > /tmp/pdf-request.json
  curl -s -X POST "http://localhost:4444/api/v1/pdf/generate" \
    -H "Content-Type: application/json" \
    -d @/tmp/pdf-request.json \
    -o "$BASE_DIR/$template/resume.pdf"

  if [ -f "$BASE_DIR/$template/resume.pdf" ]; then
    echo "  ✓ PDF generated"
  else
    echo "  ✗ PDF failed"
  fi
done

echo ""
echo "PDF generation complete!"
echo "Screenshots need to be captured via Playwright MCP"
