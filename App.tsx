import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

import WeightScreen from './src/WeightScreen';
import HoursScreen from './src/HoursScreen';
import DayScreen from './src/DayScreen';
import DrinkScreen from './src/DrinkScreen';
import FinalScreen from './src/FinalScreen';

const Stack = createStackNavigator();

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [weight, setWeight] = useState(0);
  const [drinkingHours, setDrinkingHours] = useState(0);
  const [day, setDay] = useState(1);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'HelveticaLT93BlackExtended': require('./src/assets/fonts/HelveticaLT93BlackExtended.ttf'),
        'HelveticaLT43LightExtended': require('./src/assets/fonts/HelveticaLT43LightExtended.ttf'),
      });
      setDataLoaded(true);
    };

    loadFonts();
  }, []);

  const handleWeightChange = (newWeight: number) => {
    setWeight(newWeight);
  };

  const handleDrinkingHoursChange = (newDrinkingHours: number) => {
    setDrinkingHours(newDrinkingHours);
  };

  if (!dataLoaded) {
    return null; // or return a loading component if you have one
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WeightScreen">
        <Stack.Screen
          name="WeightScreen"
          component={WeightScreen}
          options={{ title: 'Enter Weight' }}
          initialParams={{ onWeightChange: handleWeightChange }}
        />
        <Stack.Screen
          name="HoursScreen"
          component={HoursScreen}
          options={{ title: 'Enter Drinking Hours' }}
          initialParams={{ onDrinkingHoursChange: handleDrinkingHoursChange }}
        />
        <Stack.Screen
          name="DayScreen"
          component={DayScreen}
          options={{ title: 'Day 1' }}
          initialParams={{ day }}
          listeners={({ navigation }) => ({
            focus: () => {
              setTimeout(() => {
                if (day === 5) {
                  setDay(1);
                  navigation.navigate('FinalScreen');
                } else {
                  setDay((prevDay) => prevDay + 1);
                  navigation.navigate('DrinkScreen', { weight, drinkingHours });
                }
              }, 3000);
            },
          })}
        />
        <Stack.Screen
          name="DrinkScreen"
          component={DrinkScreen}
          options={{ title: 'Drink Reminder' }}
          initialParams={{ weight, drinkingHours }}
        />
        <Stack.Screen
          name="FinalScreen"
          component={FinalScreen}
          options={{ title: 'Final Screen' }}
          initialParams={{ weight }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
