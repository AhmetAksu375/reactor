// src/pages/management/Management.jsx
import { Routes, Route, Link } from 'react-router-dom';
import Department from './department/department';
import Bills from './bills/bills';

const Management = () => {
  return (
    <div>
      <h1>Yönetim Paneli</h1>
      <nav>
        <ul>
          <li><Link to="Department">deparments</Link></li>
          <li><Link to="Bills">Bills</Link></li>
    
        </ul>
      </nav>
      <Routes>
        <Route path="Bills" element={<Bills />} />

      </Routes>
    </div>
  );
};

export default Management;
