import { useState } from 'react';
// import { getDepartmant } from "@/api/Common/commonServices";
import { addWork } from '@/api/Company/companyService';
// import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; // Adjust the path to your store file

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
  const { departmant } = useSelector((state: RootState & { user: { departmant: string } }) => state.user);
  const { departmantId } = useSelector((state: RootState & { user: { departmantId: number } }) => state.user);
  
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

    try {
      const response = await addWork({ title, description, priorityId, departmantId: Number(departmantId) });
      console.log("Work added successfully:", response);
      setTitle("");
      setDescription("");
      setPriorityId(undefined);
      // setDepartmantId(undefined);
    } catch (error) {
      console.error("Error adding work:", error);
    }  
    console.log({ title, description, priorityId, departmantId });
  }

  return (

    <div className="space-y-4 w-full px-5 md:w-6/12  md:p-12 rounded-xl shadow-sm">
      <div className=' text-3xl font-medium'>Create job request
      </div>
      <Input 
        placeholder="Title"
        className='btn-primary'
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />

      <Select>
        <SelectTrigger className="btn-primary">
          <SelectValue placeholder={departmant} />
        </SelectTrigger>
      </Select>

      <Select onValueChange={(value) => {
        setPriorityId(Number(value));
      }}>
        <SelectTrigger className=" btn-primary">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0" className=''>Low</SelectItem>
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

  
      
      <Button onClick={submitForm}>Send message</Button>   
      <div className="mt-4">
        {/* <p><strong>Selected Priority ID:</strong> {priorityId !== undefined ? priorityId : 'None'}</p>
        <p><strong>Selected Department ID:</strong> {departmantId !== undefined ? departmantId : 'None'}</p>
        {departmantId !== undefined && (
          <p><strong>Selected Department Name:</strong> {departments.find(dept => dept.id === Number(departmantId))?.name || 'Unknown'}</p>
        )} */}
      </div>
    </div>
  )
}
