import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to get filepath
const getFilePath = (collection) => path.join(DATA_DIR, `${collection}.json`);

// Read collection safely
const readCollection = (collection) => {
  const filePath = getFilePath(collection);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error(`Error reading ${collection}:`, error);
    return [];
  }
};

// Write collection atomically
const writeCollection = (collection, data) => {
  const filePath = getFilePath(collection);
  const tempPath = `${filePath}.tmp`;
  try {
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, filePath);
    return true;
  } catch (error) {
    console.error(`Error writing ${collection}:`, error);
    return false;
  }
};

// Initialize collections with default files
['contacts', 'bookings', 'orders', 'subscribers'].forEach(coll => {
  const file = getFilePath(coll);
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([], null, 2), 'utf-8');
  }
});

export const db = {
  // Contacts / Inquiries
  getContacts: () => readCollection('contacts'),
  addContact: (entry) => {
    const list = readCollection('contacts');
    const newEntry = {
      id: `inq-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
      ...entry
    };
    list.unshift(newEntry);
    writeCollection('contacts', list);
    return newEntry;
  },

  // Bookings / Consultations
  getBookings: () => readCollection('bookings'),
  getBookingById: (id) => {
    const list = readCollection('bookings');
    return list.find(b => b.token === id || b.id === id);
  },
  addBooking: (entry) => {
    const list = readCollection('bookings');
    const newEntry = {
      id: `book-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      ...entry
    };
    list.unshift(newEntry);
    writeCollection('bookings', list);
    return newEntry;
  },
  updateBookingStatus: (id, status) => {
    const list = readCollection('bookings');
    const idx = list.findIndex(b => b.token === id || b.id === id);
    if (idx !== -1) {
      list[idx].status = status;
      list[idx].updatedAt = new Date().toISOString();
      writeCollection('bookings', list);
      return list[idx];
    }
    return null;
  },

  // Orders / Cart Checkout
  getOrders: () => readCollection('orders'),
  addOrder: (entry) => {
    const list = readCollection('orders');
    const newEntry = {
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...entry
    };
    list.unshift(newEntry);
    writeCollection('orders', list);
    return newEntry;
  },

  // Subscribers
  getSubscribers: () => readCollection('subscribers'),
  addSubscriber: (email) => {
    const list = readCollection('subscribers');
    if (!list.find(s => s.email.toLowerCase() === email.toLowerCase())) {
      const newSub = {
        email: email.toLowerCase(),
        subscribedAt: new Date().toISOString()
      };
      list.unshift(newSub);
      writeCollection('subscribers', list);
      return { success: true, subscriber: newSub };
    }
    return { success: false, message: 'Already subscribed' };
  }
};
