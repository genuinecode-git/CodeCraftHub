/**
 * Course API — Integration Tests (Jest + Supertest)
 *
 * Uses the real repository wired to a temp data file so tests are isolated
 * from production data.
 */

const request  = require('supertest');
const path     = require('path');
const fs       = require('fs');

// Point the file handler at a temp file before requiring the app
const TEST_DATA = path.join(__dirname, '../data/test-courses.json');
jest.mock('../utils/fileHandler', () => {
  const fs   = require('fs');
  const path = require('path');
  const FILE = path.join(__dirname, '../data/test-courses.json');

  function ensureFile() {
    const dir = path.dirname(FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, '[]', 'utf8');
  }

  return {
    readCourses() {
      ensureFile();
      try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); }
      catch { return []; }
    },
    writeCourses(courses) {
      ensureFile();
      try { fs.writeFileSync(FILE, JSON.stringify(courses, null, 2), 'utf8'); return true; }
      catch { return false; }
    },
  };
});

const app = require('../server');

// ── Helpers ────────────────────────────────────────────────────────────────────
const VALID_COURSE = {
  name: 'JavaScript Basics',
  description: 'Learn the fundamentals of JavaScript',
  completionDate: '2026-12-31',
  status: 'Not Started',
};

async function createCourse(overrides = {}) {
  const res = await request(app).post('/api/courses').send({ ...VALID_COURSE, ...overrides });
  return res;
}

// ── Setup / Teardown ───────────────────────────────────────────────────────────
beforeEach(() => {
  // Reset test data file before each test
  if (fs.existsSync(TEST_DATA)) fs.writeFileSync(TEST_DATA, '[]', 'utf8');
});

afterAll(() => {
  if (fs.existsSync(TEST_DATA)) fs.unlinkSync(TEST_DATA);
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/courses
// ─────────────────────────────────────────────────────────────────────────────
describe('POST /api/courses', () => {
  test('creates a course with valid data', async () => {
    const res = await createCourse();
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject({
      name: VALID_COURSE.name,
      status: 'Not Started',
    });
    expect(res.body.data.id).toBeDefined();       // UUID assigned
    expect(res.body.data.createdAt).toBeDefined();
  });

  test('rejects missing required fields', async () => {
    const res = await request(app).post('/api/courses').send({ name: 'Only Name' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeInstanceOf(Array);
    expect(res.body.errors.length).toBeGreaterThan(0);
  });

  test('rejects invalid status', async () => {
    const res = await createCourse({ status: 'Pending' });
    expect(res.status).toBe(400);
    expect(res.body.errors.some(e => e.field === 'status')).toBe(true);
  });

  test('rejects invalid completionDate', async () => {
    const res = await createCourse({ completionDate: 'not-a-date' });
    expect(res.status).toBe(400);
    expect(res.body.errors.some(e => e.field === 'completionDate')).toBe(true);
  });

  test('rejects name over 200 characters', async () => {
    const res = await createCourse({ name: 'x'.repeat(201) });
    expect(res.status).toBe(400);
    expect(res.body.errors.some(e => e.field === 'name')).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/courses
// ─────────────────────────────────────────────────────────────────────────────
describe('GET /api/courses', () => {
  beforeEach(async () => {
    await createCourse({ name: 'React Fundamentals', status: 'In Progress' });
    await createCourse({ name: 'Node.js Deep Dive', status: 'Completed' });
    await createCourse({ name: 'TypeScript Basics', status: 'Not Started' });
  });

  test('returns all courses with pagination metadata', async () => {
    const res = await request(app).get('/api/courses');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(3);
    expect(res.body.total).toBe(3);
    expect(res.body.page).toBe(1);
    expect(res.body.totalPages).toBeDefined();
  });

  test('filters by status', async () => {
    const res = await request(app).get('/api/courses?status=Completed');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].status).toBe('Completed');
  });

  test('searches by name', async () => {
    const res = await request(app).get('/api/courses?search=react');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].name).toBe('React Fundamentals');
  });

  test('paginates correctly', async () => {
    const res = await request(app).get('/api/courses?page=1&limit=2');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.totalPages).toBe(2);
  });

  test('rejects invalid status query param', async () => {
    const res = await request(app).get('/api/courses?status=Unknown');
    expect(res.status).toBe(400);
  });

  test('rejects invalid page param', async () => {
    const res = await request(app).get('/api/courses?page=0');
    expect(res.status).toBe(400);
  });

  test('sorts by name ascending', async () => {
    const res = await request(app).get('/api/courses?sortBy=name&order=asc');
    expect(res.status).toBe(200);
    const names = res.body.data.map(c => c.name);
    expect(names).toEqual([...names].sort());
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/courses/:id
// ─────────────────────────────────────────────────────────────────────────────
describe('GET /api/courses/:id', () => {
  test('returns course by UUID', async () => {
    const created = (await createCourse()).body.data;
    const res = await request(app).get(`/api/courses/${created.id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(created.id);
  });

  test('returns 404 for unknown UUID', async () => {
    const res = await request(app).get('/api/courses/00000000-0000-0000-0000-000000000000');
    expect(res.status).toBe(404);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/courses/:id
// ─────────────────────────────────────────────────────────────────────────────
describe('PUT /api/courses/:id', () => {
  test('partially updates a course', async () => {
    const created = (await createCourse()).body.data;
    const res = await request(app)
      .put(`/api/courses/${created.id}`)
      .send({ status: 'In Progress' });
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('In Progress');
    expect(res.body.data.name).toBe(VALID_COURSE.name); // unchanged
    expect(res.body.data.updatedAt).not.toBeNull();
  });

  test('rejects invalid status on update', async () => {
    const created = (await createCourse()).body.data;
    const res = await request(app)
      .put(`/api/courses/${created.id}`)
      .send({ status: 'Abandoned' });
    expect(res.status).toBe(400);
  });

  test('returns 404 for unknown UUID', async () => {
    const res = await request(app)
      .put('/api/courses/00000000-0000-0000-0000-000000000000')
      .send({ status: 'Completed' });
    expect(res.status).toBe(404);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/courses/:id
// ─────────────────────────────────────────────────────────────────────────────
describe('DELETE /api/courses/:id', () => {
  test('deletes a course and returns it', async () => {
    const created = (await createCourse()).body.data;
    const del = await request(app).delete(`/api/courses/${created.id}`);
    expect(del.status).toBe(200);
    expect(del.body.data.id).toBe(created.id);

    // Confirm it's gone
    const get = await request(app).get(`/api/courses/${created.id}`);
    expect(get.status).toBe(404);
  });

  test('returns 404 for unknown UUID', async () => {
    const res = await request(app).delete('/api/courses/00000000-0000-0000-0000-000000000000');
    expect(res.status).toBe(404);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// CORS headers
// ─────────────────────────────────────────────────────────────────────────────
describe('CORS', () => {
  test('includes Access-Control-Allow-Origin header', async () => {
    const res = await request(app).get('/api/courses');
    expect(res.headers['access-control-allow-origin']).toBeDefined();
  });
});
