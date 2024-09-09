// src/pages/management/Management.jsx
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Login from './auth/login';
import Registerr from './auth/registerr';
import Management from './management/management';
import Home from './home'
const CompanyRoot = () => {
  return (
    
    <div>
       <Home/>
   
      <Routes>
        <Route path="/auth/Login" element={<Login />} />
        <Route path="/auth/register" element={<Registerr />} />
        <Route path='Management' element={<Management />} />

      </Routes>
    </div>
    
  );
};

export default CompanyRoot;
