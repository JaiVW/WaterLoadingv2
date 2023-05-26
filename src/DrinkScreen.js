import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Animated, Dimensions } from 'react-native';

const DrinkScreen = ({ route, navigation }) => {
  const { totalLiters, drinkingHours } = route.params;
  const [counter, setCounter] = useState(0);
  const [screenColor, setScreenColor] = useState('red');
  const [fillAnimation] = useState(new Animated.Value(0));

  const drinkingTimePerLiter = totalLiters !== 0 ? Math.floor((drinkingHours * 60) / totalLiters) : 0;
  const drinkingTimeHours = Math.floor(drinkingTimePerLiter / 60);
  const drinkingTimeMinutes = Math.ceil(drinkingTimePerLiter % 60); // Round up minutes if they become decimals
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

  const calculateTimePerLiter = () => {
    return `${drinkingTimeHours} hour${drinkingTimeHours !== 1 ? 's' : ''} and ${drinkingTimeMinutes} minute${drinkingTimeMinutes !== 1 ? 's' : ''}`;
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
        You have a total of {drinkingHours} hours to do this.
      </Text>
      <Text style={styles.text}>
        You have {calculateTimePerLiter()} for each liter.
      </Text>
      <Text style={styles.text}>Do not exceed 1 liter per hour.</Text>
      {drinkingTimeHours < 1 ? (
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
    backgroundColor: 'blue',
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    zIndex: 1,
  },
  buttonContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 1,
  },
  counterText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    zIndex: 1,
  },
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
});

export default DrinkScreen;
