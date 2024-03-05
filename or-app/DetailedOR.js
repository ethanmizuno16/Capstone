import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const getSurgeryProgress = (surgeryStage) => {
    const stages = {
      'Pre-Op': 0.1,
      'Intubation': 0.3,
      'Incision': 0.5,
      'Surgery': 0.7,
      'Stitching': 0.9,
      'Post-Op': 1.0,
      'Dead': 0,
    };
    return stages[surgeryStage] || 0;
  };

const DetailedOR = ({ route, navigation }) => {
  // Extract the `or` object passed as a parameter from the navigation route
  const { or } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OR Details</Text>
      <Text style={styles.detailText}>ID: {or.id}</Text>
      <Text style={styles.detailText}>Surgeon Name: {or.surgeonName}</Text>
      <Text style={styles.detailText}>R.A. Name: {or.raName}</Text>
      <Text style={styles.detailText}>Surgery Type: {or.surgeryType}</Text>
      <Text style={styles.detailText}>Surgery Stage: {or.surgeryStage}</Text>
      <Text style={styles.detailText}>Progress: {`${Math.round(getSurgeryProgress(or.surgeryStage) * 100)}%`}</Text>

      {/* Button to go back to the previous screen */}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

// You might need to import or define getSurgeryProgress function here
// if you plan to use it to calculate and show the surgery progress.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default DetailedOR;