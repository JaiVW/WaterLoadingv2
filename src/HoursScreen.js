import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Animated, Dimensions } from 'react-native';

const DrinkScreen = ({ route, navigation }) => {
  const { totalLiters, drinkingHoursInMinutes } = route.params;
  const [counter, setCounter] = useState(0);
  const [screenColor, setScreenColor] = useState('red');
  const [fillAnimation] = useState(new Animated.Value(0));

  const drinkingTimePerLiterMinutes = totalLiters !== 0 ? drinkingHoursInMinutes / totalLiters : 0;
  const timePerLiterHours = Math.floor(drinkingTimePerLiterMinutes / 60);
  const timePerLiterMinutes = drinkingTimePerLiterMinutes % 60;

  const screenHeight = Dimensions.get('window').height;

  const increaseCounter = () => {
    if (counter < totalLiters) {
      const newCounter = counter + 1;
      const fillValue = newCounter / totalLiters;

      setCounter(newCounter);

      Animated.timing(fillAnimation, {
        toValue: fillValue,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: false,
      }).start(() => {
        if (newCounter >= totalLiters) {
          setScreenColor('green');
        }
      });
    }
  };

  const fillHeight = fillAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const goBack = () => {
    navigation.goBack();
  };

  const calculateLitersLeft = () => {
    const litersLeft = totalLiters - counter;
    if (litersLeft >= 1) {
      return litersLeft.toFixed(2);
    } else {
      const millilitersLeft = (litersLeft * 1000).toFixed(0);
      return Math.max(0, millilitersLeft) + 'ml';
    }
  };

  const calculateLitersDrunk = () => {
    if (counter < totalLiters) {
      return counter.toFixed(2);
    } else {
      return totalLiters.toFixed(2);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Animated.View style={[styles.fill, { height: fillHeight }]} />
      </View>
      <Text style={styles.text}>
        You need to drink {totalLiters.toFixed(2)} liters per day.
      </Text>
      <Text style={styles.text}>
        You have a total of {timePerLiterHours} hour(s) and {timePerLiterMinutes} minute(s) for each liter.
      </Text>
      <Text style={styles.text}>Do not exceed 1 liter per hour.</Text>
      {timePerLiterHours < 1 ? (
        <View style={styles.buttonContainer}>
          <Button title="Go back" onPress={goBack} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="1L" onPress={increaseCounter} disabled={counter >= totalLiters} />
        </View>
      )}
      <Text style={styles.counterText}>Total Liters Drunk: {calculateLitersDrunk()} L</Text>
      <Text style={styles.counterText}>Liters Left: {calculateLitersLeft()} L</Text>
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
