import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Check } from 'lucide-react';
import { DietaryPreference, Allergy, User } from '../../types';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Tag from '../ui/Tag';

interface PreferencesFormProps {
  user: User;
  onSave: (updatedUser: User) => void;
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({ user, onSave }) => {
  const [diet, setDiet] = useState<DietaryPreference>(user.preferences.diet);
  const [allergies, setAllergies] = useState<Allergy[]>(user.preferences.allergies);
  const [dislikedIngredients, setDislikedIngredients] = useState<string[]>(user.preferences.dislikedIngredients);
  const [newDisliked, setNewDisliked] = useState('');

  const dietOptions = [
    { value: 'Omnivore', label: 'Omnivore' },
    { value: 'Vegetarian', label: 'Vegetarian' },
    { value: 'Vegan', label: 'Vegan' },
    { value: 'Pescatarian', label: 'Pescatarian' },
    { value: 'Keto', label: 'Keto' },
    { value: 'Paleo', label: 'Paleo' },
    { value: 'Gluten-Free', label: 'Gluten-Free' },
  ];

  const allergyOptions: Allergy[] = ['Gluten', 'Nuts', 'Dairy', 'Soy', 'Eggs', 'Shellfish'];

  const handleDietChange = (value: string) => {
    setDiet(value as DietaryPreference);
  };

  const handleAllergyToggle = (allergy: Allergy) => {
    if (allergies.includes(allergy)) {
      setAllergies(allergies.filter(a => a !== allergy));
    } else {
      setAllergies([...allergies, allergy]);
    }
  };

  const handleAddDisliked = () => {
    if (newDisliked.trim() && !dislikedIngredients.includes(newDisliked.trim())) {
      setDislikedIngredients([...dislikedIngredients, newDisliked.trim()]);
      setNewDisliked('');
    }
  };

  const handleRemoveDisliked = (ingredient: string) => {
    setDislikedIngredients(dislikedIngredients.filter(i => i !== ingredient));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddDisliked();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedUser: User = {
      ...user,
      preferences: {
        diet,
        allergies,
        dislikedIngredients,
      },
    };
    
    onSave(updatedUser);
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Preferences</h2>
      
      <div className="space-y-6">
        {/* Dietary Preference */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dietary Preference
          </label>
          <Select 
            options={dietOptions} 
            value={diet} 
            onChange={handleDietChange} 
          />
        </div>
        
        {/* Allergies */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Allergies
          </label>
          <div className="grid grid-cols-2 gap-4">
            {allergyOptions.map((allergy) => (
              <Checkbox
                key={allergy}
                id={`allergy-${allergy}`}
                label={allergy}
                checked={allergies.includes(allergy)}
                onChange={() => handleAllergyToggle(allergy)}
              />
            ))}
          </div>
        </div>
        
        {/* Disliked Ingredients */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Disliked Ingredients
          </label>
          <div className="flex gap-2 mb-3">
            <Input
              placeholder="E.g., Mushrooms"
              value={newDisliked}
              onChange={(e) => setNewDisliked(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow"
            />
            <Button 
              type="button" 
              onClick={handleAddDisliked}
              icon={<Plus size={18} />}
            >
              Add
            </Button>
          </div>
          
          {dislikedIngredients.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {dislikedIngredients.map((ingredient, index) => (
                <Tag
                  key={index}
                  label={ingredient}
                  color="coral"
                  onRemove={() => handleRemoveDisliked(ingredient)}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="pt-4 border-t border-gray-200 mt-6">
          <Button 
            type="submit" 
            variant="secondary" 
            fullWidth
            icon={<Check size={18} />}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </motion.form>
  );
};

export default PreferencesForm;