/**
 * CourseRepository — Repository Pattern
 *
 * All data-access logic lives here. Routes never touch the file system.
 * Swapping to a database only requires replacing this file.
 */

const { v4: uuidv4 } = require('uuid');
const { readCourses, writeCourses } = require('../utils/fileHandler');

const VALID_STATUSES = ['Not Started', 'In Progress', 'Completed'];

/**
 * Return all courses with optional filtering, search and pagination.
 * @param {object} options
 * @returns {{ data, total, page, totalPages, limit }}
 */
function findAll({ status, search, sortBy = 'createdAt', order = 'asc', page = 1, limit = 10 } = {}) {
  let courses = readCourses();

  if (status) courses = courses.filter(c => c.status === status);

  if (search) {
    const q = search.toLowerCase();
    courses = courses.filter(
      c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }

  const SORTABLE = ['name', 'status', 'completionDate', 'createdAt'];
  const field = SORTABLE.includes(sortBy) ? sortBy : 'createdAt';
  const dir = order === 'desc' ? -1 : 1;
  courses = [...courses].sort((a, b) => {
    const av = (a[field] || '').toString().toLowerCase();
    const bv = (b[field] || '').toString().toLowerCase();
    return av < bv ? -dir : av > bv ? dir : 0;
  });

  const safeLimit = Math.min(Math.max(parseInt(limit) || 10, 1), 100);
  const safePage  = Math.max(parseInt(page)  || 1, 1);
  const total     = courses.length;
  const totalPages = Math.ceil(total / safeLimit) || 1;
  const data = courses.slice((safePage - 1) * safeLimit, safePage * safeLimit);

  return { data, total, page: safePage, totalPages, limit: safeLimit };
}

function findById(id) {
  return readCourses().find(c => c.id === id) || null;
}

function create({ name, description, completionDate, status }) {
  const courses = readCourses();
  const newCourse = {
    id: uuidv4(),
    name: name.trim(),
    description: description.trim(),
    completionDate,
    status,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };
  courses.push(newCourse);
  writeCourses(courses);
  return newCourse;
}

function update(id, changes) {
  const courses = readCourses();
  const idx = courses.findIndex(c => c.id === id);
  if (idx === -1) return null;

  const allowed = ['name', 'description', 'completionDate', 'status'];
  const patch = {};
  for (const key of allowed) {
    if (changes[key] !== undefined) {
      patch[key] = typeof changes[key] === 'string' ? changes[key].trim() : changes[key];
    }
  }

  const updated = { ...courses[idx], ...patch, updatedAt: new Date().toISOString() };
  courses[idx] = updated;
  writeCourses(courses);
  return updated;
}

function remove(id) {
  const courses = readCourses();
  const idx = courses.findIndex(c => c.id === id);
  if (idx === -1) return null;
  const [deleted] = courses.splice(idx, 1);
  writeCourses(courses);
  return deleted;
}

module.exports = { findAll, findById, create, update, remove, VALID_STATUSES };
