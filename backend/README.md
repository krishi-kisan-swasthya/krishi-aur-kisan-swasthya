# 🌾 Krishi Aur Kishan - Backend API Server

Backend microservice for **कृषि और किसान स्वास्थ्य (Agriculture and Farmers Health)** portal.

---

## 📞 Official Contact Configuration
This backend is centrally configured with the official portal contact channels:
- **Admin & Inquiry Email**: `agrihealth@gmail.com`
- **Helpline Phone**: `+91 8252663421`
- **WhatsApp Support**: `+91 8252663421`
- **Center Address**: `Vivekananda Global University, Sector 36, NRI Road, Jagatpura, Jaipur, Rajasthan 303012`
- **Operating Hours**: `09:00 AM - 06:00 PM (Monday - Saturday)`

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment (.env)
A `.env` file is pre-configured with default values:
```env
PORT=5000
NODE_ENV=development
ADMIN_EMAIL=agrihealth@gmail.com
CONTACT_PHONE=+91 8252663421
WHATSAPP_NUMBER=+91 8252663421

# Optional SMTP setup for live Gmail sending
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=agrihealth@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM=agrihealth@gmail.com
```
*(If SMTP credentials are not supplied, the email service operates in safe simulation mode, logging all email payloads and dispatches).*

### 3. Start Server
```bash
# Production mode
npm start

# Development watch mode
npm run dev
```
Server runs at `http://localhost:5000`.

### 4. Run API Automated Tests
```bash
npm test
# or
node test-api.js
```

---

## 📡 API Endpoints

### 1. Contact & Inquiries
- **`POST /api/contact`**
  - **Body**: `{ firstName, lastName, email, phone, address, interest, message }`
  - **Action**: Validates input, saves to persistent storage, sends notification email to `agrihealth@gmail.com`, sends auto-response to farmer, generates WhatsApp direct chat link to `+91 8252663421`.
- **`GET /api/contact`**
  - Returns list of all received inquiries.

### 2. Consultation Appointments & Bookings
- **`POST /api/bookings`**
  - **Body**: `{ name, phone, village, date, slot, mode, notes, serviceName, servicePrice }`
  - **Action**: Generates unique appointment token (`#AKK-XXXX`), stores booking, triggers notification email to `agrihealth@gmail.com`, generates WhatsApp booking confirmation link.
- **`GET /api/bookings`**
  - Returns all consultation bookings.
- **`GET /api/bookings/:id`**
  - Lookup a specific booking by token ID.
- **`PATCH /api/bookings/:id/status`**
  - Update status (`confirmed`, `completed`, `cancelled`).

### 3. Orders / Cart Checkout
- **`POST /api/orders`**
  - **Body**: `{ items: [...], customerName, customerPhone, customerEmail, notes }`
  - **Action**: Processes cart checkout and records order.
- **`GET /api/orders`**
  - List all orders.

### 4. Portal Metadata & Health
- **`GET /api/info`**
  - Returns official contact information, helpline numbers, address, and social links.
- **`POST /api/newsletter/subscribe`**
  - Register email for seasonal farmer advisories.
- **`GET /api/health`**
  - Returns server health status, uptime, and contact details.

---

## 📁 Directory Structure
```text
backend/
├── data/                      # Persistent JSON storage
│   ├── contacts.json
│   ├── bookings.json
│   ├── orders.json
│   └── subscribers.json
├── src/
│   ├── config/
│   │   ├── appConfig.js       # Centralized contact & server configs
│   │   └── database.js        # Persistent atomic file database
│   ├── controllers/
│   │   ├── contactController.js
│   │   ├── bookingController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   ├── validate.js        # Form validation
│   │   └── errorHandler.js    # Error handling & 404
│   ├── routes/
│   │   ├── contactRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── orderRoutes.js
│   │   └── infoRoutes.js
│   └── services/
│       ├── emailService.js    # Nodemailer email dispatcher
│       └── notificationService.js # WhatsApp & SMS generator
├── .env                       # Environment configuration
├── .env.example
├── package.json
├── server.js                  # Express application entrypoint
└── test-api.js                # End-to-end API test script
```
