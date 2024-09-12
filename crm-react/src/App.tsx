// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import {auth} from "../utils/auth"
import CompanyRoot from './companyPages/companyRoot';
import AdminRoot from './adminPages/adminRoot';
import { store, persistor } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authController } from './utils/jwtHelper';
interface Userrole {
  aud:string;
}
const App = () => {
  const controlrole:Userrole = authController() || { aud: "" };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <Router>
        <ToastContainer />
      <div className="flex flex-col px-24 py-12">
   
         { controlrole.aud ? 
         <Routes> 
          <Route path="/" element={ controlrole.aud === "admin" ? <AdminRoot/> : <CompanyRoot/> }/>
          <Route path="/admin/*" element={controlrole.aud === "admin" ? <AdminRoot/> : <CompanyRoot/>}/>
          <Route path="/company/*"  element={controlrole.aud === "company" ? <CompanyRoot/> : <AdminRoot/>}/> 
         </Routes> : 
         <Routes> 
          <Route path="/" element={ <CompanyRoot/> }/>
          <Route path="/admin/*" element={<AdminRoot/>}/>
          <Route path="/company/*"  element={<CompanyRoot/>}/>
         </Routes>
           }
          {/*
          <Route path="/" element={ controlrole.aud === "admin" ? <AdminRoot/> : <CompanyRoot/> }/>
          <Route path="/admin/*" element={controlrole.aud === "admin" ? <AdminRoot/> : <CompanyRoot/>}/>
          <Route path="/company/*"  element={controlrole.aud === "company" ? <CompanyRoot/> : <AdminRoot/>}/>*/
          }
    
      </div>
    </Router>
    </PersistGate>
    </Provider>
  );
};

export default App;