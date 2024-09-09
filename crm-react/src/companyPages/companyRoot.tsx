// src/pages/management/Management.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './login';
import Registerr from './registerr';
import Management from './management/management';
import Home from './home'
import AddUser from './addUser'; 
const CompanyRoot = () => {
  return (
    
    <div>
       <Home/>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Registerr />} />
        <Route path="/addUser" element={<AddUser />} /> 
        <Route path='Management' element={<Management />} />

      </Routes>
    </div>
    
  );
};

export default CompanyRoot;
