import { useState, useEffect } from "react";
import { getWorks } from "@/api/Admin/adminService"; // Ensure API functions are correctly implemented
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Ensure Dialog components are correctly implemented

// Define staging options for display
const stagingOptions = [
  { id: 0, name: "Planning" },
  { id: 1, name: "Design" },
  { id: 2, name: "Development" },
  { id: 3, name: "Testing" },
  { id: 4, name: "Deployment" },
];

interface Work {
  company: { name: string };
  departmant: { name: string };
  hours: number;
  price: number;
  priorityId: number;
  stagingId: number;
  status: string;
  workerCount: number;
  employee: string;
  id: number;
  title: string;
  description: string;
  departmantId: number;
  employeeId: number;
  companyId: number;
  date_Start: string;
  date_Finish: string;
}

export default function CompanyWorksList() {
  const [works, setWorks] = useState<Work[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const worksData = await getWorks();
        setWorks(worksData);
      } catch (error) {
        console.error("Error fetching works:", error);
      }
    };
    fetchWorks();
  }, []);

  const columns: ColumnDef<Work>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "company.name", header: "Company" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "departmant.name", header: "Department" },
    { accessorKey: "hours", header: "Hours" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "status", header: "Status",
      cell: ({ getValue }) => {
        const status = getValue<string>();
        let colorClass = "";

        switch (status) {
          case "Declined":
            colorClass = "text-red-600 font-bold";
            break;
          case "Completed":
            colorClass = "text-green-600 font-bold";
            break;
          case "In Progress":
            colorClass = "text-blue-600 font-bold"; // Customize as needed
            break;
          case "Pending":
            colorClass = "text-yellow-600 font-bold"; // Customize as needed
            break;
          default:
            colorClass = "text-gray-600";
        }

        return <span className={colorClass}>{status}</span>;
      },
     },
    { accessorKey: "workerCount", header: "Worker Count" },
    {
      accessorKey: "stagingId",
      header: "Stage",
      cell: (info) => {
        const stagingId = info.getValue<number>();
        const staging = stagingOptions.find((s) => s.id === stagingId);
        return staging ? staging.name : "Unknown";
      },
    },
    {
      accessorKey: "date_Start",
      header: "Start Date",
      cell: (info) => {
        const dateStr = info.getValue() as string;
        return dateStr ? dateStr.slice(0, 10) : "";
      },
    },
    {
      accessorKey: "date_Finish",
      header: "Finish Date",
      cell: (info) => {
        const dateStr = info.getValue() as string;
        return dateStr ? dateStr.slice(0, 10) : "";
      },
    },
    {
      accessorKey: "priorityId",
      header: "Priority",
      cell: ({ row }) => {
        const priorityId = row.getValue<number>("priorityId");
        const color =
          priorityId === 0
            ? "bg-yellow-300"
            : priorityId === 1
            ? "bg-orange-400"
            : "bg-red-500";
        return (
          <div className="flex justify-center items-center">
            <span className={`w-3 h-3 rounded-full ${color}`}></span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const work = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleOpenDetailsDialog(work)}>
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: works,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({
          pageIndex,
          pageSize,
        });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      } else {
        setPageIndex(updater.pageIndex);
        setPageSize(updater.pageSize);
      }
    },
  });

  const handleOpenDetailsDialog = (work: Work) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWork(null);
  };

  const generatePageNumbers = () => {
    const pageCount = table.getPageCount();
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === table.getState().pagination.pageIndex ? "default" : "ghost"}
          className={`h-8 px-3 ${
            i === table.getState().pagination.pageIndex ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => table.setPageIndex(i)}
        >
          {i + 1}
        </Button>
      );
    }

    return pages;
  };

  return (
    <div className="w-full">
      {/* Filter and Column Selection */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Company..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          {/* Page Number Buttons */}
          {generatePageNumbers()}
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <div>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
      </div>

      {/* View Details Modal */}
      {isModalOpen && selectedWork && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Work Details</DialogTitle>
              <DialogDescription>
                <div className="space-y-2">
                  <p><strong>Title:</strong> {selectedWork.title}</p>
                  <p><strong>Status:</strong> {selectedWork.status}</p>
                  <p><strong>Stage:</strong> {stagingOptions.find(s => s.id === selectedWork.stagingId)?.name}</p>
                  <p><strong>Hours:</strong> {selectedWork.hours}</p>
                  <p><strong>Worker Count:</strong> {selectedWork.workerCount}</p>
                  <p><strong>Price:</strong> {selectedWork.price}</p>
                  <p><strong>Start Date:</strong> {selectedWork.date_Start.slice(0, 10)}</p>
                  <p><strong>Finish Date:</strong> {selectedWork.date_Finish.slice(0, 10)}</p>
                  <p><strong>Description:</strong> {selectedWork.description}</p>
                  <p><strong>Department:</strong> {selectedWork.departmant?.name}</p>
                  <p><strong>Company:</strong> {selectedWork.company?.name}</p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <Button className="mt-4" onClick={handleCloseModal}>
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
