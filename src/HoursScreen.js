import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const HoursScreen = ({ navigation, route }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [drinkingHours, setDrinkingHours] = useState(0);

  const calculateDrinkingHours = () => {
    const start = new Date(`01/01/2000 ${startTime}`);
    const end = new Date(`01/01/2000 ${endTime}`);

    const diff = end - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));

    setDrinkingHours(hours);
  };

  const handleSubmit = () => {
    // Perform validation and navigate to the next screen
    navigation.navigate('DrinkScreen', {
      weight: route.params.weight,
      drinkingHours: drinkingHours,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Drinking Start Time (24hr format):</Text>
        <TextInput
          placeholder="HH:MM"
          value={startTime}
          onChangeText={setStartTime}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Drinking End Time (24hr format):</Text>
        <TextInput
          placeholder="HH:MM"
          value={endTime}
          onChangeText={setEndTime}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <Button title="Calculate Drinking Hours" onPress={calculateDrinkingHours} />
      {drinkingHours > 0 && (
        <Text style={styles.resultText}>You have {drinkingHours} drinking hours available.</Text>
      )}
      <Button title="Next" onPress={handleSubmit} disabled={drinkingHours === 0} />
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  resultText: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default HoursScreen;
