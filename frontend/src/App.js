import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';

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
const AdminOptions = lazy(() => import('./pages/AdminOptions'));
const Ngos = lazy(() => import('./pages/Ngos'));

function ProtectedRoute({ element, isAuthenticated, redirectPath = '/login' }) {
  const location = useLocation();
  return isAuthenticated ? element : <Navigate to={redirectPath} state={{ from: location }} replace />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check for existing auth token on initial load
    return Boolean(localStorage.getItem('authToken'));
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
      <main className={isAuthenticated ? "pt-16 md:pt-20" : ""}>
        <Suspense fallback={
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }>
          <Routes>
            <Route 
              path="/" 
              element={
                <ErrorBoundary>
                  <WelcomePage setIsAuthenticated={setIsAuthenticated} />
                </ErrorBoundary>
              } 
            />
            <Route path="/home" element={<ErrorBoundary><Home /></ErrorBoundary>} />
            
            {/* Public Routes */}
            <Route path="/dashboard" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
            <Route path="/donate" element={<ErrorBoundary><DonateNow /></ErrorBoundary>} />
            <Route path="/chatbot" element={<ErrorBoundary><Chatbot /></ErrorBoundary>} />
            <Route path="/rewards" element={<ErrorBoundary><Rewards /></ErrorBoundary>} />
            
            {/* Auth Routes */}
            <Route 
              path="/login" 
              element={
                <ErrorBoundary>
                  <Login setIsAuthenticated={setIsAuthenticated} />
                </ErrorBoundary>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <ErrorBoundary>
                  <Signup setIsAuthenticated={setIsAuthenticated} />
                </ErrorBoundary>
              } 
            />
            
            {/* Admin Protected Routes */}
            <Route path="/admin-login" element={<ErrorBoundary><AdminLogin /></ErrorBoundary>} />
            <Route path="/admin-signup" element={<ErrorBoundary><AdminSignup /></ErrorBoundary>} />
            <Route 
              path="/admin-dashboard" 
              element={
                <ErrorBoundary>
                  <ProtectedRoute 
                    element={<AdminDashboard />} 
                    isAuthenticated={isAuthenticated} 
                    redirectPath="/admin-login"
                  />
                </ErrorBoundary>
              } 
            />
            
            {/* Other Routes */}
            <Route path="/post-requirements" element={<ErrorBoundary><PostRequirements /></ErrorBoundary>} />
            <Route path="/about-orphanage" element={<ErrorBoundary><AboutOrphanage /></ErrorBoundary>} />
            <Route path="/ngos" element={<ErrorBoundary><Ngos /></ErrorBoundary>} />
            <Route 
              path="/admin-options" 
              element={
                <ErrorBoundary>
                  <ProtectedRoute 
                    element={<AdminOptions />} 
                    isAuthenticated={isAuthenticated}
                    redirectPath="/admin-login"
                  />
                </ErrorBoundary>
              } 
            />
            
            {/* 404 Route */}
            <Route path="*" element={<ErrorBoundary><NotFoundPage /></ErrorBoundary>} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-bold text-gray-800">404 - Not Found</h1>
    <p className="text-lg text-gray-600 mt-4">The page you're looking for doesn't exist.</p>
    <Link 
      to="/home" 
      className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      Return Home
    </Link>
  </div>
);

export default App;