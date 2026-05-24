````markdown
# CodeCraftHub REST API Documentation

Complete reference guide for all API endpoints and usage examples.

## Base URL
```
http://localhost:3000/api
```

## Content-Type
All requests and responses use:
```
Content-Type: application/json
```

---

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courses` | Get all courses |
| GET | `/courses/:id` | Get a specific course |
| POST | `/courses` | Create a new course |
| PUT | `/courses/:id` | Update a course |
| DELETE | `/courses/:id` | Delete a course |

---

## Detailed Endpoint Reference

### GET /courses
Retrieve all courses from the learning platform.

**Request:**
```http
GET /api/courses HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "JavaScript Basics",
      "description": "Learn the fundamentals of JavaScript",
      "completionDate": "2026-06-30",
      "status": "In Progress",
      "createdAt": "2026-05-24T10:30:00.000Z"
    },
    {
      "id": 2,
      "name": "React Fundamentals",
      "description": "Build user interfaces with React",
      "completionDate": "2026-07-31",
      "status": "Not Started",
      "createdAt": "2026-05-24T10:35:00.000Z"
    },
    {
      "id": 3,
      "name": "Node.js Backend",
      "description": "Build server-side applications with Node.js",
      "completionDate": "2026-08-15",
      "status": "Completed",
      "createdAt": "2026-05-24T10:40:00.000Z"
    }
  ]
}
```

---

### GET /courses/:id
Retrieve a specific course by its ID.

**Parameters:**
- `id` (required, path parameter) - The numeric ID of the course

**Request:**
```http
GET /api/courses/1 HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "JavaScript Basics",
    "description": "Learn the fundamentals of JavaScript",
    "completionDate": "2026-06-30",
    "status": "In Progress",
    "createdAt": "2026-05-24T10:30:00.000Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Course with ID 999 not found"
}
```

---

### POST /courses
Create a new course in the learning platform.

**Request Body (required fields):**
```json
{
  "name": "String - Course name (required)",
  "description": "String - Course description (required)",
  "completionDate": "String - Target completion date in YYYY-MM-DD format (required)",
  "status": "String - One of: 'Not Started', 'In Progress', 'Completed' (required)"
}
```

**Request:**
```http
POST /api/courses HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "name": "Python for Beginners",
  "description": "Learn Python programming from scratch including variables, loops, and functions",
  "completionDate": "2026-08-31",
  "status": "Not Started"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "id": 4,
    "name": "Python for Beginners",
    "description": "Learn Python programming from scratch including variables, loops, and functions",
    "completionDate": "2026-08-31",
    "status": "Not Started",
    "createdAt": "2026-05-24T12:00:00.000Z"
  }
}
```

**Response (400 Bad Request - Missing Fields):**
```json
{
  "success": false,
  "message": "Missing required fields: name, description, completionDate, status"
}
```

**Response (400 Bad Request - Invalid Status):**
```json
{
  "success": false,
  "message": "Invalid status. Must be one of: Not Started, In Progress, Completed"
}
```

---

### PUT /courses/:id
Update an existing course (partial or full update).

**Parameters:**
- `id` (required, path parameter) - The numeric ID of the course to update

**Request Body (all fields optional):**
```json
{
  "name": "String - Updated course name (optional)",
  "description": "String - Updated course description (optional)",
  "completionDate": "String - Updated target completion date (optional)",
  "status": "String - Updated status (optional)"
}
```

**Request (Update Status Only):**
```http
PUT /api/courses/1 HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "status": "In Progress"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": {
    "id": 1,
    "name": "JavaScript Basics",
    "description": "Learn the fundamentals of JavaScript",
    "completionDate": "2026-06-30",
    "status": "In Progress",
    "createdAt": "2026-05-24T10:30:00.000Z",
    "updatedAt": "2026-05-24T14:15:00.000Z"
  }
}
```

**Request (Update Multiple Fields):**
```http
PUT /api/courses/2 HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "status": "In Progress",
  "completionDate": "2026-07-15",
  "description": "Build interactive user interfaces with React and modern JavaScript"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Course with ID 999 not found"
}
```

---

### DELETE /courses/:id
Delete a course from the learning platform.

**Parameters:**
- `id` (required, path parameter) - The numeric ID of the course to delete

**Request:**
```http
DELETE /api/courses/3 HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Course deleted successfully",
  "data": {
    "id": 3,
    "name": "Node.js Backend",
    "description": "Build server-side applications with Node.js",
    "completionDate": "2026-08-15",
    "status": "Completed",
    "createdAt": "2026-05-24T10:40:00.000Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Course with ID 999 not found"
}
```

---

## Status Codes Reference

| Code | Meaning | Typical Response |
|------|---------|------------------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid input, missing fields |
| 404 | Not Found | Course ID doesn't exist |
| 500 | Server Error | Unexpected server error |

---

## Course Object Schema

```json
{
  "id": "Number - Auto-generated unique identifier",
  "name": "String - Course name",
  "description": "String - Course description",
  "completionDate": "String - Target completion date (YYYY-MM-DD)",
  "status": "String - Current status: 'Not Started' | 'In Progress' | 'Completed'",
  "createdAt": "String - ISO 8601 timestamp of creation",
  "updatedAt": "String - ISO 8601 timestamp of last update (optional, only on updates)"
}
```

---

## Usage Examples

### Example 1: Complete Workflow

```bash
# 1. Create first course
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "JavaScript Basics",
    "description": "Learn JavaScript fundamentals",
    "completionDate": "2026-06-30",
    "status": "Not Started"
  }'
# Response: Course created with id: 1

# 2. Create second course
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React Fundamentals",
    "description": "Build UIs with React",
    "completionDate": "2026-07-31",
    "status": "Not Started"
  }'
# Response: Course created with id: 2

# 3. Get all courses
curl http://localhost:3000/api/courses
# Returns array with both courses

# 4. Update course status
curl -X PUT http://localhost:3000/api/courses/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "In Progress"}'
# Course 1 status updated to "In Progress"

# 5. Get updated course
curl http://localhost:3000/api/courses/1
# Returns course with updated status

# 6. Delete course
curl -X DELETE http://localhost:3000/api/courses/2
# Course 2 deleted
```

### Example 2: Progress Tracking

```bash
# Create a course and track progress through lifecycle

# Initial: Create course (status: Not Started)
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Advanced JavaScript",
    "description": "Async/await, Promises, Closures",
    "completionDate": "2026-09-30",
    "status": "Not Started"
  }'

# Week 1: Start learning (update to In Progress)
curl -X PUT http://localhost:3000/api/courses/3 \
  -H "Content-Type: application/json" \
  -d '{"status": "In Progress"}'

# Week 4: Finished course (update to Completed)
curl -X PUT http://localhost:3000/api/courses/3 \
  -H "Content-Type: application/json" \
  -d '{"status": "Completed"}'

# View final state
curl http://localhost:3000/api/courses/3
```

---

## Error Handling

All error responses include a `success: false` field:

```json
{
  "success": false,
  "message": "Description of what went wrong",
  "error": "Optional detailed error message"
}
```

---

## Rate Limiting

Currently, no rate limiting is implemented. This is suitable for learning purposes but consider adding rate limiting for production use.

---

## Data Persistence

All data is stored in `data/courses.json`. This file is:
- Created automatically on first course creation
- Updated with every POST, PUT, DELETE operation
- Human-readable JSON format
- Persists across server restarts

---

## Best Practices

1. **Always validate input** - The API validates status values
2. **Use appropriate HTTP methods** - GET for retrieval, POST for creation, PUT for updates, DELETE for removal
3. **Check response status codes** - Handle 404 and 400 errors appropriately
4. **Use ISO dates** - Always use YYYY-MM-DD format for `completionDate`
5. **Validate on client side** - Validate status before sending PUT/POST requests

---

## Troubleshooting

### Issue: "Port 3000 is already in use"
```bash
# Use a different port
PORT=3001 npm start
```

### Issue: "Cannot find module 'express'"
```bash
# Install dependencies
npm install
```

### Issue: "ENOENT: no such file or directory, open 'data/courses.json'"
```bash
# Create the data directory
mkdir -p data
echo "[]" > data/courses.json
```

### Issue: JSON parsing error
The `data/courses.json` file may be corrupted. Reset it:
```bash
echo "[]" > data/courses.json
```

---

## Next Steps

- Add filtering by status: `/api/courses?status=In%20Progress`
- Add sorting: `/api/courses?sort=completionDate`
- Add pagination: `/api/courses?page=1&limit=10`
- Implement database storage instead of JSON files
- Add authentication and user management
````
