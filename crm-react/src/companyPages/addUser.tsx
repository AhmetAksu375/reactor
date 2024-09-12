import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { createSubUser } from "@/api/Company/companyService";
import { getDepartmant } from "@/api/Common/commonServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from '@/store/store';

interface Department {
  id: number;
  name: string;
}

export default function AddUser() {
  const store = useSelector((state: RootState) => state.user);
  const company = store.nameid;
  const companyId = Number(company);

  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<null | string>(null);

  // Fetch departments when the component mounts
  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    try {
      const response = await getDepartmant();
      setDepartments(response); // Assuming the response is an array of departments with id and name
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleLogin = async () => {
    if (!selectedDepartment) {
      alert("Please select a department");
      return;
    }
    const departmantId = Number(selectedDepartment); // Convert selected department ID to number if needed
    await createSubUser({ name, email, password, departmantId, companyId });
  };

  return (
    <div className="space-y-2 w-9/12 md:w-4/12 lg:w-4/12">
      {/* şirket id : {company} */}
      <Input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <Select onValueChange={(value) => setSelectedDepartment(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select Department" />
        </SelectTrigger>
        <SelectContent>
          {departments.map((department) => (
            <SelectItem key={department.id} value={department.id.toString()}>
              {department.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={handleLogin} type="submit">Create Employee</Button>
    </div>
  );
}
