// src/components/Departments.tsx
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
} from "@tanstack/react-table";

import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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

import * as Dialog from "@radix-ui/react-dialog"; // Radix Dialog
import { toast } from "react-toastify";
// Import your API service functions with proper types
import {
  getDepartments,
  createDepartment,
  putDepartment,
  removeDepartment,
} from "@/api/Admin/adminService";

// Define the Department type
export type Department = {
  id: number;
  name: string;
};

const Departments: React.FC = () => {
  // State management
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Popup states
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [currentDept, setCurrentDept] = useState<Department | null>(null);
  const [deptName, setDeptName] = useState<string>("");

  // Delete confirmation dialog state
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [deptToDelete, setDeptToDelete] = useState<number | null>(null);

  // Table state
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState<ColumnFiltersState>([]);
  const [visibility, setVisibility] = useState<VisibilityState>({});
  const [selection, setSelection] = useState<{ [key: string]: boolean }>({});

  // Fetch departments from API
  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: Department[] = await getDepartments(); // Adjusted type
      console.log("Fetched Departments:", response); // Debugging
      setDepartments(response); // Directly set the array
    } catch (err: any) {
      const message = err?.message || "Error fetching departments.";
      setError(message);
      toast.error(message); // Updated to use the actual error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Define table columns
  const columns: ColumnDef<Department>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
          }
          onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ getValue }) => <div>{getValue<number>()}</div>,
      enableSorting: true,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc" ? false : true)
          }
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => <div className="capitalize">{getValue<string>()}</div>,
      enableSorting: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const dept = row.original;

        const handleDeleteClick = () => {
          setDeptToDelete(dept.id);
          setIsDeleteConfirmOpen(true);
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => openEditPopup(dept)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDeleteClick} className="text-red-600 font-bold">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  // Initialize react-table
  const table = useReactTable<Department>({
    data: departments,
    columns,
    state: {
      sorting,
      columnFilters: filters,
      columnVisibility: visibility,
      rowSelection: selection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setFilters,
    onColumnVisibilityChange: setVisibility,
    onRowSelectionChange: setSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Handlers
  const openAddPopup = () => {
    setDeptName("");
    setIsAddOpen(true);
  };

  const openEditPopup = (dept: Department) => {
    setCurrentDept(dept);
    setDeptName(dept.name);
    setIsEditOpen(true);
  };

  const handleDelete = async () => {
    if (deptToDelete === null) return;

    try {
      await removeDepartment({ id: deptToDelete });
      toast.success("Department deleted.");
      setIsDeleteConfirmOpen(false);
      setDeptToDelete(null);
      fetchDepartments();
    } catch (err: any) {
      const message = err?.message || "Failed to delete department.";
      toast.error(message);
      setIsDeleteConfirmOpen(false);
      setDeptToDelete(null);
    }
  };

  const submitAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!deptName.trim()) {
      toast.error("Department name cannot be empty.");
      return;
    }
    const payload: { name: string } = { name: deptName.trim() };
    try {
      await createDepartment(payload);
      toast.success("Department added.");
      setIsAddOpen(false);
      fetchDepartments();
    } catch (err: any) {
      const message = err?.message || "Failed to add department.";
      toast.error(message);
    }
  };

  const submitEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentDept) return;
    if (!deptName.trim()) {
      toast.error("Department name cannot be empty.");
      return;
    }
    const payload: { id: number; name: string } = { id: currentDept.id, name: deptName.trim() };
    try {
      await putDepartment(payload);
      toast.success("Department updated.");
      setIsEditOpen(false);
      setCurrentDept(null);
      fetchDepartments();
    } catch (err: any) {
      const message = err?.message || "Failed to update department.";
      toast.error(message);
    }
  };

  const handleDeptNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDeptName(e.target.value);
  };

  return (
    <div className="w-full">
      {/* Header with Add Button and Column Filters */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter departments..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="default" className="ml-auto" onClick={openAddPopup}>
          Add Department
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns().filter(col => col.getCanHide()).map(col => (
              <DropdownMenuCheckboxItem
                key={col.id}
                checked={col.getIsVisible()}
                onCheckedChange={(value) => col.toggleVisibility(value)}
              >
                {col.id.charAt(0).toUpperCase() + col.id.slice(1)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : ""}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {Object.keys(selection).filter(key => selection[key]).length} of {departments.length} row(s) selected.
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

      {/* Add Department Dialog */}
      <Dialog.Root open={isAddOpen} onOpenChange={setIsAddOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-full max-w-md">
            <Dialog.Title className="text-lg mb-4">Add Department</Dialog.Title>
            <form onSubmit={submitAdd}>
              <Input
                placeholder="Department Name"
                value={deptName}
                onChange={handleDeptNameChange}
                className="mb-4"
                required
              />
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="secondary" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  Add
                </Button>
              </div>
            </form>
            <Dialog.Close asChild>
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                ×
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Edit Department Dialog */}
      <Dialog.Root open={isEditOpen} onOpenChange={setIsEditOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-full max-w-md">
            <Dialog.Title className="text-lg mb-4">Edit Department</Dialog.Title>
            <form onSubmit={submitEdit}>
              <Input
                placeholder="Department Name"
                value={deptName}
                onChange={handleDeptNameChange}
                className="mb-4"
                required
              />
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="secondary" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  Save
                </Button>
              </div>
            </form>
            <Dialog.Close asChild>
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                ×
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Delete Confirmation Dialog */}
      <Dialog.Root open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <Dialog.Title className="text-lg mb-4">Confirm Delete</Dialog.Title>
            <p>Are you sure you want to delete this department?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button type="button" variant="secondary" onClick={() => setIsDeleteConfirmOpen(false)}>
                No
              </Button>
              <Button type="button" variant="destructive" onClick={handleDelete}>
                Yes
              </Button>
            </div>
            <Dialog.Close asChild>
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                ×
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Departments;
