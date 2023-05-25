import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const WeightScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('');

  const handleSubmit = () => {
    // Perform validation and navigate to the next screen
    navigation.navigate('HoursScreen', { weight: parseFloat(weight) });
  };

  const calculateWeightLoss = () => {
    const minWeightLoss = (weight - weight * 0.02).toFixed(2);
    const maxWeightLoss = (weight - weight * 0.01).toFixed(2);
    return `Your estimated weight will be ${minWeightLoss}kg and ${maxWeightLoss}kg.`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Weight</Text>
      <TextInput
        placeholder="Enter weight in kilograms"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.message}>{calculateWeightLoss()}</Text>
      <Button title="Next" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default WeightScreen;
