const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method not allowed' });

  // Password auth
  const authHeader = req.headers.authorization || '';
  const expectedPassword = process.env.ADMIN_PASSWORD || 'eaden-admin123!';
  if (authHeader !== `Bearer ${expectedPassword}`) {
    return res.status(401).json({ error: 'Unauthorized: Invalid password' });
  }

  // body에서 ids 배열 파싱
  const { ids } = req.body || {};
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: '삭제할 항목의 id 배열이 필요합니다.' });
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    const { error } = await supabase
      .from('contacts')
      .delete()
      .in('id', ids);

    if (error) {
      console.error('Supabase delete error:', error);
      return res.status(500).json({ error: '삭제 중 오류가 발생했습니다.' });
    }

    return res.status(200).json({ success: true, deleted: ids.length });
  } catch (err) {
    console.error('Delete API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
