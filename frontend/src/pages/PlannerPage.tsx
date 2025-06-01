import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MoreHorizontal, Download, CalendarDays } from 'lucide-react';
import Layout from '../components/layout/Layout';
import MealPlannerDay from '../components/planner/MealPlannerDay';
import Button from '../components/ui/Button';
import { mockMealPlan } from '../lib/mockData';

const PlannerPage: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<string>(mockMealPlan.week);
  
  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];
  
  const handlePreviousWeek = () => {
    // In a real app, we would fetch the previous week's data
    const currentDate = new Date(currentWeek);
    currentDate.setDate(currentDate.getDate() - 7);
    setCurrentWeek(currentDate.toISOString().split('T')[0]);
  };
  
  const handleNextWeek = () => {
    // In a real app, we would fetch the next week's data
    const currentDate = new Date(currentWeek);
    currentDate.setDate(currentDate.getDate() + 7);
    setCurrentWeek(currentDate.toISOString().split('T')[0]);
  };
  
  const handleAddMeal = (day: string) => {
    // In a real app, we would show a modal to add a meal
    console.log('Add meal for', day);
  };
  
  const handleRemoveMeal = (day: string, mealType: string) => {
    // In a real app, we would remove the meal
    console.log('Remove meal', mealType, 'for', day);
  };
  
  const handleEditMeal = (day: string, mealType: string) => {
    // In a real app, we would show a modal to edit the meal
    console.log('Edit meal', mealType, 'for', day);
  };
  
  // Format date range for display
  const formatWeekRange = (weekStartStr: string) => {
    const weekStart = new Date(weekStartStr);
    const weekEnd = new Date(weekStartStr);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${weekStart.toLocaleDateString('en-US', options)} - ${weekEnd.toLocaleDateString('en-US', options)}`;
  };

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
              >
                <ArrowLeft size={20} />
              </button>
              
              <h2 className="text-xl font-semibold text-gray-800">
                {formatWeekRange(currentWeek)}
              </h2>
              
              <button
                onClick={handleNextWeek}
                className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-white/50 focus:outline-none"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {daysOfWeek.map((day, index) => {
              const dayMeals = mockMealPlan.days.find(d => d.day === day)?.meals || [];
              
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
    </Layout>
  );
};

export default PlannerPage;