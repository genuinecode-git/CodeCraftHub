const express = require('express');
const router = express.Router();
const { readCourses, writeCourses, getCourseById, generateId } = require('../utils/fileHandler');

/**
 * GET /api/courses
 * Retrieve all courses
 */
router.get('/', (req, res) => {
  try {
    const courses = readCourses();
    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving courses',
      error: error.message
    });
  }
});

/**
 * GET /api/courses/:id
 * Retrieve a specific course by ID
 */
router.get('/:id', (req, res) => {
  try {
    const course = getCourseById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course with ID ${req.params.id} not found`
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving course',
      error: error.message
    });
  }
});

/**
 * POST /api/courses
 * Create a new course
 * Required fields: name, description, completionDate, status
 */
router.post('/', (req, res) => {
  try {
    const { name, description, completionDate, status } = req.body;
    
    // Validation
    if (!name || !description || !completionDate || !status) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, description, completionDate, status'
      });
    }
    
    // Validate status
    const validStatuses = ['Not Started', 'In Progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }
    
    const courses = readCourses();
    const newCourse = {
      id: generateId(),
      name,
      description,
      completionDate,
      status,
      createdAt: new Date().toISOString()
    };
    
    courses.push(newCourse);
    
    if (!writeCourses(courses)) {
      return res.status(500).json({
        success: false,
        message: 'Error saving course to file'
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: newCourse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating course',
      error: error.message
    });
  }
});

/**
 * PUT /api/courses/:id
 * Update an existing course
 */
router.put('/:id', (req, res) => {
  try {
    const { name, description, completionDate, status } = req.body;
    const courses = readCourses();
    const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));
    
    if (courseIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Course with ID ${req.params.id} not found`
      });
    }
    
    // Validate status if provided
    if (status) {
      const validStatuses = ['Not Started', 'In Progress', 'Completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        });
      }
    }
    
    // Update only provided fields
    const updatedCourse = {
      ...courses[courseIndex],
      ...(name && { name }),
      ...(description && { description }),
      ...(completionDate && { completionDate }),
      ...(status && { status }),
      updatedAt: new Date().toISOString()
    };
    
    courses[courseIndex] = updatedCourse;
    
    if (!writeCourses(courses)) {
      return res.status(500).json({
        success: false,
        message: 'Error updating course in file'
      });
    }
    
    res.json({
      success: true,
      message: 'Course updated successfully',
      data: updatedCourse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating course',
      error: error.message
    });
  }
});

/**
 * DELETE /api/courses/:id
 * Delete a course
 */
router.delete('/:id', (req, res) => {
  try {
    const courses = readCourses();
    const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));
    
    if (courseIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Course with ID ${req.params.id} not found`
      });
    }
    
    const deletedCourse = courses[courseIndex];
    courses.splice(courseIndex, 1);
    
    if (!writeCourses(courses)) {
      return res.status(500).json({
        success: false,
        message: 'Error deleting course from file'
      });
    }
    
    res.json({
      success: true,
      message: 'Course deleted successfully',
      data: deletedCourse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting course',
      error: error.message
    });
  }
});

module.exports = router;
