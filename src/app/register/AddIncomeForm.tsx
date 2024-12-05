"use client";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addIncomeSchema } from "@/libs/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addIncome } from "./actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AddIncomeForm() {
  const { push } = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof addIncomeSchema>>({
    resolver: zodResolver(addIncomeSchema),
    defaultValues: {
      mainIncome: 0,
      sideIncome: 0,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof addIncomeSchema>) {
    const res = await addIncome(values);
    if (res.success) {
      toast({
        title: "Success",
        description: res.message,
      });

      setTimeout(() => push("/"), 2000);
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
        className="flex w-full flex-col gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="mainIncome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Income</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. $2000"
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
                  placeholder="e.g. $2000"
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
        <Button type="submit" className="mt-2" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
