const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const CONTENT_PATH = path.join(__dirname, '../data/content.json');

function getContent() {
  return JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf-8'));
}

// GET /api/portfolio/media
router.get('/media', (req, res) => {
  const { services } = getContent();
  res.json({ items: services.ai_media });
});

// GET /api/portfolio/media/:id
router.get('/media/:id', (req, res) => {
  const { services } = getContent();
  const item = services.ai_media.find((m) => m.id === req.params.id);
  if (!item) return res.status(404).json({ error: '작품을 찾을 수 없습니다.' });
  res.json(item);
});

// GET /api/portfolio/images
router.get('/images', (req, res) => {
  const { services } = getContent();
  res.json({ items: services.ai_image });
});

// GET /api/portfolio/images/:id
router.get('/images/:id', (req, res) => {
  const { services } = getContent();
  const item = services.ai_image.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: '작품을 찾을 수 없습니다.' });
  res.json(item);
});

module.exports = router;
