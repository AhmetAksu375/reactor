import { createSubUser } from "@/api/Company/companyService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
export default function AddUser() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const companyId = 0; // Declare or initialize the 'companyId' variable
  const handleLogin = async ()=>{
      await createSubUser({username, password, email, companyId});
  }
  return (
    <div className="space-y-2  ">
      <Input type="username" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
      <Input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
      <Button onClick={handleLogin} type="submit">Subscribe</Button> 
    </div>
  )
}
