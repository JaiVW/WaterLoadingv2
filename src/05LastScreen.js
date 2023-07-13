import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LastScreen = ({ route, navigation }) => {
  const { totalLiters, drinkingHoursInMinutes, startTime, endTime } = route.params;

  const waterToDrink = (totalLiters * 1000 * 0.1).toFixed(); // Convert liters to milliliters

  console.log('totalLiters:', totalLiters);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Final day</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>The weigh-in is tomorrow.</Text>
        <Text style={styles.subtitle}>You made it this far.</Text>
        <Text style={styles.subtitle}>Let's make this count!</Text>
      </View>
      <Text style={styles.waterText}>Stay under : {waterToDrink} ml</Text>
    </View>
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
    marginBottom: 30,
    color: '#000000',
    fontFamily: 'HelveticaLT93BlackExtended',
    textAlign: 'center',
  },
  subtitleContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    fontFamily: 'HelveticaLT43LightExtended',
    textAlign: 'center',
  },
  waterText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'HelveticaLT93BlackExtended',
    textAlign: 'center',
  },
});

export default LastScreen;
