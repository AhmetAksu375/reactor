// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import {auth} from "../utils/auth"
import CompanyRoot from './companyPages/companyRoot';
import AdminRoot from './adminPages/adminRoot';
import ExampleComponent from './compenents/ExampleComponent';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   // Check authentication status when the component mounts
  //   setIsAuthenticated(!!auth);
  // }, []);

  return (
    
    <Router>
        <ToastContainer />
      <div className="flex flex-col px-24 py-12">
        <Routes>
          <Route path="/" element={<ExampleComponent/>}/>
          <Route path="/admin/*" element={<AdminRoot></AdminRoot>}/>
          <Route path="/company/*"  element={<CompanyRoot />}/>
          {/* <Route path="/home" element={<Home/>}/> */}

        </Routes>
      </div>
    </Router>
  );
};

export default App;