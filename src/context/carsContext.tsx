import React, { createContext, useContext, useState } from "react";
import { Car, } from "../types/car";

export type Expense = { id: string; description: string; amount: number; date: string };


type CarsContextType = {
  cars: Car[];
  addCar: (car: Car) => void;
  addExpense: (carId: string, expense: Expense) => void;
};

const CarsContext = createContext<CarsContextType | undefined>(undefined);

export function CarsProvider({ children }: { children: React.ReactNode }) {
  const [cars, setCars] = useState<Car[]>([]);

  const addCar = (car: Car) => {
    setCars(prev => [...prev, car]);
  };

  const addExpense = (carId: string, expense: Expense) => {
    setCars(prev =>
      prev.map(c =>
        c.id === carId ? { ...c, expenses: [...c.expenses, expense] } : c
      )
    );
  };

  return (
    <CarsContext.Provider value={{ cars, addCar, addExpense }}>
      {children}
    </CarsContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarsContext);
  if (!context) throw new Error("useCars must be used within CarsProvider");
  return context;
}
