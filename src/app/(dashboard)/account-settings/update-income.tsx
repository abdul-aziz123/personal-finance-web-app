"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { addIncomeSchema, AddIncomeSchema } from "@/libs/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addIncome } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

export default function UpdateIncome() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<AddIncomeSchema>({
    defaultValues: {
      mainIncome: 0,
      sideIncome: 0,
    },
    resolver: zodResolver(addIncomeSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: AddIncomeSchema) {
    const res = await addIncome(values);
    if (res.success) {
      toast({
        title: "Success",
        description: res.message,
      });

      setTimeout(() => router.push("/"), 2000);
    }

    if (!res.success) {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    }
  }
  return (
    <Form {...form}>
      <form
        className="flex w-full justify-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="gap-4 p-6 sm:w-1/2">
          <p className="text-2xl font-semibold">Update Income</p>

          <FormField
            control={form.control}
            name="mainIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Income</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 1)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sideIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Side Income</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 1)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addToCurrent"
            render={({ field }) => (
              <FormItem className="my-4 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Update Current balance</FormLabel>
                  <FormDescription>
                    This will add the income to your current balance
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="max-w-32"
            size={"lg"}
            disabled={isSubmitting}
          >
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
