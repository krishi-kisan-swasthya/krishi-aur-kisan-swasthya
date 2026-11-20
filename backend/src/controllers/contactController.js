import { db } from '../config/database.js';
import { emailService } from '../services/emailService.js';
import { notificationService } from '../services/notificationService.js';
import { appConfig } from '../config/appConfig.js';

export const contactController = {
  // Handle contact form POST
  submitContact: async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        interest,
        message
      } = req.body;

      const contactRecord = db.addContact({
        firstName: firstName.trim(),
        lastName: (lastName || '').trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        address: (address || '').trim(),
        interest: interest || 'General Query',
        message: (message || '').trim()
      });

      // 1. Send Email Notification to Admin (agrihealth37@gmail.com)
      emailService.sendContactNotificationToAdmin(contactRecord).catch(err => {
        console.error('[ContactController] Error sending admin email:', err);
      });

      // 2. Send Auto-response to User if email provided
      if (contactRecord.email) {
        emailService.sendContactAutoReplyToUser(contactRecord).catch(err => {
          console.error('[ContactController] Error sending user reply:', err);
        });
      }

      // 3. Log notification for SMS / WhatsApp dispatch
      notificationService.logNotification('whatsapp', appConfig.contact.phone, {
        farmer: `${contactRecord.firstName} ${contactRecord.lastName || ''}`,
        phone: contactRecord.phone,
        interest: contactRecord.interest,
        inquiryId: contactRecord.id
      });

      // 4. Generate direct WhatsApp chat link to official helpline
      const whatsappLink = notificationService.getContactWhatsAppLink(contactRecord);

      return res.status(201).json({
        success: true,
        message: 'धन्यवाद! आपका संदेश सफलतापूर्वक प्राप्त हो गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।',
        contactId: contactRecord.id,
        contactInfo: {
          helplineEmail: appConfig.contact.email,
          helplinePhone: appConfig.contact.phone,
          whatsappNumber: appConfig.contact.whatsappNumber
        },
        whatsappDirectUrl: whatsappLink,
        data: contactRecord
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all contact submissions (Admin / Review)
  getContacts: async (req, res, next) => {
    try {
      const list = db.getContacts();
      return res.json({
        success: true,
        total: list.length,
        contacts: list
      });
    } catch (error) {
      next(error);
    }
  }
};
