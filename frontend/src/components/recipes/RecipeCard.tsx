import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Star } from 'lucide-react';
import { Recipe } from '../../types';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface RecipeCardProps {
  recipe: Recipe;
  onAddToMealPlan?: (recipe: Recipe) => void;
  onViewRecipe?: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe,
  onAddToMealPlan,
  onViewRecipe
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        
        <div className="absolute top-3 right-3 flex gap-1">
          {recipe.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} color={index % 2 === 0 ? 'green' : 'coral'}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{recipe.name}</h3>
        
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Clock size={14} className="mr-1" />
          <span>{recipe.totalTime} min</span>
          
          <span className="mx-2">•</span>
          
          <span className={`
            px-2 py-0.5 rounded-full text-xs font-medium
            ${recipe.difficulty === 'Easy' ? 'bg-green-primary/20 text-green-dark' : 
              recipe.difficulty === 'Medium' ? 'bg-amber-100 text-amber-600' :
              'bg-coral/20 text-coral'}
          `}>
            {recipe.difficulty}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{recipe.description}</p>
        
        <div className="text-sm text-gray-600 mb-4">
          <p className="font-medium mb-1">Main ingredients:</p>
          <p className="line-clamp-1">
            {recipe.ingredients
              .filter(ing => ing.inFridge)
              .slice(0, 3)
              .map(ing => ing.name)
              .join(', ')}
            {recipe.ingredients.filter(ing => ing.inFridge).length > 3 && ', ...'}
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewRecipe && onViewRecipe(recipe)}
          >
            View Recipe
          </Button>
          
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => onAddToMealPlan && onAddToMealPlan(recipe)}
            icon={<ArrowRight size={16} />}
          >
            Add to Plan
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;