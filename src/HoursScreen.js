import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';

const HoursScreen = ({ navigation, route }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [drinkingHours, setDrinkingHours] = useState('');
  const [showNextButton, setShowNextButton] = useState(false);
  const [hasError, setHasError] = useState(false);
  const weight = route.params.weight;
  const totalLiters = weight * 0.1; // Calculate total liters based on weight

  useEffect(() => {
    calculateDrinkingHours();
  }, [startTime, endTime]);

  const calculateDrinkingHours = () => {
    if (startTime.length !== 5 || endTime.length !== 5) {
      // Exit early if the start or finish time is not complete
      setShowNextButton(false);
      return;
    }

    const start = convertTimeToMinutes(startTime);
    const end = convertTimeToMinutes(endTime);

    if (end >= start) {
      const diff = end - start;
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;
      setDrinkingHours(`${hours} hour(s) and ${minutes} minute(s)`);
      setShowNextButton(true);
    } else {
      setDrinkingHours('');
      setShowNextButton(false);
    }
  };

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
  };

  const handleSubmit = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
    // Handle data or perform additional processing as needed
    navigation.navigate('DrinkScreen', {
      weight: route.params.weight,
      totalLiters: totalLiters,
      drinkingHours: drinkingHours,
    });
  };

  const validateDrinkingHours = () => {
    const litersPerHour = totalLiters / parseFloat(drinkingHours);
    if (isNaN(litersPerHour) || litersPerHour > 1) {
      return "It is unsafe to drink more than 1 litre per hour. Please add more hours to your drinking schedule.";
    }
    return null;
  };

  useEffect(() => {
    const error = validateDrinkingHours();
    setHasError(!!error);
  }, [drinkingHours]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Drinking Schedule</Text>
        {hasError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>It is unsafe to drink more than 1 litre per hour.</Text>
            <Text style={styles.errorText}>Please add more hours to your schedule.</Text>
          </View>
        )}
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
        {drinkingHours.length > 0 && (
          <Text style={styles.hoursText}>You have {drinkingHours}</Text>
        )}
        <View style={styles.nextButtonContainer}>
          <Button title="Next" onPress={handleSubmit} disabled={!showNextButton || hasError} />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  hoursText: {
    fontSize: 18,
    marginBottom: 20,
  },
  errorContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  nextButtonContainer: {
    alignItems: 'center',
  },
});

export default HoursScreen;
