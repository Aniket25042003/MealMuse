import { Recipe, Ingredient, User, MealPlan, GroceryItem, FridgeItem } from '../types';

// Mock user data
export const mockUser: User = {
  id: '1',
  name: 'Aniket',
  email: 'aniket@example.com',
  preferences: {
    diet: 'Omnivore',
    allergies: ['Nuts'],
    dislikedIngredients: ['Mushrooms', 'Olives'],
  },
};

// Mock ingredients data
export const mockIngredients: Ingredient[] = [
  { id: '1', name: 'Carrots', category: 'Vegetables' },
  { id: '2', name: 'Broccoli', category: 'Vegetables' },
  { id: '3', name: 'Apples', category: 'Fruits' },
  { id: '4', name: 'Eggs', category: 'Protein' },
  { id: '5', name: 'Milk', category: 'Dairy' },
  { id: '6', name: 'Chicken', category: 'Protein' },
  { id: '7', name: 'Rice', category: 'Grains' },
  { id: '8', name: 'Tomatoes', category: 'Vegetables' },
  { id: '9', name: 'Onions', category: 'Vegetables' },
  { id: '10', name: 'Potatoes', category: 'Vegetables' },
  { id: '11', name: 'Spinach', category: 'Vegetables' },
  { id: '12', name: 'Chickpeas', category: 'Protein' },
  { id: '13', name: 'Lentils', category: 'Protein' },
  { id: '14', name: 'Quinoa', category: 'Grains' },
];

// Mock fridge items
export const mockFridgeItems: FridgeItem[] = [
  { id: '1', name: 'Carrots', quantity: '1 bunch', addedAt: new Date(), expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
  { id: '2', name: 'Broccoli', quantity: '1 head', addedAt: new Date(), expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
  { id: '3', name: 'Eggs', quantity: '6', addedAt: new Date(), expiresAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000) },
  { id: '4', name: 'Chickpeas', quantity: '1 can', addedAt: new Date(), expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) },
  { id: '5', name: 'Milk', quantity: '1 liter', addedAt: new Date(), expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
];

// Mock recipes
export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Chickpea Salad',
    description: 'A refreshing chickpea salad with vegetables and a light dressing.',
    prepTime: 10,
    cookTime: 0,
    totalTime: 10,
    servings: 2,
    difficulty: 'Easy',
    tags: ['Salad', 'Vegan', 'Healthy', 'Quick'],
    ingredients: [
      { name: 'Chickpeas', amount: '1 can', inFridge: true },
      { name: 'Cucumber', amount: '1 medium', inFridge: false },
      { name: 'Cherry Tomatoes', amount: '1 cup', inFridge: false },
      { name: 'Red Onion', amount: '1/4 cup', inFridge: false },
      { name: 'Lemon Juice', amount: '2 tbsp', inFridge: false },
      { name: 'Olive Oil', amount: '1 tbsp', inFridge: true },
      { name: 'Salt', amount: 'to taste', inFridge: true },
      { name: 'Pepper', amount: 'to taste', inFridge: true },
    ],
    instructions: [
      'Drain and rinse the chickpeas.',
      'Chop the cucumber, tomatoes, and red onion.',
      'Mix all ingredients in a bowl.',
      'Drizzle with lemon juice and olive oil.',
      'Season with salt and pepper to taste.',
      'Toss well and serve.',
    ],
    nutritionInfo: {
      calories: 350,
      protein: 15,
      carbs: 45,
      fat: 10,
    },
    imageUrl: 'https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg',
  },
  {
    id: '2',
    name: 'Veggie Stir Fry',
    description: 'A quick and colorful vegetable stir fry with a savory sauce.',
    prepTime: 15,
    cookTime: 10,
    totalTime: 25,
    servings: 2,
    difficulty: 'Easy',
    tags: ['Stir Fry', 'Vegetarian', 'Quick'],
    ingredients: [
      { name: 'Broccoli', amount: '1 head', inFridge: true },
      { name: 'Carrots', amount: '2 medium', inFridge: true },
      { name: 'Bell Pepper', amount: '1', inFridge: false },
      { name: 'Garlic', amount: '2 cloves', inFridge: true },
      { name: 'Ginger', amount: '1 tbsp', inFridge: false },
      { name: 'Soy Sauce', amount: '2 tbsp', inFridge: true },
      { name: 'Sesame Oil', amount: '1 tbsp', inFridge: true },
      { name: 'Rice', amount: '1 cup', inFridge: true },
    ],
    instructions: [
      'Cook rice according to package instructions.',
      'Chop all vegetables into bite-sized pieces.',
      'Heat oil in a wok or large pan over high heat.',
      'Add garlic and ginger, stir for 30 seconds.',
      'Add vegetables and stir fry for 5-7 minutes until crisp-tender.',
      'Add soy sauce and stir to combine.',
      'Serve over rice.',
    ],
    nutritionInfo: {
      calories: 320,
      protein: 10,
      carbs: 55,
      fat: 8,
    },
    imageUrl: 'https://images.pexels.com/photos/262897/pexels-photo-262897.jpeg',
  },
  {
    id: '3',
    name: 'Lentil Soup',
    description: 'A hearty lentil soup perfect for a cozy meal.',
    prepTime: 10,
    cookTime: 30,
    totalTime: 40,
    servings: 4,
    difficulty: 'Medium',
    tags: ['Soup', 'Vegan', 'Comfort Food'],
    ingredients: [
      { name: 'Lentils', amount: '1 cup', inFridge: true },
      { name: 'Carrots', amount: '2 medium', inFridge: true },
      { name: 'Onion', amount: '1 medium', inFridge: false },
      { name: 'Garlic', amount: '3 cloves', inFridge: true },
      { name: 'Vegetable Broth', amount: '4 cups', inFridge: true },
      { name: 'Cumin', amount: '1 tsp', inFridge: true },
      { name: 'Bay Leaf', amount: '1', inFridge: true },
      { name: 'Olive Oil', amount: '2 tbsp', inFridge: true },
    ],
    instructions: [
      'Dice the onion, carrots, and mince the garlic.',
      'Heat olive oil in a large pot over medium heat.',
      'Sauté onion until translucent, about 5 minutes.',
      'Add garlic and sauté for another minute.',
      'Add carrots, lentils, cumin, and bay leaf.',
      'Pour in vegetable broth and bring to a boil.',
      'Reduce heat and simmer for 25-30 minutes until lentils are tender.',
      'Season with salt and pepper to taste.',
    ],
    nutritionInfo: {
      calories: 250,
      protein: 12,
      carbs: 35,
      fat: 7,
    },
    imageUrl: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg',
  }
];

// Mock meal plan
export const mockMealPlan: MealPlan = {
  id: '1',
  week: '2025-06-01',
  days: [
    {
      day: 'Monday',
      meals: [
        { type: 'Lunch', recipe: mockRecipes[0] },
        { type: 'Dinner', recipe: mockRecipes[1] },
      ],
    },
    {
      day: 'Tuesday',
      meals: [
        { type: 'Lunch', recipe: mockRecipes[1] },
        { type: 'Dinner', recipe: mockRecipes[2] },
      ],
    },
    {
      day: 'Wednesday',
      meals: [
        { type: 'Lunch', recipe: mockRecipes[2] },
        { type: 'Dinner', recipe: mockRecipes[0] },
      ],
    },
    {
      day: 'Thursday',
      meals: [
        { type: 'Lunch', recipe: mockRecipes[0] },
        { type: 'Dinner', recipe: mockRecipes[1] },
      ],
    },
    {
      day: 'Friday',
      meals: [
        { type: 'Lunch', recipe: mockRecipes[1] },
        { type: 'Dinner', recipe: mockRecipes[2] },
      ],
    },
    {
      day: 'Saturday',
      meals: [
        { type: 'Lunch', recipe: mockRecipes[2] },
        { type: 'Dinner', recipe: mockRecipes[0] },
      ],
    },
    {
      day: 'Sunday',
      meals: [
        { type: 'Lunch', recipe: mockRecipes[0] },
        { type: 'Dinner', recipe: mockRecipes[1] },
      ],
    },
  ],
};

// Mock grocery items
export const mockGroceryItems: GroceryItem[] = [
  { id: '1', name: 'Cucumber', category: 'Vegetables', inFridge: false, checked: false },
  { id: '2', name: 'Cherry Tomatoes', category: 'Vegetables', inFridge: false, checked: false },
  { id: '3', name: 'Red Onion', category: 'Vegetables', inFridge: false, checked: false },
  { id: '4', name: 'Lemon', category: 'Fruits', inFridge: false, checked: false },
  { id: '5', name: 'Bell Pepper', category: 'Vegetables', inFridge: false, checked: false },
  { id: '6', name: 'Ginger', category: 'Vegetables', inFridge: false, checked: false },
  { id: '7', name: 'Onion', category: 'Vegetables', inFridge: false, checked: false },
  { id: '8', name: 'Carrots', category: 'Vegetables', inFridge: true, checked: true },
  { id: '9', name: 'Broccoli', category: 'Vegetables', inFridge: true, checked: true },
  { id: '10', name: 'Eggs', category: 'Protein', inFridge: true, checked: true },
  { id: '11', name: 'Milk', category: 'Dairy', inFridge: true, checked: true },
];