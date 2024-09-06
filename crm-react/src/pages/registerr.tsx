import React, { useState } from 'react'
import { registerMethod } from '../api/Company/companyService';

export default function registerr() {
const [id,setId] = useState(1);

  const [name,setName] = useState("");
  const [email,setMail] = useState("");
  const [password,setPassword] = useState("");


  const handleLogin = ()=>{

    registerMethod({id,name,email,password})
    
  }
  return (
   
    <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-2xl mb-4">Register</h1>
    <div className="flex flex-col gap-4">
      <input onChange={(e)=> setName(e.target.value)} type="text" placeholder="Username" className="p-2 border border-gray-300 rounded" />
      <input onChange={(e)=> setMail(e.target.value)} type="EMAİL" placeholder="Email" className="p-2 border border-gray-300 rounded" />
      <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" className="p-2 border border-gray-300 rounded" />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">Register</button>
    </div>
  </div>
  )
}
