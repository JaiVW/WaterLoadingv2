import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Font from 'expo-font';

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
        setErrorMessage('Increase your drinking hours');
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
      console.log('Hours Screen - totalLiters:', totalLiters);
      console.log('Hours Screen - DrinkingHoursInMinutes:', drinkingTime);
      console.log('Hours Screen - startTime:', startTime);
      console.log('Hours Screen - endTime:', endTime);

      navigation.navigate('DayScreen', {
        day: 1,
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
        <Text style={[styles.errorText, { color: '#d60036' }]}>It is unsafe to exceed 1 liter per hour!</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Start Time (24hr format):</Text>
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
          <Text style={styles.label}>End Time (24hr format):</Text>
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
          <Text style={styles.totalLitersText}>{totalLiters.toFixed(2)} litres to drink each day.</Text>
          <Text style={styles.chosenHoursText}>{formatTime(drinkingTime)}</Text>
          <Text style={[styles.errorText, { color: 'red' }]}>{errorMessage}</Text>
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
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'HelveticaLT93BlackExtended', // Specify the custom font here
  },
  errorText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'HelveticaLT43LightExtended', // Specify the custom font here,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'HelveticaLT43LightExtended', // Specify the custom font here
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'HelveticaLT43LightExtended', // Specify the custom font here
  },
  inputBox: {
    borderWidth: 0.5,
    borderRadius: 50,
    borderColor: 'gray',
    backgroundColor: 'lightgreen',
  },
  input: {
    width: 275,
    height: 40,
    paddingHorizontal: 15,
  },
  nextButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  chosenHoursText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'HelveticaLT43LightExtended', // Specify the custom font here
  },
  totalLitersText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'HelveticaLT43LightExtended', // Specify the custom font here
  },
});

export default HoursScreen;