export type Expense = {
    id: string;
    description: string;
    amount: number;
    date: string;
  };
  
  export type Car = {
    id: string;
    name: string;
    model: string;
    year: number;
    price: number;
    expenses: Expense[]; // holds objects, not numbers
  };
  