// src/pages/management/Management.jsx
import Sidebar from '@/compenents/Sidebar';
import { authController } from '@/utils/jwtHelper';
import { Route, Routes, useLocation } from 'react-router-dom';
import AddUser from './addUser';
import Home from './home';
import Login from './login';
import Management from './management/management';
import UserTransections from './management/userTransections';
import Registerr from './registerr';

interface Userrole {
  aud:string;
}

const CompanyRoot = () => {
const controlrole:Userrole = authController() || { aud: "" };
  const location = useLocation();
  const mainpath = location.pathname.startsWith('/')
  return (
    <div className='pt-20'>
       {controlrole?.aud} 
      <div  className={mainpath && controlrole.aud === 'admin' ? "" : "hidden"}>
      <Home/> 
      </div>
     <div className={mainpath && controlrole.aud === 'company' ? "" : "hidden"}>
     <Sidebar />
    </div>
      <Routes>
        <Route path="/" element={controlrole.aud === "company" ? <Management/> : <Login />} /> 
        <Route path="/Login" element={controlrole.aud === "company" ? <Management/>: <Login/>  } />
        <Route path="/register" element={controlrole.aud === "company" ? <Management/> : <Registerr/>  } />
        <Route path="/addUser" element={controlrole.aud === "company" ? <AddUser/> : <Login/>} /> 
        <Route path="/usertransections" element={controlrole.aud === "company" ? <UserTransections/> : <Login/> } /> 
      </Routes>
    </div>  
  );
};
export default CompanyRoot;