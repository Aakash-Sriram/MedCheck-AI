import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              MedCheck AI
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/check" className="text-gray-700 hover:text-blue-600">Check Interactions</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
            <Link to="/help" className="text-gray-700 hover:text-blue-600">Help</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/check"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Check Interactions
            </Link>
            <Link
              to="/profile"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/help"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Help
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}