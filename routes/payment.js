import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// CREATE ORDER
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: `order_${Date.now()}`
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// VERIFY PAYMENT
router.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(sign).digest('hex');

  if (razorpay_signature === expectedSign) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

export default router;