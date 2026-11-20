import express from 'express';
import { bookingController } from '../controllers/bookingController.js';
import { validateBookingInput } from '../middleware/validate.js';

const router = express.Router();

// POST /api/bookings - Create new consultation appointment
router.post('/', validateBookingInput, bookingController.createBooking);

// GET /api/bookings - List all bookings
router.get('/', bookingController.getAllBookings);

// GET /api/bookings/:id - Get specific booking by token/id
router.get('/:id', bookingController.getBookingByToken);

// PATCH /api/bookings/:id/status - Update booking status
router.patch('/:id/status', bookingController.updateStatus);

export default router;
