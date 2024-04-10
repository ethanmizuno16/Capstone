// VITALS BRANCH

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { Bar } from 'react-native-progress';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import casesData from './cases_filtered_json.json';
import tracksData from './tracks_info_filtered_json.json';
//import RNPickerSelect from 'react-native-picker-select';


// select a random case
const selectRandomCase = (cases) => {
  const randomIndex = Math.floor(Math.random() * cases.length);
  return cases[randomIndex];
};

// filter tracks by case ID and ensure the tnames are the ones we want
const filterTracksByCaseId = (tracks, caseId, accessibleMachines) => {
  return tracks.filter(track => 
    track.caseid === caseId && 
    (accessibleMachines.includes(track.tname))
  );
};

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

  // grab surgery info from the case we picked
  // right now, it's a random case ID choice
  const [surgeryInfo] = useState(selectRandomCase(casesData));
  const opStart = surgeryInfo.opstart

  // grab the info about which machines we recorded from
  const [tracksForCase, setTracksForCase] = useState([]);
  const accessibleMachines = Array.from(new Set(
    tracksForCase.map(item => item.tname)
      .filter(tname => tname.startsWith('Solar8000/HR')) // just heart rate
  ));
  console.log(accessibleMachines)

  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(() => {
    // only get tracks for the selected case and tracks (HR only for now)
    const filteredTracks = filterTracksByCaseId(tracksData, surgeryInfo.caseid, accessibleMachines);
    setTracksForCase(filteredTracks);
  }, [surgeryInfo]);

  const fetchDataForTrack = async (tid) => {
    try {
      const response = await fetch(`https://api.vitaldb.net/${tid}`);
      console.log(`https://api.vitaldb.net/${tid}`)
      if (response.ok) {
        const csvText = await response.text();
        const data = csvToJSON(csvText);
        console.log('Data Received')
        console.log(data)
      } else {
        throw new Error('Response not successful');
      }
    } catch (error) {
      console.error("Error fetching data from VitalDB:", error);
    }
  };
  
  const csvToJSON = (csv) => {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');
  
    lines.slice(1).forEach((line) => {
      const obj = {};
      const currentline = line.split(',');
  
      headers.forEach((header, i) => {
        obj[header] = currentline[i];
      });
  
      result.push(obj);
    });
  
    return result;
  };
  

  // Handle track selection
  const handleTrackSelect = (tid) => {
    setSelectedTrack(tid);
    fetchDataForTrack(tid);
  };

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

        <View style={styles.anesBox}>
          {/* <RNPickerSelect
            onValueChange={(value) => handleTrackSelect(value)}
            items={tracksForCase.map((track) => ({ label: track.tname, value: track.tid }))}
            placeholder={{ label: 'Select a track...', value: null }}
          /> */}
          <Text style={styles.detailText}>
            Type of Anesthesia: <Text style={styles.aneType}>{surgeryInfo.ane_type}</Text>
          </Text>
          <Text style={styles.detailText}>Current Heart Rate: {surgeryInfo.ane_type}</Text>
          <Text style={styles.detailText}>Current Blood Pressure: {surgeryInfo.ane_type}</Text>

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
  anesBox:{
    backgroundColor: 'lightpink',
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
  aneType: {
    fontWeight: 'bold',
    color: '#007bff',
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