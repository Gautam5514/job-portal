"use client";

import { Mail, Phone, MessageCircle, HelpCircle } from "lucide-react";

const CustomerSupport = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-center">Customer Support</h1>
      <p className="text-center text-gray-600 mb-10">
        We're here to help! Reach out to us anytime and we’ll happily answer your questions.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Email Support */}
        <div className="bg-white border rounded-lg shadow-sm p-6 text-center hover:shadow-md transition">
          <Mail className="w-10 h-10 mx-auto text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Email Support</h2>
          <p className="text-sm text-gray-600 mb-2">support@example.com</p>
          <a
            href="mailto:support@example.com"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Send an Email
          </a>
        </div>

        {/* Phone Support */}
        <div className="bg-white border rounded-lg shadow-sm p-6 text-center hover:shadow-md transition">
          <Phone className="w-10 h-10 mx-auto text-green-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Call Us</h2>
          <p className="text-sm text-gray-600 mb-2">+91 98765 43210</p>
          <a
            href="tel:+919876543210"
            className="text-green-600 hover:underline text-sm font-medium"
          >
            Make a Call
          </a>
        </div>

        {/* Live Chat */}
        <div className="bg-white border rounded-lg shadow-sm p-6 text-center hover:shadow-md transition">
          <MessageCircle className="w-10 h-10 mx-auto text-purple-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Live Chat</h2>
          <p className="text-sm text-gray-600 mb-2">
            Chat with our team 9 AM – 7 PM IST
          </p>
          <button
            onClick={() => alert("Live chat feature coming soon!")}
            className="text-purple-600 hover:underline text-sm font-medium"
          >
            Start Chat
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-12 bg-gray-100 rounded-lg p-6 text-center">
        <HelpCircle className="w-8 h-8 mx-auto text-gray-500 mb-2" />
        <p className="text-sm text-gray-600">
          Still have questions? Reach out to our dedicated support team
          or send us a message.
        </p>
      </div>
    </div>
  );
};

export default CustomerSupport;
