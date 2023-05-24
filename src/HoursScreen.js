import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const HoursScreen = ({ navigation, route }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [drinkingHours, setDrinkingHours] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const weight = route.params.weight;
  const totalLiters = weight * 0.1; // Calculate total liters based on weight

  const calculateDrinkingHours = () => {
    const start = parseInt(startTime.replace(':', ''));
    const end = parseInt(endTime.replace(':', ''));

    let hours = 0;
    if (end > start) {
      hours = Math.floor((end - start) / 100);
    } else if (end < start) {
      hours = Math.floor(((2400 - start) + end) / 100);
    }

    setDrinkingHours(hours);
    setShowNextButton(true);
  };

  const handleSubmit = () => {
    // Handle data or perform additional processing as needed
    navigation.navigate('DrinkScreen', {
      weight: route.params.weight,
      totalLiters: totalLiters,
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
          onChangeText={(text) => {
            if (text.length <= 5) {
              if (text.length === 2 && startTime.length === 1) {
                text += ':';
              }
              setStartTime(text);
            }
          }}
          keyboardType="numeric"
          style={styles.input}
          maxLength={5}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Drinking End Time (24hr format):</Text>
        <TextInput
          placeholder="HH:MM"
          value={endTime}
          onChangeText={(text) => {
            if (text.length <= 5) {
              if (text.length === 2 && endTime.length === 1) {
                text += ':';
              }
              setEndTime(text);
            }
          }}
          keyboardType="numeric"
          style={styles.input}
          maxLength={5}
        />
      </View>
      <Button title="Calculate Drinking Hours" onPress={calculateDrinkingHours} />
      {showNextButton && (
        <View style={styles.nextButtonContainer}>
          <Text style={styles.chosenHoursText}>Chosen Drinking Hours: {drinkingHours}</Text>
          <Text style={styles.totalLitersText}>Total Liters: {totalLiters.toFixed(2)}</Text>
          <Button title="Next" onPress={handleSubmit} />
        </View>
      )}
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
  nextButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  chosenHoursText: {
    fontSize: 18,
    marginBottom: 8,
  },
  totalLitersText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default HoursScreen;
