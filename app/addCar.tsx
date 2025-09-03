import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCars } from '../src/context/carsContext';


export default function AddCarScreen() {
const navigation = useNavigation();
const { addCar } = useCars();


const [make, setMake] = useState('');
const [model, setModel] = useState('');
const [year, setYear] = useState('');
const [purchasePrice, setPurchasePrice] = useState('');
const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().slice(0, 10));


const onSave = () => {
if (!make || !model) {
Alert.alert('Missing info', 'Please enter make and model.');
return;
}
const car = {
id: `car-${Date.now()}`,
make: make.trim(),
model: model.trim(),
year: year.trim(),
purchasePrice: Number(purchasePrice || 0),
purchaseDate,
sellingPrice: '',
expenses: [],
};
addCar(car);
navigation.goBack();
};


return (
<View style={styles.container}>
<Text style={styles.label}>Make</Text>
<TextInput style={styles.input} value={make} onChangeText={setMake} placeholder="e.g. Toyota" />


<Text style={styles.label}>Model</Text>
<TextInput style={styles.input} value={model} onChangeText={setModel} placeholder="e.g. Axio" />


<Text style={styles.label}>Year</Text>
<TextInput style={styles.input} value={year} onChangeText={setYear} placeholder="e.g. 2012" keyboardType="numeric" />


<Text style={styles.label}>Purchase Price (KES)</Text>
<TextInput style={styles.input} value={purchasePrice} onChangeText={setPurchasePrice} placeholder="e.g. 600000" keyboardType="numeric" />


<Text style={styles.label}>Purchase Date</Text>
<TextInput style={styles.input} value={purchaseDate} onChangeText={setPurchaseDate} placeholder="YYYY-MM-DD" />


<TouchableOpacity style={styles.saveBtn} onPress={onSave}>
<Text style={styles.saveBtnText}>Save Car</Text>
</TouchableOpacity>
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, padding: 16, backgroundColor: '#fff' },
label: { marginTop: 10, marginBottom: 6, fontWeight: '600' },
input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 10, padding: 10 },
saveBtn: { marginTop: 18, backgroundColor: '#2563eb', padding: 12, borderRadius: 10, alignItems: 'center' },
saveBtnText: { color: 'white', fontWeight: '700' },
});