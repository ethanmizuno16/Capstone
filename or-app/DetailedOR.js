// VITALS BRANCH

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { Bar } from 'react-native-progress';

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
  const { or } = route.params;
  const progress = getSurgeryProgress(or.surgeryStage);

  const [biosignalData, setBiosignalData] = useState(null);

  useEffect(() => {
    // Replace '1' with the actual case ID you want to fetch
    const caseId = 1;
    const url = `http://localhost:5000/api/get_vitals/${caseId}`;
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns an array of vitals
        const vitals = data.vitals;
        // For simplicity, we're only displaying the first ART value.
        // You'll need to adapt this based on how you want to use the data.
        const firstArtValue = vitals.length > 0 ? vitals[0][1] : 'No data';
        setBiosignalData(firstArtValue);
      })
      .catch((error) => {
        console.error('Error fetching biosignal data:', error);
        setBiosignalData('Error loading data');
      });
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.detailBox}>
          <Text style={styles.title}>{or.id}</Text>
          <Text style={styles.detailText}>Surgeon Name: {or.surgeonName}</Text>
          <Text style={styles.detailText}>R.A. Name: {or.raName}</Text>
          <Text style={styles.detailText}>Surgery Type: {or.surgeryType}</Text>
          <Text style={styles.detailText}>Surgery Stage: {or.surgeryStage}</Text>
          <View style={styles.progressBarContainer}>
            <Bar progress={progress} width={null} style={styles.progressBar} />
            <Text style={styles.progressText}>{`${Math.round(progress * 100)}% Complete`}</Text>
          </View>
        </View>

      <View style={styles.largeBox}>
        <Text style={styles.boxContent}>
          Biosignal Data: {biosignalData !== null ? biosignalData : 'Loading...'}
        </Text>
      </View>

        <View style={styles.largeBox}>
          <Text style={styles.boxContent}>Messaging</Text>
        </View>

        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#f5f5f5',
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
      },
      detailBox: {
        backgroundColor: 'plum',
        borderRadius: 10,
        padding: 20,
        width: '90%', // Adjust the width as necessary
        marginVertical: 10,
        alignItems: 'flex-start', // Align text to the start of the box
      },
      largeBox: {
        backgroundColor: 'lightsalmon',
        borderRadius: 10,
        padding: 20,
        width: '90%', // Adjust the width as necessary
        height: 200, // Adjust the height as necessary
        justifyContent: 'center',
        alignItems: 'center', // Center content horizontally and vertically
        marginVertical: 10,
      },
      title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      detailText: {
        fontSize: 18,
        marginVertical: 5,
      },
      boxContent: {
        fontSize: 22,
        fontWeight: 'bold',
      },
      progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%', // Ensure the container fills the width of the card
      },
      progressBar: {
        flex: 1, // Allow the progress bar to fill as much space as possible
      },
      progressText: {
        paddingLeft: 20, // Add some space between the progress bar and the text
      },
});
export default DetailedOR;