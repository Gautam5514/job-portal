// pages/api/razorpay/create-order.js
import Razorpay from 'razorpay';
import { adminAuth } from '@/lib/firebasefirebaseAdmin'; // For getting user if needed, or pass UID from client

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount, currency = 'INR', planId, userId } = req.body;

      if (!amount || !planId || !userId) {
        return res.status(400).json({ error: 'Amount, Plan ID, and User ID are required.' });
      }

      // Optional: Verify user from token if you pass Firebase ID token
      // const token = req.headers.authorization?.split('Bearer ')[1];
      // if (!token) return res.status(401).json({ error: 'Unauthorized' });
      // const decodedToken = await adminAuth.verifyIdToken(token);
      // const userId = decodedToken.uid;

      const options = {
        amount: Number(amount), // Amount in the smallest currency unit (e.g., paisa for INR)
        currency,
        receipt: `receipt_order_${Date.now()}`, // Unique receipt ID
        notes: {
          planId,
          userId,
        },
      };

      const order = await instance.orders.create(options);

      if (!order) {
        return res.status(500).json({ error: 'Razorpay order creation failed' });
      }

      res.status(200).json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Send key ID to client
      });
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}