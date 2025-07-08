"use client";

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Shipping Policy</h1>

      <div className="space-y-6 text-sm md:text-base leading-relaxed">
        <p>
          <strong className="font-semibold">Career Genius (owned and operated by Pooja Agrawal)</strong> is a subscription-based service platform offering digital content and coaching solutions. As such, no physical shipping is involved in the delivery of our services.
        </p>

        <h2 className="text-xl font-semibold mt-4">1. Digital Delivery</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>All services, resources, and sessions are delivered digitally via email, dashboard access, or live online platforms.</li>
          <li>Upon successful payment, users receive immediate or scheduled access to the subscribed content.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">2. Delivery Timeframes</h2>
        <p>
          Access to your subscription or service is typically provided instantly or within 24 hours of successful payment, unless specified otherwise during signup or checkout.
        </p>

        <h2 className="text-xl font-semibold mt-4">3. No Physical Shipments</h2>
        <p>
          Career Genius does not offer or ship any physical products. If a user expects tangible goods, they should contact us before completing their purchase to clarify the nature of the service.
        </p>

        <h2 className="text-xl font-semibold mt-4">4. Support & Delivery Issues</h2>
        <p>
          If you face any issues accessing your digital service or session after payment, please contact our support team, and we’ll assist you promptly.
        </p>
        <p className="text-blue-600">admin@azurelib.com</p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
