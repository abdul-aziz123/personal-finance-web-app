export type Theme = 'GREEN' | 'YELLOW' | 'CYAN' | 'NAVY' | 'RED' | 'PURPLE' | 'TURQUOISE' | 'BROWN' | 'MAGENTA' | 'BLUE' | 'GREY' | 'ARMY' | 'PINK' | 'YELLOWGREEN' | 'ORANGE';

export type Category = 'Entertainment' | 'Bills' | 'Groceries' | 'DiningOut' | 'Transportation' | 'PersonalCare' | 'Education' | 'Lifestyle' | 'Shopping' | 'General';

export type User = {
  id: number;
  name: string;
  email: string;
  emailVerified: string | null | undefined;
  image: string | null | undefined;
}

export type Balance = {
  id: number;
  current: number;
  income: number;
  expenses: number;
  userId: number;
}

export type Pot = {
  id: number;
  name: string;
  target: number;
  total: number;
  theme: Theme;
  userId: number;
}

export type Transaction = {
  id: number;
  avatar: string;
  name: string;
  amount: number;
  Category: Category;
  date: string;
  recurring: boolean;
  userId: number;
}

export type Budget = {
  id: number;
  amount: number;
  category: string;
  theme: string;
  userId: number;
}
