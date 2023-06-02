import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const WeightScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('');

  const handleSubmit = () => {
    // Perform validation and navigate to the next screen
    navigation.navigate('HoursScreen', {
      weight: parseFloat(weight),
      totalLiters: parseFloat(weight) * 0.1,
    });
  };
  

  const calculateWeightLoss = () => {
    const minWeightLoss = (weight - weight * 0.02).toFixed(2);
    const maxWeightLoss = (weight - weight * 0.01).toFixed(2);
    return `Post waterload weight: ${minWeightLoss}kg and ${maxWeightLoss}kg.`;
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
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'HelveticaLT93BlackExtended', // Specify the custom font here
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 50,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: 'lightgreen',
  },
  message: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'HelveticaLT43LightExtended', // Specify the custom font here
  },
});

export default WeightScreen;
