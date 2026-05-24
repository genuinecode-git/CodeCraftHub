const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const coursesRouter = require('./routes/courses');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────

// CORS — allow all origins in development; lock down via env in production
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ── Routes ────────────────────────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to CodeCraftHub API',
    version: '2.0.0',
    endpoints: {
      'GET  /api/courses':      'List courses (search, filter, sort, paginate)',
      'GET  /api/courses/:id':  'Get a course by UUID',
      'POST /api/courses':      'Create a course',
      'PUT  /api/courses/:id':  'Update a course (partial)',
      'DELETE /api/courses/:id':'Delete a course',
    },
    queryParams: {
      search:  'text search on name / description',
      status:  'Not Started | In Progress | Completed',
      sortBy:  'name | status | completionDate | createdAt',
      order:   'asc | desc',
      page:    'page number (default 1)',
      limit:   'items per page, max 100 (default 10)',
    },
  });
});

app.use('/api/courses', coursesRouter);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `${req.method} ${req.path} not found` });
});

// ── Global error handler ──────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\nCodeCraftHub v2.0 running on http://localhost:${PORT}\n`);
  });
}

module.exports = app; // export for tests
