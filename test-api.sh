#!/bin/bash

# ========================================
# CodeCraftHub API Testing Script
# ========================================
# Run these commands to test the API
# Make sure the server is running: npm start
# Then run: bash test-api.sh

API_URL="http://localhost:5000/api/courses"

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║         CodeCraftHub API Testing Script               ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# ========================================
# Test 1: GET all courses (should be empty)
# ========================================
echo "1️⃣  Testing: GET all courses (should be empty)"
echo "   Command: curl $API_URL"
curl -s "$API_URL" | jq '.'
echo ""
echo ""

# ========================================
# Test 2: CREATE a course - JavaScript
# ========================================
echo "2️⃣  Testing: CREATE a course (JavaScript Basics)"
echo "   Command: curl -X POST $API_URL ..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "JavaScript Basics",
    "description": "Learn JavaScript fundamentals including variables, functions, and DOM manipulation",
    "target_date": "2026-06-30",
    "status": "Not Started"
  }' | jq '.'
echo ""
echo ""

# ========================================
# Test 3: CREATE another course - React
# ========================================
echo "3️⃣  Testing: CREATE another course (React)"
echo "   Command: curl -X POST $API_URL ..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React Fundamentals",
    "description": "Build interactive user interfaces with React, components, props, and hooks",
    "target_date": "2026-07-31",
    "status": "Not Started"
  }' | jq '.'
echo ""
echo ""

# ========================================
# Test 4: CREATE another course - Node.js
# ========================================
echo "4️⃣  Testing: CREATE another course (Node.js)"
echo "   Command: curl -X POST $API_URL ..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Node.js & Express",
    "description": "Build backend applications with Node.js and Express framework, REST APIs, and middleware",
    "target_date": "2026-08-15",
    "status": "Not Started"
  }' | jq '.'
echo ""
echo ""

# ========================================
# Test 5: GET all courses (should now have 3)
# ========================================
echo "5️⃣  Testing: GET all courses (should now have 3)"
echo "   Command: curl $API_URL"
curl -s "$API_URL" | jq '.'
echo ""
echo ""

# ========================================
# Test 6: GET a specific course (ID: 1)
# ========================================
echo "6️⃣  Testing: GET a specific course (ID: 1)"
echo "   Command: curl $API_URL/1"
curl -s "$API_URL/1" | jq '.'
echo ""
echo ""

# ========================================
# Test 7: GET a specific course (ID: 2)
# ========================================
echo "7️⃣  Testing: GET a specific course (ID: 2)"
echo "   Command: curl $API_URL/2"
curl -s "$API_URL/2" | jq '.'
echo ""
echo ""

# ========================================
# Test 8: UPDATE course status (ID: 1)
# ========================================
echo "8️⃣  Testing: UPDATE course status - Change ID 1 to 'In Progress'"
echo "   Command: curl -X PUT $API_URL/1 ..."
curl -s -X PUT "$API_URL/1" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "In Progress"
  }' | jq '.'
echo ""
echo ""

# ========================================
# Test 9: UPDATE multiple fields (ID: 2)
# ========================================
echo "9️⃣  Testing: UPDATE multiple fields - ID 2 status and date"
echo "   Command: curl -X PUT $API_URL/2 ..."
curl -s -X PUT "$API_URL/2" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "In Progress",
    "target_date": "2026-07-15",
    "description": "Build interactive user interfaces with React, components, props, hooks, and context API"
  }' | jq '.'
echo ""
echo ""

# ========================================
# Test 10: MARK course as completed (ID: 3)
# ========================================
echo "🔟 Testing: MARK course as completed - ID 3 status = 'Completed'"
echo "   Command: curl -X PUT $API_URL/3 ..."
curl -s -X PUT "$API_URL/3" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Completed"
  }' | jq '.'
echo ""
echo ""

# ========================================
# Test 11: GET all courses with updates
# ========================================
echo "1️⃣1️⃣  Testing: GET all courses with updates"
echo "   Command: curl $API_URL"
curl -s "$API_URL" | jq '.'
echo ""
echo ""

# ========================================
# Test 12: Error - Try to get non-existent course
# ========================================
echo "1️⃣2️⃣  Testing: ERROR - Try to get non-existent course (ID: 999)"
echo "   Command: curl $API_URL/999"
curl -s "$API_URL/999" | jq '.'
echo ""
echo ""

# ========================================
# Test 13: Error - Invalid status value
# ========================================
echo "1️⃣3️⃣  Testing: ERROR - Invalid status value"
echo "   Command: curl -X POST $API_URL ..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Invalid Course",
    "description": "This has invalid status",
    "target_date": "2026-06-30",
    "status": "Invalid Status"
  }' | jq '.'
echo ""
echo ""

# ========================================
# Test 14: Error - Missing required fields
# ========================================
echo "1️⃣4️⃣  Testing: ERROR - Missing required fields"
echo "   Command: curl -X POST $API_URL ..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Incomplete Course"
  }' | jq '.'
echo ""
echo ""

# ========================================
# Test 15: Error - Invalid date format
# ========================================
echo "1️⃣5️⃣  Testing: ERROR - Invalid date format"
echo "   Command: curl -X POST $API_URL ..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bad Date Course",
    "description": "This has bad date format",
    "target_date": "06-30-2026",
    "status": "Not Started"
  }' | jq '.'
echo ""
echo ""

# ========================================
# Test 16: DELETE a course (ID: 3)
# ========================================
echo "1️⃣6️⃣  Testing: DELETE a course (ID: 3)"
echo "   Command: curl -X DELETE $API_URL/3"
curl -s -X DELETE "$API_URL/3" | jq '.'
echo ""
echo ""

# ========================================
# Test 17: GET all courses after deletion
# ========================================
echo "1️⃣7️⃣  Testing: GET all courses after deletion (should have 2)"
echo "   Command: curl $API_URL"
curl -s "$API_URL" | jq '.'
echo ""
echo ""

# ========================================
# Test 18: Error - Try to delete non-existent course
# ========================================
echo "1️⃣8️⃣  Testing: ERROR - Try to delete non-existent course (ID: 999)"
echo "   Command: curl -X DELETE $API_URL/999"
curl -s -X DELETE "$API_URL/999" | jq '.'
echo ""
echo ""

echo "╔════════════════════════════════════════════════════════╗"
echo "║            All Tests Completed! ✅                     ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "Summary:"
echo "  ✅ Created 3 courses"
echo "  ✅ Updated course statuses"
echo "  ✅ Deleted 1 course"
echo "  ✅ Tested error cases"
echo ""
echo "Check the courses.json file to see the persisted data:"
echo "  cat courses.json"
echo ""
