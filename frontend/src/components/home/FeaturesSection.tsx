import React from 'react';
import { motion } from 'framer-motion';
import { Camera, SparkleIcon, CalendarClock, ShoppingBag } from 'lucide-react';

const features = [
  {
    title: 'Snap a Pic of Your Fridge',
    description: 'Take a photo of your fridge and our AI instantly identifies all ingredients.',
    icon: <Camera className="h-8 w-8 text-green-primary" />,
    delay: 0.1,
  },
  {
    title: 'Get AI-Powered Meal Ideas',
    description: 'Receive personalized dish suggestions based on your ingredients and preferences.',
    icon: <SparkleIcon className="h-8 w-8 text-coral" />,
    delay: 0.3,
  },
  {
    title: 'Plan Your Week',
    description: 'Organize your meals in a visual weekly calendar for stress-free cooking.',
    icon: <CalendarClock className="h-8 w-8 text-green-primary" />,
    delay: 0.5,
  },
  {
    title: 'Smart Shopping List',
    description: 'Automatically generate a grocery list with only what you need to buy.',
    icon: <ShoppingBag className="h-8 w-8 text-coral" />,
    delay: 0.7,
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-800"
          >
            How MealMuse Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-600"
          >
            Simple steps to reduce food waste and cook amazing meals
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="relative p-6 bg-cream rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="bg-white inline-block p-3 rounded-xl shadow-sm mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
              
              <div className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-semibold">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;