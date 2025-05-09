// src/components/Layout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;