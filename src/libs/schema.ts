import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  currentBalance: z
    .number({ message: "Please Enter Number" })
    .positive({ message: "Please Enter Positive Number" }),
  mainIncome: z
    .number({ message: "Please Enter Number" })
    .positive({ message: "Please Enter Positive Number" }),
  sideIncome: z
    .number({ message: "Please Enter Number" })
    .positive({ message: "Please Enter Positive Number" }),
});

export const transactionSchema = z.object({
  transactor: z.string().min(1),
  category: z.enum([
    "Entertainment",
    "Bills",
    "Groceries",
    "Dining Out",
    "Transportation",
    "Personal Care",
    "Education",
    "Lifestyle",
    "Shopping",
    "General",
  ]),
  transaction_date: z.string().date(),
  amount: z
    .string({ message: "Please Enter a valid amount" })
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, { message: "Amount should be greater than 0" }),
  is_recurring: z.boolean(),
  is_withdrawal: z
    .enum(["recipient", "sender"])
    .transform((val) => val === "sender"),
});

export const potSchema = z.object({
  potName: z.string().min(1),
  targetAmount: z
    .string({ message: "Please Enter a valid amount" })
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, {
      message: "Target amount should be greater than 0",
    }),
  theme: z.enum([
    "Green",
    "Grey",
    "Cyan",
    "Orange",
    "Purple",
    "Red",
    "Yellow",
    "Navy",
    "Turquoise",
    "Brown",
    "Magenta",
  ]),
});

export const addWithdrawFromPotSchema = z
  .object({
    potName: z.string().min(1),
    amount: z
      .string({ message: "Please Enter a valid amount" })
      .transform((val) => parseFloat(val))
      .refine((val) => val > 0, { message: "Amount should be greater than 0" }),
    targetAmount: z.number(),
    currentAmount: z.number(),
    isAdd: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.isAdd) {
        return data.amount <= data.targetAmount;
      }
      return true;
    },
    {
      message: "Amount should be less than or equal to target amount",
      path: ["amount"],
    },
  )
  .refine(
    (data) => {
      if (!data.isAdd) {
        return data.amount <= data.currentAmount;
      }
      return true;
    },
    {
      message: "Amount should be less than or equal to current amount",
      path: ["amount"],
    },
  );

export const editPotSchema = z.object({
  potName: z.string().min(1),
  targetAmount: z
    .string({ message: "Please Enter a valid amount" })
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, {
      message: "Target amount should be greater than 0",
    }),
  theme: z.enum([
    "Green",
    "Grey",
    "Cyan",
    "Orange",
    "Purple",
    "Red",
    "Yellow",
    "Navy",
    "Turquoise",
    "Brown",
    "Magenta",
  ]),
});
