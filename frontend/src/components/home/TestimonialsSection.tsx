import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah J.',
    role: 'Busy Parent',
    content: 'MealMuse has completely changed how I manage meals for my family. I take a quick photo of my fridge on Sunday, and I have meals planned for the entire week!',
    image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
    stars: 5,
  },
  {
    name: 'Michael T.',
    role: 'Home Cook',
    content: 'I was throwing away so much food before using MealMuse. Now I get creative recipe ideas based on what I already have, and my grocery bills have dropped by 30%.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    stars: 5,
  },
  {
    name: 'Priya K.',
    role: 'Health Enthusiast',
    content: 'As someone with dietary restrictions, MealMuse has been a game-changer. It suggests meals that match my preferences and I never run out of ideas.',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    stars: 4,
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-800"
          >
            What Our Users Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-600"
          >
            Join thousands of happy users who are cooking smarter and wasting less
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i}
                    size={16}
                    fill={i < testimonial.stars ? "#FFB400" : "none"}
                    stroke={i < testimonial.stars ? "#FFB400" : "#D1D5DB"}
                    className="mr-1"
                  />
                ))}
              </div>
              
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;