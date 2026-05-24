const express = require('express');
const path = require('path');
const coursesRouter = require('./routes/courses');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (optional - for future frontend)
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/courses', coursesRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to CodeCraftHub - A Learning Platform API',
    endpoints: {
      'GET /api/courses': 'Get all courses',
      'GET /api/courses/:id': 'Get a specific course',
      'POST /api/courses': 'Create a new course',
      'PUT /api/courses/:id': 'Update a course',
      'DELETE /api/courses/:id': 'Delete a course'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`CodeCraftHub server is running on http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}`);
});
