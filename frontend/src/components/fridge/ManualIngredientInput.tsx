import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Tag from '../ui/Tag';

interface ManualIngredientInputProps {
  onIngredientsAdded?: (ingredients: string[]) => void;
  existingIngredients?: string[];
}

const ManualIngredientInput: React.FC<ManualIngredientInputProps> = ({
  onIngredientsAdded,
  existingIngredients = [],
}) => {
  const [ingredients, setIngredients] = useState<string[]>(existingIngredients);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [error, setError] = useState('');

  const suggestedIngredients = [
    'Apples', 'Broccoli', 'Carrots', 'Eggs', 'Milk', 'Chicken', 'Rice', 'Potatoes',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentIngredient(e.target.value);
    if (error) setError('');
  };

  const addIngredient = () => {
    if (!currentIngredient.trim()) {
      setError('Please enter an ingredient');
      return;
    }

    if (ingredients.includes(currentIngredient.trim())) {
      setError('This ingredient is already added');
      return;
    }

    const newIngredients = [...ingredients, currentIngredient.trim()];
    setIngredients(newIngredients);
    setCurrentIngredient('');
    
    if (onIngredientsAdded) {
      onIngredientsAdded(newIngredients);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const removeIngredient = (ingredient: string) => {
    const newIngredients = ingredients.filter(item => item !== ingredient);
    setIngredients(newIngredients);
    
    if (onIngredientsAdded) {
      onIngredientsAdded(newIngredients);
    }
  };

  const addSuggestedIngredient = (ingredient: string) => {
    if (ingredients.includes(ingredient)) {
      setError('This ingredient is already added');
      return;
    }

    const newIngredients = [...ingredients, ingredient];
    setIngredients(newIngredients);
    
    if (onIngredientsAdded) {
      onIngredientsAdded(newIngredients);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Manually add ingredients</h2>
        <p className="text-gray-600">
          Add ingredients you have available to get personalized meal suggestions.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter an ingredient"
            value={currentIngredient}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            error={error}
            className="flex-grow"
          />
          <Button onClick={addIngredient} icon={<Plus size={18} />}>
            Add
          </Button>
        </div>

        {/* Suggested ingredients */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Suggested ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedIngredients.map((ingredient, index) => {
              const isAdded = ingredients.includes(ingredient);
              return (
                <button
                  key={index}
                  onClick={() => !isAdded && addSuggestedIngredient(ingredient)}
                  disabled={isAdded}
                  className={`
                    inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors
                    ${
                      isAdded
                        ? 'bg-green-primary/20 text-green-dark cursor-default'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }
                  `}
                >
                  {ingredient}
                  {isAdded && <Check size={14} className="ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Added ingredients */}
        {ingredients.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-medium text-gray-700 mb-2">Your ingredients:</p>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Tag
                    label={ingredient}
                    onRemove={() => removeIngredient(ingredient)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManualIngredientInput;