import { useState, useEffect } from "react";
import { getWorks, putWork, declineEmail,deleteWork } from "@/api/Admin/adminService";
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
import { Textarea } from "@/components/ui/textarea";
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
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "react-toastify";

const stagingOptions = [
  { id: 0, name: "Planning" },
  { id: 1, name: "Design" },
  { id: 2, name: "Development" },
  { id: 3, name: "Testing" },
  { id: 4, name: "Deployment" },
];

const statusOptions = [
  { value: "Pending", label: "Pending" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
  { value: "On Hold", label: "On Hold" },
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

export default function MainPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const [formData, setFormData] = useState({
    status: "",
    stagingId: 0,
    hours: 0,
    workerCount: 0,
    price: 0,
    date_Start: "",
    date_Finish: "",
  });

  // Yeni eklenen durumlar
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [declineMessage, setDeclineMessage] = useState("");

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const worksData = await getWorks();
        const sortedWorks = worksData.sort((a: Work, b: Work) => b.id - a.id);
        setWorks(sortedWorks);
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
    {
      accessorKey: "status",
      header: "Status",
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
    { accessorKey: "workerCount", header: "Worker" },
    {
      accessorKey: "stagingId",
      header: "Stage",
      cell: (info) => {
        const stagingId = info.getValue<number>();
        const staging = stagingOptions.find((s) => s.id === stagingId);
        return staging ? staging.name : "Unknown";
      },
      maxSize: 1,
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
        async function handleCompleted(work: Work) {
          if (work.status === "Completed") return;

          try {
        const updatedWork = {
          ...work,
          status: "Completed",
        };

        await toast.promise(
          putWork(updatedWork),
          {
            pending: "Marking work as completed...",
            success: "Work marked as completed!",
            error: "Failed to mark work as completed.",
          },
          {
            position: "bottom-right",
            autoClose: 500,
          }
        );

        const worksData = await getWorks();
        const sortedWorks = worksData.sort((a: Work, b: Work) => b.id - a.id);
        setWorks(sortedWorks);
          } catch (error) {
        console.error("Error marking work as completed:", error);
          }
        }
        async function handleDeleteWork(work: Work) {
          try {
            await deleteWork({ id: work.id });
            const worksData = await getWorks();
            const sortedWorks = worksData.sort((a: Work, b: Work) => b.id - a.id);
            setWorks(sortedWorks);
            toast.success("Work deleted successfully!", {
              position: "bottom-right",
              autoClose: 500,
            });
          } catch (error) {
          
          }
        }
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleOpenUpdateDialog(work)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleCompleted(work)}
                className="text-green-600"
              >
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeclineClick(work)}
                className="text-red-600"
              >
                Decline
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteWork(work)}
                className="text-red-600"
              >
                Delete
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

  const handleOpenUpdateDialog = (work: Work) => {
    const todayDate = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
    setSelectedWork(work);
    setFormData({
      status: work.status || "",
      stagingId: work.stagingId || 0,
      hours: work.hours || 0,
      workerCount: work.workerCount || 0,
      price: work.price || 0,
      date_Start: work.date_Start ? work.date_Start.slice(0, 10) : todayDate,
      date_Finish: work.date_Finish ? work.date_Finish.slice(0, 10) : todayDate,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWork(null);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "stagingId" ||
        name === "hours" ||
        name === "workerCount" ||
        name === "price"
          ? Number(value)
          : value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWork) return;

    const updatedWork = {
      ...selectedWork,
      status: formData.status,
      stagingId: formData.stagingId,
      hours: formData.hours,
      workerCount: formData.workerCount,
      price: formData.price,
      date_Start: new Date(formData.date_Start).toISOString(),
      date_Finish: new Date(formData.date_Finish).toISOString(),
    };

    try {
      await putWork(updatedWork);
      const worksData = await getWorks();
      const sortedWorks = worksData.sort((a: Work, b: Work) => b.id - a.id);
      setWorks(sortedWorks);
      handleCloseModal();
    } catch (error) {
      
      console.error("Error updating work:", error);
    }
  };

  // Decline işlemleri
  const handleDeclineClick = (work: Work) => {
    setSelectedWork(work);
    if (work.status === "Declined") return;
    setIsDeclineModalOpen(true)
  
  };

  const declineSubmits = async () => {
    if (!selectedWork || !declineMessage) return;

    try {
      // Status'u "Completed" olarak güncelle
      const updatedWork = {
        ...selectedWork,
        status: "Declined",
      };

      // Güncellenmiş work'u sunucuya gönder
      await putWork(updatedWork);

      // Decline email gönder
      // await declineEmail({
      //   workId: selectedWork.id,
      //   message: declineMessage,
      // })

      await toast.promise(
         declineEmail({
          workId: selectedWork.id,
          message: declineMessage,
        }),
        {
          pending: "Sending decline email...",
          success: "Decline email sent successfully!",
          error: "Error sending decline email",
        },
        {position: "bottom-right",autoClose:500}
      );
      ;

      // Works listesini güncelle
      const worksData = await getWorks();
      const sortedWorks = worksData.sort((a: Work, b: Work) => b.id - a.id);
      setWorks(sortedWorks);

      // Modalı kapat ve state'i sıfırla
      setIsDeclineModalOpen(false);
      setDeclineMessage("");
      setSelectedWork(null);
    } catch (error) {
      console.error("Error declining work:", error);
    }

    setIsDeclineModalOpen(false)

  };

  const generatePageNumbers = () => {
    const pageCount = table.getPageCount();
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
      pages.push(
        <Button
          key={i}
          variant={
            i === table.getState().pagination.pageIndex ? "default" : "ghost"
          }
          className={`h-8 px-3 ${
            i === table.getState().pagination.pageIndex ? "text-white" : ""
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
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
      </div>

      {/* Update Modal */}
      {isModalOpen && selectedWork && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Work Details</DialogTitle>
              <DialogDescription>
                Update the details of the selected work item.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Status Field */}
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                  value={formData.status}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Staging ID Field */}
              <div>
                <Label htmlFor="stagingId">Stage</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      stagingId: Number(value),
                    }))
                  }
                  value={formData.stagingId.toString()}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stagingOptions.map((option) => (
                      <SelectItem
                        key={option.id}
                        value={option.id.toString()}
                      >
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Hours Field */}
              <div>
                <Label htmlFor="hours">Hours</Label>
                <Input
                  id="hours"
                  name="hours"
                  type="number"
                  value={formData.hours}
                  onChange={handleFormChange}
                  required
                />
              </div>

              {/* Worker Count Field */}
              <div>
                <Label htmlFor="workerCount">Worker Count</Label>
                <Input
                  id="workerCount"
                  name="workerCount"
                  type="number"
                  value={formData.workerCount}
                  onChange={handleFormChange}
                  required
                />
              </div>

              {/* Price Field */}
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleFormChange}
                  required
                />
              </div>

              {/* Start Date Field */}
              <div>
                <Label htmlFor="date_Start">Start Date</Label>
                <Input
                  id="date_Start"
                  name="date_Start"
                  type="date"
                  value={formData.date_Start}
                  onChange={handleFormChange}
                  required
                />
              </div>

              {/* Finish Date Field */}
              <div>
                <Label htmlFor="date_Finish">Finish Date</Label>
                <Input
                  id="date_Finish"
                  name="date_Finish"
                  type="date"
                  value={formData.date_Finish}
                  onChange={handleFormChange}
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
            <DialogClose />
          </DialogContent>
        </Dialog>
      )}

      {/* Decline Modal */}
      {isDeclineModalOpen && selectedWork && (
        <Dialog open={isDeclineModalOpen} onOpenChange={setIsDeclineModalOpen}>
          <DialogContent className="w-full max-w-md">
            <DialogHeader>
              <DialogTitle>Decline Work</DialogTitle>
              <DialogDescription>
                Please enter a reason for declining this work.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={declineMessage}
                onChange={(e) => setDeclineMessage(e.target.value)}
                rows={4}
                required
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setIsDeclineModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={declineSubmits}
                className="bg-red-600 text-white"
              >
                Send
              </Button>
            </div>
            <DialogClose />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
