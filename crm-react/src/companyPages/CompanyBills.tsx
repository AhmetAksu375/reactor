import { useState, useEffect } from "react";
import { getBill, getBillById } from "@/api/Company/companyService";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "react-toastify";

// API'den dönen veri tipleri
export type Bill = {
  id: number;
  workId: number;
  companyId: number;
  employeeId: number;
  adminId: number;
  totalAmount: number;
  taxAmount: number;
  baseAmount: number;
  paymentPaid: boolean;
  createdDate: string;
};

// Pop-up'ta gösterilecek detaylar
export type BillDetails = {
  id: number;
  workId: number;
  companyId: number;
  employeeId: number;
  adminId: number;
  totalAmount: number;
  taxAmount: number;
  baseAmount: number;
  paymentPaid: boolean;
  createdDate: string;
};

export default function CompanyBills() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [billDetails, setBillDetails] = useState<BillDetails | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // API'den fatura listesini çek
  useEffect(() => {
    const fetchBills = async () => {
      setLoading(true);
      try {
        const response = await getBill();
        setBills(response); // Veriyi state'e ata
      } catch (err: any) {
        toast.error("Failed to fetch bills");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  // Detaylı fatura verisini al ve modalı aç
  const handleViewDetails = async (id: number) => {
    try {
      const response = await getBillById(id);
      setBillDetails(response); // Gelen veriyi state'e ata
      setIsDialogOpen(true); // Popup'ı aç
    } catch (err: any) {
      toast.error("Failed to fetch bill details");
    }
  };

  // Tablo sütunları
  const columns: ColumnDef<Bill>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      accessorKey: "workId",
      header: "Work ID",
      cell: ({ row }) => <div>{row.original.workId}</div>,
    },
    {
      accessorKey: "companyId",
      header: "Company ID",
      cell: ({ row }) => <div>{row.original.companyId}</div>,
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
      cell: ({ row }) => <div>{row.original.totalAmount}</div>,
    },
    {
      accessorKey: "paymentPaid",
      header: "Payment Status",
      cell: ({ row }) => (
        <div>{row.original.paymentPaid ? "Paid" : "Unpaid"}</div>
      ),
    },
    {
      accessorKey: "createdDate",
      header: "Created Date",
      cell: ({ row }) => <div>{new Date(row.original.createdDate).toLocaleDateString()}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="outline"
          onClick={() => handleViewDetails(row.original.id)} // Butona tıklanınca fatura detaylarını getir
        >
          View Details
        </Button>
      ),
    },
  ];

  // React Table kullanımı
  const table = useReactTable({
    data: bills,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
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
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
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

      {/* Popup - Fatura Detayları */}
      {isDialogOpen && billDetails && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Bill Details</DialogTitle>
            </DialogHeader>
            <div>
              <p><strong>ID:</strong> {billDetails.id}</p>
              <p><strong>Work ID:</strong> {billDetails.workId}</p>
              <p><strong>Company ID:</strong> {billDetails.companyId}</p>
              <p><strong>Employee ID:</strong> {billDetails.employeeId}</p>
              <p><strong>Admin ID:</strong> {billDetails.adminId}</p>
              <p><strong>Total Amount:</strong> {billDetails.totalAmount}</p>
              <p><strong>Tax Amount:</strong> {billDetails.taxAmount}</p>
              <p><strong>Base Amount:</strong> {billDetails.baseAmount}</p>
              <p><strong>Payment Status:</strong> {billDetails.paymentPaid ? "Paid" : "Unpaid"}</p>
              <p><strong>Created Date:</strong> {new Date(billDetails.createdDate).toLocaleString()}</p>
            </div>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
