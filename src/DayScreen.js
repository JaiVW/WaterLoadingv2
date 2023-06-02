import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const DayScreen = ({ navigation, route }) => {
  const { day = 1 } = route.params ?? {};
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
    if (day < 5) {
      navigation.navigate('WaterScreen', {
        day: day + 1,
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
  
    console.log('totalLiters:', route.params.totalLiters);
    console.log('drinkingHoursInMinutes:', route.params.drinkingHoursInMinutes);
    console.log('startTime:', route.params.startTime);
    console.log('endTime:', route.params.endTime);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getDayText(day)}</Text>
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
  buttonContainer: {
    marginTop: 20,
  },
});

export default DayScreen;
