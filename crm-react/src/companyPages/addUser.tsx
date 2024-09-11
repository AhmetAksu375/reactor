import { createSubUser } from "@/api/Company/companyService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
export default function AddUser() {
  const store = useSelector((state: RootState) => state.user);
  const company = store.nameid;
  const companyId = Number(company);

  const [name, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const departmantId:number = 2; 
  const handleLogin = async ()=>{
      await createSubUser({name, email, password, departmantId, companyId});
  }

  return (
    <div className="space-y-2 w-9/12 md:w-4/12 lg:w-4/12 ">
      şirket id : {company}
      <Input type="username" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
      <Input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
      <Button onClick={handleLogin} type="submit">Create Employee</Button> 
    </div>
  )
}
