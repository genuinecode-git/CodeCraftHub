/**
 * Validation Middleware — Strategy Pattern
 *
 * Centralises all request validation so routes stay clean.
 * Each exported function is an array of express-validator rules + the
 * handleValidation error-collector, making them composable.
 */

const { body, query, validationResult } = require('express-validator');
const { VALID_STATUSES } = require('../repositories/courseRepository');

/**
 * Collect express-validator errors and short-circuit with 400 if any exist.
 */
function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}

/** Rules for creating a course (all fields required). */
const validateCreate = [
  body('name')
    .trim()
    .notEmpty().withMessage('name is required')
    .isLength({ max: 200 }).withMessage('name must be 200 characters or fewer'),

  body('description')
    .trim()
    .notEmpty().withMessage('description is required')
    .isLength({ max: 1000 }).withMessage('description must be 1000 characters or fewer'),

  body('completionDate')
    .notEmpty().withMessage('completionDate is required')
    .isISO8601().withMessage('completionDate must be a valid ISO 8601 date (YYYY-MM-DD)'),

  body('status')
    .notEmpty().withMessage('status is required')
    .isIn(VALID_STATUSES).withMessage(`status must be one of: ${VALID_STATUSES.join(', ')}`),

  handleValidation,
];

/** Rules for updating a course (all fields optional, but validated when present). */
const validateUpdate = [
  body('name')
    .optional()
    .trim()
    .notEmpty().withMessage('name must not be blank')
    .isLength({ max: 200 }).withMessage('name must be 200 characters or fewer'),

  body('description')
    .optional()
    .trim()
    .notEmpty().withMessage('description must not be blank')
    .isLength({ max: 1000 }).withMessage('description must be 1000 characters or fewer'),

  body('completionDate')
    .optional()
    .isISO8601().withMessage('completionDate must be a valid ISO 8601 date (YYYY-MM-DD)'),

  body('status')
    .optional()
    .isIn(VALID_STATUSES).withMessage(`status must be one of: ${VALID_STATUSES.join(', ')}`),

  handleValidation,
];

/** Rules for query-string parameters on GET /api/courses */
const validateQuery = [
  query('status')
    .optional()
    .isIn(VALID_STATUSES).withMessage(`status must be one of: ${VALID_STATUSES.join(', ')}`),

  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100'),

  query('sortBy')
    .optional()
    .isIn(['name', 'status', 'completionDate', 'createdAt'])
    .withMessage('sortBy must be one of: name, status, completionDate, createdAt'),

  query('order')
    .optional()
    .isIn(['asc', 'desc']).withMessage('order must be asc or desc'),

  handleValidation,
];

module.exports = { validateCreate, validateUpdate, validateQuery };
