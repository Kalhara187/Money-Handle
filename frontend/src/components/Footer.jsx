import React from 'react';
import { DollarSign, Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 p-2 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Money Handle</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Empowering individuals to take control of their financial future with smart, 
              intuitive tools and insights.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>contact@moneyhandle.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-300 hover:text-primary-400 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-primary-400 transition-colors">Pricing</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-primary-400 transition-colors">Contact</a></li>
              <li><a href="#blog" className="text-gray-300 hover:text-primary-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#help" className="text-gray-300 hover:text-primary-400 transition-colors">Help Center</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-primary-400 transition-colors">FAQ</a></li>
              <li><a href="#privacy" className="text-gray-300 hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="text-gray-300 hover:text-primary-400 transition-colors">Terms of Service</a></li>
              <li><a href="#security" className="text-gray-300 hover:text-primary-400 transition-colors">Security</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Get the latest financial tips and product updates delivered to your inbox.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-secondary-800 border border-secondary-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="bg-primary-600 hover:bg-primary-700 p-2 rounded-lg transition-colors">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bara */}
        <div className="border-t border-secondary-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Money Handle. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;