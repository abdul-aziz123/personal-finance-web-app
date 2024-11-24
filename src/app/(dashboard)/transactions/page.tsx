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
    <main className="min-h-screen bg-white p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col items-start justify-between gap-4 pt-space300 md:flex-row md:items-center">
          <h1 className="text-xl font-bold text-gray-800 md:text-2xl">
            Transactions
          </h1>
          <div className="flex flex-wrap gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100">
                Latest
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36 rounded-md bg-white p-1 shadow-lg">
                <DropdownMenuItem className="rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Latest
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Oldest
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  A to Z
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Z to A
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Highest
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Lowest
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100">
                All Transactions
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36 rounded-md bg-white p-1 shadow-lg">
                <DropdownMenuItem className="rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Entertainment
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Bills
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Groceries
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Dining Out
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Transportation
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Personal Care
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <Table>
            <TableCaption className="text-sm text-gray-500">
              A list of your recent transactions.
            </TableCaption>
            <TableHeader>
              <TableRow className="hidden md:table-row">
                <TableHead className="p-4 text-left text-gray-600">
                  Recipient/Sender
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
              {/* Mobile View Row */}
              <TableRow className="block w-full border-b md:table-row md:border-0">
                {/* Name and Category */}
                <TableCell className="block w-full px-4 py-2 text-gray-800 md:table-cell">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage asChild>
                        <Image
                          src="/images/avatars/bravo-zen-spa.jpg"
                          alt="avatar"
                          width={40}
                          height={40}
                        />
                      </AvatarImage>
                      <AvatarFallback>BZ</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium md:text-base">
                        Bravo Zen Spa
                      </span>
                      {/* Only show category below the name on mobile */}
                      <span className="text-sm text-gray-500 md:hidden">
                        Personal Care
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Category (Tablet/Desktop) */}
                <TableCell className="hidden px-4 py-2 text-gray-600 md:table-cell">
                  Personal Care
                </TableCell>

                {/* Amount and Date */}
                <TableCell className="block w-full px-4 py-2 text-right text-gray-800 md:table-cell">
                  <div className="flex flex-col items-end md:flex-row md:items-center md:justify-end md:gap-4">
                    <span className="font-bold text-red-600">- $25.00</span>
                    {/* Only show date below amount on mobile */}
                    <span className="text-sm text-gray-500 md:w-auto md:text-right">
                      29 Aug 2024
                    </span>
                  </div>
                </TableCell>
              </TableRow>

              {/* Add more rows as needed */}
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
            <Button variant="page" className="bg-gray-300 text-gray-700">
              1
            </Button>
            <Button variant="page">2</Button>
            <Button variant="page">3</Button>
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
