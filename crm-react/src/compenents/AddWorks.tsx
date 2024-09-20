import { useState, useEffect } from 'react';
import { addWork } from '@/api/Company/companyService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; // Adjust the path to your store file
import { getDepartments } from '@/api/Admin/adminService';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddWorks() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>(""); 
  const [priorityId, setPriorityId] = useState<number | undefined>(undefined); 
  const [departments, setDepartments] = useState<{ id: number; name: string }[]>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | undefined>(undefined);

  // Select user information from Redux
  const { departmant, departmantId } = useSelector((state: RootState) => state.user);
  
  // Determine if the user is a manager
  const isManager = departmant === "Yönetici";

  useEffect(() => {
    // Fetch departments only if the user is a manager
    if (isManager) {
      const fetchDepartments = async () => {
        try {
          const data = await getDepartments();
          setDepartments(data);
        } catch (error) {
          console.error("Error fetching departments:", error);
          // Optionally, show a toast notification or alert
        }
      };
      fetchDepartments();
    }
  }, [isManager]);

  const submitForm = async () => {  

    if (!title.trim()) {
      alert("Title is required.");
      return;
    }
    if (!description.trim()) {
      alert("Description is required.");
      return;
    }
    if (priorityId === undefined) {
      alert("Priority is required.");
      return;
    }

    // Determine which departmentId to use
    const finalDepartmentId = isManager ? selectedDepartmentId : departmantId;

    if (isManager && finalDepartmentId === undefined) {
      alert("Please select a department.");
      return;
    }

    try {
      const response = await addWork({ 
        title, 
        description, 
        priorityId, 
        departmantId: Number(finalDepartmentId) 
      });
      console.log("Work added successfully:", response);
      setTitle("");
      setDescription("");
      setPriorityId(undefined);
      setSelectedDepartmentId(undefined);
      // Optionally, show a success toast notification
    } catch (error) {
      console.error("Error adding work:", error);
      // Optionally, show an error toast notification
    }  
    console.log({ title, description, priorityId, departmantId: finalDepartmentId });
  }

  return (
    <div className="space-y-4 w-full px-5 md:w-6/12 md:p-12 rounded-xl shadow-sm">
      <div className='text-3xl font-medium'>Create Job Request</div>
      
      <Input 
        placeholder="Title"
        className='btn-primary'
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />

      {isManager ? (
        <Select onValueChange={(value) => setSelectedDepartmentId(Number(value))}>
          <SelectTrigger className="btn-primary">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map(dept => (
              <SelectItem key={dept.id} value={dept.id.toString()}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input 
          placeholder="Department"
          className='btn-primary'
          value={departmant?.toString()} 
          disabled 
        />
      )}

      <Select onValueChange={(value) => {
        setPriorityId(Number(value));
      }}>
        <SelectTrigger className="btn-primary">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Low</SelectItem>
          <SelectItem value="1">Medium</SelectItem>
          <SelectItem value="2">High</SelectItem>
        </SelectContent>
      </Select>

      <Textarea 
        placeholder="Description" 
        className='btn-primary'
        value={description} 
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button onClick={submitForm}>Send Message</Button>   
      
      {/* Optional: Debugging Information */}
      {/*
      <div className="mt-4">
        <p><strong>Selected Priority ID:</strong> {priorityId !== undefined ? priorityId : 'None'}</p>
        <p><strong>Selected Department ID:</strong> {departmantId !== undefined ? departmantId : 'None'}</p>
        {departmantId !== undefined && (
          <p><strong>Selected Department Name:</strong> {departments.find(dept => dept.id === Number(departmantId))?.name || 'Unknown'}</p>
        )}
      </div>
      */}
    </div>
  )
}
