// File: app/api/razorpay/verify-payment/route.js

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { adminDb, admin } from '@/lib/firebase/firebaseAdmin'; // Ensure this path is correct

// Temporary mapping to get basePlanId and billingCycle from the specific planId.
// In a larger app, you might fetch this from a DB or a shared config file.
const PLAN_DETAILS_MAP = {
  'free': { basePlanId: 'free', billingCycle: null, isPaid: false }, // For completeness if free plan somehow hit this
  'monthly_199': { basePlanId: 'Premium', billingCycle: 'Monthly', isPaid: true },
  'yearly_999': { basePlanId: 'Premium', billingCycle: 'Yearly', isPaid: true },
};

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      planId,       // This will be 'monthly_199' or 'yearly_999' from client
      planName,     // e.g., "Pro Monthly"
      amountPaid,
      currency,
    } = body;

    if (
      !razorpay_order_id || !razorpay_payment_id || !razorpay_signature ||
      !userId || !planId || !planName ||
      amountPaid === undefined || !currency
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing required payment verification details.' },
        { status: 400 }
      );
    }

    // Verify the signature
    const generated_body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(generated_body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      const userRef = adminDb.collection('users').doc(userId);
      const now = admin.firestore.Timestamp.now();

      // ========================================================================
      // CHANGE BLOCK: Determine basePlanId, billingCycle, and calculate endDate
      // ========================================================================
      const purchasedPlanDetails = PLAN_DETAILS_MAP[planId];

      if (!purchasedPlanDetails || !purchasedPlanDetails.isPaid) {
        // This endpoint is for paid plan verifications.
        // 'free' plan activation should be handled differently (client-side or dedicated free_activation endpoint).
        console.error(`Invalid or non-paid planId ('${planId}') received in verify-payment for user ${userId}.`);
        return NextResponse.json(
            { success: false, error: `Invalid planId ('${planId}') for a paid subscription.` },
            { status: 400 }
        );
      }

      const basePlanForSubscription = purchasedPlanDetails.basePlanId; // e.g., 'Premium'
      const billingCycleForSubscription = purchasedPlanDetails.billingCycle; // e.g., 'Monthly' or 'Yearly'

      const newEndDate = new Date(now.toDate());
      if (billingCycleForSubscription === 'Monthly') {
        newEndDate.setMonth(newEndDate.getMonth() + 1);
      } else if (billingCycleForSubscription === 'Yearly') {
        newEndDate.setFullYear(newEndDate.getFullYear() + 1);
      } else {
        // Should not happen if PLAN_DETAILS_MAP is correct and planId is valid
        console.error(`Unknown billingCycle ('${billingCycleForSubscription}') for planId '${planId}'. Defaulting endDate to 1 month.`);
        newEndDate.setMonth(newEndDate.getMonth() + 1);
      }
      const firestoreEndDate = admin.firestore.Timestamp.fromDate(newEndDate);
      // ========================================================================
      // END OF CHANGE BLOCK
      // ========================================================================

      const subscriptionData = {
        plan: basePlanForSubscription,      // Store the general plan type (e.g., 'Premium')
        planTier: planId,                   // Store the specific purchased SKU (e.g., 'monthly_199')
        billingCycle: billingCycleForSubscription, // Store 'Monthly' or 'Yearly'
        status: 'active',
        startDate: now,
        endDate: firestoreEndDate,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
      };

      const transactionData = {
        transactionId: razorpay_payment_id,
        orderId: razorpay_order_id,
        amount: Number(amountPaid) / 100,
        currency: currency,
        planId: planId, // Store the specific purchased planId in the transaction
        planName: planName,
        status: 'success',
        timestamp: now,
        userId: userId,
      };

      await userRef.update({
        subscription: subscriptionData,
        transactions: admin.firestore.FieldValue.arrayUnion(transactionData),
      });

      return NextResponse.json(
        { success: true, message: 'Payment verified successfully and subscription updated.' },
        { status: 200 }
      );

    } else {
      console.warn(`Signature verification failed for order_id: ${razorpay_order_id}, payment_id: ${razorpay_payment_id}`);
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature. Verification failed.' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error during payment verification:', error);
    if (error.code && error.details) { // Heuristic for Firestore errors
        console.error("Firestore Error Details:", error.details);
    }
    return NextResponse.json(
      { success: false, error: error.message || 'An internal server error occurred during payment verification.' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return NextResponse.json(
    { message: "This is the Razorpay payment verification endpoint. Use POST with payment details." },
    { status: 200 }
  );
}