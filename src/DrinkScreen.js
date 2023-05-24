import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DrinkScreen = ({ route, navigation }) => {
  const { totalLiters, startTime, endTime } = route.params;
  const [totalLitersDrunk, setTotalLitersDrunk] = useState(0);

  const start = parseInt(startTime);
  const end = parseInt(endTime);
  const drinkingHours = (end - start) % 24;

  const isEnoughTime = drinkingHours >= 1;

  const handleButtonPress = () => {
    if (isEnoughTime) {
      setTotalLitersDrunk(totalLitersDrunk + 1);
    }
  };

  const drinkingTimeHours = Math.floor(drinkingHours);
  const drinkingTimeMinutes = Math.round((drinkingHours % 1) * 60);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        You need to drink {totalLiters.toFixed(2)} liters per day.
      </Text>
      <Text style={styles.text}>
        You have a total of {drinkingHours} hours to do this.
      </Text>
      <Text style={styles.text}>
        You have {drinkingTimeHours} hours and {drinkingTimeMinutes} minutes for each liter.
      </Text>
      {isEnoughTime ? (
        <Text style={styles.text}>Do not exceed 1 litre per hour.</Text>
      ) : (
        <Text style={styles.text}>Not enough time for each litre, please adjust time.</Text>
      )}

      <View style={styles.circleButtonContainer}>
        <TouchableOpacity
          style={[styles.circleButton, !isEnoughTime && styles.disabledButton]}
          disabled={!isEnoughTime}
          onPress={handleButtonPress}
        >
          <Text style={styles.buttonText}>1L</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.counterText}>Total Liters Drunk: {totalLitersDrunk}</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    marginBottom: 10,
    fontSize: 18,
  },
  circleButtonContainer: {
    marginBottom: 20,
  },
  circleButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  counterText: {
    fontSize: 18,
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default DrinkScreen;
