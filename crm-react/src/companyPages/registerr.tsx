import  { useState } from 'react'
import { companyRegister } from '../api/Company/companyService';
import { useNavigate } from 'react-router-dom';
export default function Registerr() {

  const navigate = useNavigate();
  const [name,setUsername] = useState("");
  const [email,setMail] = useState("");
  const [password,setPassword] = useState("");


  const handleLogin = async () => {
    try {
      await companyRegister({ name, email, password });
      navigate('/company/login');
    } catch (error) {
      console.error("Registration failed", error);
    }
  }
  return (
   
    <div className="flex flex-col items-center justify-center px-5">
    <h1 className="mb-4 font-medium text-4xl">Register</h1>
    <div className="flex flex-col gap-4 w-full md:w-6/12 ">
      <input onChange={(e)=> setUsername(e.target.value)} type="text" placeholder="Username" className="p-2 border border-gray-300 rounded" />
      <input onChange={(e)=> setMail(e.target.value)} type="email" placeholder="Email" className="p-2 border border-gray-300 rounded" />
      <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" className="p-2 border border-gray-300 rounded" />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">Register</button>
    </div>
  </div>
  )
}
