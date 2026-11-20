import { appConfig } from '../config/appConfig.js';

export const notificationService = {
  // Generate WhatsApp Direct Click-to-Chat URL
  createWhatsAppLink: (messageText) => {
    const phone = appConfig.contact.cleanPhone; // 8252663421
    const encoded = encodeURIComponent(messageText);
    return `https://wa.me/91${phone}?text=${encoded}`;
  },

  // WhatsApp link for Contact Inquiry
  getContactWhatsAppLink: (contact) => {
    const msg = `नमस्ते Krishi Aur Kishan, मेरा नाम ${contact.firstName} ${contact.lastName || ''} है। मैंने पोर्टल पर "${contact.interest}" के संबंध में संदेश भेजा है। कृपया मार्गदर्शन करें।`;
    return notificationService.createWhatsAppLink(msg);
  },

  // WhatsApp link for Booking Token
  getBookingWhatsAppLink: (booking) => {
    const msg = `नमस्ते, मैंने ऑनलाइन परामर्श बुक किया है। टोकन संख्या: ${booking.token}, सेवा: ${booking.serviceName}, दिनांक: ${booking.date}, स्लॉट: ${booking.slot}। कृपया पुष्टि करें।`;
    return notificationService.createWhatsAppLink(msg);
  },

  // Log SMS/WhatsApp Notification for external webhook/gateway
  logNotification: (type, recipient, payload) => {
    console.log(`[NotificationService] [${type.toUpperCase()}] Notification dispatched for ${recipient}:`);
    console.log(JSON.stringify(payload, null, 2));
    return {
      dispatched: true,
      channel: type,
      recipient,
      timestamp: new Date().toISOString()
    };
  }
};
