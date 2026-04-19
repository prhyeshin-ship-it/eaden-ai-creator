const ALLOWED_INQUIRY_TYPES = [
  '영상 제작 문의',
  '아트 프린트 구매',
  '사진 복원 의뢰',
  '기타 파트너십',
];

function validateContact(req, res, next) {
  const { inquiry_type, name, contact, message } = req.body;

  if (!inquiry_type || !name || !contact || !message) {
    return res.status(400).json({ error: '모든 필드를 입력해주세요.' });
  }

  if (!ALLOWED_INQUIRY_TYPES.includes(inquiry_type)) {
    return res.status(400).json({ error: '유효하지 않은 문의 유형입니다.' });
  }

  if (name.trim().length < 2) {
    return res.status(400).json({ error: '이름은 2자 이상 입력해주세요.' });
  }

  if (message.trim().length < 10) {
    return res.status(400).json({ error: '메시지는 10자 이상 입력해주세요.' });
  }

  next();
}

module.exports = { validateContact };
