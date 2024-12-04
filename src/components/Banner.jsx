import React from "react";

const Banner = () => {
  return (
    <div className="bg-white w-full flex flex-col md:flex-row items-center justify-between px-6 py-10">
      {/* Left Text Section */}
      <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
        <h1 className="text-red-600 text-3xl md:text-5xl font-black leading-tight">
          The E-Commerce Application
        </h1>
        <p className="text-gray-700 mt-4 text-sm md:text-base">
          Designed to provide a complete online shopping experience for users,
          vendors, and administrators. Browse, shop, manage inventories, and
          monitor the system with an intuitive, responsive, and secure platform.
          Built with modern web technologies like Node.js, React.js, and
          PostgreSQL for a seamless experience.
        </p>
      </div>

      {/* Right Image Section */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="https://i.ibb.co.com/XpgVKyv/rb-1428.png"
          alt="E-Commerce Illustration"
          className="max-w-full h-auto "
        />
      </div>
    </div>
  );
};

export default Banner;
