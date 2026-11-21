import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure backend/.env is loaded regardless of process launch location
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config(); // fallback to current dir if any

export const appConfig = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  
  // Official Contact Info
  contact: {
    email: process.env.ADMIN_EMAIL || 'agrihealth37@gmail.com',
    secondaryNotifyEmail: process.env.SECONDARY_ADMIN_EMAIL || 'sonu.bcastudent@gmail.com',
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
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || 'agrihealth37@gmail.com',
    pass: process.env.SMTP_PASS || 'djseumwhadxcrlmm',
    fromEmail: process.env.SMTP_FROM || 'agrihealth37@gmail.com'
  }
};
