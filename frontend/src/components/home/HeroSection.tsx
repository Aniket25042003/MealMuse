import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  return (
    <section className="relative overflow-hidden bg-cream pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center md:text-left"
          >
            <motion.h1 
              variants={item} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
            >
              Smarter Meals.
              <br />
              Less Waste.
            </motion.h1>
            <motion.p 
              variants={item} 
              className="mt-4 text-xl text-gray-600 max-w-lg"
            >
              Plan meals from what's in your fridge, your way. Powered by AI to help you reduce food waste and cook delicious meals.
            </motion.p>
            <motion.div variants={item} className="mt-8">
              <Button 
                onClick={handleGetStarted} 
                size="lg"
                icon={<ArrowRight size={20} />}
                className="mr-4"
              >
                Get Started
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto md:mx-0 max-w-md"
          >
            <div className="relative">
              <div className="absolute -z-10 inset-0 bg-green-primary/20 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
              
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <img 
                    src="https://images.pexels.com/photos/4871161/pexels-photo-4871161.jpeg" 
                    alt="Fridge with ingredients" 
                    className="rounded-2xl shadow-xl"
                  />
                </motion.div>
                
                {/* Floating ingredients */}
                <motion.div 
                  className="absolute -top-8 -right-8"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <img 
                    src="https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg" 
                    alt="Carrot" 
                    className="w-16 h-16 object-cover rounded-full shadow-lg border-2 border-white"
                  />
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-6 -left-6"
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                >
                  <img 
                    src="https://images.pexels.com/photos/39643/broccoli-vegetables-salad-green-39643.jpeg" 
                    alt="Broccoli" 
                    className="w-14 h-14 object-cover rounded-full shadow-lg border-2 border-white"
                  />
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/2 -right-10 transform -translate-y-1/2"
                  animate={{ y: [0, 8, 0], rotate: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                >
                  <img 
                    src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg" 
                    alt="Bell Pepper" 
                    className="w-12 h-12 object-cover rounded-full shadow-lg border-2 border-white"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-green-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/4 bg-coral/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;