import React from 'react';

const EnterprisePage = () => {
  return (
    <div className="bg-gray-100">
      <section className="bg-gray-200 py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-4">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold mb-4">Transforming Enterprises</h2>
              <p className="text-lg mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nibh sed libero faucibus vestibulum. Vestibulum finibus neque eget ipsum malesuada finibus.</p>
              <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md">Learn More</a>
            </div>
            <div className="flex justify-center">
              {/* <img src="/images/enterprise.jpg" alt="Enterprise" className="w-3/4 md:w-full rounded-md" /> */}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Service 1</h3>
              <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nibh sed libero faucibus vestibulum.</p>
              <a href="#" className="text-blue-500 hover:underline">Learn More</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Service 2</h3>
              <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nibh sed libero faucibus vestibulum.</p>
              <a href="#" className="text-blue-500 hover:underline">Learn More</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Service 3</h3>
              <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nibh sed libero faucibus vestibulum.</p>
              <a href="#" className="text-blue-500 hover:underline">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 py-12">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nibh sed libero faucibus vestibulum."</p>
              <p className="font-bold">- Client 1</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nibh sed libero faucibus vestibulum."</p>
              <p className="font-bold">- Client 2</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nibh sed libero faucibus vestibulum."</p>
              <p className="font-bold">- Client 3</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnterprisePage;
