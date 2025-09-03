import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCars } from '../src/context/carsContext';


function CarItem({ car, onPress }) {
const totalExpenses = (car.expenses || []).reduce((sum, e) => sum + Number(e.amount || 0), 0);
const profit = car.sellingPrice ? Number(car.sellingPrice) - Number(car.purchasePrice || 0) - totalExpenses : null;
return (
<TouchableOpacity style={styles.card} onPress={onPress}>
<Text style={styles.title}>{car.make} {car.model} {car.year ? `(${car.year})` : ''}</Text>
<Text>Purchase: KES {Number(car.purchasePrice || 0).toLocaleString()}</Text>
<Text>Expenses: KES {totalExpenses.toLocaleString()}</Text>
<Text>
{car.sellingPrice ? `Selling: KES ${Number(car.sellingPrice).toLocaleString()} • Profit: KES ${profit.toLocaleString()}` : 'Selling: —'}
</Text>
</TouchableOpacity>
);
}


export default function CarListScreen() {
const navigation = useNavigation();
const { cars } = useCars();


useLayoutEffect(() => {
navigation.setOptions({
headerRight: () => (
<TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddCar')}>
<Text style={styles.addBtnText}>+ Add</Text>
</TouchableOpacity>
),
});
}, [navigation]);


return (
<View style={styles.container}>
{cars.length === 0 ? (
<View style={styles.empty}>
<Text style={styles.emptyText}>No cars yet. Tap “+ Add” to create your first car.</Text>
</View>
) : (
<FlatList
data={cars}
keyExtractor={(item) => item.id}
renderItem={({ item }) => (
<CarItem car={item} onPress={() => navigation.navigate('CarDetails', { carId: item.id })} />
)}
contentContainerStyle={{ padding: 12 }}
/>
)}
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: '#fff' },
card: { padding: 12, backgroundColor: '#f6f6f6', borderRadius: 12, marginBottom: 10 },
title: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
addBtn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#111827', borderRadius: 8 },
addBtnText: { color: 'white', fontWeight: '700' },
empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
emptyText: { color: '#6b7280', textAlign: 'center' },
});