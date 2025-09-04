import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCars, Expense } from "../src/context/carsContext"; // use your context
import { formatCurrency } from "../src/utils/formatCurrency"; // if you have a formatter

export default function CarDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cars } = useCars();
  const router = useRouter();

  const car = cars.find(c => c.id === id);

  if (!car) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Car not found</Text>
      </View>
    );
  }

  const totalExpenses = car.expenses.reduce((sum, e: Expense) => sum + e.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{car.name}</Text>
      <Text>Model: {car.model}</Text>
      <Text>Year: {car.year}</Text>
      <Text>Price: {formatCurrency(car.price)}</Text>
      <Text>Total Expenses: {formatCurrency(totalExpenses)}</Text>

      <Button
        title="Add Expense"
        onPress={() => router.push(`/tabs/expenses?id=${car.id}` as any)}
      />

      <Text style={styles.subtitle}>Expenses:</Text>
      <FlatList
        data={car.expenses}
        keyExtractor={e => e.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text>{item.description}</Text>
            <Text>{formatCurrency(item.amount)}</Text>
            <Text>{item.date}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No expenses yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginTop: 16 },
  expenseItem: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 8, borderRadius: 6 },
  notFound: { fontSize: 18, color: "red" },
});
