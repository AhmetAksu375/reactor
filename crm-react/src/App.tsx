// src/App.js
<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import {auth} from "../utils/auth"
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import {auth} from "../utils/auth"
>>>>>>> Stashed changes
import CompanyRoot from './companyPages/companyRoot';
import AdminRoot from './adminPages/adminRoot';
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
<<<<<<< Updated upstream
          <Route path="/home" element={<Home/>}/>
=======
          {/* <Route path="/home" element={<Home/>}/> */}
>>>>>>> Stashed changes

        </Routes>
      </div>
    </Router>
  );
};

<<<<<<< Updated upstream
export default App;

=======
export default App;
>>>>>>> Stashed changes
