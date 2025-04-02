// src/App.js
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Lazy loaded components
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DonateNow = lazy(() => import('./pages/DonateNow'));
const Chatbot = lazy(() => import('./pages/Chatbot'));
const Rewards = lazy(() => import('./pages/Rewards'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const WelcomePage = lazy(() => import('./pages/WelcomePage'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminSignup = lazy(() => import('./pages/AdminSignup'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const PostRequirements = lazy(() => import('./pages/PostRequirements'));
const AboutOrphanage = lazy(() => import('./pages/AboutOrphanage'));
const AdminOptions = lazy(() => import('./pages/AdminOptions')); // Added AdminOptions import

// Protected Route component
function ProtectedRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  const isAuthenticated = false; // Replace with your authentication logic

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<ErrorBoundary><WelcomePage /></ErrorBoundary>} />
        <Route path="/home" element={<ErrorBoundary><Home /></ErrorBoundary>} />
        <Route path="/dashboard" element={<ErrorBoundary><ProtectedRoute element={<Dashboard />} isAuthenticated={isAuthenticated} /></ErrorBoundary>} />
        <Route path="/donate" element={<ErrorBoundary><DonateNow /></ErrorBoundary>} />
        <Route path="/chatbot" element={<ErrorBoundary><Chatbot /></ErrorBoundary>} />
        <Route path="/rewards" element={<ErrorBoundary><Rewards /></ErrorBoundary>} />
        <Route path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
        <Route path="/signup" element={<ErrorBoundary><Signup /></ErrorBoundary>} />
        <Route path="/admin-login" element={<ErrorBoundary><AdminLogin /></ErrorBoundary>} />
        <Route path="/admin-signup" element={<ErrorBoundary><AdminSignup /></ErrorBoundary>} />
        <Route path="/admin-dashboard" element={<ErrorBoundary><ProtectedRoute element={<AdminDashboard />} isAuthenticated={isAuthenticated} /></ErrorBoundary>} />
        <Route path="/post-requirements" element={<ErrorBoundary><PostRequirements /></ErrorBoundary>} />
        <Route path="/about-orphanage" element={<ErrorBoundary><AboutOrphanage /></ErrorBoundary>} />
        <Route path="/admin-options" element={<ErrorBoundary><AdminOptions /></ErrorBoundary>} /> {/* Added AdminOptions route */}
        <Route path="*" element={<ErrorBoundary><div>404 - Not Found</div></ErrorBoundary>} />
      </Routes>
    </Suspense>
  );
}

export default App;