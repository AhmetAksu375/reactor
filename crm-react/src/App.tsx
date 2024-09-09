<<<<<<< Updated upstream
<<<<<<< Updated upstream
// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminRoot from './adminPages/adminRoot';
>>>>>>> Stashed changes
import Login from './pages/login';
import Register from './pages/registerr';
import Home from './pages/home';
import Department from './pages/management/department/department';
import Management from './pages/management/management';
<<<<<<< Updated upstream
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
>>>>>>> Stashed changes
import AdminRoot from './adminPages/adminRoot';
import CompanyRoot from './companyPages/companyRoot';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
<<<<<<< Updated upstream
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status when the component mounts
    setIsAuthenticated(!!auth);
  }, []);

=======

const App = () => {
>>>>>>> Stashed changes
  return (
    <Router>
      <div className="flex flex-col px-24 py-12">
        <Routes>
<<<<<<< Updated upstream
          <Route path="/ " element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
          <Route path="/admin" element={<AdminRoot></AdminRoot>} />

          <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/management/*" element={<Management/>} />
          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" />} />
=======
  return (
    <Router>
      <div className="flex flex-col px-24 py-12">
      <ToastContainer />

        <Routes>
          {/* Use wildcard '*' for nested routes */}
          <Route path="/admin/*" element={<AdminRoot />} />
          <Route path="/company/*" element={<CompanyRoot />} />
>>>>>>> Stashed changes
=======
          <Route path="/admin/*" element={<AdminRoot />} />
          {/* Define other routes here */}
>>>>>>> Stashed changes
        </Routes>
      </div>
    </Router>
  );
};

export default App;
