"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  AddNewTransactionFormSchema,
  Categories,
  addNewTransactionSchema,
} from "@/libs/validations";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { addTransaction } from "@/app/(dashboard)/transactions/actions";

import { toast } from "@/hooks/use-toast";

export default function AddnewTransaction() {
  const form = useForm<AddNewTransactionFormSchema>({
    resolver: zodResolver(addNewTransactionSchema),
    defaultValues: {
      recurring: false,
    },
  });

  const {
    reset,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: AddNewTransactionFormSchema) {
    const res = await addTransaction(values);
    if (res.success) {
      toast({
        title: "Success",
        description: res.message,
      });
      reset({
        name: "",
        amount: 0,
        recurring: false,
        category: "Bills",
        avatar: "",
        date: "",
      });

      setTimeout(() => window.location.reload(), 2000);
    }

    if (!res.success) {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    }
  }

  const getTodayDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  };

  return (
    <DialogContent className="w-full">
      <DialogHeader className="w-full">
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogDescription asChild>
          <div className="flex w-full flex-col">
            <div className="flex w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex w-full flex-col gap-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transaction Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g Urban Sevices Hub"
                            maxLength={30}
                            {...field}
                            onChange={(e) => {
                              if (e.target.value.length <= 30) {
                                field.onChange(e);
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          {30 - (field.value?.length || 0)} characters left
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Transaction Date</FormLabel>
                        <FormControl>
                          <Input type="date" max={getTodayDate()} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {Categories.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g $1000"
                            {...field}
                            type="number"
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "" || value === "-") {
                                field.onChange(value);
                              } else {
                                field.onChange(parseFloat(value));
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="recurring"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-4">
                        <FormLabel>Recurring</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                  >
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
