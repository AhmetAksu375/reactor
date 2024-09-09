// src/components/Login.tsx
import { useState } from 'react';
import { companyLogin } from '../api/Company/companyService';

const Login = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
     await companyLogin({username, password});
  };

  return (
    <div className="flex flex-col items-center justify-center  ">
      <h1 className="text-2xl mb-4">Login</h1>
      <div className="flex flex-col gap-4 w-6/12 ">
        <input
          type="text"
          placeholder="Username"
          value={username}
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

export default Login;
