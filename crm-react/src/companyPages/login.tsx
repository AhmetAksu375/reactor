import { useState } from 'react';
import { companyLogin, employeeLogin } from '../api/Company/companyService';
import { useDispatch } from 'react-redux';
import { decodeToken } from '@/utils/jwtHelper';
import { setUser } from '@/store/userSlice';

const LoginCompany = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailEmployee, setEmailEmployee] = useState('');
  const [passwordEmployee, setPasswordEmployee] = useState('');
  const [loginType, setLoginType] = useState<'company' | 'employee'>('company');
  const dispatch = useDispatch();

  const handleSubmitEmployee = async () => {
    try {
      await employeeLogin({ email: emailEmployee, password: passwordEmployee });
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = decodeToken(token);
        console.log(decoded);
        debugger;
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

  const handleSubmit = async () => {
    try {
      await companyLogin({ email, password });
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = decodeToken(token);
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
    <div className="flex flex-col items-center px-5 md:ml-0 justify-center">
      <div className="flex mb-5 space-x-4">
        <button 
          onClick={() => setLoginType('company')} 
          className={`px-4 py-2 rounded ${loginType === 'company' ? 'bg-blue-500 text-white': 'bg-gray-200'}`}
        >
          Company Login
        </button>
        <button 
          onClick={() => setLoginType('employee')} 
          className={`px-4 py-2 rounded ${loginType === 'employee' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Employee Login
        </button>
      </div>

      {loginType === 'company' && (
        <div className="m-auto flex-col items-center justify-center w-full md:w-6/12 flex">
          <h1 className="font-medium text-4xl mb-4 pt-10">Login Company</h1>
          <div className="flex flex-col gap-4 w-full md:w-6/12 ">
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
      )}

      {loginType === 'employee' && (
        <div className="m-auto flex-col items-center justify-center w-full md:w-6/12 flex">
          <h1 className="font-medium text-4xl mb-4 pt-10">Login Employee</h1>
          <div className="flex flex-col gap-4 w-full md:w-6/12">
            <input
              type="text"
              placeholder="Username"
              value={emailEmployee}
              onChange={(e) => setEmailEmployee(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={passwordEmployee}
              onChange={(e) => setPasswordEmployee(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <button onClick={handleSubmitEmployee} type="submit" className="bg-blue-500 text-white p-2 rounded">
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginCompany;
