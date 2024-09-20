// src/api/authService.ts
import apiClient from '../apiClient';
import { toast } from 'react-toastify'; // Import the 'toast' module from the appropriate library

// Define the type for login and register data
interface Admin {
  email: string;
  password: string;
}

interface RegisterData extends Admin {
  username: string;
  email:string;
  password:string;

}

interface CreateDepartmant {
  name: string;
}

interface PutDepartmant {
  id: number;
  name: string;
}

interface DeleteDepartmant {
  id: number;
}

interface AddAdmin {
  name: string;
  email: string;
  password: string;
  departmantId: number;
}

interface UpdateAdmin {
  id: number;
  name: string;
  email: string;
  password: string;
  departmantId: number;
}

interface DeleteAdmin {
  id: number;
}

interface PutWork {
  id : number;
  status : string;
  stagingId : number;
  hours : number;
  price : number;
  date_Start : string;
  date_Finish : string;

}

interface Email {
  toEmail: string;
  subject: string;
  body: string;
}

interface declineEmail {
  workId: number;
  message: string;
}

interface deleteWork {
  id: number;
}

export const loginAdmin = async (data: Admin) => {
  try {
    const response = await apiClient.post('/api/login/admin', data);
    localStorage.setItem("token", response.data.token);
    console.log(response.data.token);
    setTimeout(() => {
       window.location.href = '/admin'; // Replace '/dashboard' with the path you want to redirect to
    }, 1);
    return response.data.token;
  } catch (error) {
    toast.error('Login failed',{position: "bottom-right"});
    throw new Error(`Login failed: ${error}`);
  }
};

// Register method
export const registerAdmin = async (data: RegisterData) => {
  try {
    const response = await apiClient.post('/api/admin/register', data);
    return response.data;
  } catch (error) {

    toast.error('Register failed');
    throw new Error(`Registration failed: ${error}`);
  }
};

export const createDepartment = async (data: CreateDepartmant) => {
  try {
    const response = await apiClient.post('/api/departmant', data);
    return response.data;
  } catch (error) {
    toast.error('Department creation failed');
    throw new Error(`Department creation failed: ${error}`);
  }
};


//DEPARTMENTS
export const getDepartments = async () => {
  try {
    const response = await apiClient.get('/api/departmant');
    return response.data;
  } catch (error) {
    throw new Error(`Department fetch failed: ${error}`);
  }
}

export const putDepartment = async (data: PutDepartmant) => {
  try {
    const response = await apiClient.put(`/api/departmant/${data.id}`, data);
    return response.data;
  } catch (error) {
    toast.error('Department update failed');
    throw new Error(`Department update failed: ${error}`);
  }
}

export const removeDepartment = async (data: DeleteDepartmant) => {
  try {
    const response = await apiClient.delete(`/api/departmant/${data.id}`);
    return response.data;
  } catch (error) {
    toast.error('Department remove failed');
    throw new Error(`Department remove failed: ${error}`);
  }
}

export const getAdmins = async () => {
  try {
    const response = await apiClient.get('/api/admin');
    return response.data;
  } catch (error) {
    throw new Error(`Admin fetch failed: ${error}`);
  }
}

export const addAdmin = async (data: AddAdmin) => {
  try {
    const response = await apiClient.post('/api/admin', data);
    return response.data;
  } catch (error) {
    throw new Error(`Admin add failed: ${error}`);
  }
}

export const deleteAdmin = async (data: DeleteAdmin) => {
  try {
    const response = await apiClient.delete(`/api/admin/${data.id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Admin delete failed: ${error}`);
  }
}
export const updateAdmin = async (data: UpdateAdmin) => {
  try {
    const response = await apiClient.put(`/api/admin/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Admin update failed: ${error}`);
  }
}

export const getWorks = async () => {
  try {
    const response = await apiClient.get('/api/work');
    return response.data;
  } catch (error) {
    toast.error('Work fetch failed',{position: "bottom-right",autoClose:500}); 
    throw new Error(`Work fetch failed: ${error}`);
  }
}

export const putWork = async (data: PutWork) => {
  try {
    const response = await apiClient.put(`/api/work/${data.id}`, data);
    return response.data;
  } catch (error) {
    toast.error('Work update failed',{position: "bottom-right",autoClose:500});
    throw new Error(`Work update failed: ${error}`);
  }
}
// export const putWork = async (data: PutWork) => {
//   try {
//     const responsePromise = apiClient.put(`/api/work/${data.id}`, data);
    
//     // Toast loading, success, and error durumlarını gösteriyor
//     await toast.promise(
//       responsePromise,
//       {
//         pending: 'Work is being updated...',
//         success: 'Work updated successfully!',
//         error: {
//           render({ data }) {
//             return `Work update failed: ${(data as { message: string }).message || data}`;
//           }
//         }
//       },
//       {
//         position: "bottom-right",
//         autoClose: 1500
//       }
//     );

export const sendEmail = async (data: Email) => {
  try {
    const response = await apiClient.post('/api/email/send', data);
    toast.success('Email send successfully',{position: "bottom-right",autoClose:500});
    return response.data;
  } catch (error) {
    toast.error('Email send failed',{position: "bottom-right",autoClose:500});
    throw new Error(`Email send failed: ${error}`);
  }
}

export const declineEmail1 = async (data: declineEmail) => { 
  try {
    const response = await apiClient.post('/api/email/decline', data);
    return response.data;
  } catch (error) {
    toast.error('Email send failed',{position: "bottom-right",autoClose:500});
    throw new Error(`Email send failed: ${error}`);
  }
}

export const declineEmail = async (data: declineEmail) => {
  try {
    const response = await apiClient.post('/api/email/decline', data);
    return response.data;
  } catch (error) {
    throw new Error(`Work decline failed: ${error}`);
  }
}

export const deleteWork = async (data: deleteWork) => {
  try {
    const response = await apiClient.delete(`/api/work/delete/${data.id}`);
    return response.data;
  } catch (error) {
    toast.error('Work delete failed',{position: "bottom-right",autoClose:500});
    throw new Error(`Work delete failed: ${error}`);
  }
}