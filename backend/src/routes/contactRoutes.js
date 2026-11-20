import express from 'express';
import { contactController } from '../controllers/contactController.js';
import { validateContactInput } from '../middleware/validate.js';

const router = express.Router();

// POST /api/contact - Submit contact query
router.post('/', validateContactInput, contactController.submitContact);

// GET /api/contact - View all contact queries
router.get('/', contactController.getContacts);

export default router;
