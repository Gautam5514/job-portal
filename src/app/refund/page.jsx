"use client";

const RefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Refund Policy</h1>

      <div className="space-y-6 text-sm md:text-base leading-relaxed">
        <p>
          At <strong className="font-semibold">PrepX (owned and operated by Pooja Agrawal)</strong>, we offer subscription-based services designed to support your growth and transformation. We value your commitment and strive to provide clarity and fairness in all our policies.
        </p>

        <h2 className="text-xl font-semibold mt-4">1. Subscription Refunds</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            We currently <strong>do not offer refunds</strong> on subscription purchases once the billing cycle has started.
          </li>
          <li>
            It is your responsibility to cancel your subscription before the next billing cycle if you no longer wish to continue.
          </li>
          <li>
            In exceptional cases (such as duplicate payments or accidental billing), you may contact us for a review.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">2. Trial Period (If Applicable)</h2>
        <p>
          If your subscription includes a free trial, you can cancel anytime during the trial period without being charged. Once the trial ends and billing begins, the refund policy stated above will apply.
        </p>

        <h2 className="text-xl font-semibold mt-4">3. How to Cancel</h2>
        <p>
          You can manage or cancel your subscription through your account dashboard. For assistance, feel free to contact our support team.
        </p>

        <h2 className="text-xl font-semibold mt-4">4. Contact Us</h2>
        <p>
          For any refund-related inquiries, please reach out to us at:
        </p>
        <p className="text-blue-600"> admin@azurelib.com</p>
      </div>
    </div>
  );
};

export default RefundPolicy;
