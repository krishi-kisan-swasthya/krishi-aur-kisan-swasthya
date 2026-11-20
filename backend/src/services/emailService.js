import nodemailer from 'nodemailer';
import { appConfig } from '../config/appConfig.js';

let transporter = null;

// Initialize transporter
const initTransporter = () => {
  if (appConfig.smtp.user && appConfig.smtp.pass) {
    const transportConfig = appConfig.smtp.host && appConfig.smtp.host !== 'smtp.gmail.com'
      ? {
          host: appConfig.smtp.host,
          port: appConfig.smtp.port,
          secure: appConfig.smtp.secure,
          auth: {
            user: appConfig.smtp.user,
            pass: appConfig.smtp.pass
          }
        }
      : {
          service: 'gmail',
          auth: {
            user: appConfig.smtp.user,
            pass: appConfig.smtp.pass
          }
        };

    transporter = nodemailer.createTransport(transportConfig);
    console.log('[EmailService] Live email dispatch active for:', appConfig.smtp.user);
  } else {
    // Development / Simulation Mode
    transporter = null;
    console.log('[EmailService] Running in simulated mode. Add SMTP_PASS in Render Environment to receive real emails.');
  }
};

initTransporter();

export const emailService = {
  // Send notification to admin (agrihealth37@gmail.com) on new contact message
  sendContactNotificationToAdmin: async (contactData) => {
    const subject = `[नया संदेश] नया संपर्क अनुरोध: ${contactData.firstName} ${contactData.lastName || ''} (${contactData.interest})`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1e7e34; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">कृषि और किसान स्वास्थ्य पोर्टल</h2>
          <p style="margin: 5px 0 0; opacity: 0.9;">नया संपर्क संदेश प्राप्त हुआ</p>
        </div>
        <div style="padding: 24px; background-color: #ffffff;">
          <h3 style="color: #2c3e50; border-bottom: 2px solid #28a745; padding-bottom: 8px;">किसान / संपर्क विवरण:</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 140px; color: #555;">नाम (Name):</td>
              <td style="padding: 8px; color: #222;">${contactData.firstName} ${contactData.lastName || ''}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #555;">ईमेल (Email):</td>
              <td style="padding: 8px; color: #222;"><a href="mailto:${contactData.email}">${contactData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">मोबाइल (Phone):</td>
              <td style="padding: 8px; color: #222;"><a href="tel:${contactData.phone}">${contactData.phone}</a></td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #555;">पता (Address):</td>
              <td style="padding: 8px; color: #222;">${contactData.address || 'उपलब्ध नहीं'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">विषय (Category):</td>
              <td style="padding: 8px; color: #1e7e34; font-weight: bold;">${contactData.interest}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold; color: #555; vertical-align: top;">संदेश (Message):</td>
              <td style="padding: 8px; color: #333; line-height: 1.5;">${contactData.message || 'कोई संदेश नहीं दिया गया'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">समय (Timestamp):</td>
              <td style="padding: 8px; color: #777;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 12px; background: #e8f5e9; border-radius: 6px; font-size: 13px; color: #1b5e20;">
            <strong>त्वरित कार्रवाई:</strong> कृपया किसान भाई से हेल्पलाइन <strong>${appConfig.contact.phone}</strong> अथवा ईमेल <strong>${appConfig.contact.email}</strong> के माध्यम से संपर्क करें।
          </div>
        </div>
        <div style="background-color: #f1f1f1; padding: 12px; text-align: center; font-size: 12px; color: #777;">
          ${appConfig.contact.organizationName} • ${appConfig.contact.address}
        </div>
      </div>
    `;

    return emailService.sendMail({
      to: appConfig.contact.email, // agrihealth37@gmail.com
      subject,
      html,
      replyTo: contactData.email
    });
  },

  // Send auto-acknowledgement email to the user
  sendContactAutoReplyToUser: async (contactData) => {
    if (!contactData.email) return;

    const subject = `नमस्ते ${contactData.firstName}! आपका संदेश प्राप्त हुआ - कृषि और किसान स्वास्थ्य`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1e7e34; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">कृषि और किसान स्वास्थ्य</h2>
          <p style="margin: 5px 0 0; opacity: 0.9;">Agriculture & Farmers Health Portal</p>
        </div>
        <div style="padding: 24px; background-color: #ffffff; color: #333; line-height: 1.6;">
          <p>प्रिय <strong>${contactData.firstName} ${contactData.lastName || ''}</strong> जी,</p>
          <p>कृषि और किसान स्वास्थ्य से संपर्क करने के लिए धन्यवाद! आपका संदेश हमें प्राप्त हो गया है।</p>
          <div style="background: #f8f9fa; border-left: 4px solid #28a745; padding: 12px 16px; margin: 16px 0;">
            <strong>चयनित विषय:</strong> ${contactData.interest}<br/>
            <strong>संदेश:</strong> ${contactData.message || 'सामान्य पूछताछ'}
          </div>
          <p>हमारे कृषि एवं स्वास्थ्य विशेषज्ञ जल्द ही आपके मोबाइल नंबर <strong>${contactData.phone}</strong> अथवा ईमेल पर संपर्क करेंगे।</p>
          <div style="border-top: 1px solid #eee; margin-top: 20px; padding-top: 15px;">
            <p style="margin: 0; font-weight: bold; color: #1e7e34;">सीधा संपर्क करें:</p>
            <p style="margin: 4px 0;">📞 फ़ोन हेल्पलाइन: <a href="tel:${appConfig.contact.cleanPhone}" style="color: #1e7e34; font-weight: bold;">${appConfig.contact.phone}</a></p>
            <p style="margin: 4px 0;">💬 व्हाट्सएप: <a href="https://wa.me/91${appConfig.contact.cleanPhone}" style="color: #25d366; font-weight: bold;">+91 ${appConfig.contact.cleanPhone}</a></p>
            <p style="margin: 4px 0;">✉️ ईमेल: <a href="mailto:${appConfig.contact.email}" style="color: #1e7e34;">${appConfig.contact.email}</a></p>
            <p style="margin: 4px 0;">📍 केंद्र: ${appConfig.contact.address}</p>
          </div>
        </div>
        <div style="background-color: #f1f1f1; padding: 12px; text-align: center; font-size: 12px; color: #777;">
          विवेकानंद ग्लोबल यूनिवर्सिटी जयपुर के सहयोग से संचालित।
        </div>
      </div>
    `;

    return emailService.sendMail({
      to: contactData.email,
      subject,
      html
    });
  },

  // Send booking confirmation to admin (agrihealth37@gmail.com)
  sendBookingNotificationToAdmin: async (bookingData) => {
    const subject = `[नई बुकिंग] टोकन ${bookingData.token} - ${bookingData.serviceName} (${bookingData.name})`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background-color: #0b6623; color: white; padding: 18px; text-align: center;">
          <h2 style="margin: 0;">परामर्श स्लॉट बुकिंग अलर्ट</h2>
          <p style="margin: 4px 0 0;">टोकन संख्या: <strong>${bookingData.token}</strong></p>
        </div>
        <div style="padding: 20px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 6px; font-weight: bold;">सेवा (Service):</td><td style="padding: 6px;">${bookingData.serviceName}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding: 6px; font-weight: bold;">किसान का नाम:</td><td style="padding: 6px;">${bookingData.name}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">मोबाइल नंबर:</td><td style="padding: 6px;"><a href="tel:${bookingData.phone}">${bookingData.phone}</a></td></tr>
            <tr style="background:#f9f9f9;"><td style="padding: 6px; font-weight: bold;">स्थान / गाँव:</td><td style="padding: 6px;">${bookingData.village}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">दिनांक (Date):</td><td style="padding: 6px;">${bookingData.date}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding: 6px; font-weight: bold;">समय स्लॉट:</td><td style="padding: 6px;">${bookingData.slot}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">माध्यम (Mode):</td><td style="padding: 6px;">${bookingData.mode}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding: 6px; font-weight: bold;">शुल्क:</td><td style="padding: 6px; font-weight: bold; color: #0b6623;">₹${bookingData.servicePrice}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">नोट्स / समस्या:</td><td style="padding: 6px;">${bookingData.notes || 'उपलब्ध नहीं'}</td></tr>
          </table>
        </div>
      </div>
    `;

    return emailService.sendMail({
      to: appConfig.contact.email, // agrihealth37@gmail.com
      subject,
      html
    });
  },

  // Base send mail function
  sendMail: async ({ to, subject, html, replyTo }) => {
    const mailOptions = {
      from: `"${appConfig.contact.organizationName}" <${appConfig.smtp.fromEmail || appConfig.contact.email}>`,
      to,
      subject,
      html,
      replyTo: replyTo || appConfig.contact.email
    };

    if (transporter) {
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`[EmailService] Email sent successfully to ${to}. MessageId: ${info.messageId}`);
        return { success: true, messageId: info.messageId, mode: 'smtp' };
      } catch (err) {
        console.error('[EmailService] SMTP send error:', err);
        return { success: false, error: err.message, mode: 'smtp-failed' };
      }
    } else {
      console.log(`\n======================================================`);
      console.log(`[EmailService - SIMULATED EMAIL DISPATCH]`);
      console.log(`TO: ${to}`);
      console.log(`SUBJECT: ${subject}`);
      console.log(`FROM: ${mailOptions.from}`);
      console.log(`CONTACT HELPLINE: ${appConfig.contact.phone} | EMAIL: ${appConfig.contact.email}`);
      console.log(`======================================================\n`);
      return { success: true, simulated: true, to, subject, mode: 'simulated' };
    }
  }
};
