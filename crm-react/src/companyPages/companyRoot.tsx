// src/pages/management/Management.jsx
import { Routes, Route,  useLocation } from 'react-router-dom';
import Login from './login';
import Registerr from './registerr';
import Management from './management/management';
import Home from './home'
import AddUser from './addUser'; 
import { auth } from '../utils/auth';
import Sidebar from '@/compenents/Sidebar';
import UserTransections from './management/userTransections';

const CompanyRoot = () => {
  const location = useLocation();
  const iscompanyPath = location.pathname.startsWith('/company');
  return (
    
    <div>
      <div  className={ iscompanyPath && auth !== null ? "hidden" : ""}>
      <Home/>
      </div>
     <div className={iscompanyPath && auth !== null ? "" : "hidden"}>
     <Sidebar />
    </div>
      <Routes>
        <Route path="/" element={auth === null ? <Login /> : <Management/>} />
        <Route path="/Login" element={auth === null ?  <Login /> : <Management /> } />
        <Route path="/register" element={auth === null ? <Registerr /> : <Management/>  } />
        <Route path="/addUser" element={auth === null ? <Login/> : <AddUser />} /> 
        <Route path="/usertransections" element={auth === null ? <Login/> : <UserTransections/> } /> 
        {/* <Route path='Management' element={<Management />} /> */}

      </Routes>
    </div>
    
  );
};

export default CompanyRoot;
