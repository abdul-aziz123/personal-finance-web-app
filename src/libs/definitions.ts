export type UserTable = {
  id: number;
  name: string;
  email: string;
  emaiLVerified: string | null;
  image: string | null;
};

export type PasswordTable = {
  id: number;
  userId: number;
  passwordHash: string;
};

export type BalancesTable = {
  id: number;
  userId: number;
  current_balance: number;
  main_income: number;
  side_income: number;
  expenses: number;
};

export type PotsTable = {
  id: number;
  userId: number;
  pot_name: string;
  target_amount: number;
  current_amount: number;
  theme: string;
};
