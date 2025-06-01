import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, X, Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import Tag from '../ui/Tag';

interface FridgeUploaderProps {
  onIngredientsDetected?: (ingredients: string[]) => void;
}

const FridgeUploader: React.FC<FridgeUploaderProps> = ({ onIngredientsDetected }) => {
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    setIsUploading(true);
    const file = files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string);
        // Simulate AI detection with a delay
        setTimeout(() => {
          const mockDetectedIngredients = ['Broccoli', 'Carrots', 'Eggs', 'Milk', 'Apples'];
          setDetectedIngredients(mockDetectedIngredients);
          if (onIngredientsDetected) {
            onIngredientsDetected(mockDetectedIngredients);
          }
          setIsUploading(false);
        }, 2000);
      }
    };
    
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setDetectedIngredients([]);
    if (onIngredientsDetected) {
      onIngredientsDetected([]);
    }
  };

  const removeIngredient = (ingredient: string) => {
    const newIngredients = detectedIngredients.filter(item => item !== ingredient);
    setDetectedIngredients(newIngredients);
    if (onIngredientsDetected) {
      onIngredientsDetected(newIngredients);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Upload an image of your fridge</h2>
        <p className="text-gray-600">
          Our AI will identify ingredients and suggest meals you can make.
        </p>
      </div>

      {!uploadedImage ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`
            border-2 border-dashed rounded-lg p-8 
            text-center flex flex-col items-center justify-center
            min-h-[300px] transition-colors
            ${dragActive ? 'border-green-primary bg-green-primary/5' : 'border-gray-300 bg-white hover:bg-gray-50'}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mb-4 p-4 bg-green-primary/10 rounded-full">
            <Upload size={36} className="text-green-primary" />
          </div>
          <p className="text-lg font-medium text-gray-700 mb-2">
            Drag and drop your image here
          </p>
          <p className="text-gray-500 mb-4">or</p>
          <div className="flex gap-4">
            <label htmlFor="fridge-upload" className="cursor-pointer">
              <div className="bg-green-primary hover:bg-green-dark text-gray-800 px-4 py-2 rounded-lg flex items-center transition-colors">
                <Upload size={18} className="mr-2" />
                Browse Files
              </div>
              <input
                id="fridge-upload"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            <Button
              variant="outline"
              onClick={() => console.log('Camera opened')}
              icon={<Camera size={18} />}
            >
              Take Photo
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-lg overflow-hidden bg-white shadow-sm"
        >
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={removeImage}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <X size={18} className="text-gray-700" />
            </button>
          </div>
          
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Uploaded fridge"
              className="w-full h-64 object-cover"
            />
            
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-center">
                  <Loader2 size={40} className="animate-spin mx-auto mb-2" />
                  <p>Analyzing image...</p>
                </div>
              </div>
            )}
          </div>
          
          {detectedIngredients.length > 0 && (
            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-2">Detected Ingredients:</h3>
              <div className="flex flex-wrap gap-2">
                {detectedIngredients.map((ingredient, index) => (
                  <Tag
                    key={index}
                    label={ingredient}
                    onRemove={() => removeIngredient(ingredient)}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FridgeUploader;