import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

import WeightScreen from './src/WeightScreen';
import HoursScreen from './src/HoursScreen';
import DrinkScreen from './src/DrinkScreen';

const Stack = createStackNavigator();

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

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
        />
        <Stack.Screen
          name="HoursScreen"
          component={HoursScreen}
          options={{ title: 'Enter Drinking Hours' }}
        />
        <Stack.Screen
          name="DrinkScreen"
          component={DrinkScreen}
          options={{ title: 'Drink Reminder' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
