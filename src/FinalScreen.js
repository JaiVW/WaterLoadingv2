import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const FinalScreen = ({ route }) => {
  const { weight } = route.params ?? {};
  const waterToDrink = (weight * 0.01).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Day 5</Text>
      <Text style={styles.subtitle}>Recommended Water Intake:</Text>
      <Text style={styles.waterText}>{waterToDrink} Litres</Text>
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
    marginBottom: 20,
    color: '#333',
    fontFamily: 'HelveticaLT93BlackExtended',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    fontFamily: 'HelveticaLT43LightExtended',
  },
  waterText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default FinalScreen;
