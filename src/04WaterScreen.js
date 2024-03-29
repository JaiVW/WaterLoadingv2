import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Animated, Dimensions } from 'react-native';
import * as Notifications from 'expo-notifications';

const WaterScreen = ({ route, navigation }) => {
  const { totalLiters, drinkingHoursInMinutes, startTime, endTime } = route.params || {};

  console.log('WaterScreen - totalLiters:', totalLiters);
  console.log('WaterScreen - drinkingHoursInMinutes:', drinkingHoursInMinutes);
  console.log('WaterScreen - startTime:', startTime);
  console.log('WaterScreen - endTime:', endTime);
  const [counter, setCounter] = useState(0);
  const [screenColor, setScreenColor] = useState('red');
  const [fillAnimation] = useState(new Animated.Value(0));
  const [showHalfwayMessage, setShowHalfwayMessage] = useState(false);
  const [showLastOneMessage, setShowLastOneMessage] = useState(false);
  const [showAllDoneMessage, setShowAllDoneMessage] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [scheduledNotifications, setScheduledNotifications] = useState([]);
  const [isBehindSchedule, setIsBehindSchedule] = useState(false);

  const totalHours = Math.floor((drinkingHoursInMinutes ?? 0) / 60);
  const totalMinutes = (drinkingHoursInMinutes ?? 0) % 60;
  const drinkingTimePerLiterMinutes = totalLiters !== 0 ? Math.floor((drinkingHoursInMinutes ?? 0) / (totalLiters ?? 1)) : 0;
  const timePerLiterHours = Math.floor((drinkingTimePerLiterMinutes ?? 0) / 60);
  const timePerLiterMinutes = (drinkingTimePerLiterMinutes ?? 0) % 60;

  const startMinutes = startTime ? parseInt(startTime.substring(0, 2)) * 60 + parseInt(startTime.substring(3, 5)) : 0;
  const firstLiterMinutes = startMinutes + drinkingTimePerLiterMinutes;

  const firstLiterHours = Math.floor(firstLiterMinutes / 60);
  const firstLiterMins = firstLiterMinutes % 60;

  const [firstLiterTime, setFirstLiterTime] = useState(`${String(firstLiterHours).padStart(2, '0')}:${String(firstLiterMins).padStart(2, '0')}`);

  const screenHeight = Dimensions.get('window').height;

  const increaseCounter = () => {
    if (counter < totalLiters && !buttonDisabled) {
      const newCounter = counter + 1;
      const fillValue = newCounter / totalLiters;

      setCounter((prevCounter) => prevCounter + 1);

      const timeToAdd = (newCounter + 1) * drinkingTimePerLiterMinutes;

      const currentTime = startMinutes + timeToAdd;
      const currentHours = Math.floor(currentTime / 60);
      const currentMinutes = currentTime % 60;

      const currentDrinkTime = `${String(currentHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`;

      setFirstLiterTime(currentDrinkTime);

      Animated.timing(fillAnimation, {
        toValue: fillValue,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: false,
      }).start(() => {
        if (newCounter >= totalLiters) {
          setScreenColor('green');
          setShowAllDoneMessage(true);
          setButtonDisabled(true);
        } else if (newCounter === Math.floor(totalLiters * 0.95)) {
          setShowLastOneMessage(true);
          setTimeout(() => setShowLastOneMessage(false), 3000); // Show the message for 3 seconds
        } else if (newCounter === Math.floor(totalLiters * 0.55)) {
          setShowHalfwayMessage(true);
          setTimeout(() => setShowHalfwayMessage(false), 3000); // Show the message for 3 seconds
        }
      });
    }
  };

  const fillHeight = fillAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const goBack = () => {
    navigation.goBack();
  };

  const calculateLitersLeft = () => {
    if (totalLiters !== undefined) {
      const litersLeft = totalLiters - counter;
      if (litersLeft >= 1) {
        return litersLeft.toFixed(2) + ' L';
      } else {
        const millilitersLeft = (litersLeft * 1000).toFixed(0);
        return Math.max(0, millilitersLeft) + 'ml';
      }
    } else {
      return '0.00';
    }
  };

  const calculateLitersDrunk = () => {
    if (totalLiters !== undefined) {
      if (counter < totalLiters) {
        return counter.toFixed(2);
      } else {
        return totalLiters.toFixed(2);
      }
    } else {
      return '0.00';
    }
  };

  useEffect(() => {
    console.log('counter:', counter);
    if (counter + 1 >= totalLiters) {
      setFirstLiterTime(endTime);
    }
  }, [counter, endTime, totalLiters, startTime]);

  useEffect(() => {
    const checkNotification = () => {
      const now = new Date();
      const finishTimeParts = firstLiterTime.split(':');
      const finishTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), finishTimeParts[0], finishTimeParts[1]);
      setIsBehindSchedule(now > finishTime);
    };

    const interval = setInterval(checkNotification, 1000 * 60); // Check every minute

    return () => clearInterval(interval);
  }, [firstLiterTime]);

  useEffect(() => {
    const notifications = [];
    const startTimeParts = startTime.split(':');
    const startHour = parseInt(startTimeParts[0]);
    const startMinute = parseInt(startTimeParts[1]);
    const drinkingTimePerLiterHours = Math.floor(drinkingTimePerLiterMinutes / 60);
    const drinkingTimePerLiterMinutesMod = drinkingTimePerLiterMinutes % 60;

    let currentTime = new Date();
    currentTime.setHours(startHour);
    currentTime.setMinutes(startMinute);

    for (let i = 0; i < totalLiters; i++) {
      const notificationTime = new Date(currentTime);
      notificationTime.setHours(notificationTime.getHours() + drinkingTimePerLiterHours);
      notificationTime.setMinutes(notificationTime.getMinutes() + drinkingTimePerLiterMinutesMod);

      notifications.push(notificationTime);
      currentTime = new Date(notificationTime);
    }

    setScheduledNotifications(notifications);
  }, [totalLiters, startTime, drinkingTimePerLiterMinutes]);

  useEffect(() => {
    console.log('Scheduled Notifications:', scheduledNotifications);
  }, [scheduledNotifications]);

  const handleNextDay = () => {
    if (route.params.day < 6) {
      navigation.navigate('DayScreen', {
        day: route.params.day,
        totalLiters: route.params.totalLiters,
        drinkingHoursInMinutes: route.params.drinkingHoursInMinutes,
        startTime: route.params.startTime,
        endTime: route.params.endTime,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Animated.View style={[styles.fill, { height: fillHeight }]} />
      </View>
      <View style={styles.topContainer}>
        {isBehindSchedule && (
          <View style={[styles.messageContainer, { backgroundColor: 'red' }]}>
            <Text style={styles.messageText}>You're behind schedule</Text>
          </View>
        )}
        {showHalfwayMessage && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>Halfway there!</Text>
          </View>
        )}
        {showLastOneMessage && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>Last few sips!</Text>
          </View>
        )}
        {showAllDoneMessage && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>You're finished. Well done!</Text>
          </View>
        )}
      </View>
      <Text style={styles.title}>Waterloading</Text>
      <Text style={styles.text}>
        Liters per day: {totalLiters !== undefined ? totalLiters.toFixed(2) : 0}L
      </Text>
      <Text style={styles.text}>
        Overall time: {totalHours}hr{totalMinutes}
      </Text>
      <Text style={styles.text}>
        Time per litre: {timePerLiterHours < 1 ? `${timePerLiterMinutes} minutes` : `${timePerLiterHours}hr${timePerLiterMinutes}`}
      </Text>
      {timePerLiterHours < 1 ? (
        <View style={styles.buttonContainer}>
          <Button title="Go back" onPress={goBack} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          {buttonDisabled ? (
            <Button title="Next Day" onPress={handleNextDay} />
          ) : (
            <Button title="1L" onPress={increaseCounter} disabled={counter >= totalLiters} />
          )}
        </View>
      )}
      <Text style={styles.firstLiterTime}>Finish this litre by: {firstLiterTime}</Text>
      <Text style={[styles.text, { color: 'black' }]}>Do not exceed 1 liter per hour.</Text>
      <Text style={styles.counterText}>{calculateLitersDrunk()} L drunk so far</Text>
      <Text style={styles.counterText}>{calculateLitersLeft()} left to drink</Text>
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
    marginBottom: 30,
    color: '#000000',
    fontFamily: 'HelveticaLT93BlackExtended',
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0d75ff',
  },
  topContainer: {
    position: 'absolute',
    top: 16,
    zIndex: 1,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    zIndex: 1,
    fontFamily: 'HelveticaLT43LightExtended',
  },
  buttonContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    zIndex: 1,
  },
  counterText: {
    fontSize: 16,
    marginTop: 15,
    zIndex: 1,
    fontFamily: 'HelveticaLT93BlackExtended',
  },
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  messageContainer: {
    alignSelf: 'center',
    backgroundColor: 'lightgreen',
    padding: 18,
    borderRadius: 50,
    elevation: 5,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'HelveticaLT43LightExtended',
  },
  firstLiterTime: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'HelveticaLT43LightExtended',
  },
});

export default WaterScreen;
