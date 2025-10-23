import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DollarSign, Menu, X, User, ChevronDown, Settings, Globe, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    setIsProfileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

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
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/')
                  ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
              onClick={handleNavClick}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`font-medium transition-colors ${
                isActive('/dashboard')
                  ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
              onClick={handleNavClick}
            >
              Dashboard
            </Link>
            <Link
              to="/features"
              className={`font-medium transition-colors ${
                isActive('/features')
                  ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
              onClick={handleNavClick}
            >
              Features
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-colors ${
                isActive('/about')
                  ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
              onClick={handleNavClick}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
              onClick={handleNavClick}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/get-started" className="btn-primary">
              Get Started
            </Link>

            {/* Profile Icon with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                {isAuthenticated && (
                  <span className="font-medium">{user?.name || 'User'}</span>
                )}
                <ChevronDown className="h-4 w-4" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {isAuthenticated ? (
                    <>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          // TODO: Navigate to settings
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          // TODO: Open language change modal
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Globe className="h-4 w-4 mr-3" />
                        Language Change
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/signin"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4 mr-3" />
                      Sign In
                    </Link>
                  )}
                </div>
              )}
            </div>
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
              <Link
                to="/"
                className={`font-medium transition-colors ${
                  isActive('/')
                    ? 'text-primary-600 bg-primary-50 px-3 py-2 rounded-lg'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
                onClick={handleNavClick}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'text-primary-600 bg-primary-50 px-3 py-2 rounded-lg'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
                onClick={handleNavClick}
              >
                Dashboard
              </Link>
              <Link
                to="/features"
                className={`font-medium transition-colors ${
                  isActive('/features')
                    ? 'text-primary-600 bg-primary-50 px-3 py-2 rounded-lg'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
                onClick={handleNavClick}
              >
                Features
              </Link>
              <Link
                to="/about"
                className={`font-medium transition-colors ${
                  isActive('/about')
                    ? 'text-primary-600 bg-primary-50 px-3 py-2 rounded-lg'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
                onClick={handleNavClick}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`font-medium transition-colors ${
                  isActive('/contact')
                    ? 'text-primary-600 bg-primary-50 px-3 py-2 rounded-lg'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
                onClick={handleNavClick}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Link
                  to="/get-started"
                  className="btn-primary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>

                {/* Profile Icon with Dropdown for Mobile */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center justify-center space-x-2 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 text-white" />
                    </div>
                    {isAuthenticated && (
                      <span className="text-sm font-medium">{user?.name || 'User'}</span>
                    )}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      {isAuthenticated ? (
                        <>
                          <button
                            onClick={() => {
                              setIsProfileMenuOpen(false);
                              setIsMenuOpen(false);
                              // TODO: Navigate to settings
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Settings className="h-4 w-4 mr-3" />
                            Settings
                          </button>
                          <button
                            onClick={() => {
                              setIsProfileMenuOpen(false);
                              setIsMenuOpen(false);
                              // TODO: Open language change modal
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Globe className="h-4 w-4 mr-3" />
                            Language Change
                          </button>
                          <button
                            onClick={() => {
                              handleLogout();
                              setIsMenuOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <LogOut className="h-4 w-4 mr-3" />
                            Logout
                          </button>
                        </>
                      ) : (
                        <Link
                          to="/signin"
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <User className="h-4 w-4 mr-3" />
                          Sign In
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;