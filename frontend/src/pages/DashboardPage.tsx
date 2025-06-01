import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, RefreshCw, UtensilsCrossed, ShoppingBag, CalendarDays } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { mockUser, mockFridgeItems, mockRecipes, mockMealPlan } from '../lib/mockData';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState<string>(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  });

  // Get the current day's meals from the meal plan
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayMeals = mockMealPlan.days.find(day => day.day === today as any)?.meals || [];

  return (
    <Layout>
      <section className="py-8 md:py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {greeting}, {mockUser.name}!
                </h1>
                <p className="text-gray-600 mt-1">
                  What would you like to cook today?
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button
                  variant="primary"
                  onClick={() => navigate('/fridge')}
                  icon={<Camera size={18} />}
                >
                  Upload Fridge
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/meals')}
                  icon={<RefreshCw size={18} />}
                >
                  Generate Meals
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Fridge Inventory Card */}
              <Card
                hoverable
                onClick={() => navigate('/fridge')}
                className="relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 h-24 w-24 bg-green-primary/20 rounded-full transform translate-x-1/4 -translate-y-1/4"></div>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <svg
                    className="mr-2 text-green-primary"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 2v20"></path>
                    <path d="M4 10h16"></path>
                    <path d="M20 2v8"></path>
                    <path d="M11 2v4"></path>
                    <path d="m7 2 4 4"></path>
                    <path d="M18 14h-8"></path>
                    <path d="M18 18h-8"></path>
                    <path d="M13 22v-4"></path>
                  </svg>
                  Fridge Inventory
                </h2>
                
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">
                    You have <span className="font-semibold">{mockFridgeItems.length}</span> items in your fridge.
                  </p>
                  
                  <div className="bg-cream p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Recently Added:</p>
                    <ul className="space-y-1">
                      {mockFridgeItems.slice(0, 3).map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="h-2 w-2 bg-green-primary rounded-full mr-2"></span>
                          {item.name}
                          <span className="text-xs text-gray-500 ml-auto">
                            {new Date(item.addedAt).toLocaleDateString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/fridge');
                    }}
                  >
                    View All
                  </Button>
                </div>
              </Card>
              
              {/* This Week's Meals Card */}
              <Card
                hoverable
                onClick={() => navigate('/planner')}
                className="relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 h-24 w-24 bg-coral/20 rounded-full transform translate-x-1/4 -translate-y-1/4"></div>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <CalendarDays size={22} className="mr-2 text-coral" />
                  This Week's Meals
                </h2>
                
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">
                    Today's meals ({today}):
                  </p>
                  
                  {todayMeals.length > 0 ? (
                    <div className="space-y-3">
                      {todayMeals.map((meal, index) => (
                        <div key={index} className="flex items-center bg-cream p-3 rounded-lg">
                          <div className="h-10 w-10 rounded-md overflow-hidden mr-3">
                            <img
                              src={meal.recipe.imageUrl}
                              alt={meal.recipe.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-coral">{meal.type}</p>
                            <p className="text-sm font-medium text-gray-800">{meal.recipe.name}</p>
                          </div>
                          <div className="ml-auto flex items-center text-xs text-gray-500">
                            <span>{meal.recipe.totalTime} min</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-cream p-3 rounded-lg text-center">
                      <p className="text-gray-600">No meals planned for today</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/planner');
                        }}
                      >
                        Plan Today's Meals
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/planner');
                    }}
                  >
                    View Full Plan
                  </Button>
                </div>
              </Card>
              
              {/* Grocery List Card */}
              <Card
                hoverable
                onClick={() => navigate('/grocery')}
                className="relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 h-24 w-24 bg-green-primary/20 rounded-full transform translate-x-1/4 -translate-y-1/4"></div>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <ShoppingBag size={22} className="mr-2 text-green-primary" />
                  Smart Grocery List
                </h2>
                
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">
                    Based on your meal plan and fridge inventory.
                  </p>
                  
                  <div className="bg-cream p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700">Items to buy:</p>
                      <span className="bg-coral/20 text-coral text-xs font-medium px-2 py-0.5 rounded-full">
                        7 items
                      </span>
                    </div>
                    
                    <ul className="space-y-1">
                      {['Cherry Tomatoes', 'Cucumber', 'Red Onion'].map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="h-4 w-4 border border-gray-300 rounded mr-2"></span>
                          {item}
                        </li>
                      ))}
                      <li className="text-sm text-gray-500 italic">
                        + 4 more items...
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/grocery');
                    }}
                  >
                    View List
                  </Button>
                </div>
              </Card>
            </div>
            
            {/* Recipe Suggestions */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Meal Suggestions for You
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/meals')}
                  icon={<UtensilsCrossed size={18} />}
                >
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockRecipes.slice(0, 3).map((recipe, index) => (
                  <Card
                    key={index}
                    hoverable
                    onClick={() => navigate(`/meals/${recipe.id}`)}
                    className="overflow-hidden"
                  >
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                          {recipe.totalTime} min
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex gap-1 mb-2">
                        {recipe.tags.slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="bg-green-primary/20 text-gray-800 px-2 py-0.5 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{recipe.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{recipe.description}</p>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-2">{recipe.difficulty}</span>
                        <span>•</span>
                        <span className="ml-2">{recipe.ingredients.filter(i => i.inFridge).length} ingredients in fridge</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default DashboardPage;