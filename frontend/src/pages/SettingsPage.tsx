import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import Layout from '../components/layout/Layout';
import PreferencesForm from '../components/settings/PreferencesForm';
import { mockUser } from '../lib/mockData';
import { User } from '../types';

const SettingsPage: React.FC = () => {
  const [user, setUser] = useState<User>(mockUser);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const handleSavePreferences = (updatedUser: User) => {
    setUser(updatedUser);
    setShowSuccessMessage(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <Settings size={28} className="mr-3 text-green-primary" />
              Settings
            </h1>
            <p className="text-gray-600">
              Manage your account preferences and settings
            </p>
          </div>
          
          {/* Success Message */}
          {showSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6"
            >
              <div className="flex items-center">
                <svg 
                  className="h-5 w-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Your preferences have been saved successfully!</span>
              </div>
            </motion.div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <PreferencesForm 
                user={user} 
                onSave={handleSavePreferences} 
              />
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account</h2>
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-green-primary/20 flex items-center justify-center text-green-primary font-bold text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="text-left w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    Edit Profile
                  </button>
                  <button className="text-left w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    Change Password
                  </button>
                  <button className="text-left w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    Notification Settings
                  </button>
                  <button className="text-left w-full px-3 py-2 text-sm text-coral hover:bg-coral/10 rounded-md transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default SettingsPage;