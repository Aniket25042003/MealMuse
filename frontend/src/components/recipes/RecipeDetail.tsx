import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ChefHat, Bookmark, PieChart, Heart, Share2 } from 'lucide-react';
import { Recipe } from '../../types';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onAddToMealPlan: (recipe: Recipe) => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack, onAddToMealPlan }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="relative">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.name} 
          className="w-full h-64 md:h-80 object-cover"
        />
        
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <Heart size={20} className="text-gray-700" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <Bookmark size={20} className="text-gray-700" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <Share2 size={20} className="text-gray-700" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags.map((tag, index) => (
            <Badge key={index} color={index % 2 === 0 ? 'green' : 'coral'}>
              {tag}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">{recipe.name}</h1>
        
        <p className="text-gray-600 mb-6">{recipe.description}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-cream p-3 rounded-lg text-center">
            <Clock size={20} className="mx-auto mb-1 text-green-primary" />
            <p className="text-sm text-gray-500">Prep Time</p>
            <p className="font-medium">{recipe.prepTime} min</p>
          </div>
          <div className="bg-cream p-3 rounded-lg text-center">
            <ChefHat size={20} className="mx-auto mb-1 text-green-primary" />
            <p className="text-sm text-gray-500">Cook Time</p>
            <p className="font-medium">{recipe.cookTime} min</p>
          </div>
          <div className="bg-cream p-3 rounded-lg text-center">
            <PieChart size={20} className="mx-auto mb-1 text-green-primary" />
            <p className="text-sm text-gray-500">Servings</p>
            <p className="font-medium">{recipe.servings}</p>
          </div>
          <div className="bg-cream p-3 rounded-lg text-center">
            <svg 
              className="mx-auto mb-1 text-green-primary" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m12 15 2 2 4-4"></path>
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
            </svg>
            <p className="text-sm text-gray-500">Difficulty</p>
            <p className="font-medium">{recipe.difficulty}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <div className={`
                    h-5 w-5 rounded-full mr-3 mt-0.5 flex-shrink-0 flex items-center justify-center
                    ${ingredient.inFridge ? 'bg-green-primary' : 'bg-gray-200'}
                  `}>
                    {ingredient.inFridge && (
                      <svg width="12\" height="12\" viewBox="0 0 24 24\" fill="none\" stroke="white\" strokeWidth="3\" strokeLinecap="round\" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className={ingredient.inFridge ? 'text-gray-800' : 'text-gray-500'}>
                    {ingredient.amount} {ingredient.name}
                    {!ingredient.inFridge && ' (need to buy)'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Instructions</h2>
            <ol className="space-y-4 list-decimal list-inside">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-semibold text-gray-800 mr-2">{index + 1}.</span> {instruction}
                </li>
              ))}
            </ol>
          </div>
        </div>
        
        {recipe.nutritionInfo && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Nutrition Information</h2>
            <div className="grid grid-cols-4 gap-4 bg-cream p-4 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-500">Calories</p>
                <p className="font-semibold">{recipe.nutritionInfo.calories}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Protein</p>
                <p className="font-semibold">{recipe.nutritionInfo.protein}g</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Carbs</p>
                <p className="font-semibold">{recipe.nutritionInfo.carbs}g</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Fat</p>
                <p className="font-semibold">{recipe.nutritionInfo.fat}g</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-end">
          <Button
            variant="secondary"
            onClick={() => onAddToMealPlan(recipe)}
          >
            Add to Meal Plan
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeDetail;