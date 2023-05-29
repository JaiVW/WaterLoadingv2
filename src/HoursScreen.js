import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

const HoursScreen = ({ navigation, route }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [drinkingTime, setDrinkingTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const weight = route.params.weight;
  const totalLiters = weight * 0.1; // Calculate total liters based on weight

  useEffect(() => {
    if (startTime.length === 5 && endTime.length === 5) {
      calculateDrinkingTime();
    } else {
      setDrinkingTime(0);
      setErrorMessage('');
    }
  }, [startTime, endTime]);

  const calculateDrinkingTime = () => {
    const startMinutes = parseInt(startTime.substring(0, 2)) * 60 + parseInt(startTime.substring(3, 5));
    const endMinutes = parseInt(endTime.substring(0, 2)) * 60 + parseInt(endTime.substring(3, 5));
    const calculatedDrinkingTime = endMinutes - startMinutes;

    if (calculatedDrinkingTime <= 0) {
      setDrinkingTime(0);
      setErrorMessage('End time must be later than start time');
    } else {
      setDrinkingTime(calculatedDrinkingTime);
      if (calculatedDrinkingTime < totalLiters * 60) {
        setErrorMessage('You must add more time to your drinking schedule');
      } else {
        setErrorMessage('');
      }
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hour(s) and ${mins} minute(s)`;
  };

  const handleSubmit = () => {
    if (drinkingTime < totalLiters * 60) {
      setErrorMessage('You need more time to continue!');
    } else {
      navigation.navigate('DrinkScreen', {
        totalLiters: totalLiters,
        drinkingHoursInMinutes: drinkingTime,
        startTime: startTime,
        endTime: endTime,
      });
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Drinking Schedule</Text>
        <Text style={[styles.errorText, { color: 'red' }]}>It is unsafe to exceed 1 liter per hour!</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Drinking Start Time (24hr format):</Text>
          <View style={styles.inputBox}>
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
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Drinking End Time (24hr format):</Text>
          <View style={styles.inputBox}>
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
        </View>
        <View style={styles.nextButtonContainer}>
          <Text style={styles.chosenHoursText}>{formatTime(drinkingTime)}</Text>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <Text style={styles.totalLitersText}>To drink {totalLiters.toFixed(2)} litres.</Text>
          <Button
            title="Next"
            onPress={handleSubmit}
            disabled={drinkingTime < totalLiters * 60}
          />
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
    color: 'black',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: 'black',
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
  },
  input: {
    width: 200,
    height: 40,
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
