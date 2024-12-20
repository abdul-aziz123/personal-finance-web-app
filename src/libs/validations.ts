import { z } from "zod";

export const addIncomeSchema = z.object({
  mainIncome: z.number().min(1, "Income must be at least 1"),
  sideIncome: z.number().min(0, "Income must be at least 0"),
  addToCurrent: z.boolean().default(false).optional(),
});

export const addNewPotsSchema = z.object({
  potName: z
    .string()
    .min(3, "Pot name must be at least 3 characters")
    .max(30, "Pot name must be at most 30 characters"),
  target: z.number().min(1, "Target must be at least 1"),
  theme: z.enum(
    [
      "GREEN",
      "YELLOW",
      "CYAN",
      "NAVY",
      "RED",
      "PURPLE",
      "TURQUOISE",
      "BROWN",
      "MAGENTA",
      "BLUE",
      "GREY",
      "ARMY",
      "PINK",
      "YELLOWGREEN",
      "ORANGE",
    ],
    {
      required_error: "You must select a theme",
    },
  ),
});
export const addMoneySchema = (maxAmount: number) =>
  z.object({
    amount: z
      .number()
      .min(1, "Amount must be at least 1")
      .max(maxAmount, `Amount cannot exceed ${maxAmount}`),
  });
export const withdrawSchema = (maxAmount: number) =>
  z.object({
    amount: z
      .number()
      .min(1, "Amount must be at least 1")
      .max(maxAmount, `Amount cannot exceed ${maxAmount}`),
  });

export const Categories = [
  "Entertainment",
  "Bills",
  "Groceries",
  "DiningOut",
  "Transportation",
  "PersonalCare",
  "Education",
  "Lifestyle",
  "Shopping",
  "General",
] as const;

export const addNewTransactionSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be at most 30 characters"),
  category: z.enum([...Categories]),
  amount: z.number().refine((value) => value !== 0, {
    message: "Amount must not be zero",
  }),
  recurring: z.boolean().optional(),
  avatar: z.string().optional(),
  date: z.string(),
});
export const addNewBudgetSchema = z.object({
  categories: z.enum([...Categories]),
  maximumSpend: z.number().min(1, "Amount must be at least 1"),
  theme: z.enum(
    [
      "GREEN",
      "YELLOW",
      "CYAN",
      "NAVY",
      "RED",
      "PURPLE",
      "TURQUOISE",
      "BROWN",
      "MAGENTA",
      "BLUE",
      "GREY",
      "ARMY",
      "PINK",
      "YELLOWGREEN",
      "ORANGE",
    ],
    {
      required_error: "You must select a theme",
    },
  ),
});

export type AddIncomeSchema = z.infer<typeof addIncomeSchema>;
export type AddNewBudgetSchema = z.infer<typeof addNewBudgetSchema>;
export type AddNewTransactionFormSchema = z.infer<
  typeof addNewTransactionSchema
>;
export type WithdrawFormSchema = { amount: number };
export type AddMoneyFormSchema = { amount: number };
export type AddNewPotsFormSchema = z.infer<typeof addNewPotsSchema>;
