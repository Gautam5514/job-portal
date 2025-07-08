"use client";

const PricingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Pricing Policy</h1>

      <div className="space-y-6 text-sm md:text-base leading-relaxed">
        <p>
          At <strong className="font-semibold">Career Genius (owned and operated by Pooja Agrawal)</strong>, our pricing is designed to be clear, transparent, and fair. This policy outlines how we present and manage the pricing of our subscription-based services.
        </p>

        <h2 className="text-xl font-semibold mt-4">1. Pricing Structure</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>All services are offered through monthly or annual subscription plans, as displayed on our website.</li>
          <li>Prices are quoted in Indian Rupees (INR) and are inclusive of applicable taxes, unless stated otherwise.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">2. Promotional Offers</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>We may offer limited-time discounts, coupon codes, or promotional rates, which will be clearly communicated on the website.</li>
          <li>Promotions cannot be applied retroactively to prior purchases.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">3. Automatic Renewal</h2>
        <p>
          All subscriptions had to be renewed at the end of each billing cycle unless cancelled by the user prior to renewal. The applicable renewal price will be charged using your saved payment method.
        </p>

        <h2 className="text-xl font-semibold mt-4">4. Price Changes</h2>
        <p>
          We reserve the right to revise our subscription pricing. Any changes will be notified in advance and will only apply to future billing cycles. Your current plan’s price will be honored for the ongoing period.
        </p>

        <h2 className="text-xl font-semibold mt-4">5. Errors in Pricing</h2>
        <p>
          In the event of a pricing error on the website, we reserve the right to cancel or revise the order. If your payment has already been processed, you will be notified and issued a full refund if applicable.
        </p>

        <h2 className="text-xl font-semibold mt-4">6. Payment Processing</h2>
        <p>
          All payments are processed securely via our payment partner, Razorpay. For any billing-related concerns, please contact us at:
        </p>
        <p className="text-blue-600">admin@azurelib.com</p>
      </div>
    </div>
  );
};

export default PricingPolicy;
