import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Check, ShoppingCart, Download, Copy, Trash2 } from 'lucide-react';
import { GroceryItem } from '../../types';
import Button from '../ui/Button';

interface GroceryListProps {
  fridgeItems: GroceryItem[];
  shoppingItems: GroceryItem[];
  onToggleItem: (id: string) => void;
  onClearChecked: () => void;
}

const GroceryList: React.FC<GroceryListProps> = ({
  fridgeItems,
  shoppingItems,
  onToggleItem,
  onClearChecked,
}) => {
  const [fridgeExpanded, setFridgeExpanded] = useState(true);
  const [shoppingExpanded, setShoppingExpanded] = useState(true);

  const groupItemsByCategory = (items: GroceryItem[]) => {
    return items.reduce((groups, item) => {
      const category = item.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {} as Record<string, GroceryItem[]>);
  };

  const fridgeItemsByCategory = groupItemsByCategory(fridgeItems);
  const shoppingItemsByCategory = groupItemsByCategory(shoppingItems);

  const handleCopyToClipboard = () => {
    const text = `GROCERY LIST\n\nAlready in your fridge:\n${fridgeItems.map(item => `- ${item.name}`).join('\n')}\n\nItems to buy:\n${shoppingItems.map(item => `- ${item.name}`).join('\n')}`;
    navigator.clipboard.writeText(text)
      .then(() => alert('Grocery list copied to clipboard!'))
      .catch(err => console.error('Could not copy text: ', err));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">Your Grocery List</h2>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              icon={<Copy size={16} />}
              onClick={handleCopyToClipboard}
            >
              Copy
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              icon={<Download size={16} />}
            >
              Export
            </Button>
          </div>
        </div>
        <p className="text-gray-600">Based on your meal plan and fridge inventory.</p>
      </div>
      
      {/* Fridge Items Section */}
      <div className="border-b border-gray-200">
        <button
          className="w-full px-4 py-3 flex justify-between items-center bg-green-primary/10 hover:bg-green-primary/20 transition-colors"
          onClick={() => setFridgeExpanded(!fridgeExpanded)}
        >
          <div className="flex items-center">
            <Check size={18} className="text-green-primary mr-2" />
            <span className="font-medium text-gray-800">Already in Your Fridge</span>
            <span className="ml-2 bg-green-primary/20 text-green-dark text-xs font-medium px-2 py-0.5 rounded-full">
              {fridgeItems.length}
            </span>
          </div>
          {fridgeExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {fridgeExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-3"
          >
            {Object.entries(fridgeItemsByCategory).map(([category, items]) => (
              <div key={category} className="mb-4 last:mb-0">
                <h3 className="text-sm font-medium text-gray-500 mb-2">{category}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`fridge-${item.id}`}
                        checked={item.checked}
                        onChange={() => onToggleItem(item.id)}
                        className="h-5 w-5 rounded border-gray-300 text-green-primary focus:ring-green-primary/30"
                      />
                      <label
                        htmlFor={`fridge-${item.id}`}
                        className={`ml-3 text-gray-700 ${item.checked ? 'line-through text-gray-400' : ''}`}
                      >
                        {item.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </div>
      
      {/* Shopping Items Section */}
      <div>
        <button
          className="w-full px-4 py-3 flex justify-between items-center bg-coral/10 hover:bg-coral/20 transition-colors"
          onClick={() => setShoppingExpanded(!shoppingExpanded)}
        >
          <div className="flex items-center">
            <ShoppingCart size={18} className="text-coral mr-2" />
            <span className="font-medium text-gray-800">Items to Buy</span>
            <span className="ml-2 bg-coral/20 text-coral text-xs font-medium px-2 py-0.5 rounded-full">
              {shoppingItems.length}
            </span>
          </div>
          {shoppingExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {shoppingExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-3"
          >
            {Object.entries(shoppingItemsByCategory).map(([category, items]) => (
              <div key={category} className="mb-4 last:mb-0">
                <h3 className="text-sm font-medium text-gray-500 mb-2">{category}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`shop-${item.id}`}
                        checked={item.checked}
                        onChange={() => onToggleItem(item.id)}
                        className="h-5 w-5 rounded border-gray-300 text-coral focus:ring-coral/30"
                      />
                      <label
                        htmlFor={`shop-${item.id}`}
                        className={`ml-3 text-gray-700 ${item.checked ? 'line-through text-gray-400' : ''}`}
                      >
                        {item.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                onClick={onClearChecked}
                icon={<Trash2 size={16} />}
              >
                Clear Checked Items
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GroceryList;