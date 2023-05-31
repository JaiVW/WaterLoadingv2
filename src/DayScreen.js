import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const DayScreen = ({ navigation, route }) => {
  const { day = 1 } = route.params ?? {};

  const handleNextDay = () => {
    if (day < 5) {
      navigation.navigate('DayScreen', { day: day + 1 });
    } else {
      navigation.navigate('Day5Screen', { weight: 0 });
    }
  };

  const getDayText = (number) => {
    return `Day ${number}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getDayText(day)}</Text>
      <Button title="Next Day" onPress={handleNextDay} />
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
});

export default DayScreen;
