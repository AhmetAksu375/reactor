// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/registerr';
import Home from './pages/home'; // Make sure you have a Home component
import {auth} from "../utils/auth"
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status when the component mounts
    setIsAuthenticated(!!auth);
  }, []);

  return (
    <Router>
      <div className="flex flex-col px-24 py-12">
       
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
