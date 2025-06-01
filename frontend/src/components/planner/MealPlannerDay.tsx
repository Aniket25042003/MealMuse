import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Recipe } from '../../types';
import Button from '../ui/Button';

interface MealPlannerDayProps {
  day: string;
  meals: { type: string; recipe: Recipe }[];
  onAddMeal: (day: string) => void;
  onRemoveMeal: (day: string, mealType: string) => void;
  onEditMeal: (day: string, mealType: string) => void;
}

const MealPlannerDay: React.FC<MealPlannerDayProps> = ({
  day,
  meals,
  onAddMeal,
  onRemoveMeal,
  onEditMeal,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-green-primary/20 px-4 py-3">
        <h3 className="text-lg font-semibold text-gray-800">{day}</h3>
      </div>
      
      <div className="p-4">
        {meals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No meals planned yet</p>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onAddMeal(day)}
              icon={<Plus size={16} />}
            >
              Add Meal
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {meals.map((meal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden mr-3">
                  <img 
                    src={meal.recipe.imageUrl} 
                    alt={meal.recipe.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="flex-grow min-w-0">
                  <span className="text-xs font-medium text-coral">{meal.type}</span>
                  <h4 className="text-sm font-medium text-gray-800 truncate">{meal.recipe.name}</h4>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{meal.recipe.totalTime} min</span>
                    <span className="mx-1">•</span>
                    <span>{meal.recipe.difficulty}</span>
                  </div>
                </div>
                
                <div className="flex space-x-1 ml-2">
                  <button 
                    onClick={() => onEditMeal(day, meal.type)}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => onRemoveMeal(day, meal.type)}
                    className="p-1.5 text-gray-500 hover:text-coral hover:bg-gray-100 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
            
            <Button 
              size="sm" 
              variant="outline" 
              fullWidth
              onClick={() => onAddMeal(day)}
              icon={<Plus size={16} />}
            >
              Add Meal
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlannerDay;