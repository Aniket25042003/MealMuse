import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <div className="text-green-primary">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M15 11h.01"></path>
                  <path d="M11 15h.01"></path>
                  <path d="M16 16h.01"></path>
                  <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16"></path>
                  <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4"></path>
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800 font-secondary">MealMuse</span>
            </div>
            <p className="mt-2 text-gray-600">
              Smarter meals. Less waste. Plan meals from what's in your fridge, your way.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-green-primary">Blog</Link>
              </li>
              <li>
                <Link to="/recipes" className="text-gray-600 hover:text-green-primary">Recipe Database</Link>
              </li>
              <li>
                <Link to="/nutrition" className="text-gray-600 hover:text-green-primary">Nutrition Info</Link>
              </li>
              <li>
                <Link to="/tips" className="text-gray-600 hover:text-green-primary">Cooking Tips</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-green-primary">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-green-primary">Contact</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-green-primary">Careers</Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-600 hover:text-green-primary">Press</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-green-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-green-primary">Terms of Service</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-green-primary">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} MealMuse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;