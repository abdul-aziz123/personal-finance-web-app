import Link from "next/link";
import { IconCaretRight, IconPot } from "@/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCreateUsers } from "@/libs/db";

export default async function OverviewPage() {
  const session = await auth();

  const users = await getCreateUsers();
  console.log(users);
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-y-space250">
      <h1 className="text-3xl font-bold">Overview</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="bg-gray-900 text-white">
          <CardHeader>
            <CardTitle className="text-text4 text-White">
              Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$4,836.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$3,814.25</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$1,700.50</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-space300 lg:grid-cols-2">
        <div className="mb-4 w-full break-inside-avoid rounded-xl bg-white px-5 py-6 md:h-[218px] md:p-space400">
          <div className="flex flex-col gap-space250">
            <div className="flex items-center justify-between">
              <h3 className="text-text2 font-bold text-Grey900">Pots</h3>
              <Link
                href={"/pots"}
                className="inline-flex items-center gap-space150 text-Grey500"
              >
                See Details
                <IconCaretRight />
              </Link>
            </div>
            <div className="flex flex-col gap-space250 lg:flex-row">
              <div className="w-auto gap-space200 rounded-lg bg-Beige100 p-space200 lg:flex-1">
                <div className="flex items-center gap-space200">
                  <IconPot />
                  <div className="flex flex-col gap-[11px]">
                    <p className="text-text4 text-Grey900">Total Saved</p>
                    <p className="text-text1 text-Grey900">$850</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-0 gap-y-4 md:flex-1">
                {/* {slicedPots.map((pot) => (
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
                ))} */}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 min-h-96 w-full break-inside-avoid rounded-xl bg-white px-5 py-6 md:p-space400">
          <div className="flex flex-col gap-space250">
            <div className="flex items-center justify-between">
              <h3 className="text-text2 font-bold text-Grey900">Budgets</h3>
              <Link
                href={"/budgets"}
                className="inline-flex items-center gap-space150 text-Grey500"
              >
                See Details
                <IconCaretRight />
              </Link>
            </div>
            {/* <div className="flex flex-col gap-4 md:flex-row">
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
            </div> */}
          </div>
        </div>

        <div className="mb-4 w-full break-inside-avoid rounded-xl bg-white px-5 py-6 md:h-[218px] md:p-space400">
          <div className="flex flex-col gap-space400">
            <div className="flex items-center justify-between">
              <h3 className="text-text2 font-bold text-Grey900">
                Transactions
              </h3>
              <Link
                href={"/transactions"}
                className="inline-flex items-center gap-space150 text-Grey500"
              >
                See Details
                <IconCaretRight />
              </Link>
            </div>
            {/* {transactions.length > 0 ? (
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
          )} */}
          </div>
        </div>
        <div className="mb-20 break-inside-avoid rounded-xl bg-white px-5 py-6 md:p-space400">
          <div className="flex flex-col gap-space250">
            <div className="flex items-center justify-between">
              <h3 className="text-text2 text-Grey900">Recurring Bills</h3>
              <Link
                href={"/recurring-bills"}
                className="inline-flex items-center gap-space150 text-Grey500"
              >
                See Details
                <IconCaretRight />
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <div
                className="relative w-full rounded-lg bg-Beige100 px-4 py-5"
                style={{
                  borderLeftWidth: "4px",
                  borderColor: "#277C78",
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-preset-4 text-grey-500 font-normal">
                    Paid Bills
                  </p>
                  {/* <p className="text-preset-4 text-grey-900 font-bold">{`$${paidBillsTotal.toFixed(2)}`}</p> */}
                  <p className="text-text4_bold text-Grey500">$190.00</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div
                className="relative w-full rounded-lg bg-Beige100 px-4 py-5"
                style={{
                  borderLeftWidth: "4px",
                  borderColor: "#F2CDAC",
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-text4 text-Grey500">Total Upcoming</p>
                  {/* <p className="text-preset-4 text-grey-900 font-bold">
                  {`$${upcomingBillsTotal.toFixed(2)}`}
                </p> */}
                  <p className="text-text4_bold text-Grey500">$194.98</p>{" "}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div
                className="relative w-full rounded-lg bg-Beige100 px-4 py-5"
                style={{
                  borderLeftWidth: "4px",
                  borderColor: "#82C9D7",
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-text4 text-Grey500">Due Soon</p>
                  {/* <p className="text-preset-4 text-grey-900 font-bold">{`$${dueSoonTotal.toFixed(2)}`}</p> */}
                  <p className="text-text4_bold text-Grey500">$59.98</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// function Pots({ pots }: { pots: Pot[] }) {
//   let slicedPots = pots.slice(0, 4);
//   const totalSaved = pots.reduce((acc, curr) => {
//     return acc + curr.total;
//   }, 0);

//   return (
//     <div className="w-full break-inside-avoid rounded-lg bg-white px-5 py-6 md:p-8">
//       <div className="flex flex-col gap-5">
//         <div className="flex items-center justify-between">
//           <h3 className="text-preset-2 text-grey-900 font-bold">Pots</h3>
//           <Link
//             href={"/pots"}
//             className="text-grey-500 inline-flex items-center gap-3"
//           >
//             See Details
//             <IconCaretRight />
//           </Link>
//         </div>
//         <div className="flex flex-col gap-5 md:flex-row">
//           <div className="bg-beige-100 rounded-lg p-4 md:flex-1">
//             <div className="flex items-center gap-4">
//               <IconPot className="text-secondary-green fill-transparent" />
//               <div className="flex flex-col gap-[11px]">
//                 <p className="text-preset-4 text-grey-500 font-normal">Pots</p>
//                 <p className="text-preset-1 text-grey-900 font-bold">
//                   ${totalSaved}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-x-0 gap-y-4 md:flex-1">
//             {slicedPots.map((pot) => (
//               <div key={pot.id} className="relative w-[49%] pl-5">
//                 <span className="absolute bottom-0 left-0 top-0 h-full w-1 rounded-[8px] bg-red-800" />
//                 <div className="flex flex-col gap-1">
//                   <p className="text-preset-5 text-grey-500 line-clamp-1 font-normal">
//                     {pot.name}
//                   </p>
//                   <p className="text-preset-4 text-grey-900 font-bold">
//                     ${pot.total}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
//}
