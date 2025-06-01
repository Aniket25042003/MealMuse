import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, Filter } from 'lucide-react';
import Layout from '../components/layout/Layout';
import RecipeCard from '../components/recipes/RecipeCard';
import RecipeDetail from '../components/recipes/RecipeDetail';
import Button from '../components/ui/Button';
import { mockRecipes } from '../lib/mockData';
import { Recipe } from '../types';

const MealsPage: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState<string[]>([]);
  const [dietFilter, setDietFilter] = useState<string[]>([]);

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToMealPlan = (recipe: Recipe) => {
    // In a real app, we would add this to the meal plan
    console.log('Added to meal plan:', recipe.name);
  };

  const handleFilterChange = (filter: string, category: 'difficulty' | 'time' | 'diet') => {
    switch (category) {
      case 'difficulty':
        setDifficultyFilter(prev => 
          prev.includes(filter) 
            ? prev.filter(f => f !== filter) 
            : [...prev, filter]
        );
        break;
      case 'time':
        setTimeFilter(prev => 
          prev.includes(filter) 
            ? prev.filter(f => f !== filter) 
            : [...prev, filter]
        );
        break;
      case 'diet':
        setDietFilter(prev => 
          prev.includes(filter) 
            ? prev.filter(f => f !== filter) 
            : [...prev, filter]
        );
        break;
    }
  };

  const clearFilters = () => {
    setDifficultyFilter([]);
    setTimeFilter([]);
    setDietFilter([]);
  };

  const filteredRecipes = mockRecipes.filter(recipe => {
    // Filter by difficulty
    if (difficultyFilter.length > 0 && !difficultyFilter.includes(recipe.difficulty)) {
      return false;
    }
    
    // Filter by time
    if (timeFilter.length > 0) {
      const totalTime = recipe.totalTime;
      if (
        (timeFilter.includes('< 15 min') && totalTime >= 15) ||
        (timeFilter.includes('15-30 min') && (totalTime < 15 || totalTime > 30)) ||
        (timeFilter.includes('> 30 min') && totalTime <= 30)
      ) {
        return false;
      }
    }
    
    // Filter by diet
    if (dietFilter.length > 0 && !dietFilter.some(diet => recipe.tags.includes(diet))) {
      return false;
    }
    
    return true;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedRecipe ? (
            <div className="mb-12">
              <RecipeDetail 
                recipe={selectedRecipe} 
                onBack={() => setSelectedRecipe(null)}
                onAddToMealPlan={handleAddToMealPlan}
              />
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Meal Suggestions
                </h1>
                <p className="text-gray-600 max-w-2xl">
                  Based on your fridge inventory and preferences, here are some meals you can make.
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div className="mb-4 md:mb-0">
                  <p className="text-gray-600">
                    Found <span className="font-semibold">{filteredRecipes.length}</span> recipes you can make
                  </p>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  icon={<SlidersHorizontal size={18} />}
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>
              
              {/* Filters */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-sm p-6 mb-8"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Filter size={18} className="mr-2" />
                      Filter Recipes
                    </h2>
                    
                    <div className="flex items-center">
                      <button
                        onClick={clearFilters}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Clear all
                      </button>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="ml-4 p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Difficulty Filter */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Difficulty</h3>
                      <div className="space-y-2">
                        {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                          <label key={difficulty} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={difficultyFilter.includes(difficulty)}
                              onChange={() => handleFilterChange(difficulty, 'difficulty')}
                              className="h-4 w-4 rounded border-gray-300 text-green-primary focus:ring-green-primary/30"
                            />
                            <span className="ml-2 text-gray-700">{difficulty}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Time Filter */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Time</h3>
                      <div className="space-y-2">
                        {['< 15 min', '15-30 min', '> 30 min'].map((time) => (
                          <label key={time} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={timeFilter.includes(time)}
                              onChange={() => handleFilterChange(time, 'time')}
                              className="h-4 w-4 rounded border-gray-300 text-green-primary focus:ring-green-primary/30"
                            />
                            <span className="ml-2 text-gray-700">{time}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Diet Filter */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Diet</h3>
                      <div className="space-y-2">
                        {['Vegetarian', 'Vegan', 'Gluten-Free', 'Healthy'].map((diet) => (
                          <label key={diet} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={dietFilter.includes(diet)}
                              onChange={() => handleFilterChange(diet, 'diet')}
                              className="h-4 w-4 rounded border-gray-300 text-green-primary focus:ring-green-primary/30"
                            />
                            <span className="ml-2 text-gray-700">{diet}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
          
          {!selectedRecipe && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe, index) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onViewRecipe={handleViewRecipe}
                  onAddToMealPlan={handleAddToMealPlan}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default MealsPage;