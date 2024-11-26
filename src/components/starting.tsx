import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormField from "./form";

export function TabsDemo() {
  return (
    <Card className="bg-gray-100">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <FormField
            label="Current Balance"
            placeholder="1000"
            helperText=""
            className="bg-gray-300 text-gray-900 placeholder-gray-600 focus:border-gray-500 focus:ring-gray-500"
          />
        </div>
        <h3 className="text-lg text-gray-900">Income Statements</h3>
        <div className="space-y-2">
          <FormField
            label="Main Income/Job"
            placeholder="10000000"
            helperText=""
            className="bg-gray-300 text-gray-900 placeholder-gray-600 focus:border-gray-500 focus:ring-gray-500"
          />
          <FormField
            label="Side Income"
            placeholder="500000"
            helperText=""
            className="bg-gray-300 text-gray-900 placeholder-gray-600 focus:border-gray-500 focus:ring-gray-500"
          />
        </div>
      </CardContent>
      <Button className="h-10 w-[93%] bg-gray-900 text-lg text-gray-100 hover:bg-gray-700">
        Save changes
      </Button>
    </Card>
  );
}
