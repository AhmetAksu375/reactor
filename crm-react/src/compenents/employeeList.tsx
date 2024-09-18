import  { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getSubUsers } from "@/api/Company/companyService";

interface Employee {
  id: number;
  name: string;
  email: string;
  departmantId: number;
  
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getSubUsers();
        setEmployees(response); // API'den gelen veriyi state'e kaydediyoruz
        setLoading(false);
      } catch (error) {
        setError('Veri alınırken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className=' w-9/12'>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="employee table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Department ID</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow
              key={employee.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {employee.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {employee.name}
              </TableCell>
              <TableCell >{employee.email}</TableCell>
               <TableCell >{employee.departmantId}</TableCell> 
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
