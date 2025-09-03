import React, { createContext, useContext, useState } from "react";

export type Car = {
  id: string;
  name: string;
  model: string;
  year: number;
  price: number;
  expenses: number[];
};

type CarsContextType = {
  cars: Car[];
  addCar: (car: Car) => void;
  updateCarExpenses: (carId: string, expense: number) => void;
};

const CarsContext = createContext<CarsContextType | undefined>(undefined);

export function CarsProvider({ children }: { children: React.ReactNode }) {
  const [cars, setCars] = useState<Car[]>([]);

  function addCar(car: Car) {
    setCars((prev) => [...prev, car]);
  }

  function updateCarExpenses(carId: string, expense: number) {
    setCars((prev) =>
      prev.map((c) =>
        c.id === carId ? { ...c, expenses: [...c.expenses, expense] } : c
      )
    );
  }

  return (
    <CarsContext.Provider value={{ cars, addCar, updateCarExpenses }}>
      {children}
    </CarsContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarsContext);
  if (!context) throw new Error("useCars must be used within CarsProvider");
  return context;
}
