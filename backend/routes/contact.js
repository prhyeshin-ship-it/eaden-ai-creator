const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const { validateContact } = require('../middleware/validate');

const router = express.Router();
const SUBMISSIONS_PATH = path.join(__dirname, '../data/submissions.json');

function readSubmissions() {
  const raw = fs.readFileSync(SUBMISSIONS_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeSubmissions(data) {
  fs.writeFileSync(SUBMISSIONS_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

async function sendNotificationEmail(submission) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Eaden 문의 알림" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: `[Eaden] 새 문의: ${submission.inquiry_type} - ${submission.name}`,
    html: `
      <h2>새로운 문의가 접수되었습니다.</h2>
      <table>
        <tr><td><b>문의 유형</b></td><td>${submission.inquiry_type}</td></tr>
        <tr><td><b>이름</b></td><td>${submission.name}</td></tr>
        <tr><td><b>연락처</b></td><td>${submission.contact}</td></tr>
        <tr><td><b>메시지</b></td><td>${submission.message}</td></tr>
        <tr><td><b>접수 시각</b></td><td>${submission.created_at}</td></tr>
      </table>
    `,
  });
}

// POST /api/contact
router.post('/', validateContact, async (req, res) => {
  const { inquiry_type, name, contact, message } = req.body;

  const submission = {
    id: uuidv4(),
    inquiry_type,
    name: name.trim(),
    contact: contact.trim(),
    message: message.trim(),
    created_at: new Date().toISOString(),
  };

  try {
    const submissions = readSubmissions();
    submissions.push(submission);
    writeSubmissions(submissions);
  } catch (err) {
    console.error('Submission save error:', err);
    return res.status(500).json({ error: '저장 중 오류가 발생했습니다.' });
  }

  // 이메일 알림 (실패해도 응답은 성공 처리)
  sendNotificationEmail(submission).catch((err) =>
    console.error('Email notification error:', err)
  );

  res.status(201).json({
    message: '문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
    id: submission.id,
  });
});

// GET /api/contact/submissions (관리용 - 운영 시 인증 미들웨어 추가 필요)
router.get('/submissions', (req, res) => {
  try {
    const submissions = readSubmissions();
    res.json({ count: submissions.length, submissions });
  } catch {
    res.status(500).json({ error: '데이터 조회 실패' });
  }
});

module.exports = router;
