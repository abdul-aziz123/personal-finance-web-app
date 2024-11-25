import React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import Button from "@/components/button";
import { IconCaretLeft, IconCaretRight } from "@/icons";

export default function Transactions() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="flex items-center justify-between pb-6">
          <h1 className="text-xl font-bold text-gray-800 md:text-2xl">
            Transactions
          </h1>
          <Button variant="primary" className="text-sm">
            + Add New Transaction
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 pb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search transaction"
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 placeholder-gray-500 shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100">
              Sort by: Latest
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 rounded-md bg-white p-1 shadow-lg">
              <DropdownMenuItem>Latest</DropdownMenuItem>
              <DropdownMenuItem>Oldest</DropdownMenuItem>
              <DropdownMenuItem>A to Z</DropdownMenuItem>
              <DropdownMenuItem>Z to A</DropdownMenuItem>
              <DropdownMenuItem>Highest</DropdownMenuItem>
              <DropdownMenuItem>Lowest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100">
              Filter by: All Transactions
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 rounded-md bg-white p-1 shadow-lg">
              <DropdownMenuItem>All Transactions</DropdownMenuItem>
              <DropdownMenuItem>Entertainment</DropdownMenuItem>
              <DropdownMenuItem>Bills</DropdownMenuItem>
              <DropdownMenuItem>Groceries</DropdownMenuItem>
              <DropdownMenuItem>Dining Out</DropdownMenuItem>
              <DropdownMenuItem>Transportation</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Transactions Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <Table>
            <TableCaption className="text-sm text-gray-500">
              A list of your recent transactions.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="p-4 text-left text-gray-600">
                  Recipient / Sender
                </TableHead>
                <TableHead className="p-4 text-left text-gray-600">
                  Category
                </TableHead>
                <TableHead className="p-4 text-left text-gray-600">
                  Transaction Date
                </TableHead>
                <TableHead className="p-4 text-right text-gray-600">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Table Row Example */}
              <TableRow>
                <TableCell className="flex items-center gap-4 p-4">
                  <Avatar>
                    <AvatarImage asChild>
                      <Image
                        src="/images/avatars/example-avatar.jpg"
                        alt="Bravo Zen Spa"
                        width={40}
                        height={40}
                      />
                    </AvatarImage>
                    <AvatarFallback>BZ</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-800">
                    Bravo Zen Spa
                  </span>
                </TableCell>
                <TableCell className="p-4 text-gray-600">
                  Personal Care
                </TableCell>
                <TableCell className="p-4 text-gray-600">29 Aug 2024</TableCell>
                <TableCell className="p-4 text-right font-bold text-red-600">
                  - $25.00
                </TableCell>
              </TableRow>

              {/* Additional Rows */}
              <TableRow>
                <TableCell className="flex items-center gap-4 p-4">
                  <Avatar>
                    <AvatarFallback>GS</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-800">
                    Grocery Store
                  </span>
                </TableCell>
                <TableCell className="p-4 text-gray-600">Groceries</TableCell>
                <TableCell className="p-4 text-gray-600">11 Aug 2024</TableCell>
                <TableCell className="p-4 text-right font-bold text-green-600">
                  + $200.00
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <Button variant="page" className="flex items-center gap-2">
            <IconCaretLeft className="h-5 w-5 text-gray-500" />
            Prev
          </Button>
          <div className="flex gap-2">
            <Button variant="page" className="active:bg-black">
              1
            </Button>
            <Button variant="page" className="active:bg-black">
              2
            </Button>
            <Button variant="page" className="active:bg-black">
              3
            </Button>
          </div>
          <Button variant="page" className="flex items-center gap-2">
            Next
            <IconCaretRight className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </div>
    </main>
  );
}
