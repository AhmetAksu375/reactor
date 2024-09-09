// src/components/Login.tsx
import { useState } from 'react';
import { login } from '../api/Company/companyService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
     await login({email, password})
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Login</h1>
      <div className="flex flex-col gap-4">
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
  );
};

export default Login;
