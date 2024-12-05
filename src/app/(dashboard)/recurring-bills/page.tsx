import { Transaction } from "@/libs/definitions";
import { ColumnDef } from "@tanstack/react-table";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import React from "react";

import { Receipt2 } from "@/components/ui/icons";

import { columns } from "./columns";
import { auth } from "@/auth";
import { sql } from "@vercel/postgres";

// extend Transaction type
export type RecurringBill = Transaction & {
  status: "due" | "paid" | "upcoming";
};

const DataTable = dynamic<{
  columns: ColumnDef<RecurringBill>[];
  data: RecurringBill[];
}>(() => import("./data-table").then((mod) => mod.DataTable), { ssr: false });

export const metadata: Metadata = {
  title: "Recurring Bills",
  description: "Manage your budgets and track your spending",
};

export default async function RecurringBills() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login");
  }

  const { rows: distinctRecurringBills } = await sql<{
    name: string;
  }>`SELECT DISTINCT name FROM transactions
    WHERE amount < 0 AND recurring = true AND "userId" = ${userId}`;

  const recurringBills: RecurringBill[] = await Promise.all(
    distinctRecurringBills.map(async (bill: { name: string }) => {
      const res =
        await sql<Transaction>`SELECT * FROM transactions WHERE name = ${bill.name} AND amount < 0 AND recurring = true AND "userId" = ${userId} ORDER BY date DESC LIMIT 1`;
      const latestTransaction = res.rows[0];
      const today = new Date();
      const transactionDate = new Date(latestTransaction.date);
      let status: "due" | "paid" | "upcoming" = "upcoming";
      if (
        transactionDate.getUTCMonth() < today.getUTCMonth() &&
        transactionDate.getDate() < today.getDate()
      ) {
        status = "due";
      } else if (
        transactionDate.getUTCMonth() == today.getUTCMonth() &&
        transactionDate.getDate() <= today.getDate()
      ) {
        status = "paid";
      }
      return {
        ...latestTransaction,
        status,
      };
    }),
  );
  // await db.transaction.findMany({
  //   where: {
  //     userId,
  //     recurring: true,
  //     amount: {
  //       lt: 0,
  //     },
  //   },
  // });

  // const recurringData = await db.transaction.findMany({
  //   where: {
  //     userId,
  //     recurring: true,
  //     amount: {
  //       lt: 0,
  //     },
  //   },
  // });

  const dueSoonBills = recurringBills.filter(
    (transaction) => transaction.status == "due",
  );

  const paidBills = recurringBills.filter(
    (transaction) => transaction.status == "paid",
  );

  const upcomingBills = recurringBills.filter(
    (transaction) => transaction.status == "upcoming",
  );

  const totalBillsAmount = recurringBills.reduce(
    (acc, transaction) => acc + Math.abs(transaction.amount),
    0,
  );

  const paidBillsTotal = paidBills.reduce(
    (acc, transaction) => acc + Math.abs(transaction.amount),
    0,
  );

  const upcomingBillsTotal = upcomingBills.reduce(
    (acc, transaction) => acc + Math.abs(transaction.amount),
    0,
  );

  const dueSoonTotal = dueSoonBills.reduce(
    (acc, transaction) => acc + Math.abs(transaction.amount),
    0,
  );

  return (
    <div className="container flex flex-col gap-8">
      <h1 className="text-preset-1 text-grey-900">Recurring Bills</h1>
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,337px)_1fr]">
        <div className="grid grid-cols-1 gap-3 self-start md:grid-cols-2 md:gap-6 lg:grid-cols-1">
          <TotalBills total={totalBillsAmount} />
          <Summary
            paidBillsTotal={paidBillsTotal}
            upcomingBillsTotal={upcomingBillsTotal}
            dueSoonTotal={dueSoonTotal}
          />
        </div>

        <DataTable columns={columns} data={recurringBills} />
      </div>
    </div>
  );
}

function TotalBills({ total }: { total: number }) {
  return (
    <div className="rounded-lg bg-grey-900 px-5 py-6">
      <div className="flex items-center gap-5 text-white md:flex-col md:items-start md:gap-8">
        <span>
          <Receipt2 />
        </span>
        <div className="flex flex-col gap-[11px]">
          <span className="text-preset-4">Total bills</span>
          <span className="text-preset-1">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

function Summary({
  paidBillsTotal,
  upcomingBillsTotal,
  dueSoonTotal,
}: {
  paidBillsTotal: number;
  upcomingBillsTotal: number;
  dueSoonTotal: number;
}) {
  return (
    <div className="w-full rounded-lg bg-white p-5">
      <div className="flex flex-col gap-5">
        <h3>Summary</h3>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between border-b border-[#69686826] pb-4">
            <span className="text-preset-5 text-grey-500">Paid bills</span>
            <span className="text-preset-5 text-grey-900">
              ${paidBillsTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#69686826] pb-4">
            <span className="text-preset-5 text-grey-500">Total Upcoming</span>
            <span className="text-preset-5 text-grey-900">
              ${upcomingBillsTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-preset-5 text-grey-500">Due Soon</span>
            <span className="text-preset-5 text-secondary-red">
              ${dueSoonTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
