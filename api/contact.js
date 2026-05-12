const { createClient } = require('@supabase/supabase-js');

const ALLOWED_INQUIRY_TYPES = [
  '영상 제작 문의',
  '아트 프린트 구매',
  '사진 복원 의뢰',
  '기타 파트너십',
];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { inquiry_type, name, contact, message } = req.body || {};

  if (!inquiry_type || !name || !contact || !message)
    return res.status(400).json({ error: '모든 필드를 입력해주세요.' });
  if (!ALLOWED_INQUIRY_TYPES.includes(inquiry_type))
    return res.status(400).json({ error: '유효하지 않은 문의 유형입니다.' });
  if (name.trim().length < 2)
    return res.status(400).json({ error: '이름은 2자 이상 입력해주세요.' });
  if (message.trim().length < 10)
    return res.status(400).json({ error: '메시지는 10자 이상 입력해주세요.' });

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { data, error } = await supabase.from('contacts').insert({
    inquiry_type,
    name: name.trim(),
    contact: contact.trim(),
    message: message.trim(),
  }).select('id').single();

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: '저장 중 오류가 발생했습니다.' });
  }

  res.status(201).json({
    message: '문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
    id: data.id,
  });
};
