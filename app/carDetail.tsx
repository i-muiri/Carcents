import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useCars } from '../src/context/carsContext';



export default function CarDetailsScreen() {
const route = useRoute();
const { carId } = route.params || {};
const { cars, addExpense, setSellingPrice } = useCars();


const car = useMemo(() => cars.find(c => c.id === carId), [cars, carId]);


const [type, setType] = useState('');
const [description, setDescription] = useState('');
const [amount, setAmount] = useState('');
const [sellPriceInput, setSellPriceInput] = useState(car?.sellingPrice ? String(car.sellingPrice) : '');


if (!car) {
return (
<View style={styles.container}><Text>Car not found.</Text></View>
);
}


const totalExpenses = (car.expenses || []).reduce((sum, e) => sum + Number(e.amount || 0), 0);
const profit = car.sellingPrice ? Number(car.sellingPrice) - Number(car.purchasePrice || 0) - totalExpenses : null;


const onAddExpense = () => {
if (!amount) return;
const expense = {
id: `exp-${Date.now()}`,
type: type.trim() || 'Expense',
description: description.trim(),
amount: Number(amount),
date: new Date().toISOString().slice(0,10),
};
addExpense(car.id, expense);
setType('');
setDescription('');
setAmount('');
};


const onSaveSellingPrice = () => {
const num = Number(sellPriceInput || 0);
setSellingPrice(car.id, num);
};


return (
<View style={styles.container}>
<View style={styles.card}></View></View>
)
}