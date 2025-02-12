"use client";

import type { selectCustomerSchemaType } from "@/zod-schema/customer";

import {
  CellContext,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { MoreHorizontal, TableOfContents } from "lucide-react";

// import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  data: selectCustomerSchemaType[];
};

export default function CustomerTable({ data }: Props) {
  const router = useRouter();
  const columnHeadersArray: Array<keyof selectCustomerSchemaType> = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "region",
  ];

  const headerDisplayNames: Partial<
    Record<keyof selectCustomerSchemaType, string>
  > = {
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    phone: "Téléphone",
    region: "Région",
  };

  function formatString(columnName: keyof selectCustomerSchemaType): string {
    return headerDisplayNames[columnName] || columnName;
  }

  const columnHelper = createColumnHelper<selectCustomerSchemaType>();

  const ActionsCell = ({
    row,
  }: CellContext<selectCustomerSchemaType, unknown>) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-full p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link
              href={`/tickets/form?customerId=${row.original.id}`}
              className="w-full"
              prefetch={false}
            >
              Nouveau ticket
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={`/customers/form?customerId=${row.original.id}`}
              className="w-full"
              prefetch={false}
            >
              Editer les données du client
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  ActionsCell.displayName = "ActionsCell";

  const columnWidths = {
    firstName: 100,
    lastName: 100,
    email: 200,
    phone: 100,
    region: 50,
  };

  const columns = [
    ...columnHeadersArray.map((columnName) => {
      return columnHelper.accessor(columnName, {
        id: columnName,
        size:
          columnWidths[columnName as keyof typeof columnWidths] ?? undefined,
        header: formatString(columnName),
      });
    }),

    columnHelper.display({
      id: "actions",
      size: 50,
      header: () => <TableOfContents />,
      cell: ActionsCell,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-6 rounded-lg overflow-hidden border border-border">
      <Table className="border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={`bg-secondary ${
                    header.id === "actions" ? "w-full" : ""
                  }`}
                  style={{ width: header.getSize() }}
                >
                  <div
                    className={`${
                      header.id === "actions"
                        ? "flex justify-center items-center"
                        : ""
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
              onClick={() =>
                router.push(`/customers/form?customerId=${row.original.id}`)
              }
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
