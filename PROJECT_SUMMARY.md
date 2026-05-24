````markdown
# CodeCraftHub - Complete Project Summary

## 📋 Project Overview

**CodeCraftHub** is a beginner-friendly REST API for tracking learning courses. It demonstrates fundamental concepts of Node.js, Express.js, and REST API development using simple JSON file storage.

### Key Features:
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ JSON file-based data persistence
- ✅ Comprehensive error handling
- ✅ Well-commented code for learning
- ✅ Auto-generates unique IDs and timestamps
- ✅ Input validation and status checking

---

## 📁 Project Structure

```
CodeCraftHub/
├── app.js                      # Main Express application (PORT 5000)
├── courses.json                # Data file (auto-created on first use)
├── package.json                # Project dependencies
├── .gitignore                  # Git ignore configuration
├── test-api.sh                 # Bash script with 18 test examples
├── README.md                   # Main documentation
├── QUICK_START.md              # Quick start guide with curl examples
├── API_DOCUMENTATION.md        # Detailed API reference (with server.js)
├── routes/courses.js           # Course routes (alternative structure)
├── utils/fileHandler.js        # File utilities (alternative structure)
└── data/courses.json           # Data directory (alternative structure)
```

### File Descriptions:

| File | Purpose |
|------|---------|
| **app.js** | Main Express server with all 5 CRUD endpoints (PORT 5000) |
| **courses.json** | JSON file storing all course data - persists across restarts |
| **package.json** | npm dependencies and scripts configuration |
| **.gitignore** | Excludes node_modules, logs, and .env from Git |
| **test-api.sh** | Bash script with 18 curl test examples |
| **README.md** | Comprehensive documentation and setup guide |
| **QUICK_START.md** | 5-minute quick start guide with examples |
| **API_DOCUMENTATION.md** | Detailed endpoint reference and examples |

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Server
```bash
npm start
```

Expected output:
```
╔════════════════════════════════════╗
║     CodeCraftHub Server Started    ║
╚════════════════════════════════════╝

📚 Server running on: http://localhost:5000
📁 Data file: /path/to/courses.json
```

### Step 3: Test the API
```bash
# In another terminal:
curl http://localhost:5000/api/courses
```

---

## 📚 REST API Endpoints

### Overview

| Method | Endpoint | Action |
|--------|----------|--------|
| POST | `/api/courses` | Create a new course |
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses/:id` | Get a specific course |
| PUT | `/api/courses/:id` | Update a course |
| DELETE | `/api/courses/:id` | Delete a course |

### Endpoint Details

#### 1. CREATE Course - POST /api/courses

**Request:**
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

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "id": 1,
    "name": "JavaScript Basics",
    "description": "Learn JavaScript fundamentals",
    "target_date": "2026-06-30",
    "status": "Not Started",
    "created_at": "2026-05-24T10:30:00.000Z"
  }
}
```

#### 2. READ All - GET /api/courses

**Request:**
```bash
curl http://localhost:5000/api/courses
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "JavaScript Basics",
      "description": "Learn JavaScript fundamentals",
      "target_date": "2026-06-30",
      "status": "Not Started",
      "created_at": "2026-05-24T10:30:00.000Z"
    },
    {
      "id": 2,
      "name": "React Fundamentals",
      "description": "Build UIs with React",
      "target_date": "2026-07-31",
      "status": "Not Started",
      "created_at": "2026-05-24T10:35:00.000Z"
    }
  ]
}
```

#### 3. READ One - GET /api/courses/:id

**Request:**
```bash
curl http://localhost:5000/api/courses/1
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "JavaScript Basics",
    "description": "Learn JavaScript fundamentals",
    "target_date": "2026-06-30",
    "status": "Not Started",
    "created_at": "2026-05-24T10:30:00.000Z"
  }
}
```

#### 4. UPDATE Course - PUT /api/courses/:id

**Request:**
```bash
curl -X PUT http://localhost:5000/api/courses/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "In Progress",
    "target_date": "2026-07-15"
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": {
    "id": 1,
    "name": "JavaScript Basics",
    "description": "Learn JavaScript fundamentals",
    "target_date": "2026-07-15",
    "status": "In Progress",
    "created_at": "2026-05-24T10:30:00.000Z"
  }
}
```

#### 5. DELETE Course - DELETE /api/courses/:id

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/courses/1
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Course deleted successfully",
  "data": {
    "id": 1,
    "name": "JavaScript Basics",
    "description": "Learn JavaScript fundamentals",
    "target_date": "2026-07-15",
    "status": "In Progress",
    "created_at": "2026-05-24T10:30:00.000Z"
  }
}
```

---

## 📊 Course Data Model

### Course Object Structure

```json
{
  "id": 1,
  "name": "Course Name",
  "description": "Course description",
  "target_date": "2026-06-30",
  "status": "Not Started",
  "created_at": "2026-05-24T10:30:00.000Z"
}
```

### Field Specifications

| Field | Type | Required | Details |
|-------|------|----------|---------|
| **id** | Number | Auto | Generated (starts at 1, increments by 1) |
| **name** | String | ✅ Yes | Course name (cannot be empty) |
| **description** | String | ✅ Yes | Course description (cannot be empty) |
| **target_date** | String | ✅ Yes | Format: YYYY-MM-DD (e.g., 2026-06-30) |
| **status** | String | ✅ Yes | Must be: "Not Started", "In Progress", or "Completed" |
| **created_at** | String | Auto | ISO 8601 timestamp (auto-generated on creation) |

---

## ✅ Validation Rules

### Name & Description
- Must be non-empty strings
- Automatically trimmed of whitespace

### Target Date
- **Required Format:** YYYY-MM-DD
- **Valid Example:** 2026-06-30
- **Invalid Examples:** 06/30/2026, 30-06-2026, 2026-6-30

### Status
- **Valid Values:**
  - "Not Started" (exactly as written)
  - "In Progress" (exactly as written)
  - "Completed" (exactly as written)
- **Invalid Values:** "pending", "active", "done", etc.

---

## 🧪 Testing Methods

### Method 1: Bash Script (Easiest)
```bash
bash test-api.sh
```
Runs 18 automated tests covering all CRUD operations and error cases.

### Method 2: cURL (Command Line)
```bash
# Create
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Desc","target_date":"2026-06-30","status":"Not Started"}'

# Read All
curl http://localhost:5000/api/courses

# Read One
curl http://localhost:5000/api/courses/1

# Update
curl -X PUT http://localhost:5000/api/courses/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"In Progress"}'

# Delete
curl -X DELETE http://localhost:5000/api/courses/1
```

### Method 3: Postman (GUI)
1. Download [Postman](https://www.postman.com/downloads/)
2. Create requests with:
   - **URL:** http://localhost:5000/api/courses
   - **Method:** POST/GET/PUT/DELETE
   - **Headers:** Content-Type: application/json
   - **Body:** JSON course data

### Method 4: VS Code REST Client
Install REST Client extension, create `requests.http`:
```http
### Create
POST http://localhost:5000/api/courses
Content-Type: application/json

{
  "name": "Test",
  "description": "Description",
  "target_date": "2026-06-30",
  "status": "Not Started"
}

### Get All
GET http://localhost:5000/api/courses
```

---

## 💾 Data Storage (courses.json)

### Auto-Created Format
When you create the first course, `courses.json` is auto-created:

```json
[
  {
    "id": 1,
    "name": "JavaScript Basics",
    "description": "Learn the fundamentals",
    "target_date": "2026-06-30",
    "status": "Not Started",
    "created_at": "2026-05-24T10:30:00.000Z"
  },
  {
    "id": 2,
    "name": "React Fundamentals",
    "description": "Build UIs with React",
    "target_date": "2026-07-31",
    "status": "In Progress",
    "created_at": "2026-05-24T10:35:00.000Z"
  }
]
```

### Properties:
- ✅ Human-readable JSON format
- ✅ Pretty-printed with 2-space indentation
- ✅ Persists across server restarts
- ✅ Automatically updated with every CRUD operation
- ✅ Can be edited manually (be careful with formatting)

---

## ❌ Error Handling

### Error Response Format
All errors follow this structure:
```json
{
  "success": false,
  "error": "Description of what went wrong"
}
```

### Common Error Codes

| Status | Error | Example |
|--------|-------|---------|
| **400** | Missing required fields | `{"success": false, "error": "Missing required fields: name, description, target_date, status"}` |
| **400** | Invalid status | `{"success": false, "error": "Status must be one of: Not Started, In Progress, Completed"}` |
| **400** | Invalid date format | `{"success": false, "error": "Target date must be in YYYY-MM-DD format"}` |
| **400** | Invalid date value | `{"success": false, "error": "Target date is not a valid date"}` |
| **404** | Course not found | `{"success": false, "error": "Course with ID 999 not found"}` |
| **500** | Server error | `{"success": false, "error": "Internal server error"}` |

---

## 🎓 Learning Concepts Covered

### 1. REST API Principles
- GET - Retrieve data
- POST - Create data
- PUT - Update data
- DELETE - Delete data
- Proper use of HTTP status codes

### 2. Express.js Fundamentals
```javascript
// Routing
app.get('/api/courses', callback)
app.post('/api/courses', callback)
app.put('/api/courses/:id', callback)
app.delete('/api/courses/:id', callback)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
```

### 3. File I/O in Node.js
```javascript
// Reading files
fs.readFileSync(filepath, 'utf8')

// Writing files
fs.writeFileSync(filepath, content, 'utf8')

// Checking existence
fs.existsSync(filepath)
```

### 4. JSON Operations
```javascript
// Parse JSON string to object
const data = JSON.parse(jsonString)

// Convert object to JSON string
const jsonString = JSON.stringify(data, null, 2)
```

### 5. Data Validation
- Required field checking
- Format validation (date, string)
- Type validation
- Enum validation (status must be one of specific values)

### 6. Error Handling
- Try-catch blocks
- Validation before operations
- Appropriate HTTP status codes
- Meaningful error messages

### 7. Code Organization
- Separation of concerns
- Helper functions for reusability
- Modular routing (optional routes/ structure)
- Comments for clarity

---

## 🔧 Configuration

### Change Port
Edit `app.js` line 8:
```javascript
const PORT = 5000; // Change to any available port
```

Or set environment variable:
```bash
PORT=3000 npm start
```

### Change Data File Location
Edit `app.js` line 11:
```javascript
const DATA_FILE = path.join(__dirname, 'courses.json'); // Change path
```

---

## 📖 Code Highlights

### Helper Functions in app.js

**readCoursesFromFile()**
- Reads courses from JSON file
- Creates empty file if doesn't exist
- Returns array of courses

**writeCoursesToFile(courses)**
- Saves courses to JSON file
- Pretty-prints with 2-space indentation
- Handles file write errors

**generateNextId()**
- Generates unique ID for new course
- Uses maximum existing ID + 1
- Starts at 1 if no courses exist

**validateCourse(courseData)**
- Validates all required fields
- Checks name and description are non-empty strings
- Validates date format (YYYY-MM-DD)
- Validates status is one of allowed values
- Returns error message or null

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

### "Cannot find module 'express'"
```bash
npm install
```

### "ENOENT: no such file or directory"
```bash
# Create empty data file
echo "[]" > courses.json
```

### Corrupted JSON File
```bash
# Reset to empty array
echo "[]" > courses.json
```

### Cannot Read/Write File
```bash
# Fix permissions
chmod 644 courses.json
```

---

## 🚀 Next Steps & Enhancements

After mastering this project, you can:

### Level 1: Expand API
- [ ] Add filtering: `GET /api/courses?status=In%20Progress`
- [ ] Add sorting: `GET /api/courses?sort=target_date`
- [ ] Add pagination: `GET /api/courses?page=1&limit=10`
- [ ] Add search: `GET /api/courses?search=javascript`

### Level 2: Add Features
- [ ] Course categories/tags
- [ ] Progress tracking (percentage)
- [ ] Course ratings
- [ ] Course duration/hours
- [ ] Learning resources/links

### Level 3: Database
- [ ] Replace JSON with MongoDB
- [ ] Use PostgreSQL
- [ ] Add database migrations
- [ ] Implement ORM (Sequelize, TypeORM)

### Level 4: Frontend
- [ ] Create HTML/CSS/JavaScript UI
- [ ] Build React or Vue application
- [ ] Add data visualization (charts)
- [ ] Create mobile app

### Level 5: Authentication
- [ ] User registration/login
- [ ] JWT tokens
- [ ] User-specific courses
- [ ] Role-based access control

### Level 6: Advanced Features
- [ ] Email notifications
- [ ] Course completion certificates
- [ ] Analytics dashboard
- [ ] API documentation (Swagger)
- [ ] Unit testing (Jest)
- [ ] Deployment (Heroku, AWS)

---

## 📚 Learning Resources

- **Express.js:** https://expressjs.com/
- **Node.js File System:** https://nodejs.org/api/fs.html
- **HTTP Status Codes:** https://httpwg.org/specs/rfc7231.html#status.codes
- **REST API Guide:** https://restfulapi.net/
- **JSON Format:** https://www.json.org/
- **ES6+ JavaScript:** https://javascript.info/

---

## 📄 File Reference

### app.js (Main Application)
- **Lines 1-30:** Imports and initialization
- **Lines 32-70:** Middleware setup
- **Lines 72-110:** Helper functions
- **Lines 112-125:** Root endpoint
- **Lines 127-200:** POST endpoint (create)
- **Lines 202-228:** GET all endpoint
- **Lines 230-270:** GET one endpoint
- **Lines 272-350:** PUT endpoint (update)
- **Lines 352-415:** DELETE endpoint
- **Lines 417-425:** Error handling
- **Lines 427-450:** Server startup

### test-api.sh
- 18 comprehensive test cases
- Covers all CRUD operations
- Tests error scenarios
- Uses jq for JSON pretty-printing
- Can be run: `bash test-api.sh`

---

## 💡 Key Takeaways

✅ You now understand:
- How REST APIs work (GET, POST, PUT, DELETE)
- Express.js routing and middleware
- File-based data persistence
- Input validation and error handling
- JavaScript async operations (file I/O)
- JSON data format
- HTTP status codes
- Modular code organization

✅ You can now:
- Build a complete CRUD API
- Handle errors gracefully
- Validate user input
- Persist data in files
- Test your API with curl/Postman
- Read and understand production code

---

## 🎉 Congratulations!

You've successfully learned REST API development with Node.js and Express.js!

**Next:** Pick one enhancement from the "Next Steps" section and start building! 🚀

Happy Coding! 💻
````
