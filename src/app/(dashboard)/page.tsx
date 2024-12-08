import {
  Balance as BalanceDB,
  Budget,
  Pot,
  Transaction,
} from "@/libs/definitions";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { getColorHexCode } from "@/libs/utils";

import LogoutButton from "@/components/logout-button";
import { CaretRight, JarLight } from "@/components/ui/icons";

import Chart from "./chart";
import { auth } from "@/auth";
import { sql } from "@vercel/postgres";
import { RecurringBill } from "./recurring-bills/page";

interface ChartData {
  id: number;
  category: string;
  amount: number;
  fill: string;
  totalSpent: number;
  remaining: number;
  latestTransaction: Transaction[];
}

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const userId = session?.user?.id;

  if (!userId) redirect("/login");

  let currentBalance: BalanceDB;
  const { rows } =
    await sql<BalanceDB>`SELECT * FROM balances WHERE "userId" = ${userId} LIMIT 1`;
  if (rows.length == 0) {
    const { rows } = await sql<BalanceDB>`
      INSERT INTO balances 
      ("userId", current, income, expenses)
      VALUES (${userId}, 0, 0, 0) RETURNING *
    `;
    currentBalance = rows[0];
  }
  currentBalance = rows[0];

  const { rows: budgets } =
    await sql<Budget>`SELECT * FROM budgets WHERE "userId" = ${userId}`;
  const { rows: transactions } =
    await sql<Transaction>`SELECT * FROM transactions WHERE "userId" = ${userId}`;
  const { rows: pots } =
    await sql<Pot>`SELECT * FROM pots WHERE "userId" = ${userId}`;

  const chartData = budgets.map((budget) => {
    const categoryTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const currentDate = new Date();
      return (
        transaction.Category === budget.category &&
        transactionDate.getMonth() === currentDate.getMonth() &&
        transactionDate.getFullYear() === currentDate.getFullYear() &&
        transaction.amount < 0
      );
    });

    const totalSpent = categoryTransactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

    const latestTransactions = categoryTransactions.slice(0, 3);

    return {
      id: budget.id,
      category: budget.category,
      amount: budget.amount,
      fill: getColorHexCode(budget.theme),
      totalSpent: totalSpent,
      remaining: budget.amount - Math.abs(totalSpent),
      latestTransaction: latestTransactions,
    };
  });
  return (
    <div className="container mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-preset-1 text-grey-900">Overview</h1>
        <LogoutButton />
      </div>
      <Balance
        transactions={transactions}
        balance={currentBalance}
        userId={Number(userId)}
      />

      <div className="columns-1 gap-4 lg:columns-2">
        <div className="mb-4 break-inside-avoid">
          <Pots pots={pots} />
        </div>

        <div className="mb-4 break-inside-avoid">
          <Transactions transactions={transactions} />
        </div>
        <div className="mb-4 break-inside-avoid">
          <Budgets chartData={chartData} />
        </div>

        <div className="mb-4 break-inside-avoid">
          <RecurringBills userId={userId} />
        </div>
      </div>
    </div>
  );
}

async function Balance({
  transactions,
  balance,
  userId,
}: {
  transactions: Transaction[];
  balance: BalanceDB;
  userId: number;
}) {
  // filter transactions of this current month
  const currentMonthExpenses = transactions
    .filter((transaction) => {
      const today = new Date();
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === today.getMonth() &&
        transactionDate.getFullYear() === today.getFullYear() &&
        transaction.amount < 0
      );
    })
    .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);
  await sql`UPDATE balances SET expenses = ${currentMonthExpenses} WHERE "userId" = ${userId}`;
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6">
      <div className="w-full rounded-lg bg-grey-900 p-5 md:p-6">
        <div className="flex flex-col gap-3">
          <p className="text-preset-4 font-normal text-white">
            Current Balance
          </p>
          <h4 className="text-preset-1 font-bold text-white">
            ${balance.current.toFixed(2)}
          </h4>
        </div>
      </div>
      <div className="w-full rounded-lg bg-white p-5 md:p-6">
        <div className="flex flex-col gap-3">
          <p className="text-preset-4 font-normal text-grey-500">Income</p>
          <h4 className="text-preset-1 font-bold text-grey-900">
            ${balance.income.toFixed(2)}
          </h4>
        </div>
      </div>
      <div className="w-full rounded-lg bg-white p-5 md:p-6">
        <div className="flex flex-col gap-3">
          <p className="text-preset-4 font-normal text-grey-500">Expenses</p>
          <h4 className="text-preset-1 font-bold text-grey-900">
            ${currentMonthExpenses.toFixed(2)}
          </h4>
        </div>
      </div>
    </div>
  );
}

function Pots({ pots }: { pots: Pot[] }) {
  const slicedPots = pots.slice(0, 4);
  const totalSaved = pots.reduce((acc, curr) => {
    return acc + curr.total;
  }, 0);

  return (
    <div className="w-full break-inside-avoid rounded-lg bg-white px-5 py-6 md:p-8">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-preset-2 font-bold text-grey-900">Pots</h3>
          <Link
            href={"/pots"}
            className="inline-flex items-center gap-3 text-grey-500"
          >
            See Details
            <CaretRight />
          </Link>
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="rounded-lg bg-beige-100 p-4 md:flex-1">
            <div className="flex items-center gap-4">
              <JarLight className="fill-transparent text-secondary-green" />
              <div className="flex flex-col gap-[11px]">
                <p className="text-preset-4 font-normal text-grey-500">Pots</p>
                <p className="text-preset-1 font-bold text-grey-900">
                  ${totalSaved}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-0 gap-y-4 md:flex-1">
            {slicedPots.map((pot) => (
              <div key={pot.id} className="relative w-[49%] pl-5">
                <span className="absolute bottom-0 left-0 top-0 h-full w-1 rounded-[8px] bg-red-800" />
                <div className="flex flex-col gap-1">
                  <p className="text-preset-5 line-clamp-1 font-normal text-grey-500">
                    {pot.name}
                  </p>
                  <p className="text-preset-4 font-bold text-grey-900">
                    ${pot.total}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function Budgets({ chartData }: { chartData: ChartData[] }) {
  const slicedChartData = chartData.slice(0, 4);

  return (
    <div className="min-h-[358px] w-full break-inside-avoid rounded-lg bg-white px-5 py-6 md:p-8">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-preset-2 font-bold text-grey-900">Budgets</h3>
          <Link
            href={"/budgets"}
            className="inline-flex items-center gap-3 text-grey-500"
          >
            See Details
            <CaretRight />
          </Link>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          {chartData.length > 0 ? (
            <Chart chartData={chartData} />
          ) : (
            <p className="text-preset-4 text-grey-300">No Data Provided.</p>
          )}
          <div className="flex flex-col gap-4 lg:w-[98px]">
            {slicedChartData.map((item: ChartData, index: number) => (
              <div
                key={index}
                className={`relative flex flex-col items-start pl-4`}
              >
                <span
                  className="absolute bottom-0 left-0 top-0 h-full w-1 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />

                <h4 className="text-preset-4 truncate font-normal text-grey-500">
                  {item.category}
                </h4>
                <p className="text-preset-5 font-bold text-grey-900">
                  ${Math.abs(item.totalSpent)?.toFixed(2) ?? "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function Transactions({ transactions }: { transactions: Transaction[] }) {
  const slicedTransactions = transactions.slice(0, 4);
  return (
    <div className="min-h-[200px] break-inside-avoid rounded-lg bg-white px-5 py-6 md:p-8">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-preset-2 font-bold text-grey-900">
            Transactions
          </h3>
          <Link
            href={"/transactions"}
            className="inline-flex items-center gap-3 text-grey-500"
          >
            See Details
            <CaretRight />
          </Link>
        </div>
        {transactions.length > 0 ? (
          slicedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between border-b border-grey-100 pb-5"
            >
              <div className="flex items-center gap-4">
                <span className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={transaction.avatar}
                    alt="transaction image"
                    fill
                    unoptimized
                  />
                </span>
                <h4 className="text-preset-4 font-bold capitalize text-grey-900">
                  {transaction.name}
                </h4>
              </div>
              <div className="flex flex-col gap-2 text-right">
                <p
                  className="text-preset-4 font-bold"
                  style={{
                    color: transaction.amount < 0 ? "#201F24" : "#277C78",
                  }}
                >
                  {transaction.amount < 0 ? "-" : "+"}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </p>
                <p className="text-preset-5 font-normal text-grey-500">
                  {format(new Date(transaction.date), "dd MMM yyyy")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-preset-4 text-grey-300">No Data Provided</p>
        )}
      </div>
    </div>
  );
}
async function RecurringBills({ userId }: { userId: string }) {
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

  const dueSoonBills = recurringBills.filter(
    (transaction) => transaction.status == "due",
  );

  const paidBills = recurringBills.filter(
    (transaction) => transaction.status == "paid",
  );

  const upcomingBills = recurringBills.filter(
    (transaction) => transaction.status == "upcoming",
  );

  // const totalBillsAmount = recurringBills.reduce(
  //   (acc, transaction) => acc + Math.abs(transaction.amount),
  //   0,
  // );

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
    <div className="break-inside-avoid rounded-lg bg-white px-5 py-6 md:p-8">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-preset-2 font-bold text-grey-900">
            Recurring Bills
          </h3>
          <Link
            href={"/recurring-bills"}
            className="inline-flex items-center gap-3 text-grey-500"
          >
            See Details
            <CaretRight />
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className="relative w-full rounded-[8px] bg-beige-100 px-4 py-5"
            style={{
              borderLeftWidth: "4px",
              borderColor: "#277C78",
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-preset-4 font-normal text-grey-500">
                Paid Bills
              </p>
              <p className="text-preset-4 font-bold text-grey-900">{`$${paidBillsTotal.toFixed(2)}`}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className="relative w-full rounded-[8px] bg-beige-100 px-4 py-5"
            style={{
              borderLeftWidth: "4px",
              borderColor: "#F2CDAC",
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-preset-4 font-normal text-grey-500">
                Total Upcoming
              </p>
              <p className="text-preset-4 font-bold text-grey-900">
                {`$${upcomingBillsTotal.toFixed(2)}`}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className="relative w-full rounded-[8px] bg-beige-100 px-4 py-5"
            style={{
              borderLeftWidth: "4px",
              borderColor: "#82C9D7",
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-preset-4 font-normal text-grey-500">
                Due Soon
              </p>
              <p className="text-preset-4 font-bold text-grey-900">{`$${dueSoonTotal.toFixed(2)}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
