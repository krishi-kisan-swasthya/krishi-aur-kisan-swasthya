import express from 'express';
import { appConfig } from '../config/appConfig.js';
import { db } from '../config/database.js';
import { emailService } from '../services/emailService.js';

const router = express.Router();

// GET /api/info - Official contact details and organization metadata
router.get('/info', (req, res) => {
  res.json({
    success: true,
    organization: appConfig.contact.organizationName,
    contact: {
      email: appConfig.contact.email,
      phone: appConfig.contact.phone,
      whatsapp: appConfig.contact.whatsappNumber,
      address: appConfig.contact.address,
      operatingHours: appConfig.contact.operatingHours,
      social: {
        facebook: appConfig.contact.facebookUrl,
        instagram: appConfig.contact.instagramUrl,
        whatsappChat: `https://wa.me/91${appConfig.contact.cleanPhone}`
      }
    },
    version: '1.0.0',
    systemStatus: 'ONLINE'
  });
});

// POST /api/newsletter/subscribe
router.post('/newsletter/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({
      success: false,
      message: 'कृपया एक मान्य ईमेल दर्ज करें।'
    });
  }
  const result = db.addSubscriber(email);
  return res.json({
    success: result.success,
    message: result.success
      ? 'सफलतापूर्वक सदस्यता ली गई! आपको नियमित कृषि अपडेट प्राप्त होंगे।'
      : 'यह ईमेल पहले से ही पंजीकृत है।'
  });
});

// GET /api/email-status - Status of email delivery service
router.get('/email-status', (req, res) => {
  res.json({
    emailMode: appConfig.smtp.pass ? 'LIVE_GMAIL_SMTP' : 'SIMULATION_MODE',
    smtpUserConfigured: !!appConfig.smtp.user,
    smtpUser: appConfig.smtp.user,
    smtpPassConfigured: !!appConfig.smtp.pass,
    adminRecipient: appConfig.contact.email,
    secondaryRecipient: appConfig.contact.secondaryNotifyEmail,
    instructions: appConfig.smtp.pass ? 'Ready to send live emails via Gmail' : 'Add SMTP_PASS and SMTP_USER in Render Environment tab'
  });
});

// GET /api/send-test-email - Test live email dispatch directly with full error details
router.get('/send-test-email', async (req, res) => {
  const targetEmail = req.query.to || appConfig.contact.email;
  try {
    const result = await emailService.sendMail({
      to: targetEmail,
      subject: '🌱 Krishi Aur Kishan - Live Email Diagnostic Test',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #4CAF50; border-radius: 8px;">
          <h2 style="color: #2E7D32;">🌱 ईमेल सेवा सफलतापूर्वक काम कर रही है!</h2>
          <p>यह टेस्ट ईमेल कृषि और किसान स्वास्थ्य पोर्टल द्वारा भेजा गया है।</p>
          <p><strong>प्राप्तकर्ता:</strong> ${targetEmail}</p>
          <p><strong>सर्वर समय:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        </div>
      `
    });

    return res.json({
      success: result.success,
      targetEmail,
      smtpSender: appConfig.smtp.user,
      result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/health - Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    adminContact: appConfig.contact.email,
    helplinePhone: appConfig.contact.phone
  });
});

export default router;
