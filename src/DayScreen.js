import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const DayScreen = ({ navigation, route }) => {
  const { day = 1 } = route.params ?? {};
  const [currentDay, setCurrentDay] = useState(day);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isNextDayLocked, setIsNextDayLocked] = useState(true);

  const getDayText = (day) => {
    switch (day) {
      case 1:
        return 'Day 1';
      case 2:
        return 'Day 2';
      case 3:
        return 'Day 3';
      case 4:
        return 'Day 4';
      case 5:
        return 'Day 5';
      default:
        return 'Unknown Day';
    }
  };

  const handleNextDay = () => {
    if (currentDay < 5) {
      setCurrentDay(currentDay + 1);
      setIsButtonDisabled(true);
      setIsNextDayLocked(true);
      navigation.navigate('WaterScreen', {
        day: currentDay + 1,
        totalLiters: route.params.totalLiters,
        drinkingHoursInMinutes: route.params.drinkingHoursInMinutes,
        startTime: route.params.startTime,
        endTime: route.params.endTime,
      });
    } else {
      navigation.navigate('LastScreen', {
        totalLiters: route.params.totalLiters,
        drinkingHoursInMinutes: route.params.drinkingHoursInMinutes,
        startTime: route.params.startTime,
        endTime: route.params.endTime,
      });
    }
  };

  useEffect(() => {
    const today = new Date().getDay();
    setIsNextDayLocked(today !== currentDay);
    setIsButtonDisabled(today !== currentDay);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getDayText(currentDay)}</Text>
      {isNextDayLocked && (
        <Text style={styles.lockedText}>Next day will be unlocked tomorrow</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Next" onPress={handleNextDay} disabled={isButtonDisabled} />
      </View>
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
  lockedText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#999',
    fontFamily: 'HelveticaLT93BlackExtended',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default DayScreen;
