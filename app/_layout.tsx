import { CarsProvider } from "../src/context/carsContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <CarsProvider>
      <Slot />
    </CarsProvider>
  );
}
