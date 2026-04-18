const path = require('path');
const fs = require('fs');

const CONTENT_PATH = path.join(process.cwd(), 'backend/data/content.json');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { services } = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf-8'));
    const { id } = req.query;
    if (id) {
      const item = services.ai_media.find((m) => m.id === id);
      if (!item) return res.status(404).json({ error: '작품을 찾을 수 없습니다.' });
      return res.status(200).json(item);
    }
    res.status(200).json({ items: services.ai_media });
  } catch {
    res.status(500).json({ error: '데이터 로드 실패' });
  }
};
