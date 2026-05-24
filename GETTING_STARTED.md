````markdown
# 🚀 CodeCraftHub - Getting Started Checklist

## ✅ Before You Start

- [ ] Node.js installed (check with: `node --version`)
- [ ] npm installed (check with: `npm --version`)
- [ ] Code editor installed (VS Code recommended)
- [ ] Terminal/Command Prompt open
- [ ] Git installed (optional, for version control)

---

## 📥 Installation Steps

### Step 1: Clone or Navigate to Project
```bash
cd CodeCraftHub
```
- [ ] Successfully navigated to project directory

### Step 2: Install Dependencies
```bash
npm install
```
- [ ] See "added X packages" message
- [ ] `node_modules` folder created
- [ ] `package-lock.json` file created

### Step 3: Verify Installation
```bash
npm list express
```
- [ ] Express listed with version 4.18.2 or higher

---

## 🎯 First Run

### Step 4: Start the Server
```bash
npm start
```

Expected output:
```
╔════════════════════════════════════╗
║     CodeCraftHub Server Started    ║
╚════════════════════════════════════╝

📚 Server running on: http://localhost:5000
```

- [ ] Server started successfully
- [ ] No errors in console
- [ ] Port 5000 is working

### Step 5: Open Another Terminal

Keep the first terminal running, open a new one:

```bash
# Test the API
curl http://localhost:5000/api/courses
```

Expected response:
```json
{"success":true,"count":0,"data":[]}
```

- [ ] Got response from API
- [ ] Response shows empty array (count: 0)
- [ ] API is working

---

## 🧪 Testing Phase

### Step 6: Create Your First Course
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "JavaScript Basics",
    "description": "Learn JavaScript fundamentals",
    "target_date": "2026-06-30",
    "status": "Not Started"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "id": 1,
    "name": "JavaScript Basics",
    ...
  }
}
```

- [ ] Course created successfully
- [ ] ID is 1
- [ ] Status is 201 Created
- [ ] See courses.json file created in project root

### Step 7: Get All Courses
```bash
curl http://localhost:5000/api/courses
```

Expected: Array with 1 course (the one you just created)

- [ ] Got all courses
- [ ] Count shows 1
- [ ] Your course is in the list

### Step 8: Create More Courses
```bash
# Create React course
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React Fundamentals",
    "description": "Build UIs with React",
    "target_date": "2026-07-31",
    "status": "Not Started"
  }'

# Create Node.js course
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Node.js Backend",
    "description": "Build server applications",
    "target_date": "2026-08-15",
    "status": "Not Started"
  }'
```

- [ ] Created React course (ID: 2)
- [ ] Created Node.js course (ID: 3)
- [ ] All 3 courses visible when getting all

### Step 9: Get a Specific Course
```bash
curl http://localhost:5000/api/courses/1
```

Expected: Just the JavaScript course (ID: 1)

- [ ] Got single course
- [ ] Only ID 1 returned
- [ ] Data is complete

### Step 10: Update a Course
```bash
curl -X PUT http://localhost:5000/api/courses/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "In Progress"}'
```

Expected: Course 1 with status changed to "In Progress"

- [ ] Course updated
- [ ] Status changed to "In Progress"
- [ ] Other fields unchanged

### Step 11: Delete a Course
```bash
curl -X DELETE http://localhost:5000/api/courses/3
```

Expected: Course 3 (Node.js) deleted and returned

- [ ] Course deleted successfully
- [ ] When getting all courses, only 2 remain
- [ ] Deleted course data returned in response

### Step 12: Check courses.json File
```bash
cat courses.json
```

Should show 2 courses in JSON format:

- [ ] File is readable
- [ ] JSON is valid (properly formatted)
- [ ] Shows 2 courses (JavaScript and React)
- [ ] All course fields present

---

## 🧬 Run Comprehensive Tests

### Step 13: Run Test Script (Bash)
```bash
bash test-api.sh
```

This runs 18 automated tests:

- [ ] All 18 tests pass
- [ ] See creation, retrieval, update, deletion tests
- [ ] See error handling tests
- [ ] Final summary shows "All Tests Completed! ✅"

---

## 🔍 Explore the Code

### Step 14: Open app.js
Open `app.js` in your code editor

- [ ] Find the POST endpoint (around line 127)
- [ ] Find the GET endpoint (around line 202)
- [ ] Find the PUT endpoint (around line 272)
- [ ] Find the DELETE endpoint (around line 352)
- [ ] Read the comments throughout

### Step 15: Understand Helper Functions
In `app.js`, find and understand:

- [ ] `readCoursesFromFile()` - Reads courses from JSON
- [ ] `writeCoursesToFile()` - Saves courses to JSON
- [ ] `generateNextId()` - Creates unique IDs
- [ ] `validateCourse()` - Validates course data

### Step 16: Check Error Handling
Test these error cases:

**Missing Fields:**
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"name": "Incomplete"}'
```
- [ ] Get 400 error with message about missing fields

**Invalid Status:**
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "description": "Test",
    "target_date": "2026-06-30",
    "status": "Invalid"
  }'
```
- [ ] Get 400 error about invalid status

**Invalid Date:**
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "description": "Test",
    "target_date": "06-30-2026",
    "status": "Not Started"
  }'
```
- [ ] Get 400 error about date format

**Course Not Found:**
```bash
curl http://localhost:5000/api/courses/999
```
- [ ] Get 404 error about course not found

---

## 📚 Reading Documentation

- [ ] Read `QUICK_START.md` for quick reference
- [ ] Read `PROJECT_SUMMARY.md` for detailed overview
- [ ] Read `API_DOCUMENTATION.md` for endpoint reference
- [ ] Read `README.md` for full documentation

---

## 🎓 Learning Verification

### Do You Understand?

- [ ] What a REST API is
- [ ] The 5 HTTP methods (GET, POST, PUT, DELETE, PATCH)
- [ ] What HTTP status codes mean (200, 201, 400, 404, 500)
- [ ] How Express.js routing works
- [ ] How to read from a file in Node.js
- [ ] How to write to a file in Node.js
- [ ] How to validate user input
- [ ] How to handle errors properly
- [ ] What JSON format is
- [ ] How middleware in Express works

### Can You Now Do?

- [ ] Explain what each endpoint does
- [ ] Create a new course via API
- [ ] Read courses from JSON file
- [ ] Update course data
- [ ] Delete courses
- [ ] Write proper error messages
- [ ] Validate required fields
- [ ] Format dates correctly
- [ ] Generate unique IDs
- [ ] Use curl to test APIs

---

## 🔧 Troubleshooting Checklist

### Port Already in Use
- [ ] Try restarting computer
- [ ] Try killing process on port 5000
- [ ] Try using different port (PORT=3001 npm start)

### Dependencies Not Installing
- [ ] Delete `node_modules` folder: `rm -rf node_modules`
- [ ] Delete `package-lock.json`: `rm package-lock.json`
- [ ] Run `npm install` again

### File Not Found Errors
- [ ] Check you're in correct directory: `pwd`
- [ ] Check `courses.json` file exists: `ls -la`
- [ ] Check file is readable: `cat courses.json`

### JSON Parsing Errors
- [ ] Reset courses.json: `echo "[]" > courses.json`
- [ ] Restart server: Stop and run `npm start` again
- [ ] Check JSON format: Open `courses.json` in editor

### API Not Responding
- [ ] Check server is running (look at first terminal)
- [ ] Check port 5000: `curl http://localhost:5000`
- [ ] Check Content-Type header: `-H "Content-Type: application/json"`

---

## 🚀 Next Challenges

Once you complete all above steps:

### Challenge 1: Add Filtering
```bash
# Create endpoint to filter by status
# Example: GET /api/courses?status=In%20Progress
```
- [ ] Read query parameters
- [ ] Filter courses by status
- [ ] Return filtered results

### Challenge 2: Add Sorting
```bash
# Create endpoint to sort by date
# Example: GET /api/courses?sort=target_date
```
- [ ] Accept sort parameter
- [ ] Sort courses by target_date
- [ ] Return sorted results

### Challenge 3: Validate Date
```bash
# Make sure target_date is in future
# Or at least not in very distant past
```
- [ ] Add date validation
- [ ] Check date is realistic
- [ ] Return error if invalid

### Challenge 4: Add Pagination
```bash
# Limit results per page
# Example: GET /api/courses?page=1&limit=5
```
- [ ] Implement pagination logic
- [ ] Return only requested page
- [ ] Include total count

### Challenge 5: Add Course Categories
```bash
# Add category to each course
# Categories: Frontend, Backend, DevOps, Database, etc.
```
- [ ] Add category field
- [ ] Update validation
- [ ] Filter by category

### Challenge 6: Postman Collection
```bash
# Create Postman collection with all endpoints
# Export and share
```
- [ ] Create all requests in Postman
- [ ] Test each endpoint
- [ ] Save as collection
- [ ] Export to JSON

### Challenge 7: Frontend
```bash
# Create HTML interface
# Make API calls from browser
```
- [ ] Create HTML form
- [ ] Add JavaScript to make API calls
- [ ] Display courses in table
- [ ] Add create/update/delete buttons

---

## 🎉 Completion Checklist

- [ ] All 16 steps completed
- [ ] Understand all 5 CRUD operations
- [ ] Can create, read, update, delete courses
- [ ] Code is clean and well-commented
- [ ] Error handling works properly
- [ ] Data persists in courses.json
- [ ] Ran comprehensive test script
- [ ] Read all documentation
- [ ] Completed learning verification
- [ ] At least attempted one challenge

---

## 📋 Final Verification

Run this final command to make sure everything works:

```bash
# Stop server if running (Ctrl+C)
# Delete courses.json to start fresh
rm courses.json

# Start server
npm start

# In another terminal, run tests
bash test-api.sh

# Check courses.json was created
cat courses.json
```

- [ ] Server starts without errors
- [ ] All 18 tests pass
- [ ] courses.json created automatically
- [ ] File contains valid JSON
- [ ] 2+ courses in final file

---

## 🎓 Celebrate! 🎉

You have successfully:
✅ Built a REST API from scratch
✅ Implemented full CRUD operations
✅ Handled validation and errors
✅ Persisted data in JSON file
✅ Tested all endpoints
✅ Understood core concepts

**You're ready to build more complex applications!**

---

## 📞 Getting Help

- Check `QUICK_START.md` for common issues
- Review `PROJECT_SUMMARY.md` for detailed explanations
- Look at `test-api.sh` for working examples
- Read comments in `app.js`
- Check error messages (they're helpful!)

---

## 🚀 What's Next?

Pick one topic and dive deeper:
1. **Add Database** - Learn MongoDB or PostgreSQL
2. **Build Frontend** - Create React or Vue UI
3. **Add Authentication** - Implement JWT tokens
4. **Deploy to Cloud** - Use Heroku or AWS
5. **Write Tests** - Learn Jest testing framework

**You've got this! Happy coding! 💻**
````
