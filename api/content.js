const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  const [{ data: media }, { data: images }] = await Promise.all([
    supabase.from('portfolio_media').select('*').order('sort_order'),
    supabase.from('portfolio_images').select('*').order('sort_order'),
  ]);

  res.status(200).json({
    site_info: {
      brand_name: 'Eaden Ai Creator',
      main_tagline: '감각을 설계하는 AI 미디어, 몰입에서 이완으로',
    },
    services: {
      ai_media: media || [],
      ai_image: images || [],
    },
    contact: {
      inquiry_types: ['영상 제작 문의', '아트 프린트 구매', '사진 복원 의뢰', '기타 파트너십'],
    },
  });
};
