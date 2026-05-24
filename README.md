# CodeCraftHub

> A developer course-tracking REST API — built with Node.js and Express, following clean architecture principles.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoint Documentation](#api-endpoint-documentation)
  - [List Courses](#1-list-courses)
  - [Get a Course](#2-get-a-course)
  - [Create a Course](#3-create-a-course)
  - [Update a Course](#4-update-a-course)
  - [Delete a Course](#5-delete-a-course)
- [Validation Rules](#validation-rules)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

CodeCraftHub is a lightweight REST API for tracking developer learning courses. It lets you create, read, update, delete, search, filter, sort and paginate courses — all persisted to a local JSON file with no database required.

The codebase is designed as a learning reference for clean API architecture:

- **Repository pattern** — all data access is isolated in one file, making a future database swap trivial
- **Validation middleware** — request validation is centralised and reusable across routes
- **Single entry point** — one `server.js` wires everything together cleanly

---

## Features

- Full **CRUD** operations for courses
- **Search** — case-insensitive text search across name and description
- **Filter** — filter courses by status
- **Sort** — sort by name, status, completionDate, or createdAt; ascending or descending
- **Pagination** — page/limit controls with total and totalPages in every list response
- **CORS** — configured for browser-based frontends, lockable via environment variable
- **Input validation** — field-level error messages on every bad request
- **UUID-based IDs** — safe, globally unique identifiers
- **20 integration tests** with Jest and Supertest

---

## Project Structure

```
CodeCraftHub/
├── server.js                      # Entry point — Express app, middleware, routes
├── routes/
│   └── courses.js                 # Route handlers (thin controllers)
├── middleware/
│   └── validateCourse.js          # Validation rules per operation
├── repositories/
│   └── courseRepository.js        # All data access — swap this for a real DB
├── utils/
│   └── fileHandler.js             # JSON file read/write helpers
├── data/
│   └── courses.json               # Persisted course data
├── __tests__/
│   └── courses.test.js            # Integration tests
└── package.json
```

---

## Installation

**Prerequisites:** Node.js v14 or higher, npm.

```bash
# 1. Clone the repository
git clone https://github.com/genuinecode-git/CodeCraftHub.git
cd CodeCraftHub

# 2. Install dependencies
npm install
```

That's it. No database setup, no environment file needed for local development.

---

## Running the Application

```bash
# Start the server (production)
npm start

# Start the server (development — same command, swap for nodemon if preferred)
npm run dev
```

The server starts on **http://localhost:3000** by default.

Visit `http://localhost:3000` in your browser or API client — you'll see the welcome message with a full list of available endpoints.

To use a different port:

```bash
PORT=4000 npm start
```

---

## API Endpoint Documentation

Base URL: `http://localhost:3000`

All responses follow this envelope:

```json
{
  "success": true | false,
  "message": "Human-readable result",
  "data": { ... }
}
```

Validation errors return HTTP 400 with a field-level `errors` array:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "completionDate", "message": "completionDate must be a valid ISO 8601 date (YYYY-MM-DD)" }
  ]
}
```

---

### 1. List Courses

Retrieve a paginated list of courses, with optional search, filter and sort.

```
GET /api/courses
```

**Query Parameters**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `search` | string | — | Case-insensitive text search on name and description |
| `status` | string | — | Filter by `Not Started`, `In Progress`, or `Completed` |
| `sortBy` | string | `createdAt` | Sort field: `name`, `status`, `completionDate`, `createdAt` |
| `order` | string | `asc` | Sort direction: `asc` or `desc` |
| `page` | integer | `1` | Page number (minimum 1) |
| `limit` | integer | `10` | Results per page (minimum 1, maximum 100) |

**Example — get all courses**

```bash
curl http://localhost:3000/api/courses
```

**Example — search, filter and paginate**

```bash
curl "http://localhost:3000/api/courses?search=react&status=In%20Progress&sortBy=name&order=asc&page=1&limit=5"
```

**Response**

```json
{
  "success": true,
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "name": "React Fundamentals",
      "description": "Build UIs with React hooks and components",
      "completionDate": "2026-09-30",
      "status": "In Progress",
      "createdAt": "2026-05-24T10:00:00.000Z",
      "updatedAt": null
    }
  ],
  "total": 1,
  "page": 1,
  "totalPages": 1,
  "limit": 5
}
```

---

### 2. Get a Course

Retrieve a single course by its UUID.

```
GET /api/courses/:id
```

**Example**

```bash
curl http://localhost:3000/api/courses/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**Response — found (200)**

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "React Fundamentals",
    "description": "Build UIs with React hooks and components",
    "completionDate": "2026-09-30",
    "status": "In Progress",
    "createdAt": "2026-05-24T10:00:00.000Z",
    "updatedAt": null
  }
}
```

**Response — not found (404)**

```json
{
  "success": false,
  "message": "Course a1b2c3d4-e5f6-7890-abcd-ef1234567890 not found"
}
```

---

### 3. Create a Course

Create a new course. All four fields are required.

```
POST /api/courses
Content-Type: application/json
```

**Request Body**

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `name` | string | Yes | Non-empty, max 200 characters |
| `description` | string | Yes | Non-empty, max 1000 characters |
| `completionDate` | string | Yes | ISO 8601 date: `YYYY-MM-DD` |
| `status` | string | Yes | `Not Started`, `In Progress`, or `Completed` |

**Example**

```bash
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TypeScript for React Developers",
    "description": "Add static typing to your React projects with TypeScript",
    "completionDate": "2026-10-31",
    "status": "Not Started"
  }'
```

**Response — success (201)**

```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "name": "TypeScript for React Developers",
    "description": "Add static typing to your React projects with TypeScript",
    "completionDate": "2026-10-31",
    "status": "Not Started",
    "createdAt": "2026-05-24T11:30:00.000Z",
    "updatedAt": null
  }
}
```

**Response — validation error (400)**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "status", "message": "status must be one of: Not Started, In Progress, Completed" }
  ]
}
```

---

### 4. Update a Course

Partially update an existing course. All fields are optional — only the fields you send will be changed.

```
PUT /api/courses/:id
Content-Type: application/json
```

**Request Body** (all fields optional, same constraints as create)

| Field | Type | Constraints |
|-------|------|-------------|
| `name` | string | Non-empty, max 200 characters |
| `description` | string | Non-empty, max 1000 characters |
| `completionDate` | string | ISO 8601 date: `YYYY-MM-DD` |
| `status` | string | `Not Started`, `In Progress`, or `Completed` |

**Example — update status only**

```bash
curl -X PUT http://localhost:3000/api/courses/b2c3d4e5-f6a7-8901-bcde-f12345678901 \
  -H "Content-Type: application/json" \
  -d '{ "status": "In Progress" }'
```

**Example — update multiple fields**

```bash
curl -X PUT http://localhost:3000/api/courses/b2c3d4e5-f6a7-8901-bcde-f12345678901 \
  -H "Content-Type: application/json" \
  -d '{
    "completionDate": "2026-11-30",
    "status": "Completed"
  }'
```

**Response — success (200)**

```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": {
    "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "name": "TypeScript for React Developers",
    "description": "Add static typing to your React projects with TypeScript",
    "completionDate": "2026-11-30",
    "status": "Completed",
    "createdAt": "2026-05-24T11:30:00.000Z",
    "updatedAt": "2026-05-24T14:15:00.000Z"
  }
}
```

---

### 5. Delete a Course

Permanently delete a course. Returns the deleted course object.

```
DELETE /api/courses/:id
```

**Example**

```bash
curl -X DELETE http://localhost:3000/api/courses/b2c3d4e5-f6a7-8901-bcde-f12345678901
```

**Response — success (200)**

```json
{
  "success": true,
  "message": "Course deleted successfully",
  "data": {
    "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "name": "TypeScript for React Developers",
    "description": "Add static typing to your React projects with TypeScript",
    "completionDate": "2026-11-30",
    "status": "Completed",
    "createdAt": "2026-05-24T11:30:00.000Z",
    "updatedAt": "2026-05-24T14:15:00.000Z"
  }
}
```

**Response — not found (404)**

```json
{
  "success": false,
  "message": "Course b2c3d4e5-f6a7-8901-bcde-f12345678901 not found"
}
```

---

## Validation Rules

### Create (`POST`) — all fields required

| Field | Rule |
|-------|------|
| `name` | Required. String. Max 200 characters. |
| `description` | Required. String. Max 1000 characters. |
| `completionDate` | Required. ISO 8601 format: `YYYY-MM-DD`. |
| `status` | Required. Must be exactly: `Not Started`, `In Progress`, or `Completed`. |

### Update (`PUT`) — all fields optional

The same constraints apply when a field is included; omitting a field leaves it unchanged.

### List (`GET`) — query parameter rules

| Parameter | Rule |
|-----------|------|
| `status` | Must be `Not Started`, `In Progress`, or `Completed` if provided. |
| `page` | Must be a positive integer if provided. |
| `limit` | Must be between 1 and 100 if provided. |
| `sortBy` | Must be `name`, `status`, `completionDate`, or `createdAt` if provided. |
| `order` | Must be `asc` or `desc` if provided. |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Port the server listens on |
| `CORS_ORIGIN` | `*` | Allowed CORS origin. Set to your frontend URL in production, e.g. `https://myapp.com` |

**Example — production start**

```bash
PORT=8080 CORS_ORIGIN=https://myapp.com npm start
```

---

## Running Tests

The test suite uses Jest and Supertest. It runs against an isolated temporary data file and does not affect `data/courses.json`.

```bash
# Run all 20 tests once
npm test

# Run in watch mode (re-runs on file save)
npm run test:watch
```

**Test coverage includes:**

- Creating courses with valid and invalid data
- Listing with search, status filter, sort and pagination
- Getting a single course by UUID
- Partial updates with validation
- Deleting courses
- 404 responses for all unknown IDs
- CORS header presence

---

## Troubleshooting

### Port already in use

```
Error: listen EADDRINUSE: address already in use :::3000
```

Another process is using port 3000. Either stop it or start CodeCraftHub on a different port:

```bash
PORT=3001 npm start
```

To find and kill the process using port 3000:

```bash
# macOS / Linux
lsof -ti:3000 | xargs kill

# Windows (PowerShell)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

### Cannot find module errors

```
Error: Cannot find module 'express'
```

Dependencies have not been installed. Run:

```bash
npm install
```

---

### data/courses.json is corrupted or empty

If the data file contains invalid JSON, the server will return empty results on every request. Reset it:

```bash
echo "[]" > data/courses.json
```

If the `data/` directory is missing entirely:

```bash
mkdir -p data && echo "[]" > data/courses.json
```

---

### Request returns 400 with unexpected validation errors

Check that your request includes `Content-Type: application/json` in the headers and that the body is valid JSON. A missing header causes Express to skip body parsing.

```bash
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \     # <-- required
  -d '{ "name": "..." }'
```

---

### CORS errors in the browser

If a browser-based frontend receives a CORS error, the `CORS_ORIGIN` variable needs to match your frontend's origin exactly (no trailing slash):

```bash
CORS_ORIGIN=http://localhost:5173 npm start
```

---

### Tests fail with "jest: command not found"

Dev dependencies are missing. Install them:

```bash
npm install
```

If the problem persists, run Jest directly via npx:

```bash
npx jest --runInBand --forceExit
```

---

### A course update silently keeps old values

`PUT` only updates fields you include in the request body. Fields you omit are left unchanged by design (partial update). To clear a field like `completionDate`, explicitly send the new value.

---

## License

MIT — free to use for learning and personal projects.
