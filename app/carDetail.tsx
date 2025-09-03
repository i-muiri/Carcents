import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Car, useCars } from "../src/context/carsContext";

export default function CarDetail() {
  const params = useLocalSearchParams();
  const carId = params.carId as string;
  const { cars, updateCarExpenses } = useCars();

  const car = cars.find((c: Car) => c.id === carId);
  const [expense, setExpense] = useState("");

  if (!car) return <Text>Car not found</Text>;

  const handleAddExpense = () => {
    const value = Number(expense);
    if (value > 0) {
      updateCarExpenses(car.id, value);
      setExpense("");
    }
  };

  const totalExpenses = car.expenses.reduce((sum, e) => sum + e, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{car.name}</Text>
      <Text>Model: {car.model}</Text>
      <Text>Year: {car.year}</Text>
      <Text>Price: ${car.price}</Text>
      <Text>Total Expenses: ${totalExpenses}</Text>

      <Text style={styles.subtitle}>Add Expense</Text>
      <TextInput
        placeholder="Enter expense"
        value={expense}
        onChangeText={setExpense}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add Expense" onPress={handleAddExpense} />

      <Text style={styles.subtitle}>Expenses List</Text>
      <FlatList
        data={car.expenses}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text>{index + 1}. ${item}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  subtitle: { marginTop: 16, fontSize: 18, fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 6, marginTop: 8, marginBottom: 12 },
});
