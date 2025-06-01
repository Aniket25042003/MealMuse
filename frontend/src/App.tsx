import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import FridgePage from './pages/FridgePage';
import MealsPage from './pages/MealsPage';
import PlannerPage from './pages/PlannerPage';
import GroceryPage from './pages/GroceryPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/fridge" element={<FridgePage />} />
          <Route path="/meals" element={<MealsPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/grocery" element={<GroceryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;