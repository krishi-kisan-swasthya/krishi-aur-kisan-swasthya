import { db } from '../config/database.js';
import { emailService } from '../services/emailService.js';
import { appConfig } from '../config/appConfig.js';

export const orderController = {
  // Handle cart checkout
  createOrder: async (req, res, next) => {
    try {
      const { items, customerName, customerPhone, customerEmail, notes } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'कार्ट में कम से कम एक सेवा होना अनिवार्य है (Cart is empty)'
        });
      }

      const totalAmount = items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

      const orderRecord = db.addOrder({
        orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        items,
        totalAmount,
        customerName: customerName || 'Valued Farmer',
        customerPhone: customerPhone || '',
        customerEmail: customerEmail || '',
        notes: notes || ''
      });

      // Send alert email to agrihealth37@gmail.com
      emailService.sendMail({
        to: appConfig.contact.email,
        subject: `[नया ऑर्डर] ${orderRecord.orderNumber} - कुल राशि: ₹${totalAmount}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h3>नया सेवा ऑर्डर प्राप्त हुआ</h3>
            <p><strong>ऑर्डर संख्या:</strong> ${orderRecord.orderNumber}</p>
            <p><strong>ग्राहक नाम:</strong> ${orderRecord.customerName}</p>
            <p><strong>मोबाइल:</strong> ${orderRecord.customerPhone}</p>
            <p><strong>कुल शुल्क:</strong> ₹${totalAmount}</p>
            <h4>आइटम्स:</h4>
            <ul>
              ${items.map(it => `<li>${it.title || it.id} - ₹${it.price}</li>`).join('')}
            </ul>
          </div>
        `
      }).catch(err => console.error('Order email error:', err));

      return res.status(201).json({
        success: true,
        message: 'ऑर्डर सफलतापूर्वक दर्ज किया गया!',
        order: orderRecord,
        contactInfo: {
          email: appConfig.contact.email,
          phone: appConfig.contact.phone
        }
      });
    } catch (error) {
      next(error);
    }
  },

  getOrders: async (req, res, next) => {
    try {
      const orders = db.getOrders();
      return res.json({
        success: true,
        total: orders.length,
        orders
      });
    } catch (error) {
      next(error);
    }
  }
};
