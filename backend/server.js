import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { appConfig } from './src/config/appConfig.js';
import contactRoutes from './src/routes/contactRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import infoRoutes from './src/routes/infoRoutes.js';
import { errorHandler, notFoundHandler } from './src/middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Root Status & Interactive API Dashboard
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="hi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Krishi Aur Kishan - Backend API</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f4fbf4; color: #2d3748; padding: 30px; margin: 0; }
        .card { max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); padding: 30px; }
        h1 { color: #1e7e34; margin-top: 0; display: flex; align-items: center; gap: 10px; }
        .badge { background: #28a745; color: white; padding: 4px 10px; border-radius: 20px; font-size: 13px; font-weight: normal; }
        .contact-box { background: #e8f5e9; border-left: 4px solid #28a745; padding: 15px; border-radius: 6px; margin: 20px 0; }
        .contact-box p { margin: 6px 0; font-size: 15px; }
        .routes-table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px; }
        .routes-table th, .routes-table td { text-align: left; padding: 10px; border-bottom: 1px solid #e2e8f0; }
        .routes-table th { background: #f8fafc; color: #4a5568; }
        .method { font-weight: bold; padding: 3px 8px; border-radius: 4px; font-size: 12px; display: inline-block; }
        .method.get { background: #e3f2fd; color: #1976d2; }
        .method.post { background: #e8f5e9; color: #2e7d32; }
        .method.patch { background: #fff3e0; color: #e65100; }
        a { color: #1e7e34; text-decoration: none; font-weight: bold; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🌱 कृषि और किसान स्वास्थ्य - API Server <span class="badge">ONLINE</span></h1>
        <p>Backend microservice supporting farmer inquiries, consultation slot bookings, order checkout, and email notifications.</p>
        
        <div class="contact-box">
          <strong>📞 एकीकृत संपर्क विवरण (Official Contact Config):</strong>
          <p>📧 ईमेल: <a href="mailto:${appConfig.contact.email}">${appConfig.contact.email}</a></p>
          <p>📱 फ़ोन हेल्पलाइन: <a href="tel:${appConfig.contact.cleanPhone}">${appConfig.contact.phone}</a></p>
          <p>💬 व्हाट्सएप सहायता: <a href="https://wa.me/91${appConfig.contact.cleanPhone}" target="_blank">+91 ${appConfig.contact.cleanPhone}</a></p>
          <p>📍 केंद्र: ${appConfig.contact.address}</p>
        </div>

        <h3>उपलब्ध API Endpoints:</h3>
        <table class="routes-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="method post">POST</span></td>
              <td><code>/api/contact</code></td>
              <td>किसान संपर्क अनुरोध सबमिट करें (Email alert to ${appConfig.contact.email})</td>
            </tr>
            <tr>
              <td><span class="method get">GET</span></td>
              <td><a href="/api/contact" target="_blank"><code>/api/contact</code></a></td>
              <td>सभी प्राप्त संपर्क संदेश देखें</td>
            </tr>
            <tr>
              <td><span class="method post">POST</span></td>
              <td><code>/api/bookings</code></td>
              <td>परामर्श स्लॉट बुक करें (Token generation & SMS/Email alert)</td>
            </tr>
            <tr>
              <td><span class="method get">GET</span></td>
              <td><a href="/api/bookings" target="_blank"><code>/api/bookings</code></a></td>
              <td>सभी ऑनलाइन बुकिंग्स सूची</td>
            </tr>
            <tr>
              <td><span class="method post">POST</span></td>
              <td><code>/api/orders</code></td>
              <td>कार्ट चेकआउट ऑर्डर दर्ज करें</td>
            </tr>
            <tr>
              <td><span class="method get">GET</span></td>
              <td><a href="/api/orders" target="_blank"><code>/api/orders</code></a></td>
              <td>ऑर्डर सूची देखें</td>
            </tr>
            <tr>
              <td><span class="method get">GET</span></td>
              <td><a href="/api/info" target="_blank"><code>/api/info</code></a></td>
              <td>आधिकारिक संपर्क व संस्था जानकारी</td>
            </tr>
            <tr>
              <td><span class="method get">GET</span></td>
              <td><a href="/api/health" target="_blank"><code>/api/health</code></a></td>
              <td>सर्वर स्थिति एवं अपटाइम जांच</td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `);
});

// Mount Routes
app.use('/api/contact', contactRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api', infoRoutes);

// Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || appConfig.port || 5000;
export const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`🌾 Krishi Aur Kishan Backend Server Started Successfully!`);
  console.log(`🚀 Port: http://0.0.0.0:${PORT}`);
  console.log(`📧 Contact Email: ${appConfig.contact.email}`);
  console.log(`📞 Helpline Phone: ${appConfig.contact.phone}`);
  console.log(`💬 WhatsApp Support: ${appConfig.contact.whatsappNumber}`);
  console.log(`======================================================\n`);
});

export default app;
