````markdown
# CodeCraftHub - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

This installs Express.js, which is the only dependency needed.

### Step 2: Start the Server
```bash
npm start
```

You should see:
```
╔════════════════════════════════════╗
║     CodeCraftHub Server Started    ║
╚════════════════════════════════════╝

📚 Server running on: http://localhost:5000
📁 Data file: /path/to/courses.json

Available endpoints:
  POST   http://localhost:5000/api/courses
  GET    http://localhost:5000/api/courses
  GET    http://localhost:5000/api/courses/:id
  PUT    http://localhost:5000/api/courses/:id
  DELETE http://localhost:5000/api/courses/:id
```

### Step 3: Test the API

Open another terminal and run:
```bash
curl http://localhost:5000/api/courses
```

You should get back an empty array: `{"success":true,"count":0,"data":[]}`

## 📝 API Examples

### 1. Create a Course (POST)

```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "JavaScript Basics",
    "description": "Learn the fundamentals of JavaScript including variables, functions, and event handling",
    "target_date": "2026-06-30",
    "status": "Not Started"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "id": 1,
    "name": "JavaScript Basics",
    "description": "Learn the fundamentals of JavaScript including variables, functions, and event handling",
    "target_date": "2026-06-30",
    "status": "Not Started",
    "created_at": "2026-05-24T10:30:00.000Z"
  }
}
```

### 2. Get All Courses (GET)

```bash
curl http://localhost:5000/api/courses
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "JavaScript Basics",
      "description": "Learn the fundamentals of JavaScript including variables, functions, and event handling",
      "target_date": "2026-06-30",
      "status": "Not Started",
      "created_at": "2026-05-24T10:30:00.000Z"
    }
  ]
}
```

### 3. Get a Specific Course (GET by ID)

```bash
curl http://localhost:5000/api/courses/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "JavaScript Basics",
    "description": "Learn the fundamentals of JavaScript including variables, functions, and event handling",
    "target_date": "2026-06-30",
    "status": "Not Started",
    "created_at": "2026-05-24T10:30:00.000Z"
  }
}
```

### 4. Update a Course (PUT)

```bash
curl -X PUT http://localhost:5000/api/courses/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "In Progress"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": {
    "id": 1,
    "name": "JavaScript Basics",
    "description": "Learn the fundamentals of JavaScript including variables, functions, and event handling",
    "target_date": "2026-06-30",
    "status": "In Progress",
    "created_at": "2026-05-24T10:30:00.000Z"
  }
}
```

### 5. Delete a Course (DELETE)

```bash
curl -X DELETE http://localhost:5000/api/courses/1
```

**Response:**
```json
{
  "success": true,
  "message": "Course deleted successfully",
  "data": {
    "id": 1,
    "name": "JavaScript Basics",
    "description": "Learn the fundamentals of JavaScript including variables, functions, and event handling",
    "target_date": "2026-06-30",
    "status": "In Progress",
    "created_at": "2026-05-24T10:30:00.000Z"
  }
}
```

## 🧪 Testing with Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new request
3. Use these examples:

### POST Request
- **Method:** POST
- **URL:** `http://localhost:5000/api/courses`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "name": "React Fundamentals",
  "description": "Build interactive UIs with React",
  "target_date": "2026-07-31",
  "status": "Not Started"
}
```

### GET Request
- **Method:** GET
- **URL:** `http://localhost:5000/api/courses`

### PUT Request
- **Method:** PUT
- **URL:** `http://localhost:5000/api/courses/1`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "status": "In Progress",
  "target_date": "2026-07-15"
}
```

### DELETE Request
- **Method:** DELETE
- **URL:** `http://localhost:5000/api/courses/1`

## 📚 Course Data Format

Every course has these fields:

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

### Field Details:
- **id** - Auto-generated (starts at 1, increments by 1)
- **name** - Required, string, cannot be empty
- **description** - Required, string, cannot be empty
- **target_date** - Required, format: YYYY-MM-DD
- **status** - Required, must be one of:
  - `"Not Started"`
  - `"In Progress"`
  - `"Completed"`
- **created_at** - Auto-generated timestamp (ISO 8601 format)

## ❌ Error Messages

### Missing Required Fields
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"name": "Course"}'
```

**Response (400):**
```json
{
  "success": false,
  "error": "Missing required fields: name, description, target_date, status"
}
```

### Invalid Status Value
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Course",
    "description": "Description",
    "target_date": "2026-06-30",
    "status": "Invalid Status"
  }'
```

**Response (400):**
```json
{
  "success": false,
  "error": "Status must be one of: Not Started, In Progress, Completed"
}
```

### Invalid Date Format
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Course",
    "description": "Description",
    "target_date": "06-30-2026",
    "status": "Not Started"
  }'
```

**Response (400):**
```json
{
  "success": false,
  "error": "Target date must be in YYYY-MM-DD format"
}
```

### Course Not Found
```bash
curl http://localhost:5000/api/courses/999
```

**Response (404):**
```json
{
  "success": false,
  "error": "Course with ID 999 not found"
}
```

## 💾 Data Storage

All courses are stored in a `courses.json` file in the project root:

```json
[
  {
    "id": 1,
    "name": "JavaScript Basics",
    "description": "Learn the fundamentals of JavaScript",
    "target_date": "2026-06-30",
    "status": "In Progress",
    "created_at": "2026-05-24T10:30:00.000Z"
  },
  {
    "id": 2,
    "name": "React Fundamentals",
    "description": "Build interactive UIs with React",
    "target_date": "2026-07-31",
    "status": "Not Started",
    "created_at": "2026-05-24T10:35:00.000Z"
  }
]
```

The file is:
- Created automatically on first course creation
- Updated with every POST, PUT, DELETE operation
- Persists data across server restarts
- Human-readable and editable

## 🎓 Learning Concepts

This project teaches:

1. **REST API Principles**
   - GET - Retrieve data
   - POST - Create data
   - PUT - Update data
   - DELETE - Remove data

2. **HTTP Status Codes**
   - 200 OK - Request successful
   - 201 Created - Resource created
   - 400 Bad Request - Invalid input
   - 404 Not Found - Resource doesn't exist
   - 500 Server Error - Server issue

3. **Express.js Fundamentals**
   - Routing (app.get, app.post, etc.)
   - Middleware (app.use)
   - Request/Response handling
   - Parameter parsing (:id, query strings)

4. **File I/O Operations**
   - Reading files (fs.readFileSync)
   - Writing files (fs.writeFileSync)
   - JSON parsing and stringifying
   - Error handling

5. **Data Validation**
   - Required fields checking
   - Format validation
   - Type validation
   - Custom error messages

## 🔧 Troubleshooting

### Port 5000 Already in Use

If you see "EADDRINUSE: address already in use :::5000":

**Option 1:** Kill the process using port 5000
```bash
# On macOS/Linux:
lsof -i :5000
kill -9 <PID>

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Option 2:** Modify app.js to use a different port
```javascript
const PORT = 5001; // Change to any available port
```

### courses.json Not Created

The file is created automatically when you create the first course. If you need to start fresh:

```bash
# Delete the file
rm courses.json

# Or create an empty one
echo "[]" > courses.json
```

### Corrupted JSON File

If you see JSON parsing errors:

```bash
# Reset to empty array
echo "[]" > courses.json
```

### Cannot Read courses.json

Make sure the file exists and is readable:

```bash
# Check if file exists
ls -la courses.json

# Fix permissions (if needed)
chmod 644 courses.json
```

## 📖 Full Course Lifecycle Example

```bash
# 1. Create a course
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Python for Beginners",
    "description": "Learn Python programming from scratch",
    "target_date": "2026-08-31",
    "status": "Not Started"
  }'
# Response: Course created with id: 1

# 2. View all courses
curl http://localhost:5000/api/courses
# Shows: 1 course, status: Not Started

# 3. Start learning (update status)
curl -X PUT http://localhost:5000/api/courses/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "In Progress"}'
# Updated: status is now In Progress

# 4. Update completion date (learning is taking longer)
curl -X PUT http://localhost:5000/api/courses/1 \
  -H "Content-Type: application/json" \
  -d '{"target_date": "2026-09-15"}'
# Updated: new target date

# 5. Mark as completed
curl -X PUT http://localhost:5000/api/courses/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "Completed"}'
# Updated: status is now Completed

# 6. View final course state
curl http://localhost:5000/api/courses/1
# Shows complete course info with all updates

# 7. Delete course (optional)
curl -X DELETE http://localhost:5000/api/courses/1
# Course deleted
```

## 🚀 Next Steps

Once you're comfortable with this project, try:

1. **Add Filtering**
   - `GET /api/courses?status=In Progress`
   - Show only courses with a specific status

2. **Add Sorting**
   - `GET /api/courses?sort=target_date`
   - Sort courses by deadline

3. **Add Pagination**
   - `GET /api/courses?page=1&limit=10`
   - Display 10 courses per page

4. **Add Categories**
   - Give courses a category (e.g., "Frontend", "Backend")
   - Filter by category

5. **Add Frontend**
   - Create an HTML/CSS/JavaScript interface
   - Make API calls from the browser

6. **Add Database**
   - Replace JSON file with MongoDB or PostgreSQL
   - Learn about database operations

7. **Add Authentication**
   - Create user accounts
   - Each user has their own courses

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Node.js File System](https://nodejs.org/api/fs.html)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)
- [REST API Best Practices](https://restfulapi.net/)
- [JSON Format](https://www.json.org/)

Happy Learning! 🎉
````
