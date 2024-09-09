import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './auth/adminLogin';
import AdminRegister from './auth/adminRegister';
import Navbar from './Navbar';
import Panel from './panel/panel';
import { auth } from '../../utils/auth'; // Assuming auth is a function

const AdminRoot = () => {
  // Check if the user is authenticated
  const isAuthenticated = auth; // Ensure this returns true/false based on authentication

  return (
    <div>
      <h2>Admin Portal</h2>
      <Navbar />

      <Routes>
        {/* Panel route: If not authenticated, redirect to login */}
        <Route
          path="panel"
          element={isAuthenticated ? <Panel /> : <Navigate to="/admin/login" />}
        />

        {/* Login: If authenticated, redirect to panel */}
        <Route
          path="login"
          element={isAuthenticated ? <Navigate to="/admin/panel" /> : <AdminLogin />}
        />

        {/* Register: If authenticated, redirect to panel */}
        <Route
          path="register"
          element={isAuthenticated ? <Navigate to="/admin/panel" /> : <AdminRegister />}
        />

        {/* Fallback route: Redirect to login if no matching route */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/admin/panel" : "/admin/login"} />}
        />
      </Routes>
    </div>
  );
};

export default AdminRoot;
