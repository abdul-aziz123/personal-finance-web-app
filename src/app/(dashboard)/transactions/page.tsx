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

export default function transactions() {
  return (
    <main className="flex flex-col gap-2">
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-Grey900 bg-Beige100 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            Latest
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[120px] bg-Beige100 p-1">
            <DropdownMenuItem className="rounded-sm px-3 py-2 text-sm text-Grey900 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
              Latest
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-sm px-3 py-2 text-sm text-Grey900 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
              Oldest
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-sm px-3 py-2 text-sm text-Grey900 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
              A to Z
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-sm px-3 py-2 text-sm text-Grey900 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
              Z to A
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-sm px-3 py-2 text-sm text-Grey900 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
              Highest
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-sm px-3 py-2 text-sm text-Grey900 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
              Lowest
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-Grey900 bg-Beige100 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            All Transactions
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[120px] bg-Beige100 p-1">
            <DropdownMenuItem className="rounded-sm px-3 py-2 text-sm text-Grey900 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
              Entertainment
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-sm px-3 py-2 text-sm text-Grey900 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
              Bills
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-sm px-3 py-2 text-sm text-Grey900 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
              Groceries
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-sm px-3 py-2 text-sm text-Grey900 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
              Dining Out
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-sm px-3 py-2 text-sm text-Grey900 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
              Trasnportation
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-sm px-3 py-2 text-sm text-Grey900 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
              Personal Care
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow className="text-Grey500">
              <TableHead className="w-80">Recipient/Sender</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Transaction Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="flex items-center gap-space50 font-medium">
                <span>
                  <Avatar>
                    <AvatarImage asChild>
                      <Image
                        src="/images/avatars/emma-richardson.jpg"
                        alt="avatar"
                        width={40}
                        height={40}
                      />
                    </AvatarImage>
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </span>
                Emma Richarlson
              </TableCell>
              <TableCell>General</TableCell>
              <TableCell>04 June 2004</TableCell>
              <TableCell className="text-right">$200</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
