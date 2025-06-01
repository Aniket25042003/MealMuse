export type Ingredient = {
  id: string;
  name: string;
  category: 'Vegetables' | 'Fruits' | 'Dairy' | 'Protein' | 'Grains' | 'Other';
};

export type DietaryPreference = 
  | 'Omnivore' 
  | 'Vegetarian' 
  | 'Vegan' 
  | 'Pescatarian' 
  | 'Keto' 
  | 'Paleo' 
  | 'Gluten-Free';

export type Allergy = 'Gluten' | 'Nuts' | 'Dairy' | 'Soy' | 'Eggs' | 'Shellfish';

export type User = {
  id: string;
  name: string;
  email: string;
  preferences: {
    diet: DietaryPreference;
    allergies: Allergy[];
    dislikedIngredients: string[];
  };
};

export type Recipe = {
  id: string;
  name: string;
  description: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  ingredients: {
    name: string;
    amount: string;
    inFridge: boolean;
  }[];
  instructions: string[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  imageUrl: string;
};

export type MealPlan = {
  id: string;
  week: string;
  days: {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    meals: {
      type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
      recipe: Recipe;
    }[];
  }[];
};

export type GroceryItem = {
  id: string;
  name: string;
  category: string;
  inFridge: boolean;
  checked: boolean;
};

export type FridgeItem = {
  id: string;
  name: string;
  quantity?: string;
  addedAt: Date;
  expiresAt?: Date;
};