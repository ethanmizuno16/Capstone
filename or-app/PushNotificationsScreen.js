import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import surgeriesData from './surgeries.json';

const PushNotificationsScreen = ({ route }) => {
  const { or } = route.params;
  const surgery = surgeriesData.find(surgery => surgery.surgeryType === or.surgeryType);
  const steps = surgery ? surgery.steps : [];
  const [completed, setCompleted] = useState(steps.map(() => false));

  // Animated values for each step
  const animations = useRef(steps.map(() => new Animated.Value(0))).current;

  const toggleStep = (index) => {
    let newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);

    // Start the animation
    Animated.timing(animations[index], {
      toValue: newCompleted[index] ? 1 : 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>{or.surgeryType}</Text>
        <Text style={styles.subHeader}>{or.id}</Text>
        <Text style={styles.subHeader}>{or.surgeonName}</Text>
        <Text style={styles.notificationHeader}>Push Notification</Text> 

        {steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Animated.Text style={[
              styles.stepText,
              {
                backgroundColor: animations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: ['lightgreen', '#cccccc']
                })
              }
            ]}>
              {step}
            </Animated.Text>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => toggleStep(index)}
            >
              <Animated.View style={[
                styles.checkboxInner,
                {
                  backgroundColor: animations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['transparent', 'blue']
                  })
                }
              ]} />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => console.log("Emergency in OR triggered!")}
        >
          <Text style={styles.emergencyButtonText}>Emergency in OR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 5,
  },
  notificationHeader: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  stepText: {
    flex: 0.8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  notificationButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#add8e6',
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  emergencyButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PushNotificationsScreen;