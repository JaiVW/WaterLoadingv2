import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

const DrinkScreen = ({ route, navigation }) => {
  const { totalLiters, drinkingHours } = route.params;
  const [counter, setCounter] = useState(0);
  const [fillColor, setFillColor] = useState('white');
  const fillAnimation = useSharedValue(0);

  const config = {
    duration: 1000,
  };

  const drinkingTimePerLiter = Math.floor((parseInt(drinkingHours.split(' ')[0]) || 0) * 60 / totalLiters);
  const drinkingTimeHours = Math.floor(drinkingTimePerLiter / 60);
  const drinkingTimeMinutes = drinkingTimePerLiter % 60;

  const increaseCounter = () => {
    if (counter < totalLiters) {
      const newCounter = Math.min(counter + 1, totalLiters);
      const fillValue = newCounter / totalLiters;

      setCounter(newCounter);

      fillAnimation.value = withTiming(fillValue, config);

      if (newCounter >= totalLiters) {
        setFillColor('white');
      }

      const animatedHeight = height * fillValue;
      const remainingHeight = height - animatedHeight;
      fillStyle.transform = [{ translateY: remainingHeight }];
    }
  };

  const fillStyle = useAnimatedStyle(() => {
    const animatedHeight = height * fillAnimation.value;

    return {
      height: animatedHeight,
      backgroundColor: fillColor,
    };
  });

  const goBack = () => {
    navigation.goBack();
  };

  const litresLeft = totalLiters - counter;
  const litresLeftText = litresLeft < 1 ? `${(litresLeft * 1000).toFixed(0)} milliliters left` : `${litresLeft.toFixed(2)} liters left`;

  const totalLitresDrunkText = counter < 1 ? `${(counter * 1000).toFixed(0)} milliliters drunk` : `${counter.toFixed(2)} liters drunk`;

  const drinkingTimeText =
    !isNaN(drinkingTimeHours) && !isNaN(drinkingTimeMinutes)
      ? `${drinkingTimeHours}hrs${drinkingTimeMinutes} to do this`
      : '';

  const drinkingTimePerLiterText =
    !isNaN(drinkingTimeHours) && !isNaN(drinkingTimeMinutes)
      ? `${drinkingTimeHours}hrs${drinkingTimeMinutes} for each litre`
      : '';

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.fill, fillStyle]} />
      <Text style={styles.text}>Drink {totalLiters.toFixed(2)} liters per day.</Text>
      <Text style={styles.text}>{drinkingHours} hours to do this.</Text>
      <Text style={styles.text}>{drinkingTimePerLiterText}</Text>
      {drinkingTimeHours < 1 ? (
        <View style={styles.buttonContainer}>
          <Button title="Go back" onPress={goBack} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="1L" onPress={increaseCounter} disabled={counter >= totalLiters} />
        </View>
      )}
      <Text style={styles.counterText}>{totalLitresDrunkText}</Text>
      <Text style={styles.counterText}>{litresLeftText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
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
