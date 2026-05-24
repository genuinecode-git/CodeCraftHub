/**
 * Course Routes
 *
 * Thin controller layer — delegates all business/data logic to the repository
 * and all input validation to middleware.
 */

const express = require('express');
const router  = express.Router();
const repo    = require('../repositories/courseRepository');
const { validateCreate, validateUpdate, validateQuery } = require('../middleware/validateCourse');

/**
 * GET /api/courses/stats
 * Returns aggregate statistics: total courses and breakdown by status.
 * Must be declared before /:id so Express doesn't treat "stats" as an id.
 */
router.get('/stats', (req, res) => {
  try {
    const stats = repo.getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving stats', error: err.message });
  }
});

/**
 * GET /api/courses
 * List courses with optional search, filter, sort and pagination.
 *
 * Query params:
 *   search      - text search on name / description
 *   status      - filter by status (Not Started | In Progress | Completed)
 *   sortBy      - name | status | completionDate | createdAt  (default: createdAt)
 *   order       - asc | desc  (default: asc)
 *   page        - page number  (default: 1)
 *   limit       - items per page, max 100  (default: 10)
 */
router.get('/', validateQuery, (req, res) => {
  try {
    const { search, status, sortBy, order, page, limit } = req.query;
    const result = repo.findAll({ search, status, sortBy, order, page, limit });
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving courses', error: err.message });
  }
});

/**
 * GET /api/courses/:id
 */
router.get('/:id', (req, res) => {
  try {
    const course = repo.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: `Course ${req.params.id} not found` });
    }
    res.json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving course', error: err.message });
  }
});

/**
 * POST /api/courses
 */
router.post('/', validateCreate, (req, res) => {
  try {
    const { name, description, completionDate, status } = req.body;
    const course = repo.create({ name, description, completionDate, status });
    res.status(201).json({ success: true, message: 'Course created successfully', data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating course', error: err.message });
  }
});

/**
 * PUT /api/courses/:id
 */
router.put('/:id', validateUpdate, (req, res) => {
  try {
    const course = repo.update(req.params.id, req.body);
    if (!course) {
      return res.status(404).json({ success: false, message: `Course ${req.params.id} not found` });
    }
    res.json({ success: true, message: 'Course updated successfully', data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating course', error: err.message });
  }
});

/**
 * DELETE /api/courses/:id
 */
router.delete('/:id', (req, res) => {
  try {
    const course = repo.remove(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: `Course ${req.params.id} not found` });
    }
    res.json({ success: true, message: 'Course deleted successfully', data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting course', error: err.message });
  }
});

module.exports = router;
