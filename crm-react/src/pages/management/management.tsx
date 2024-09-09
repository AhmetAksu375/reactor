// src/pages/management/Management.jsx
import { Routes, Route, Link } from 'react-router-dom';
import Department from './department/department';


const Management = () => {
  return (
    <div>
      <h1>Yönetim Paneli</h1>
      <nav>
        <ul>
          <li><Link to="Department">deparments</Link></li>
 
        </ul>
      </nav>
      <Routes>
        <Route path="Department" element={<Department />} />

      </Routes>
    </div>
  );
};

export default Management;
