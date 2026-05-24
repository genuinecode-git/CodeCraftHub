const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/courses.json');

/**
 * Ensure the data file exists; initialise with empty array if missing.
 */
function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

/**
 * Read all courses from the JSON file.
 * @returns {Array}
 */
function readCourses() {
  ensureFile();
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading courses file:', error);
    return [];
  }
}

/**
 * Write courses array back to the JSON file.
 * @param {Array} courses
 * @returns {boolean}
 */
function writeCourses(courses) {
  ensureFile();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(courses, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing courses file:', error);
    return false;
  }
}

module.exports = { readCourses, writeCourses };
