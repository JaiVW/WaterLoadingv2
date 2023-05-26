  import React, { useState, useEffect } from 'react';
  import { View, TextInput, Button, Text, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';

  const HoursScreen = ({ navigation, route }) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [drinkingHours, setDrinkingHours] = useState(0);
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
    
      const start = parseInt(startTime.replace(':', ''));
      const end = parseInt(endTime.replace(':', ''));
    
      let hours = 0;
      let minutes = 0;
    
      if (end > start) {
        const diff = end - start;
        hours = Math.floor(diff / 100);
        minutes = diff % 100;
      } else if (end < start) {
        const diff = (2400 - start) + end;
        hours = Math.floor(diff / 100);
        minutes = diff % 100;
    
        // Adjust minutes if it exceeds 59
        if (minutes >= 60) {
          hours += Math.floor(minutes / 60);
          minutes %= 60;
        }
      }
    
      setDrinkingHours(`${hours} hour(s) and ${minutes} minute(s)`);
      setShowNextButton(true);
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
      const litersPerHour = totalLiters / drinkingHours;
      if (litersPerHour > 1) {
        return "It is unsafe to drink more than 1L per hour. Please add more hours to your drinking schedule.";
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
          <View style={styles.hoursTextContainer}>
            <Text style={styles.hoursText}>You have {drinkingHours} hours</Text>
          </View>
          {hasError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{validateDrinkingHours()}</Text>
            </View>
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
    hoursTextContainer: {
      marginBottom: 20,
    },
    hoursText: {
      fontSize: 18,
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
