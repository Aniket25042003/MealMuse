import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Recipe } from '../../lib/db';
import Button from '../ui/Button';

interface MealPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (day: string, type: 'breakfast' | 'lunch' | 'dinner' | 'snack', recipe: Recipe) => void;
  day: string;
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  currentRecipe?: Recipe;
}

const MealPlanModal: React.FC<MealPlanModalProps> = ({
  isOpen,
  onClose,
  onSave,
  day,
  mealType,
  currentRecipe
}) => {
  const [selectedType, setSelectedType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>(mealType || 'lunch');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(currentRecipe || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // TODO: Fetch recipes based on search query
      // This will be implemented when we have the recipe search functionality
    }
  }, [isOpen, searchQuery]);

  const handleSave = () => {
    if (selectedRecipe) {
      onSave(day, selectedType, selectedRecipe);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {currentRecipe ? 'Edit Meal' : 'Add Meal'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div className="space-y-6">
            {/* Meal Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meal Type
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      selectedType === type
                        ? 'bg-green-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipe Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Recipes
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for recipes..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary focus:border-transparent"
              />
            </div>

            {/* Recipe List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-4">Loading recipes...</div>
              ) : recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                      selectedRecipe?.id === recipe.id
                        ? 'border-green-primary bg-green-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="h-16 w-16 rounded-md overflow-hidden mr-4">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{recipe.name}</h3>
                      <p className="text-sm text-gray-500">
                        {recipe.prepTime + recipe.cookTime} min • {recipe.difficulty}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No recipes found. Try a different search.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!selectedRecipe}
            >
              {currentRecipe ? 'Update Meal' : 'Add Meal'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanModal; 