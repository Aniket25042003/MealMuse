import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

// Auth
import { useAuth, AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';

function AppRoutes() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/onboarding" element={<PrivateRoute><OnboardingPage /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/fridge" element={<PrivateRoute><FridgePage /></PrivateRoute>} />
        <Route path="/meals" element={<PrivateRoute><MealsPage /></PrivateRoute>} />
        <Route path="/planner" element={<PrivateRoute><PlannerPage /></PrivateRoute>} />
        <Route path="/grocery" element={<PrivateRoute><GroceryPage /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
