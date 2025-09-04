import { useRouter } from "expo-router";
import React from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCars } from "../../src/context/carsContext";
import { Car } from "../../src/types/car";

export default function CarsTab() {
  const { cars } = useCars();
  const router = useRouter();

  const renderCar = ({ item }: { item: Car }) => (
    <TouchableOpacity style={styles.carItem} onPress={() => router.push(`/carDetail?carId=${item.id}`)}>
      <Text style={styles.carName}>{item.name}</Text>
      <Text>Model: {item.model}</Text>
      <Text>Year: {item.year}</Text>
      <Text>Price: ${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Add New Car" onPress={() => router.push("/addCar")} />
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={renderCar}
        ListEmptyComponent={<Text>No cars yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  carItem: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 6, marginBottom: 8 },
  carName: { fontSize: 18, fontWeight: "bold" },
});
