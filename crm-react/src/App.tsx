// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import {auth} from "../utils/auth"
import CompanyRoot from './companyPages/companyRoot';
import Home from './companyPages/home';
const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   // Check authentication status when the component mounts
  //   setIsAuthenticated(!!auth);
  // }, []);

  return (
    <Router>
      <div className="flex flex-col px-24 py-12">
        <Routes>
          <Route path="/admin"  />
          <Route path="/company/*"  element={<CompanyRoot />}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;

