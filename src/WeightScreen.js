import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const WeightScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('');

  const handleSubmit = () => {
    // Perform validation and navigate to the next screen
    navigation.navigate('HoursScreen', { weight: parseFloat(weight) });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter weight in kilograms"
        value={weight}
        onChangeText={setWeight}
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

export default WeightScreen;
