import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MoreHorizontal, Download, CalendarDays } from 'lucide-react';
import Layout from '../components/layout/Layout';
import MealPlannerDay from '../components/planner/MealPlannerDay';
import MealPlanModal from '../components/planner/MealPlanModal';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { getMealPlansByDateRange, createMealPlan, updateMealPlan, MealPlan, Recipe } from '../lib/db';
import { Timestamp } from 'firebase/firestore';

const PlannerPage: React.FC = () => {
  const { user } = useAuth();
  const [currentWeek, setCurrentWeek] = useState<string>(new Date().toISOString().split('T')[0]);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack' | undefined>();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>();
  
  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];
  
  useEffect(() => {
    if (user) {
      fetchMealPlan();
    }
  }, [user, currentWeek]);

  const fetchMealPlan = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const startDate = new Date(currentWeek);
      const endDate = new Date(currentWeek);
      endDate.setDate(endDate.getDate() + 6);
      
      const plans = await getMealPlansByDateRange(user.uid, startDate, endDate);
      if (plans.length > 0) {
        setMealPlan(plans[0]);
      } else {
        // Create a new meal plan if none exists
        const newPlan: Omit<MealPlan, 'id' | 'createdAt'> = {
          userId: user.uid,
          startDate: Timestamp.fromDate(startDate),
          endDate: Timestamp.fromDate(endDate),
          meals: []
        };
        const createdPlan = await createMealPlan(newPlan);
        setMealPlan(createdPlan);
      }
    } catch (error) {
      console.error('Error fetching meal plan:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePreviousWeek = () => {
    const currentDate = new Date(currentWeek);
    currentDate.setDate(currentDate.getDate() - 7);
    setCurrentWeek(currentDate.toISOString().split('T')[0]);
  };
  
  const handleNextWeek = () => {
    const currentDate = new Date(currentWeek);
    currentDate.setDate(currentDate.getDate() + 7);
    setCurrentWeek(currentDate.toISOString().split('T')[0]);
  };
  
  const handleAddMeal = (day: string) => {
    setSelectedDay(day);
    setSelectedMealType(undefined);
    setSelectedRecipe(undefined);
    setIsModalOpen(true);
  };
  
  const handleRemoveMeal = async (day: string, mealType: string) => {
    if (!mealPlan) return;
    
    try {
      const updatedMeals = mealPlan.meals.filter(
        meal => !(meal.day === day && meal.type === mealType)
      );
      
      await updateMealPlan(mealPlan.id, { meals: updatedMeals });
      setMealPlan({ ...mealPlan, meals: updatedMeals });
    } catch (error) {
      console.error('Error removing meal:', error);
    }
  };
  
  const handleEditMeal = (day: string, mealType: string) => {
    if (!mealPlan) return;
    
    const meal = mealPlan.meals.find(
      meal => meal.day === day && meal.type === mealType
    );
    
    if (meal) {
      setSelectedDay(day);
      setSelectedMealType(meal.type);
      setSelectedRecipe(meal.recipe);
      setIsModalOpen(true);
    }
  };
  
  const handleSaveMeal = async (day: string, type: 'breakfast' | 'lunch' | 'dinner' | 'snack', recipe: Recipe) => {
    if (!mealPlan) return;
    
    try {
      let updatedMeals = [...mealPlan.meals];
      
      // Remove existing meal for this day and type if it exists
      updatedMeals = updatedMeals.filter(
        meal => !(meal.day === day && meal.type === type)
      );
      
      // Add new meal
      updatedMeals.push({
        day,
        type,
        recipeId: recipe.id,
        recipe
      });
      
      await updateMealPlan(mealPlan.id, { meals: updatedMeals });
      setMealPlan({ ...mealPlan, meals: updatedMeals });
    } catch (error) {
      console.error('Error saving meal:', error);
    }
  };
  
  // Format date range for display
  const formatWeekRange = (weekStartStr: string) => {
    const weekStart = new Date(weekStartStr);
    const weekEnd = new Date(weekStartStr);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${weekStart.toLocaleDateString('en-US', options)} - ${weekEnd.toLocaleDateString('en-US', options)}`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center">Loading meal plan...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                <CalendarDays size={28} className="mr-3 text-green-primary" />
                Your Weekly Plan
              </h1>
              <p className="text-gray-600">
                Organize your meals for the week
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                icon={<Download size={18} />}
              >
                Export Plan
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<MoreHorizontal size={18} />}
              >
                More Actions
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="bg-green-primary/10 px-6 py-4 flex items-center justify-between">
              <button
                onClick={handlePreviousWeek}
                className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/50 focus:outline-none"
                title="Previous week"
              >
                <ArrowLeft size={20} />
              </button>
              
              <h2 className="text-xl font-semibold text-gray-800">
                {formatWeekRange(currentWeek)}
              </h2>
              
              <button
                onClick={handleNextWeek}
                className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/50 focus:outline-none"
                title="Next week"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {daysOfWeek.map((day, index) => {
              const dayMeals = mealPlan?.meals.filter(m => m.day === day) || [];
              
              return (
                <MealPlannerDay
                  key={index}
                  day={day}
                  meals={dayMeals}
                  onAddMeal={handleAddMeal}
                  onRemoveMeal={handleRemoveMeal}
                  onEditMeal={handleEditMeal}
                />
              );
            })}
          </div>
        </motion.div>
      </div>

      <MealPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMeal}
        day={selectedDay}
        mealType={selectedMealType}
        currentRecipe={selectedRecipe}
      />
    </Layout>
  );
};

export default PlannerPage;