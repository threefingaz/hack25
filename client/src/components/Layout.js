import React from 'react';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 CashFlow Bridge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;