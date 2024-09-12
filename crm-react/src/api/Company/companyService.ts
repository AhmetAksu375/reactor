import apiClient from '../apiClient';
import { toast } from 'react-toastify'; // Import the 'toast' module from the appropriate library


interface Company {
  email: string;
  password: string;
}

interface CompanyRegisterData extends Company {
  username: string;
  email:string;
  password:string;
}

// interface Subuser {
//   username : string;
//   email : string;
//   password : string;
//   companyId : number;
// }
interface createSubUser {
  name : string;
  email : string;
  password : string;
  departmantId : number;
  companyId : number;
}

interface deleteSubUser {
  id : number;
}
interface updateSubUser {
  id : number;
  name : string;
  email : string;
  password : string;
  departmantId : number;
  companyId : number;
}

export const companyLogin = async (data: Company) => {
  try {
    const response = await apiClient.post('/api/login/company', data);
    localStorage.setItem("token", response.data.token);
    console.log(response.data);
    
    toast.success('Login successful');
    // Redirect after 1 millisecond
    setTimeout(() => {
      window.location.href = '/'; // Replace '/dashboard' with the path you want to redirect to
    }, 1);

    return response.data.token;
  } catch (error) {
    toast.error('Login failed');

    throw new Error(`Login failed: ${error}`);
  }
};

// Register method
export const companyRegister = async (data: CompanyRegisterData) => {
  try {
    const response = await apiClient.post('/api/User/register', data);
    return response.data;
  } catch (error) {
    throw new Error(`Registration failed: ${error}`);
  }
};


export const createSubUser = async (data:createSubUser)=>{
  try {
    const response = await apiClient.post('/api/Employee', data);
    toast.success('User created successfully');
    return response.data;
  } catch (error) {
    toast.error('User creation failed');
    throw new Error(`User creation failed: ${error}`);
  }
}

export const getSubUsers = async () => {
  try {
    const response = await apiClient.get('/api/Employee');
    toast.success('User list fetched successfully',{position: "bottom-right", autoClose: 500});
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      toast.error('Unauthorized: Please log in again.');
    } else {
      toast.error('User list fetch failed');
    }
    throw new Error(`User list fetch failed: ${error}`);
  }
};

export const deleteSubUser = async (data: deleteSubUser) => {
  try {
    const response = await apiClient.delete(`/api/Employee/${data.id}`);
    toast.success('User deleted successfully');
    return response.data;
  } catch (error) {
    toast.error('User deletion failed');
    throw new Error(`User deletion failed: ${error}`);
  }
}

export const updateSubUser = async (data: updateSubUser) => {
  try {
    const response = await apiClient.put(`/api/Employee/${data.id}`, data);
    toast.success('User updated successfully',{position: "bottom-right", autoClose: 500});
    return response.data;
  } catch (error) {
    toast.error('User update failed');
    throw new Error(`User update failed: ${error}`);
  }
};