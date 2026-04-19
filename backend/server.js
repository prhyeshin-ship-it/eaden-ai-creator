require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const contactRouter = require('./routes/contact');
const portfolioRouter = require('./routes/portfolio');
const contentRouter = require('./routes/content');

const app = express();
const PORT = process.env.PORT || 4000;

// CORS – 안티그래비티 FE origin 허용
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
  'http://localhost:5500',   // Live Server (VS Code)
  'http://127.0.0.1:5500',
  'null',                    // 로컬 file:// 열기
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error('CORS not allowed'));
    },
    methods: ['GET', 'POST'],
  })
);

app.use(express.json());

// 정적 에셋 서빙 (homepage/assets → /assets)
app.use(
  '/assets',
  express.static(path.join(__dirname, '../homepage/assets'), {
    maxAge: '7d',
  })
);

// API Routes
app.use('/api/contact', contactRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/content', contentRouter);

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'eaden-backend' }));

// 404
app.use((_, res) => res.status(404).json({ error: 'Not found' }));

// Error handler
app.use((err, req, res, _next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Eaden Backend running on http://localhost:${PORT}`);
});
