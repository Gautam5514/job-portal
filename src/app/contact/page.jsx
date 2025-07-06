"use client";
import { useState, useEffect } from "react";
import { Skeleton } from "../../components/ui/skeleton";
import { Card, CardHeader, CardContent } from "../../components/ui/card";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(true); // ✅ added loading state

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const LoadingSkeleton = () => (
  <div className="max-w-7xl mx-auto p-6">
    <Skeleton className="h-8 w-48 mb-10" />
    <Card className="mb-12">
      <CardHeader>
        <Skeleton className="h-7 w-40 mb-2" />
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
    <Skeleton className="h-7 w-32 mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  </div>
);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us!");
    setForm({ name: "", email: "", message: "" });
  };

    if (loading) return <LoadingSkeleton />;
  return (
    <div className="min-h-screen  py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10  p-10  ">

        {/* Info Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-extrabold text-blue-800 mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Reach out to us for anything related to resume building, career advice,
              or job suggestions. We're here to help!
            </p>

            <div className="space-y-4 text-gray-800">
              <div>
                <h4 className="font-semibold">📍 Address</h4>
                <p>Indore, Madhya Pradesh, 452011 </p>
              </div>
              <div>
                <h4 className="font-semibold">📞 Phone</h4>
                <p> +91 93922-72173</p>
              </div>
              <div>
                <h4 className="font-semibold">📧 Email</h4>
                <p>admin@azurelib.com</p>
              </div>
              <div>

              </div>
            </div>
          </div>

          <iframe
            title="Office Location"
            className="w-full h-56 rounded-xl mt-8 border border-blue-200"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d471037.3220118086!2d75.870867!3d22.729019000000005!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1751533940177!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
          />
          
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800">Send us a message</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
