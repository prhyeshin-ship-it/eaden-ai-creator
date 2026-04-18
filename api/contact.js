const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const ALLOWED_INQUIRY_TYPES = [
  '영상 제작 문의',
  '아트 프린트 구매',
  '사진 복원 의뢰',
  '기타 파트너십',
];

async function sendEmail(submission) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Eaden 문의 알림" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL || 'pr.hyeshin@gmail.com',
    subject: `[Eaden] 새 문의: ${submission.inquiry_type} — ${submission.name}`,
    html: `
      <h2>새로운 문의가 접수되었습니다.</h2>
      <table cellpadding="8">
        <tr><td><b>문의 유형</b></td><td>${submission.inquiry_type}</td></tr>
        <tr><td><b>이름</b></td><td>${submission.name}</td></tr>
        <tr><td><b>연락처</b></td><td>${submission.contact}</td></tr>
        <tr><td><b>메시지</b></td><td>${submission.message}</td></tr>
        <tr><td><b>접수 시각</b></td><td>${submission.created_at}</td></tr>
      </table>
    `,
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { inquiry_type, name, contact, message } = req.body || {};

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

  const submission = {
    id: uuidv4(),
    inquiry_type,
    name: name.trim(),
    contact: contact.trim(),
    message: message.trim(),
    created_at: new Date().toISOString(),
  };

  sendEmail(submission).catch((err) => console.error('Email error:', err));

  res.status(201).json({
    message: '문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
    id: submission.id,
  });
};
