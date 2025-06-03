import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Plus } from 'lucide-react';
import { DietaryPreference, Allergy } from '../types';
import Select from '../components/ui/Select';
import Checkbox from '../components/ui/Checkbox';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Tag from '../components/ui/Tag';
import { useAuth } from '../contexts/AuthContext';
import { updateUserPreferences, getUserPreferences, UserPreferences } from '../lib/db';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [diet, setDiet] = useState<DietaryPreference>('Omnivore');
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [dislikedIngredients, setDislikedIngredients] = useState<string[]>([]);
  const [newDisliked, setNewDisliked] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingPreferences, setIsCheckingPreferences] = useState(true);

  // Check if user has preferences already
  useEffect(() => {
    const checkPreferences = async () => {
      if (!user) {
        navigate('/');
        return;
      }

      try {
        setIsCheckingPreferences(true);
        const existingPreferences = await getUserPreferences(user.uid);
        console.log('Existing preferences:', existingPreferences); // Debug log
        
        // Check if preferences exist and have required fields
        const hasValidPreferences = existingPreferences && 
          existingPreferences.dietaryRestrictions?.length > 0 &&
          existingPreferences.cookingSkillLevel &&
          existingPreferences.cookingTimePreference;

        if (hasValidPreferences) {
          console.log('Valid preferences found, redirecting to dashboard'); // Debug log
          navigate('/dashboard');
        } else {
          console.log('No valid preferences found, showing onboarding form'); // Debug log
          setIsCheckingPreferences(false);
        }
      } catch (error) {
        console.error('Error checking preferences:', error);
        setError('Failed to check existing preferences');
        setIsCheckingPreferences(false);
      }
    };

    checkPreferences();
  }, [user, navigate]);

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

  const nextStep = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!user) {
          setError('Please sign in to continue');
          return;
        }

        // Convert the form data to match UserPreferences interface
        const preferences: UserPreferences = {
          dietaryRestrictions: [diet],
          allergies: allergies,
          cookingSkillLevel: 'intermediate',
          preferredCuisines: [],
          mealPlanningDays: [],
          cookingTimePreference: '30-45',
          servingsPerMeal: 2,
          groceryShoppingFrequency: 'weekly',
          kitchenEquipment: [],
          spicePreference: 'moderate',
          mealPlanningFrequency: 'weekly',
          dislikedIngredients: dislikedIngredients
        };

        // Save preferences to Firestore
        await updateUserPreferences(user.uid, preferences);
        
        // Verify that preferences were saved
        const savedPreferences = await getUserPreferences(user.uid);
        if (!savedPreferences) {
          throw new Error('Failed to verify saved preferences');
        }

        // If we get here, preferences were saved successfully
        navigate('/dashboard');
      } catch (error) {
        console.error('Error saving preferences:', error);
        setError('Failed to save preferences. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tell us about your diet</h2>
            <p className="text-gray-600 mb-6">
              This helps us recommend meals that match your dietary preferences.
            </p>
            
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
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Any allergies?</h2>
            <p className="text-gray-600 mb-6">
              Select any allergies or dietary restrictions you have.
            </p>
            
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
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Any ingredients you dislike?</h2>
            <p className="text-gray-600 mb-6">
              Add ingredients you don't want to include in your meal suggestions.
            </p>
            
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
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="py-4 px-4 sm:px-6 lg:px-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center">
          <button
            onClick={prevStep}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-primary/50"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-grow text-center">
            <div className="text-xl font-bold text-gray-800 font-secondary">MealMuse</div>
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {isCheckingPreferences ? (
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Checking your preferences...</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-800 rounded-lg">
                  {error}
                </div>
              )}
              
              {renderStep()}
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex">
                    {[1, 2, 3].map((s) => (
                      <div 
                        key={s}
                        className={`
                          h-2 w-10 rounded-full mr-2
                          ${s === step ? 'bg-green-primary' : s < step ? 'bg-green-primary/50' : 'bg-gray-200'}
                        `}
                      ></div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    Step {step} of 3
                  </div>
                </div>
                
                <Button
                  onClick={nextStep}
                  variant="primary"
                  fullWidth
                  icon={step < 3 ? <ArrowRight size={18} /> : <Check size={18} />}
                  isLoading={isLoading}
                >
                  {step < 3 ? 'Continue' : 'Save and Continue'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-green-primary/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-coral/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default OnboardingPage;