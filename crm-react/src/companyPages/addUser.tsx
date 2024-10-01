import { useEffect, useState } from "react";
//import { useSelector } from 'react-redux';
import { createSubUser } from "@/api/Company/companyService";
import { getDepartmant } from "@/api/Common/commonServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

interface Department {
  id: number;
  name: string;
}

export default function AddUser() {
  //const store = useSelector((state: RootState) => state.user);
  //const company = store.nameid;
  // const companyId = Number(company);

  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<null | string>(
    null
  );
  const [isDepartmantManager, setIsDepartmantManager] = useState<boolean>(true);

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
    const departmantId = Number(selectedDepartment); // Convert selected department ID to number if needed
    if (!selectedDepartment) {
      alert("Please select a department");
      return;
    }
    try {
      await createSubUser({ name, email, password, departmantId, isDepartmantManager });
      toast.success("Employee created successfully", {
        position: "bottom-right",
        autoClose: 500,
      });
    } catch (error) {}
  };

  return (
    <div className="space-y-2 w-9/12 md:w-4/12 lg:w-4/12">
      {/* şirket id : {company} */}
      <Input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

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
      <div className="flex items-center justify-between w-full">
        <div className="flex  flex-auto items-center space-x-1">
          <Checkbox
            checked={isDepartmantManager}
            onCheckedChange={() => setIsDepartmantManager(!isDepartmantManager)} // Tıklanınca değer tersine döner
            id="god-mod-checkbox"
          />
          <Label htmlFor="god-mod-checkbox">GOD MOD</Label>
        </div>
        <Button onClick={handleLogin} type="submit">
          Create Employee
        </Button>
      </div>
    </div>
  );
}
