import assert from 'assert';
import { server } from './server.js';

const PORT = process.env.PORT || 5000;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function runTests() {
  console.log('🧪 Starting Krishi Aur Kishan Backend API Tests...\n');

  try {
    // Wait briefly for server binding
    await new Promise((resolve) => setTimeout(resolve, 500));
    // 1. Test Health Endpoint
    console.log('1. Testing GET /api/health...');
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    assert.strictEqual(healthRes.status, 200);
    const healthData = await healthRes.json();
    assert.strictEqual(healthData.status, 'healthy');
    assert.strictEqual(healthData.adminContact, 'agrihealth@gmail.com');
    assert.strictEqual(healthData.helplinePhone, '+91 8252663421');
    console.log('✅ Health check passed!\n');

    // 2. Test Info Endpoint
    console.log('2. Testing GET /api/info...');
    const infoRes = await fetch(`${BASE_URL}/api/info`);
    assert.strictEqual(infoRes.status, 200);
    const infoData = await infoRes.json();
    assert.strictEqual(infoData.contact.email, 'agrihealth@gmail.com');
    assert.strictEqual(infoData.contact.phone, '+91 8252663421');
    console.log('✅ Info endpoint passed!\n');

    // 3. Test Contact Form Validation Error
    console.log('3. Testing POST /api/contact (Validation error)...');
    const invalidContactRes = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: '', email: 'not-an-email', phone: '123' })
    });
    assert.strictEqual(invalidContactRes.status, 400);
    const invalidContactData = await invalidContactRes.json();
    assert.strictEqual(invalidContactData.success, false);
    console.log('✅ Contact validation failed as expected!\n');

    // 4. Test Valid Contact Form Submission
    console.log('4. Testing POST /api/contact (Valid submission)...');
    const validContactRes = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'सुरेश',
        lastName: 'यादव',
        email: 'suresh.farmer@gmail.com',
        phone: '9876543210',
        address: 'ग्राम पिपली, सीकर, राजस्थान',
        interest: 'Cattle Dairy',
        message: 'देसी साहीवाल गाय के पोषण और दुग्ध वसा बढ़ाने हेतु सलाह चाहिए।'
      })
    });
    assert.strictEqual(validContactRes.status, 201);
    const validContactData = await validContactRes.json();
    assert.strictEqual(validContactData.success, true);
    assert.strictEqual(validContactData.contactInfo.helplineEmail, 'agrihealth@gmail.com');
    assert.strictEqual(validContactData.contactInfo.helplinePhone, '+91 8252663421');
    assert.ok(validContactData.whatsappDirectUrl.includes('8252663421'));
    console.log('✅ Contact submission saved and verified!\n');

    // 5. Test Booking Submission
    console.log('5. Testing POST /api/bookings...');
    const bookingRes = await fetch(`${BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: '2026-10-25',
        slot: '10:00 AM - 11:00 AM',
        name: 'रामलाल शर्मा',
        phone: '8252663421',
        village: 'जगतपुरा, जयपुर',
        mode: 'Phone Call',
        notes: 'फसल कीट नियंत्रण मार्गदर्शन',
        serviceName: 'Pest Control Consultation',
        servicePrice: 50
      })
    });
    assert.strictEqual(bookingRes.status, 201);
    const bookingData = await bookingRes.json();
    assert.strictEqual(bookingData.success, true);
    assert.ok(bookingData.token.startsWith('#AKK-'));
    console.log(`✅ Booking generated token: ${bookingData.token}\n`);

    // 6. Test Get Bookings
    console.log('6. Testing GET /api/bookings...');
    const listBookingsRes = await fetch(`${BASE_URL}/api/bookings`);
    const listBookingsData = await listBookingsRes.json();
    assert.strictEqual(listBookingsData.success, true);
    assert.ok(listBookingsData.total >= 1);
    console.log(`✅ Bookings retrieved successfully (${listBookingsData.total} bookings found)!\n`);

    console.log('🎉 ALL TESTS PASSED! Backend is completely functional.');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exitCode = 1;
  } finally {
    if (server && server.close) {
      server.close();
    }
  }
}

runTests();
