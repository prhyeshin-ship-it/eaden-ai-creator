const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  const { id } = req.query;

  if (id) {
    const { data, error } = await supabase
      .from('portfolio_images')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return res.status(404).json({ error: '작품을 찾을 수 없습니다.' });
    return res.status(200).json(data);
  }

  const { data, error } = await supabase
    .from('portfolio_images')
    .select('*')
    .order('sort_order');

  if (error) return res.status(500).json({ error: '데이터 로드 실패' });
  res.status(200).json({ items: data });
};
