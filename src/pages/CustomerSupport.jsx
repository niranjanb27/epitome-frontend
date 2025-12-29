import { Phone, Mail, MessageCircle, Clock } from "lucide-react";

export default function CustomerSupport() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-green-700">
            Customer Support
          </h1>
          <p className="text-gray-600 mt-2">
            We’re here to help you with orders, payments, and medicines
          </p>
        </div>

        {/* Support Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Call Support */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <Phone className="mx-auto text-green-600 mb-3" size={32} />
            <h2 className="font-bold text-lg mb-1">Call Support</h2>
            <p className="text-gray-600 text-sm mb-2">
              Speak directly with our support team
            </p>
            <p className="font-semibold text-green-700">
              +91 9226972834
            </p>
          </div>

          {/* Email Support */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <Mail className="mx-auto text-blue-600 mb-3" size={32} />
            <h2 className="font-bold text-lg mb-1">Email Us</h2>
            <p className="text-gray-600 text-sm mb-2">
              Get help via email within 24 hours
            </p>
            <p className="font-semibold text-blue-700">
              nitinbaviskar005@gmail.com
            </p>
          </div>

          {/* WhatsApp Support */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <MessageCircle
              className="mx-auto text-green-500 mb-3"
              size={32}
            />
            <h2 className="font-bold text-lg mb-1">WhatsApp</h2>
            <p className="text-gray-600 text-sm mb-2">
              Quick help on WhatsApp
            </p>
            <p className="font-semibold text-green-700">
              +91 9226972834
            </p>
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-white rounded-xl shadow p-6 mt-8">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-gray-600" />
            <h2 className="text-lg font-bold">Support Hours</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Monday – Saturday: <span className="font-semibold">9:00 AM – 7:00 PM</span>
          </p>
          <p className="text-gray-600 text-sm">
            Sunday & Holidays: <span className="font-semibold">Closed</span>
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow p-6 mt-8">
          <h2 className="text-lg font-bold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-semibold">
                • Order not dispatched?
              </span>{" "}
              Please contact support with your Order ID.
            </p>
            <p>
              <span className="font-semibold">
                • Wrong medicine received?
              </span>{" "}
              Raise a complaint within 24 hours.
            </p>
            <p>
              <span className="font-semibold">
                • Payment related issues?
              </span>{" "}
              Email us with transaction details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
