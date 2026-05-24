const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/courses.json');

/**
 * Read all courses from the JSON file
 * @returns {Array} Array of course objects
 */
function readCourses() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading courses file:', error);
    return [];
  }
}

/**
 * Write courses to the JSON file
 * @param {Array} courses - Array of course objects
 * @returns {boolean} True if successful, false otherwise
 */
function writeCourses(courses) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(courses, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing courses file:', error);
    return false;
  }
}

/**
 * Get a course by ID
 * @param {number} id - Course ID
 * @returns {Object|null} Course object or null if not found
 */
function getCourseById(id) {
  const courses = readCourses();
  return courses.find(course => course.id === parseInt(id)) || null;
}

/**
 * Generate a unique ID for a new course
 * @returns {number} Unique ID
 */
function generateId() {
  const courses = readCourses();
  if (courses.length === 0) return 1;
  return Math.max(...courses.map(c => c.id)) + 1;
}

module.exports = {
  readCourses,
  writeCourses,
  getCourseById,
  generateId
};
