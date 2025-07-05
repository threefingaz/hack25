import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/connect', label: 'Connect Bank' },
    { path: '/analysis', label: 'Analysis' },
    { path: '/offer', label: 'Offer' },
    { path: '/accept', label: 'Accept' },
    { path: '/dashboard', label: 'Dashboard' }
  ];

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            CashFlow Bridge
          </Link>
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded ${
                  location.pathname === item.path
                    ? 'bg-blue-800 text-white'
                    : 'hover:bg-blue-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;