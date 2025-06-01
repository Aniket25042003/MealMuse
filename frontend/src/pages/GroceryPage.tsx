import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Layout from '../components/layout/Layout';
import GroceryList from '../components/grocery/GroceryList';
import { mockGroceryItems } from '../lib/mockData';
import { GroceryItem } from '../types';

const GroceryPage: React.FC = () => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(mockGroceryItems);
  
  const fridgeItems = groceryItems.filter(item => item.inFridge);
  const shoppingItems = groceryItems.filter(item => !item.inFridge);
  
  const handleToggleItem = (id: string) => {
    setGroceryItems(items => 
      items.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  const handleClearChecked = () => {
    setGroceryItems(items => 
      items.filter(item => !item.checked)
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <ShoppingBag size={28} className="mr-3 text-coral" />
              Smart Grocery List
            </h1>
            <p className="text-gray-600">
              Based on your meal plan and fridge inventory
            </p>
          </div>
          
          <GroceryList
            fridgeItems={fridgeItems}
            shoppingItems={shoppingItems}
            onToggleItem={handleToggleItem}
            onClearChecked={handleClearChecked}
          />
        </motion.div>
      </div>
    </Layout>
  );
};

export default GroceryPage;