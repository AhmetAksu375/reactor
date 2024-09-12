import { useState } from 'react';
import { companyLogin } from '../api/Company/companyService';
import { useDispatch } from 'react-redux';
import { decodeToken } from '@/utils/jwtHelper';
import { setUser } from '@/store/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      // Giriş işlemini gerçekleştir
      await companyLogin({ email, password });

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
            nameid: decoded.nameid,
            nbf: decoded.nbf,
            unique_name: decoded.unique_name,
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
    <div className="flex flex-col items-center justify-center   ">
      <div className=' m-auto flex-col items-center justify-center w-6/12 flex'>
      <h1 className="text-2xl mb-4">Login Company</h1>
      <div className="flex flex-col gap-4 w-6/12 ">
        <input
          type="text"
          placeholder="Username"
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
    </div>
  );
};

export default Login;
