
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminRoot from './adminPages/adminRoot';
import Login from './pages/login';
import Register from './pages/registerr';
import Home from './pages/home';
import Department from './pages/management/department/department';
import Management from './pages/management/management';

import CompanyRoot from './companyPages/companyRoot';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  return (
    <Router>
      <div className="flex flex-col px-24 py-12">
      <ToastContainer />

        <Routes>
          {/* Use wildcard '*' for nested routes */}
          <Route path="/admin/*" element={<AdminRoot />} />
          <Route path="/company/*" element={<CompanyRoot />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

