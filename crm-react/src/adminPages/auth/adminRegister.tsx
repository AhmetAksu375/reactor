import { useState } from 'react'
import { registerAdmin } from '../../api/Admin/adminService';

export default function adminRegister() {

  const [username,setUserName] = useState("");
  const [email,setMail] = useState("");
  const [password,setPassword] = useState("");


  const handleLogin = async ()=>{

    await registerAdmin({username,email,password})
    
  }
  return (
   
    <div className="flex flex-col items-center  min-h-screen">
    <h1 className="text-2xl mb-4">Register Admin</h1>
    <div className="flex flex-col gap-4 w-[400px]">
      <input onChange={(e)=> setUserName(e.target.value)} type="text" placeholder="Username" className="p-2 border border-gray-300 rounded" />
      <input onChange={(e)=> setMail(e.target.value)} type="email" placeholder="Email" className="p-2 border border-gray-300 rounded" />
      <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" className="p-2 border border-gray-300 rounded" />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">Register</button>
    </div>
  </div>
  )
}
