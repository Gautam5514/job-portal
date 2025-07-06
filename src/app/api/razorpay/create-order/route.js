// File: app/api/razorpay/create-order/route.js

import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
// import { adminAuth } from '@/lib/firebase/firebaseAdmin';

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', planId, userId } = body;

    if (!amount || !planId || !userId) {
      return NextResponse.json(
        { error: 'Amount, Plan ID, and User ID are required.' },
        { status: 400 }
      );
    }

    // --- MODIFIED RECEIPT ID GENERATION ---
    const timestampPart = Date.now().toString().slice(-6); // last 6 digits for brevity
    // Take first 15 and last 5 chars of UID to get a 20 char semi-unique user identifier
    const userPart = userId.length > 20 ? userId.substring(0, 15) + userId.substring(userId.length - 5) : userId; 
    let receiptId = `rcpt_${userPart}_${timestampPart}`; // "rcpt_" (5) + 20 + "_" (1) + 6 = 32 chars

    // Fallback to ensure it's not > 40, though the above should be fine
    if (receiptId.length > 40) {
      receiptId = receiptId.substring(0, 40);
    }
    // --- END OF MODIFICATION ---

    const options = {
      amount: Number(amount),
      currency: currency,
      receipt: receiptId, // Use the shortened version
      notes: {
        planId: planId,
        userId: userId, // Full userId in notes for your records
        source: "Prepex Web App"
      },
    };

    const order = await instance.orders.create(options);

    if (!order) {
      return NextResponse.json(
        { error: 'Razorpay order creation failed (no order returned)' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    }, { status: 200 });

  } catch (error) {
    console.error('Error creating Razorpay order in POST handler:', error);
    if (error.statusCode && error.error && error.error.description) {
        return NextResponse.json(
            { error: `Razorpay Error: ${error.error.description}`, details: error.error.reason },
            { status: error.statusCode }
        );
    }
    return NextResponse.json(
      { error: error.message || 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return NextResponse.json(
    { message: "This is the Razorpay order creation endpoint. Please use a POST request with order details in the body." },
    { status: 200 }
  );
} 