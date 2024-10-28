import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OverviewPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Overview</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="bg-gray-900 text-white">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              <Link href="/pots">
                <Button variant="link" className="h-auto p-0 text-lg font-bold">
                  Pots
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Pots content placeholder */}
            <div className="h-40 rounded-md bg-gray-100"></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Link href="/budgets">
                <Button variant="link" className="h-auto p-0 text-lg font-bold">
                  Budgets
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Budgets content placeholder */}
            <div className="h-40 rounded-md bg-gray-100"></div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <Link href="/transactions">
              <Button variant="link" className="h-auto p-0 text-lg font-bold">
                Transactions
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Transactions content placeholder */}
          <div className="h-60 rounded-md bg-gray-100"></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Link href="/recurring-bills">
              <Button variant="link" className="h-auto p-0 text-lg font-bold">
                Recurring Bills
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Recurring Bills content placeholder */}
          <div className="h-40 rounded-md bg-gray-100"></div>
        </CardContent>
      </Card>
    </div>
  );
}
