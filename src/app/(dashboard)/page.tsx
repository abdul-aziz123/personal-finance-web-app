import { Balance as BalancePrisma, Pot, Transaction } from "@prisma/client";
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

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const userId = session?.user?.id;

  if (!userId) redirect("/login");

  let currentBalance: BalancePrisma | null;
  currentBalance = await db.balance.findFirst({
    where: {
      userId: userId,
    },
  });
  if (!currentBalance) {
    currentBalance = await db.balance.create({
      data: {
        userId: userId,
        current: 0,
        income: 0,
        expenses: 0,
      },
    });
  }

  const budgets = await db.budget.findMany({
    where: {
      userId: userId,
    },
  });
  const transactions = await db.transaction.findMany({
    where: {
      userId: userId,
    },
  });

  const pots = await db.pot.findMany({
    where: {
      userId: userId,
    },
  });

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
      <Balance transactions={transactions} balance={currentBalance} />

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
          <RecurringBills transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

function Balance({
  transactions,
  balance,
}: {
  transactions: Transaction[];
  balance: BalancePrisma;
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
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6">
      <div className="bg-grey-900 w-full rounded-lg p-5 md:p-6">
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
          <p className="text-preset-4 text-grey-500 font-normal">Income</p>
          <h4 className="text-preset-1 text-grey-900 font-bold">
            ${balance.income.toFixed(2)}
          </h4>
        </div>
      </div>
      <div className="w-full rounded-lg bg-white p-5 md:p-6">
        <div className="flex flex-col gap-3">
          <p className="text-preset-4 text-grey-500 font-normal">Expenses</p>
          <h4 className="text-preset-1 text-grey-900 font-bold">
            ${currentMonthExpenses.toFixed(2)}
          </h4>
        </div>
      </div>
    </div>
  );
}

function Pots({ pots }: { pots: Pot[] }) {
  let slicedPots = pots.slice(0, 4);
  const totalSaved = pots.reduce((acc, curr) => {
    return acc + curr.total;
  }, 0);

  return (
    <div className="w-full break-inside-avoid rounded-lg bg-white px-5 py-6 md:p-8">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-preset-2 text-grey-900 font-bold">Pots</h3>
          <Link
            href={"/pots"}
            className="text-grey-500 inline-flex items-center gap-3"
          >
            See Details
            <CaretRight />
          </Link>
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="bg-beige-100 rounded-lg p-4 md:flex-1">
            <div className="flex items-center gap-4">
              <JarLight className="text-secondary-green fill-transparent" />
              <div className="flex flex-col gap-[11px]">
                <p className="text-preset-4 text-grey-500 font-normal">Pots</p>
                <p className="text-preset-1 text-grey-900 font-bold">
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
                  <p className="text-preset-5 text-grey-500 line-clamp-1 font-normal">
                    {pot.name}
                  </p>
                  <p className="text-preset-4 text-grey-900 font-bold">
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
function Budgets({ chartData }: { chartData: any }) {
  const slicedChartData = chartData.slice(0, 4);

  return (
    <div className="min-h-[358px] w-full break-inside-avoid rounded-lg bg-white px-5 py-6 md:p-8">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-preset-2 text-grey-900 font-bold">Budgets</h3>
          <Link
            href={"/budgets"}
            className="text-grey-500 inline-flex items-center gap-3"
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
            {slicedChartData.map((item: any, index: any) => (
              <div
                key={index}
                className={`relative flex flex-col items-start pl-4`}
              >
                <span
                  className="absolute bottom-0 left-0 top-0 h-full w-1 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />

                <h4 className="text-preset-4 text-grey-500 truncate font-normal">
                  {item.category}
                </h4>
                <p className="text-preset-5 text-grey-900 font-bold">
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
  let slicedTransactions = transactions.slice(0, 4);
  return (
    <div className="min-h-[200px] break-inside-avoid rounded-lg bg-white px-5 py-6 md:p-8">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-preset-2 text-grey-900 font-bold">
            Transactions
          </h3>
          <Link
            href={"/transactions"}
            className="text-grey-500 inline-flex items-center gap-3"
          >
            See Details
            <CaretRight />
          </Link>
        </div>
        {transactions.length > 0 ? (
          slicedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="border-grey-100 flex justify-between border-b pb-5"
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
                <h4 className="text-preset-4 text-grey-900 font-bold capitalize">
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
                <p className="text-preset-5 text-grey-500 font-normal">
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
function RecurringBills({ transactions }: { transactions: Transaction[] }) {
  const recurringData = transactions.filter(
    (transaction) => transaction.recurring && transaction.amount < 0,
  );

  const paidBills = recurringData.filter(
    (transaction) => new Date(transaction.date) < new Date(),
  );

  const upcomingBills = recurringData.filter(
    (transaction) => new Date(transaction.date) >= new Date(),
  );

  const dueSoonBills = recurringData.filter((transaction) => {
    const today = new Date();
    const dueDate = new Date(transaction.date);
    const diffInDays =
      (dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return diffInDays <= 3 && diffInDays >= 0;
  });

  const totalBillsAmount = recurringData.reduce(
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
    <div className="break-inside-avoid rounded-lg bg-white px-5 py-6 md:p-8">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-preset-2 text-grey-900 font-bold">
            Recurring Bills
          </h3>
          <Link
            href={"/recurring-bills"}
            className="text-grey-500 inline-flex items-center gap-3"
          >
            See Details
            <CaretRight />
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className="bg-beige-100 relative w-full rounded-[8px] px-4 py-5"
            style={{
              borderLeftWidth: "4px",
              borderColor: "#277C78",
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-preset-4 text-grey-500 font-normal">
                Paid Bills
              </p>
              <p className="text-preset-4 text-grey-900 font-bold">{`$${paidBillsTotal.toFixed(2)}`}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className="bg-beige-100 relative w-full rounded-[8px] px-4 py-5"
            style={{
              borderLeftWidth: "4px",
              borderColor: "#F2CDAC",
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-preset-4 text-grey-500 font-normal">
                Total Upcoming
              </p>
              <p className="text-preset-4 text-grey-900 font-bold">
                {`$${upcomingBillsTotal.toFixed(2)}`}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className="bg-beige-100 relative w-full rounded-[8px] px-4 py-5"
            style={{
              borderLeftWidth: "4px",
              borderColor: "#82C9D7",
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-preset-4 text-grey-500 font-normal">
                Due Soon
              </p>
              <p className="text-preset-4 text-grey-900 font-bold">{`$${dueSoonTotal.toFixed(2)}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
