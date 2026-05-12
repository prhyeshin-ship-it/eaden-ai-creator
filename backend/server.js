require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const contactRouter = require('./routes/contact');
const portfolioRouter = require('./routes/portfolio');
const contentRouter = require('./routes/content');

const app = express();
const PORT = process.env.PORT || 4000;

// CORS – 로컬 개발 전체 허용, 프로덕션 origin 화이트리스트
const productionOrigins = process.env.FRONTEND_ORIGIN
  ? process.env.FRONTEND_ORIGIN.split(',').map((o) => o.trim())
  : [];

const isLocalOrigin = (origin) =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) || origin === 'null';

app.use(
  cors({
    origin: (origin, cb) => {
      // 서버-to-서버 또는 같은 출처
      if (!origin) return cb(null, true);
      // 로컬 개발 환경 (포트 무관)
      if (isLocalOrigin(origin)) return cb(null, true);
      // 명시된 프로덕션 origin
      if (productionOrigins.includes(origin)) return cb(null, true);
      cb(null, false); // Error 대신 false → cors 패키지가 표준 거부 처리
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200, // IE11 호환
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
