import { db } from '../config/database.js';
import { emailService } from '../services/emailService.js';
import { notificationService } from '../services/notificationService.js';
import { appConfig } from '../config/appConfig.js';

export const bookingController = {
  // Create Consultation Booking
  createBooking: async (req, res, next) => {
    try {
      const {
        date,
        slot,
        name,
        phone,
        village,
        mode = 'Phone Call',
        notes = '',
        serviceName = 'General Advisory',
        servicePrice = 50
      } = req.body;

      // Generate distinctive Token ID
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const token = `#AKK-${randomNum}`;

      const bookingRecord = db.addBooking({
        token,
        date,
        slot,
        name: name.trim(),
        phone: phone.trim(),
        village: village.trim(),
        mode,
        notes: (notes || '').trim(),
        serviceName,
        servicePrice: Number(servicePrice) || 50
      });

      // Send email alert to official admin email (agrihealth37@gmail.com)
      emailService.sendBookingNotificationToAdmin(bookingRecord).catch(err => {
        console.error('[BookingController] Admin alert error:', err);
      });

      // Dispatch WhatsApp & SMS notification logger
      notificationService.logNotification('whatsapp', appConfig.contact.phone, {
        type: 'consultation_booking',
        token: bookingRecord.token,
        farmer: bookingRecord.name,
        phone: bookingRecord.phone,
        slot: `${bookingRecord.date} ${bookingRecord.slot}`
      });

      const whatsappDirectLink = notificationService.getBookingWhatsAppLink(bookingRecord);

      return res.status(201).json({
        success: true,
        message: 'बुकिंग सफलतापूर्वक दर्ज की गई!',
        token: bookingRecord.token,
        booking: bookingRecord,
        contactInfo: {
          helplineEmail: appConfig.contact.email,
          helplinePhone: appConfig.contact.phone,
          whatsappDirect: whatsappDirectLink
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all bookings
  getAllBookings: async (req, res, next) => {
    try {
      const bookings = db.getBookings();
      return res.json({
        success: true,
        total: bookings.length,
        bookings
      });
    } catch (error) {
      next(error);
    }
  },

  // Get single booking by token ID
  getBookingByToken: async (req, res, next) => {
    try {
      const { id } = req.params;
      const booking = db.getBookingById(id);
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'बुकिंग रिकॉर्ड नहीं मिला (Booking not found)'
        });
      }
      return res.json({
        success: true,
        booking
      });
    } catch (error) {
      next(error);
    }
  },

  // Update status (e.g. Confirmed, Completed, Cancelled)
  updateStatus: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = db.updateBookingStatus(id, status);
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'बुकिंग रिकॉर्ड नहीं मिला'
        });
      }
      return res.json({
        success: true,
        message: `बुकिंग स्थिति को '${status}' में अपडेट किया गया`,
        booking: updated
      });
    } catch (error) {
      next(error);
    }
  }
};
