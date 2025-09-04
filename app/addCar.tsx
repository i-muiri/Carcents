import "react-native-get-random-values";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { v4 as uuidv4 } from "uuid";
import { useCars } from "../src/context/carsContext";
import { Car } from "../src/types/car";

export default function AddCarScreen() {
  const { addCar } = useCars();
  const router = useRouter();

  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");

  const handleAddCar = () => {
    if (!name || !model || !year || !price) return;

    const newCar: Car = {
      id: uuidv4(),
      name,
      model,
      year: Number(year),
      price: Number(price),
      expenses: [], // ✅ starts empty, will hold Expense[]
    };

    addCar(newCar);
    router.push("/cars"); // go back to Cars list
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Car</Text>
      <TextInput
        placeholder="Car Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Car Model"
        value={model}
        onChangeText={setModel}
        style={styles.input}
      />
      <TextInput
        placeholder="Year of Manufacture"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Car Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add Car" onPress={handleAddCar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 12,
    borderRadius: 6,
  },
});
