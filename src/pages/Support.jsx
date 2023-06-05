import React from 'react';

const SupportPage = () => {
  return (
    <div className="bg-gray-100">
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Support Center</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">FAQs</h3>
              <p className="text-gray-700 mb-4">Find answers to commonly asked questions.</p>
              <a href="#" className="text-blue-500 hover:underline">View FAQs</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Knowledge Base</h3>
              <p className="text-gray-700 mb-4">Explore our comprehensive knowledge base for detailed information.</p>
              <a href="#" className="text-blue-500 hover:underline">Visit Knowledge Base</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
              <p className="text-gray-700 mb-4">Reach out to our support team for assistance.</p>
              <a href="#" className="text-blue-500 hover:underline">Contact Support</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 py-12">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Helpful Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Video Tutorials</h3>
              <p className="text-gray-700 mb-4">Watch our step-by-step video tutorials for assistance.</p>
              <a href="#" className="text-blue-500 hover:underline">Browse Videos</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Documentation</h3>
              <p className="text-gray-700 mb-4">Access our detailed documentation for in-depth information.</p>
              <a href="#" className="text-blue-500 hover:underline">View Documentation</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Community Forum</h3>
              <p className="text-gray-700 mb-4">Join our community forum to engage with other users.</p>
              <a href="#" className="text-blue-500 hover:underline">Visit Forum</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;
