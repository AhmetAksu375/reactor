import { getDepartments } from '@/api/Admin/adminService';
import { useState, useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getSubUsers, deleteSubUser, updateSubUser } from "@/api/Company/companyService";

export type Employee = {
  id: number;
  name: string;
  email: string;
  departmantId: number;
  password: string;
  companyId: number;
};

export default function EmployeeList() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedDepartmantId, setUpdatedDepartmantId] = useState(0);
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [updatedCompanyId, setUpdatedCompanyId] = useState(0);
  const [departments, setDepartments] = useState<{ [key: number]: string }>({});
  const [departmentsList, setDepartmentsList] = useState<{ id: number; name: string }[]>([]);

  // Fetch employee data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getSubUsers();
      setData(response);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch department data and map IDs to names
  const fetchDepartments = async () => {
    try {
      const response = await getDepartments(); // Fetch departments using getDepartments
      setDepartmentsList(response); // Store departments for dropdown
      const departmentMap = response.reduce(
        (acc: { [key: number]: string }, dept: { id: number, name: string }) => {
          acc[dept.id] = dept.name;
          return acc;
        },
        {}
      );
      setDepartments(departmentMap);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDepartments();
  }, []);

  const handleUpdate = async () => {
    if (selectedEmployee) {
      try {
        await updateSubUser({
          id: selectedEmployee.id,
          name: updatedName || selectedEmployee.name,
          email: updatedEmail || selectedEmployee.email,
          departmantId: updatedDepartmantId || selectedEmployee.departmantId,
          password: updatedPassword || selectedEmployee.password,
          companyId: updatedCompanyId || selectedEmployee.companyId,
        });

        // Toast or alert success message
        fetchData();
        setIsDialogOpen(false);
      } catch (error) {
        console.error('Failed to update employee:', error);
      }
    }
  };

  const columns: ColumnDef<Employee>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-left"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "companyId",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-left"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue("companyId")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-left"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-left"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "departmantId",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-left"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-left">
          {departments[row.getValue("departmantId") as number] || "Unknown"}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const employee = row.original;

        const handleDelete = async () => {
          try {
            await deleteSubUser(employee);
            alert(`Employee with ID ${employee.id} deleted successfully.`);
            fetchData();
          } catch (error) {
            console.error('Failed to delete employee:', error);
          }
        };

        const handleOpenUpdateDialog = () => {
          setSelectedEmployee(employee);
          setUpdatedName(employee.name);
          setUpdatedEmail(employee.email);
          setUpdatedDepartmantId(employee.departmantId);
          setUpdatedPassword(employee.password);
          setUpdatedCompanyId(employee.companyId);
          setIsDialogOpen(true);
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(employee.id.toString())}
              >
                Copy employee ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
              <DropdownMenuItem onClick={handleOpenUpdateDialog}>Update</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-11/12 overflow-x-auto">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table className="w-full min-w-[800px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="text-center"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-left p-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Update Popup */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Employee</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
            />
            {/* Department Dropdown */}
            <select
              value={updatedDepartmantId}
              onChange={(e) => setUpdatedDepartmantId(Number(e.target.value))}
              className="border p-2 rounded"
            >
              <option value={0} disabled>
                Select Department
              </option>
              {departmentsList.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            <Input
              placeholder="Password"
              type="password"
              value={updatedPassword}
              onChange={(e) => setUpdatedPassword(e.target.value)}
            />
            <Input
              placeholder="Company ID"
              type="number"
              value={updatedCompanyId}
              onChange={(e) => setUpdatedCompanyId(Number(e.target.value))}
            />
            <Button onClick={handleUpdate}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
