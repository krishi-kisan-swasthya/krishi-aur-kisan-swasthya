import dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  
  // Official Contact Info
  contact: {
    email: process.env.ADMIN_EMAIL || 'agrihealth@gmail.com',
    phone: process.env.CONTACT_PHONE || '+91 8252663421',
    cleanPhone: '8252663421',
    whatsappNumber: process.env.WHATSAPP_NUMBER || '+91 8252663421',
    address: 'Vivekananda Global University, Sector 36, NRI Road, Jagatpura, Jaipur, Rajasthan 303012',
    operatingHours: '09:00 AM - 06:00 PM (Monday - Saturday)',
    organizationName: 'कृषि और किसान स्वास्थ्य (Agriculture & Farmers Health)',
    facebookUrl: 'https://www.facebook.com/profile.php?id=61574636587556',
    instagramUrl: 'https://www.instagram.com/krisheaurkishan',
    websiteUrl: 'http://localhost:5173'
  },

  // Email / SMTP Settings
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    fromEmail: process.env.SMTP_FROM || 'agrihealth@gmail.com'
  }
};
