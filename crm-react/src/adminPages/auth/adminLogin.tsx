// src/components/Login.tsx
import { useState } from 'react';
import { loginAdmin } from '../../api/Admin/adminService';
import { decodeToken } from '@/utils/jwtHelper';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = async () => {

    try {
      // Giriş işlemini gerçekleştir
      await loginAdmin({ email, password });

      // LocalStorage'dan token'ı al
      const token = localStorage.getItem('token');

      if (token) {
        // Token'ı decode et ve bilgileri al
        const decoded = decodeToken(token);

        // Decode edilen bilgileri Redux store'a kaydet
        if (decoded) {
          dispatch(setUser({
            aud: decoded.aud,
            email: decoded.email,
            exp: decoded.exp,
            iat: decoded.iat,
            iss: decoded.iss,
            id: decoded.nameid,
            nbf: decoded.nbf,
            unique_name: decoded.unique_name,
            departmant: decoded.departmant,
            departmantId: decoded.departmantId,
          }));
        } else {
          console.error('Decode edilen token null döndü');
        }
      } else {
        console.error('Token localStorage\'da bulunamadı');
      }
    } catch (error) {
      console.error('Login işlemi sırasında hata oluştu:', error);
    }
  };


  return (
    <div className="flex flex-col items-center h-screen w-fit md:w-full  ">
      <h1 className="text-2xl mb-4 ">Login Admin</h1>
      <div className="flex flex-col gap-4 w-[400px]">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button onClick={handleSubmit} type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
