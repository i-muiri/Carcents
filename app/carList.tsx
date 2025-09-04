import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useCars } from "../src/context/carsContext";

// Currency formatter for Kenya Shilling
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(value);

export default function CarsScreen() {
  const { cars } = useCars();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/carDetail?id=${item.id}`)}

          >
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.model} - {item.year}</Text>
            <Text>Price: {formatCurrency(item.price)}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No cars added yet</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 16, marginBottom: 12, borderWidth: 1, borderRadius: 6, borderColor: "#ccc" },
  name: { fontSize: 18, fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: 20, fontSize: 16 },
});
