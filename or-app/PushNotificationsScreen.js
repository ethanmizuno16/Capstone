import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import surgeriesData from './surgeries.json';

const PushNotificationsScreen = ({ route }) => {
  const { or } = route.params;
  const surgery = surgeriesData.find(surgery => surgery.surgeryType === or.surgeryType);
  const steps = surgery ? surgery.steps : [];
  const currentStepIndex = steps.indexOf(or.surgeryStage);

  const handleSendNotification = (step) => {
    console.log(`Sending notification for step: ${step}`);
    // Your notification logic here
  };

  const handleEmergencyAlert = () => {
    console.log("Emergency in OR triggered!");
    // Your emergency handling logic here
  };


  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>{or.surgeryType}</Text>
        <Text style={styles.subHeader}>{or.id}</Text>
        <Text style={styles.subHeader}>{or.surgeonName}</Text>

        {steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={[
              styles.stepText,
              index <= currentStepIndex ? styles.shadedStep : {}
            ]}>
              {step}
            </Text>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => handleSendNotification(step)}
            >
              <View style={styles.notificationButtonInner} />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={handleEmergencyAlert}
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
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  stepTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  stepText: {
    backgroundColor: 'lightgreen',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    textAlign: 'left', // Align text to the left
    flex: 0.8, // Take up 80% of the container width
    marginRight: 10,
  },
  shadedStep: {
    backgroundColor: '#cccccc', // Grey out the completed steps
  },
  notificationButton: {
    flex: 0.2, // Take up the remaining 20% of the container width
    width: 30, // Keep the button size consistent
    height: 30,
    borderRadius: 15,
    backgroundColor: '#add8e6', // Light blue color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 0,
  },
  notificationButtonInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
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