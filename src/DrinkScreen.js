import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const DrinkScreen = ({ route }) => {
  const { totalLiters, drinkingHours } = route.params;
  const [counter, setCounter] = useState(0);
  const [screenColor, setScreenColor] = useState('red');
  const drinkingTimePerLiter = Math.floor(drinkingHours * 60 / totalLiters);
  const drinkingTimeHours = Math.floor(drinkingTimePerLiter / 60);
  const drinkingTimeMinutes = drinkingTimePerLiter % 60;

  useEffect(() => {
    if (counter >= totalLiters) {
      setScreenColor('green');
    }
  }, [counter, totalLiters]);

  const increaseCounter = () => {
    if (counter < totalLiters) {
      setCounter(counter + 1);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: screenColor }]}>
      <Text style={styles.text}>
        You need to drink {totalLiters.toFixed(2)} liters per day.
      </Text>
      <Text style={styles.text}>
        You have a total of {drinkingHours} hours to do this.
      </Text>
      <Text style={styles.text}>
        You have {drinkingTimeHours} hours and {drinkingTimeMinutes} minutes for each liter.
      </Text>
      <Text style={styles.text}>
        Do not exceed 1 liter per hour.
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="1L" onPress={increaseCounter} disabled={counter >= totalLiters} />
      </View>
      <Text style={styles.counterText}>Total Litres Drunk: {counter}</Text>
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
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  counterText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default DrinkScreen;
