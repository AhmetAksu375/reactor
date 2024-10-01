import apiClient from '../apiClient';
import { toast } from 'react-toastify'; // Import the 'toast' module from the appropriate library


interface Company {
  email: string;
  password: string;
}

interface CompanyRegisterData extends Company {
  name: string;
  email:string;
  password:string;
}

interface createSubUser {
  name : string;
  email : string;
  password : string;
  departmantId : number;
  isDepartmantManager : boolean;
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

interface EmployeeLogin {
  email: string;
  password: string;
}

interface AddWork {
  title: string;
  description: string;
  priorityId: number;
  departmantId: number;
}

interface Approve {
  customerApproved: boolean;
  customerComment: string;
  approvalDate: Date;
}


export const companyLogin = async (data: Company) => {
  try {
    const response = await apiClient.post('/api/login/company', data);
    localStorage.setItem("token", response.data.token);  
    setTimeout(() => {
      window.location.href = '/company';
    }, 1);

    return response.data.token;
  } catch (error) {
    toast.error('Login failed');

    throw new Error(`Login failed: ${error}`);
  }
};


export const companyRegister = async (data: CompanyRegisterData) => {
  try {
    const response = await apiClient.post('/api/register/company', data);
    toast.success('Registration successful');
    return response.data;
  } catch (error) {
    toast.error('Registration failed', {position: "bottom-right", autoClose: 500});
    throw new Error(`Registration failed: ${error}`);
  }
};


export const createSubUser = async (data:createSubUser)=>{
  try {
    const response = await apiClient.post('/api/Employee', data);
    return response.data;
  } catch (error) {
    toast.error('User creation failed');
    throw new Error(`User creation failed: ${error}`);
  }
}

export const getSubUsers = async () => {
  try {
    const response = await apiClient.get('/api/Employee');
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
    return response.data;
  } catch (error) {
    toast.error('User deletion failed');
    throw new Error(`User deletion failed: ${error}`);
  }
}

export const updateSubUser = async (data: updateSubUser) => {
  try {
    const response = await apiClient.put(`/api/Employee/${data.id}`, data);
    return response.data;
  } catch (error) {
    toast.error('User update failed');
    throw new Error(`User update failed: ${error}`);
  }
};

export const employeeLogin = async (data: EmployeeLogin) => {
  try {
    const response = await apiClient.post('/api/login/employee', data);
    localStorage.setItem("token", response.data.token);  
    setTimeout(() => {
      window.location.href = '/';
    }, 1);
    return response.data;
  } catch (error) {
    toast.error('Login failed' ,{position: "bottom-right", autoClose: 500});
    throw new Error(`Login failed: ${error}`);
  }
};

export const addWork = async (data: AddWork) => {
  try {
    const response = await apiClient.post('/api/Work', data);
    toast.success('Work added successfully');
    return response.data;
  } catch (error) {
    toast.error('Work addition failed');
    throw new Error(`Work addition failed: ${error}`);
  }
}

export const companyWorkList = async () => {
  try {
    const response = await apiClient.get('/api/Work');
    return response.data;
  }catch (error: any) {
    if (error.response && error.response.status === 401) {
      toast.error('Unauthorized: Please log in again.');
    } else {
      toast.error('Work list fetch failed');
    }
    throw new Error(`Work list fetch failed: ${error}`);
  }
}

export const getBill = async () => {
  try {
    const response = await apiClient.get('/api/invoice');
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      toast.error('Unauthorized: Please log in again.');
    } else {
      toast.error('Bill list fetch failed');
    }
    throw new Error(`Bill list fetch failed: ${error}`);
  }
}

export const getBillById = async (id: number) => {
  try {
    const response = await apiClient.get(`/api/invoice/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      toast.error('Unauthorized: Please log in again.');
    } else {
      toast.error('Bill fetch failed');
    }
    throw new Error(`Bill fetch failed: ${error}`);
  }
}

export const getInvoice = async () => {
  try {
    const response = await apiClient.get('/api/invoice');
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      toast.error('Unauthorized: Please log in again.');
    } else {
      toast.error('Invoice list fetch failed');
    }
    throw new Error(`Invoice list fetch failed: ${error}`);
  }
}

export const getInvoiceById = async (id: number) => {
  try {
    const response = await apiClient.get(`/api/invoice/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      toast.error('Unauthorized: Please log in again.');
    } else {
      toast.error('Invoice fetch failed');
    }
    throw new Error(`Invoice fetch failed: ${error}`);
  }
}

export const postApprove = async (id:number, data: Approve) => {
  try {
    const response = await apiClient.post(`/api/Work/${id}/approve`, data);
    return response.data;
  } catch (error) {
    toast.error('Approval failed');
    throw new Error(`Approval failed: ${error}`);
  }
}