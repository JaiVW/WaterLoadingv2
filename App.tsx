import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WeightScreen from './src/WeightScreen';
import HoursScreen from './src/HoursScreen';
import DrinkScreen from './src/DrinkScreen';

const Stack = createStackNavigator();

const App = () => {
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
