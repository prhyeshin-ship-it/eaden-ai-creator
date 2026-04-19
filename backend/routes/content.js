const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const CONTENT_PATH = path.join(__dirname, '../data/content.json');

// GET /api/content  – FE에서 초기 데이터 로드 시 사용
router.get('/', (req, res) => {
  try {
    const content = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf-8'));
    res.json(content);
  } catch {
    res.status(500).json({ error: '콘텐츠 로드 실패' });
  }
});

module.exports = router;
