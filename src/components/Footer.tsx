import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2B2B2B] text-gray-400 py-4 px-6 mt-auto">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Robot Framework Initializer</p>
      </div>
    </footer>
  );
};

export default Footer;