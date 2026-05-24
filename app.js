// ========================================
// CodeCraftHub - Main Express Application
// ========================================
// A simple learning platform to track courses
// This file sets up the Express server and all CRUD endpoints

const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = 5000;

// Path to the JSON data file
const DATA_FILE = path.join(__dirname, 'courses.json');

// ========================================
// MIDDLEWARE - Process incoming requests
// ========================================

// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded data (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Read all courses from the JSON file
 * Creates an empty array if file doesn't exist
 */
function readCoursesFromFile() {
  try {
    // Check if file exists
    if (!fs.existsSync(DATA_FILE)) {
      // Create empty file if it doesn't exist
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
      return [];
    }
    
    // Read and parse the JSON file
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading courses file:', error);
    return [];
  }
}

/**
 * Write courses to the JSON file
 */
function writeCoursesToFile(courses) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(courses, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing to courses file:', error);
    return false;
  }
}

/**
 * Generate the next unique ID
 * Gets the highest existing ID and adds 1
 */
function generateNextId() {
  const courses = readCoursesFromFile();
  
  // If no courses exist, start with ID 1
  if (courses.length === 0) {
    return 1;
  }
  
  // Find the maximum ID and add 1
  const maxId = Math.max(...courses.map(course => course.id));
  return maxId + 1;
}

/**
 * Validate course data
 * Returns an error message if validation fails, null if valid
 */
function validateCourse(courseData) {
  const { name, description, target_date, status } = courseData;
  
  // Check for required fields
  if (!name || !description || !target_date || !status) {
    return 'Missing required fields: name, description, target_date, status';
  }
  
  // Validate name (must be a string and not empty)
  if (typeof name !== 'string' || name.trim() === '') {
    return 'Course name must be a non-empty string';
  }
  
  // Validate description (must be a string and not empty)
  if (typeof description !== 'string' || description.trim() === '') {
    return 'Course description must be a non-empty string';
  }
  
  // Validate target_date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(target_date)) {
    return 'Target date must be in YYYY-MM-DD format';
  }
  
  // Validate that target_date is a valid date
  const dateObj = new Date(target_date);
  if (isNaN(dateObj.getTime())) {
    return 'Target date is not a valid date';
  }
  
  // Validate status is one of the allowed values
  const validStatuses = ['Not Started', 'In Progress', 'Completed'];
  if (!validStatuses.includes(status)) {
    return `Status must be one of: ${validStatuses.join(', ')}`;
  }
  
  return null; // No errors, validation passed
}

// ========================================
// ROOT ENDPOINT
// ========================================

/**
 * GET / - Welcome message with API documentation
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to CodeCraftHub API',
    description: 'A simple learning platform to track courses',
    version: '1.0.0',
    endpoints: {
      'POST /api/courses': 'Create a new course',
      'GET /api/courses': 'Get all courses',
      'GET /api/courses/:id': 'Get a specific course by ID',
      'PUT /api/courses/:id': 'Update a course',
      'DELETE /api/courses/:id': 'Delete a course'
    }
  });
});

// ========================================
// COURSE API ENDPOINTS
// ========================================

/**
 * POST /api/courses
 * Create a new course
 * 
 * Request body example:
 * {
 *   "name": "JavaScript Basics",
 *   "description": "Learn JavaScript fundamentals",
 *   "target_date": "2026-06-30",
 *   "status": "Not Started"
 * }
 */
app.post('/api/courses', (req, res) => {
  // Get course data from request body
  const { name, description, target_date, status } = req.body;
  
  // Validate the course data
  const validationError = validateCourse(req.body);
  if (validationError) {
    return res.status(400).json({
      success: false,
      error: validationError
    });
  }
  
  try {
    // Read existing courses
    const courses = readCoursesFromFile();
    
    // Create new course object
    const newCourse = {
      id: generateNextId(),
      name: name.trim(),
      description: description.trim(),
      target_date: target_date,
      status: status,
      created_at: new Date().toISOString()
    };
    
    // Add new course to array
    courses.push(newCourse);
    
    // Write updated courses to file
    const success = writeCoursesToFile(courses);
    
    if (!success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to save course to file'
      });
    }
    
    // Return the created course (HTTP 201 = Created)
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: newCourse
    });
  } catch (error) {
    console.error('Error in POST /api/courses:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * GET /api/courses
 * Get all courses
 */
app.get('/api/courses', (req, res) => {
  try {
    // Read courses from file
    const courses = readCoursesFromFile();
    
    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    console.error('Error in GET /api/courses:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * GET /api/courses/:id
 * Get a specific course by ID
 * 
 * Example: GET /api/courses/1
 */
app.get('/api/courses/:id', (req, res) => {
  try {
    // Get ID from URL parameter
    const courseId = parseInt(req.params.id);
    
    // Validate ID is a number
    if (isNaN(courseId)) {
      return res.status(400).json({
        success: false,
        error: 'Course ID must be a number'
      });
    }
    
    // Read all courses
    const courses = readCoursesFromFile();
    
    // Find course with matching ID
    const course = courses.find(c => c.id === courseId);
    
    // Return 404 if course not found
    if (!course) {
      return res.status(404).json({
        success: false,
        error: `Course with ID ${courseId} not found`
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error in GET /api/courses/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * PUT /api/courses/:id
 * Update a course
 * 
 * Request body (all fields optional):
 * {
 *   "name": "Updated name",
 *   "description": "Updated description",
 *   "target_date": "2026-07-15",
 *   "status": "In Progress"
 * }
 */
app.put('/api/courses/:id', (req, res) => {
  try {
    // Get ID from URL parameter
    const courseId = parseInt(req.params.id);
    
    // Validate ID is a number
    if (isNaN(courseId)) {
      return res.status(400).json({
        success: false,
        error: 'Course ID must be a number'
      });
    }
    
    // Read all courses
    const courses = readCoursesFromFile();
    
    // Find the course to update
    const courseIndex = courses.findIndex(c => c.id === courseId);
    
    // Return 404 if course not found
    if (courseIndex === -1) {
      return res.status(404).json({
        success: false,
        error: `Course with ID ${courseId} not found`
      });
    }
    
    // Prepare updated course data (merge with existing data)
    const updatedData = {
      ...courses[courseIndex],
      // Update only provided fields
      ...(req.body.name !== undefined && { name: req.body.name.trim() }),
      ...(req.body.description !== undefined && { description: req.body.description.trim() }),
      ...(req.body.target_date !== undefined && { target_date: req.body.target_date }),
      ...(req.body.status !== undefined && { status: req.body.status })
    };
    
    // Validate the updated course data
    const validationError = validateCourse(updatedData);
    if (validationError) {
      return res.status(400).json({
        success: false,
        error: validationError
      });
    }
    
    // Update the course in the array
    courses[courseIndex] = updatedData;
    
    // Write updated courses to file
    const success = writeCoursesToFile(courses);
    
    if (!success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to save updated course to file'
      });
    }
    
    res.json({
      success: true,
      message: 'Course updated successfully',
      data: updatedData
    });
  } catch (error) {
    console.error('Error in PUT /api/courses/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * DELETE /api/courses/:id
 * Delete a course
 * 
 * Example: DELETE /api/courses/1
 */
app.delete('/api/courses/:id', (req, res) => {
  try {
    // Get ID from URL parameter
    const courseId = parseInt(req.params.id);
    
    // Validate ID is a number
    if (isNaN(courseId)) {
      return res.status(400).json({
        success: false,
        error: 'Course ID must be a number'
      });
    }
    
    // Read all courses
    const courses = readCoursesFromFile();
    
    // Find the course to delete
    const courseIndex = courses.findIndex(c => c.id === courseId);
    
    // Return 404 if course not found
    if (courseIndex === -1) {
      return res.status(404).json({
        success: false,
        error: `Course with ID ${courseId} not found`
      });
    }
    
    // Store the deleted course before removing it
    const deletedCourse = courses[courseIndex];
    
    // Remove the course from the array
    courses.splice(courseIndex, 1);
    
    // Write updated courses to file
    const success = writeCoursesToFile(courses);
    
    if (!success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to delete course from file'
      });
    }
    
    res.json({
      success: true,
      message: 'Course deleted successfully',
      data: deletedCourse
    });
  } catch (error) {
    console.error('Error in DELETE /api/courses/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// ========================================
// ERROR HANDLING
// ========================================

/**
 * 404 Handler - catch all undefined routes
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.path} not found`
  });
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════╗');
  console.log('║     CodeCraftHub Server Started    ║');
  console.log('╚════════════════════════════════════╝');
  console.log('');
  console.log(`📚 Server running on: http://localhost:${PORT}`);
  console.log(`📁 Data file: ${DATA_FILE}`);
  console.log('');
  console.log('Available endpoints:');
  console.log(`  POST   http://localhost:${PORT}/api/courses`);
  console.log(`  GET    http://localhost:${PORT}/api/courses`);
  console.log(`  GET    http://localhost:${PORT}/api/courses/:id`);
  console.log(`  PUT    http://localhost:${PORT}/api/courses/:id`);
  console.log(`  DELETE http://localhost:${PORT}/api/courses/:id`);
  console.log('');
});

// Export the app (useful for testing)
module.exports = app;
