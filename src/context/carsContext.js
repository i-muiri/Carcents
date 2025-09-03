import React, { createContext, useContext, useState } from "react";

// 1. Create context
const CarsContext = createContext();

// 2. Provider
export function CarsProvider({ children }) {
  const [cars, setCars] = useState([]);
  return (
    <CarsContext.Provider value={{ cars, setCars }}>
      {children}
    </CarsContext.Provider>
  );
}

// 3. Hook to use context
export function useCars() {
  return useContext(CarsContext);
}
