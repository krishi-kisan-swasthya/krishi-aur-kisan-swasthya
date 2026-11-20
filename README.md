# 🌱 Krishi Aur Kishan (कृषि और किसान स्वास्थ्य)

> A modern full-stack portal dedicated to farmer health advisory, sustainable agriculture consultancy, dairy cattle management, and emergency Kisan support.

---

## 🏗️ Architecture & Project Structure

This repository is organized as a monorepo containing both the frontend and backend:

```text
KrishiAurKishan/
├── backend/                  # Node.js + Express API microservice
│   ├── data/                 # JSON file datastore (bookings, contacts, orders)
│   ├── src/
│   │   ├── config/           # App config, database handlers
│   │   ├── controllers/      # Request handlers for bookings, contact, orders
│   │   ├── middleware/       # Error handling and request validation
│   │   ├── routes/           # REST endpoints (/api/contact, /api/bookings, etc.)
│   │   └── services/         # Email (SMTP) & WhatsApp notification service
│   ├── server.js             # Express server entry point (PORT 5000 / 0.0.0.0)
│   ├── test-api.js           # Automated integration test suite
│   ├── .env.example          # Backend environment variables template
│   └── package.json
│
├── frontend/                 # Vite + React (Tailwind / Custom CSS) web app
│   ├── public/assets/images/ # Static images and branding assets
│   ├── src/
│   │   ├── components/       # Hero, BookingModal, CartDrawer, ContactSection...
│   │   ├── config/api.js     # API client dynamic endpoint resolver
│   │   ├── data/             # Bilingual translations (Hindi/English), siteData
│   │   ├── App.jsx           # Root React component
│   │   └── index.css         # Styling and design system
│   ├── vercel.json           # Vercel SPA routing rewrites
│   ├── .env.example          # Frontend environment variables template
│   └── package.json
│
├── render.yaml               # Render Blueprint configuration for 1-click backend deployment
├── vercel.json               # Root Vercel build & route configuration
└── package.json              # Monorepo unified scripts
```

---

## 🚀 Local Development

### 1. Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### 2. Run Both Services Locally

From the root directory:
```bash
# Install dependencies
npm --prefix backend install
npm --prefix frontend install

# Start Backend API (runs on http://localhost:5000)
npm run start:backend

# In a second terminal, start Frontend (runs on http://localhost:5173)
npm run start:frontend
```

---

## 🌐 Deployment Guide

### Step 1: Push Code to GitHub

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `KrishiAurKishan`).
2. Run the following commands in your terminal:
```bash
# If not already committed:
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

---

### Step 2: Deploy Backend to Render

1. Sign in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Fill in the following settings:
   - **Name**: `krishiaurkishan-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `CORS_ORIGIN` = `*`
   - `ADMIN_EMAIL` = `agrihealth@gmail.com`
   - `CONTACT_PHONE` = `+91 8252663421`
   - `WHATSAPP_NUMBER` = `+91 8252663421`
   *(Optional for live Gmail alerts: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`)*
6. Click **Create Web Service**.
7. Once deployed, Render will provide your backend URL:
   `https://krishiaurkishan-backend.onrender.com`
   *(Verify by opening `https://krishiaurkishan-backend.onrender.com/api/health` in your browser)*

---

### Step 3: Deploy Frontend to Vercel

1. Sign in to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. Configure Project Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click `Edit` and select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Expand **Environment Variables** and add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: Your Render backend URL from Step 2 (e.g., `https://krishiaurkishan-backend.onrender.com`)
6. Click **Deploy**.
7. Your frontend will be live on `https://krishiaurkishan.vercel.app` (or your custom Vercel domain)!

---

## 🧪 Testing Backend Endpoints

Run the automated integration test suite:
```bash
npm run test:backend
```

Endpoints covered:
- `GET /api/health` — Microservice uptime and status
- `GET /api/info` — Organization profile and helpline details
- `POST /api/contact` — Farmer inquiry submission with validation
- `POST /api/bookings` — Consultation token booking (#AKK-XXXX)
- `GET /api/bookings` — Retrieve booked consultation slots
- `POST /api/orders` — Consultation service checkout

---

## 📞 Official Contacts
- **Organization**: कृषि और किसान स्वास्थ्य (Agriculture & Farmers Health Hub)
- **Location**: Vivekananda Global University, Sector 36, NRI Road, Jagatpura, Jaipur, Rajasthan 303012
- **Email**: agrihealth@gmail.com
- **Phone / WhatsApp**: +91 8252663421
