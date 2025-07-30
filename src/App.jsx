import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin-dashboard" element={<Dashboard />} /> 
      </Routes>
    </Router>
  );
};

export default App;
