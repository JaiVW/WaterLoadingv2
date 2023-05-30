import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

import WeightScreen from './src/WeightScreen';
import HoursScreen from './src/HoursScreen';
import DrinkScreen from './src/DrinkScreen';
import Day5Screen from './src/Day5Screen';

const Stack = createStackNavigator();

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [weight, setWeight] = useState(0);
  const [drinkingHours, setDrinkingHours] = useState(0);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Montserrat-Medium': require('./src/assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-Black': require('./src/assets/fonts/Montserrat-Black.ttf'),
        'SpaceMono-Bold': require('./src/assets/fonts/SpaceMono-Bold.ttf'),
        'HelveticaLT93BlackExtended': require('./src/assets/fonts/HelveticaLT93BlackExtended.ttf'),
        'HelveticaLT43LightExtended': require('./src/assets/fonts/HelveticaLT43LightExtended.ttf'),
      });
      setDataLoaded(true);
    };

    loadFonts();
  }, []);

  const handleWeightChange = (newWeight) => {
    setWeight(newWeight);
  };

  const handleDrinkingHoursChange = (newDrinkingHours) => {
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
          name="DrinkScreen"
          component={DrinkScreen}
          options={{ title: 'Drink Reminder' }}
          initialParams={{ weight, drinkingHours }}
        />
        <Stack.Screen
          name="Day5Screen"
          component={Day5Screen}
          options={{ title: 'Fifth Day' }}
          initialParams={{ weight }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
