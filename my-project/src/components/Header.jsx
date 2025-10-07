import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <Link to="/" className="text-2xl font-bold text-gray-900">Money Handle</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
              Features
            </a>
            <a href="#about" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link 
              to="/signin" 
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link to="/get-started" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                Features
              </a>
              <a href="#about" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Link 
                  to="/signin" 
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors text-left"
                >
                  Sign In
                </Link>
                <Link to="/get-started" className="btn-primary text-center">
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;