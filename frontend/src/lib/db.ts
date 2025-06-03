import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Types
export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  cookingSkillLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredCuisines: string[];
  mealPlanningDays: string[];
  cookingTimePreference: '15-30' | '30-45' | '45-60' | '60+';
  servingsPerMeal: number;
  groceryShoppingFrequency: 'daily' | 'weekly' | 'biweekly';
  kitchenEquipment: string[];
  spicePreference: 'mild' | 'moderate' | 'spicy';
  mealPlanningFrequency: 'daily' | 'weekly' | 'biweekly';
  dislikedIngredients: string[];
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checked: boolean;
  addedAt: Timestamp;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  imageUrl: string;
  createdAt: Timestamp;
}

export interface MealPlan {
  id: string;
  userId: string;
  startDate: Timestamp;
  endDate: Timestamp;
  meals: {
    day: string;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    recipeId: string;
    recipe: Recipe;
  }[];
  createdAt: Timestamp;
}

// User Preferences
export const updateUserPreferences = async (userId: string, preferences: UserPreferences) => {
  const userPrefsRef = doc(db, 'users', userId, 'preferences', 'userPreferences');
  await setDoc(userPrefsRef, preferences, { merge: true });
};

export const getUserPreferences = async (userId: string) => {
  const userPrefsRef = doc(db, 'users', userId, 'preferences', 'userPreferences');
  const docSnap = await getDoc(userPrefsRef);
  return docSnap.exists() ? docSnap.data() as UserPreferences : null;
};

// Grocery Lists
export const createGroceryList = async (userId: string, items: Omit<GroceryItem, 'id'>[]) => {
  const groceryListRef = collection(db, 'users', userId, 'groceryLists');
  const newListRef = doc(groceryListRef);
  
  const groceryList = {
    id: newListRef.id,
    items: items.map(item => ({
      ...item,
      id: crypto.randomUUID(),
      addedAt: serverTimestamp()
    })),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  await setDoc(newListRef, groceryList);
  return groceryList;
};

export const updateGroceryList = async (userId: string, listId: string, items: GroceryItem[]) => {
  const listRef = doc(db, 'users', userId, 'groceryLists', listId);
  await updateDoc(listRef, {
    items,
    updatedAt: serverTimestamp()
  });
};

export const getGroceryLists = async (userId: string) => {
  const groceryListsRef = collection(db, 'users', userId, 'groceryLists');
  const q = query(groceryListsRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
};

// Meal Plans
export const createMealPlan = async (mealPlan: Omit<MealPlan, 'id' | 'createdAt'>) => {
  const mealPlansRef = collection(db, 'mealPlans');
  const newPlanRef = doc(mealPlansRef);
  
  const newMealPlan = {
    ...mealPlan,
    id: newPlanRef.id,
    createdAt: serverTimestamp()
  };

  await setDoc(newPlanRef, newMealPlan);
  return newMealPlan;
};

export const updateMealPlan = async (mealPlanId: string, updates: Partial<MealPlan>) => {
  const mealPlanRef = doc(db, 'mealPlans', mealPlanId);
  await updateDoc(mealPlanRef, updates);
};

// Get meal plans by date range (using first index)
export const getMealPlansByDateRange = async (userId: string, startDate: Date, endDate: Date) => {
  const mealPlansRef = collection(db, 'mealPlans');
  const q = query(
    mealPlansRef,
    where('userId', '==', userId),
    where('startDate', '>=', Timestamp.fromDate(startDate)),
    where('endDate', '<=', Timestamp.fromDate(endDate))
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as MealPlan);
};

// Get recent meal plans (using second index)
export const getRecentMealPlans = async (userId: string, limit: number = 5) => {
  const mealPlansRef = collection(db, 'mealPlans');
  const q = query(
    mealPlansRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.slice(0, limit).map(doc => doc.data() as MealPlan);
};

// Recipes
export const saveRecipe = async (userId: string, recipe: Omit<Recipe, 'id' | 'createdAt'>) => {
  const recipesRef = collection(db, 'users', userId, 'recipes');
  const newRecipeRef = doc(recipesRef);
  
  const newRecipe = {
    ...recipe,
    id: newRecipeRef.id,
    createdAt: serverTimestamp()
  };

  await setDoc(newRecipeRef, newRecipe);
  return newRecipe;
};

// Get recipes by tags (using third index)
export const getRecipesByTags = async (userId: string, tags: string[]) => {
  const recipesRef = collection(db, 'users', userId, 'recipes');
  const recipes: Recipe[] = [];
  
  // Query for each tag and combine results
  for (const tag of tags) {
    const q = query(
      recipesRef,
      where('tags', 'array-contains', tag),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const tagRecipes = querySnapshot.docs.map(doc => doc.data() as Recipe);
    recipes.push(...tagRecipes);
  }
  
  // Remove duplicates
  return Array.from(new Map(recipes.map(recipe => [recipe.id, recipe])).values());
};

// Get all recipes for a user
export const getSavedRecipes = async (userId: string) => {
  const recipesRef = collection(db, 'users', userId, 'recipes');
  const querySnapshot = await getDocs(recipesRef);
  return querySnapshot.docs.map(doc => doc.data() as Recipe);
}; 