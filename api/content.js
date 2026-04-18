const path = require('path');
const fs = require('fs');

const CONTENT_PATH = path.join(process.cwd(), 'backend/data/content.json');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const content = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf-8'));
    res.status(200).json(content);
  } catch {
    res.status(500).json({ error: '콘텐츠 로드 실패' });
  }
};
