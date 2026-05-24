````markdown
# CodeCraftHub

A simple, beginner-friendly learning platform where developers can track courses they want to learn. This project demonstrates REST API basics using Node.js and Express with file-based data storage (no database required).

## Features

✨ **Simple & Lightweight** - Perfect for learning REST API fundamentals
📚 **Course Tracking** - Track course name, description, target completion date, and status
🔄 **Full CRUD Operations** - Create, Read, Update, and Delete courses
💾 **File-based Storage** - All data stored in a simple JSON file
🚀 **Beginner-Friendly** - Well-documented code and clear project structure

## Project Structure

```
CodeCraftHub/
├── server.js                 # Main Express application
├── package.json             # Project dependencies
├── .gitignore              # Git ignore file
├── data/
│   └── courses.json        # JSON file storing all courses
├── routes/
│   └── courses.js          # Course API endpoints (CRUD)
├── utils/
│   └── fileHandler.js      # File operations helper functions
├── public/                 # Static files (optional - for future frontend)
└── README.md              # This file
```

## Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

### Steps

1. **Clone or navigate to the repository**
   ```bash
   cd CodeCraftHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Verify it's running**
   - Open your browser or API client to: `http://localhost:3000`
   - You should see the API welcome message

## REST API Endpoints

### 1. Get All Courses
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/courses`
- **Response**:
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "id": 1,
        "name": "JavaScript Basics",
        "description": "Learn the fundamentals of JavaScript",
        "completionDate": "2026-06-30",
        "status": "In Progress",
        "createdAt": "2026-05-24T10:30:00.000Z"
      }
    ]
  }
  ```

### 2. Get a Specific Course
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/courses/1`
- **Response**: Returns a single course object

### 3. Create a New Course
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/courses`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "JavaScript Basics",
    "description": "Learn the fundamentals of JavaScript",
    "completionDate": "2026-06-30",
    "status": "Not Started"
  }
  ```
- **Valid Status Values**: `"Not Started"`, `"In Progress"`, `"Completed"`
- **Response**: Returns the created course with an assigned ID

### 4. Update a Course
- **Method**: `PUT`
- **URL**: `http://localhost:3000/api/courses/1`
- **Headers**: `Content-Type: application/json`
- **Request Body**: (All fields are optional)
  ```json
  {
    "status": "In Progress",
    "completionDate": "2026-06-15"
  }
  ```
- **Response**: Returns the updated course object

### 5. Delete a Course
- **Method**: `DELETE`
- **URL**: `http://localhost:3000/api/courses/1`
- **Response**: Returns the deleted course object

## Testing the API

### Using cURL

```bash
# Get all courses
curl http://localhost:3000/api/courses

# Create a new course
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React Fundamentals",
    "description": "Build UIs with React",
    "completionDate": "2026-07-31",
    "status": "Not Started"
  }'

# Update a course
curl -X PUT http://localhost:3000/api/courses/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "In Progress"}'

# Delete a course
curl -X DELETE http://localhost:3000/api/courses/1
```

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new request
3. Set method to GET/POST/PUT/DELETE
4. Enter the URL: `http://localhost:3000/api/courses`
5. For POST/PUT requests, set Body tab to "raw" and "JSON"
6. Click Send

### Using VS Code REST Client Extension

Install the REST Client extension, then create a file `test.http`:

```http
### Get all courses
GET http://localhost:3000/api/courses

### Create a new course
POST http://localhost:3000/api/courses
Content-Type: application/json

{
  "name": "Python for Beginners",
  "description": "Learn Python programming from scratch",
  "completionDate": "2026-08-31",
  "status": "Not Started"
}

### Get a specific course
GET http://localhost:3000/api/courses/1

### Update a course
PUT http://localhost:3000/api/courses/1
Content-Type: application/json

{
  "status": "Completed"
}

### Delete a course
DELETE http://localhost:3000/api/courses/1
```

## How Data is Stored & Retrieved

### Data File Structure

All courses are stored in `data/courses.json`:

```json
[
  {
    "id": 1,
    "name": "JavaScript Basics",
    "description": "Learn the fundamentals of JavaScript",
    "completionDate": "2026-06-30",
    "status": "In Progress",
    "createdAt": "2026-05-24T10:30:00.000Z",
    "updatedAt": "2026-05-24T11:45:00.000Z"
  },
  {
    "id": 2,
    "name": "React Fundamentals",
    "description": "Build UIs with React",
    "completionDate": "2026-07-31",
    "status": "Not Started",
    "createdAt": "2026-05-24T10:35:00.000Z"
  }
]
```

### File Operations (`utils/fileHandler.js`)

The `fileHandler.js` utility module provides functions to:

- **`readCourses()`** - Read all courses from the JSON file
- **`writeCourses(courses)`** - Write/save courses to the JSON file
- **`getCourseById(id)`** - Find and return a single course by ID
- **`generateId()`** - Generate unique IDs for new courses

## Learning Concepts Covered

This project teaches:

1. **REST API Principles** - GET, POST, PUT, DELETE methods
2. **Express.js Routing** - Creating and organizing API routes
3. **File I/O in Node.js** - Reading and writing JSON files
4. **Request Validation** - Validating incoming data
5. **Error Handling** - Proper error responses with status codes
6. **JSON Data Format** - Storing and retrieving structured data
7. **Modular Code** - Separating concerns with utilities and routes

## Example Workflow

1. **Start the server**: `npm start`
2. **Create a course** via POST request
3. **View all courses** via GET request
4. **Update course status** via PUT request
5. **Delete course** via DELETE request
6. **Check `data/courses.json`** to see the persisted data

## Common Issues & Solutions

### Port Already in Use
If you see "Port 3000 is already in use", change the port:
```bash
PORT=3001 npm start
```

### File Not Found Errors
Make sure the `data/` directory exists:
```bash
mkdir -p data
```

### JSON Parsing Errors
The `data/courses.json` file must contain valid JSON. If corrupted, reset it:
```bash
echo "[]" > data/courses.json
```

## Next Steps & Enhancements

Once comfortable with this project, you can add:

- ✅ User authentication
- ✅ Database integration (MongoDB, PostgreSQL)
- ✅ Web frontend (React, Vue, HTML/CSS)
- ✅ Progress tracking and statistics
- ✅ Course categories and tags
- ✅ Search and filter functionality
- ✅ Unit testing with Jest
- ✅ API documentation with Swagger

## License

MIT License - Feel free to use this project for learning purposes!

## Support

For questions or issues:
1. Check the API documentation above
2. Verify your request format matches the examples
3. Check the server console for error messages
4. Review the code comments in `routes/courses.js`

Happy Learning! 🚀
````
