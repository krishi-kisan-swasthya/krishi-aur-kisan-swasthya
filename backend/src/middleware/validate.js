export const validateContactInput = (req, res, next) => {
  const { firstName, email, phone } = req.body;
  const errors = [];

  if (!firstName || !firstName.trim()) {
    errors.push('प्रथम नाम (First Name) अनिवार्य है।');
  }

  if (!email || !email.trim()) {
    errors.push('ईमेल पता (Email) अनिवार्य है।');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('कृपया मान्य ईमेल पता दर्ज करें (Invalid email format)।');
    }
  }

  if (!phone || !phone.trim()) {
    errors.push('मोबाइल नंबर (Phone Number) अनिवार्य है।');
  } else {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      errors.push('कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें।');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'इनपुट सत्यापन त्रुटि (Validation Failed)',
      errors
    });
  }

  next();
};

export const validateBookingInput = (req, res, next) => {
  const { name, phone, date, slot } = req.body;
  const errors = [];

  if (!name || !name.trim()) {
    errors.push('किसान का नाम (Full Name) अनिवार्य है।');
  }

  if (!phone || !phone.trim()) {
    errors.push('मोबाइल नंबर (Mobile) अनिवार्य है।');
  } else {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      errors.push('कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें।');
    }
  }

  if (!date || !date.trim()) {
    errors.push('परामर्श तिथि (Date) अनिवार्य है।');
  }

  if (!slot || !slot.trim()) {
    errors.push('समय स्लॉट (Time Slot) अनिवार्य है।');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'बुकिंग सत्यापन त्रुटि (Booking Validation Failed)',
      errors
    });
  }

  next();
};
