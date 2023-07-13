import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

import WeightScreen from './src/01WeightScreen';
import HoursScreen from './src/02HoursScreen';
import DayScreen from './src/03DayScreen';
import WaterScreen from './src/04WaterScreen';
import LastScreen from './src/05LastScreen';

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
          initialParams={{ day , weight, drinkingHours  }}
        />
        <Stack.Screen
          name="WaterScreen"
          component={WaterScreen}
          options={{ title: 'Drink Reminder' }}
          initialParams={{ weight, drinkingHours }}
        />
        <Stack.Screen
          name="LastScreen"
          component={LastScreen}
          options={{ title: 'Last Screen' }}
          initialParams={{ weight }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
