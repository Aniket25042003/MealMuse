import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import FridgeUploader from '../components/fridge/FridgeUploader';
import ManualIngredientInput from '../components/fridge/ManualIngredientInput';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FridgePage: React.FC = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'photo' | 'manual'>('photo');

  const handleIngredientsDetected = (detectedIngredients: string[]) => {
    setIngredients(detectedIngredients);
  };

  const handleIngredientsAdded = (addedIngredients: string[]) => {
    setIngredients(addedIngredients);
  };

  const handleGenerateMeals = () => {
    // In a real app, we would save the ingredients first
    navigate('/meals');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              What's in Your Fridge?
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Upload a photo of your fridge or manually enter the ingredients you have. Our AI will suggest meals you can make with what you already have.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  activeTab === 'photo'
                    ? 'text-green-primary border-b-2 border-green-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('photo')}
              >
                Upload Photo
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  activeTab === 'manual'
                    ? 'text-green-primary border-b-2 border-green-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('manual')}
              >
                Manual Input
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'photo' ? (
                <FridgeUploader onIngredientsDetected={handleIngredientsDetected} />
              ) : (
                <ManualIngredientInput 
                  onIngredientsAdded={handleIngredientsAdded}
                  existingIngredients={ingredients}
                />
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button
              onClick={handleGenerateMeals}
              variant="secondary"
              size="lg"
              disabled={ingredients.length === 0}
              icon={<ArrowRight size={20} />}
            >
              Generate Meal Ideas
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default FridgePage;