import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import Layout from '../components/layout/Layout';

import { signInWithPopup, provider, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  return (
    <Layout>
      {/* Optional: Add this to top of the page */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button
          onClick={handleSignIn}
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            backgroundColor: '#A3D9A5',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Sign in with Google to Get Started
        </button>
      </div>

      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default LandingPage;
