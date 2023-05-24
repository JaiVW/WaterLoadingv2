import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const HoursScreen = ({ navigation, route }) => {
  const [hours, setHours] = useState('');

  const handleSubmit = () => {
    // Perform validation and navigate to the last screen
    const weight = route.params.weight;
    const totalLiters = weight * 0.1;
    const drinkingHours = parseFloat(hours);
    const drinkingTimePerLiter = Math.floor((drinkingHours * 60) / totalLiters);
    const drinkingTimeHours = Math.floor(drinkingTimePerLiter / 60);
    const drinkingTimeMinutes = drinkingTimePerLiter % 60;
    navigation.navigate('DrinkScreen', {
      weight,
      totalLiters,
      drinkingHours,
      drinkingTimeHours,
      drinkingTimeMinutes,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter number of hours for drinking"
        value={hours}
        onChangeText={setHours}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Next" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default HoursScreen;
