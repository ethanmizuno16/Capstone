import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { Bar } from 'react-native-progress';

// Calculate dimensions for responsive layout
const windowWidth = Dimensions.get('window').width;
const cardMargin = 16;
const numColumns = 2;
const cardWidth = (windowWidth / numColumns) - (cardMargin * 2) - (cardMargin * (numColumns - 1));

// Example data for the ORs, replace with your actual data
const orData = [
  {
    id: 'OR 1',
    surgeonName: 'Dr. Smith',
    raName: 'Dr. Johnson',
    surgeryType: 'Craniotomy',
    surgeryStage: 'Pre-Op',
  },
  {
    id: 'OR 2',
    surgeonName: 'Dr. Jones',
    raName: 'Dr. Williams',
    surgeryType: 'Appendectomy',
    surgeryStage: 'Intubation',
  },
  {
    id: 'OR 3',
    surgeonName: 'Dr Vogel',
    raName: 'Dr. Neils',
    surgeryType: 'Liver Transplant',
    surgeryStage: 'Dead',
  },
  { id: 'OR 4',
    surgeonName: 'Dr. Lee',
    raName: 'Dr. Kim',
    surgeryType: 'Heart Transplant', 
    surgeryStage: 'Incision' 
  },
  { id: 'OR 5',
   surgeonName: 'Dr. Allen',
   raName: 'Dr. Shaw',
   surgeryType: 'Knee Replacement',
   surgeryStage: 'Pre-Op'
  },
  { id: 'OR 6',
  surgeonName: 'Dr. Barnes',
  raName: 'Dr. Lutz',
  surgeryType:'Hip Replacement',
  surgeryStage: 'Post-Op'
  },
  { id: 'OR 7',
  surgeonName: 'Dr. Miles',
  raName: 'Dr. Watson',
  surgeryType: 'Gastric Bypass',
  surgeryStage: 'Surgery'
  },
  { id: 'OR 8',
  surgeonName: 'Dr. Wright',
  raName: 'Dr. Torres',
  surgeryType: 'Lobectomy',
  surgeryStage: 'Stitching'
  },
];

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

// OR Card component
const OrCard = ({ or }) => {
  const progress = getSurgeryProgress(or.surgeryStage);
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{or.id}</Text>
      <Text>Surgeon Name: {or.surgeonName}</Text>
      <Text>R.A. Name: {or.raName}</Text>
      <Text>Surgery Type: {or.surgeryType}</Text>
      <View style={styles.progressBarContainer}>
        <Bar progress={progress} width={null} style={styles.progressBar} />
        <Text style={styles.progressText}>{`${Math.round(progress * 100)}%`}</Text>
      </View>
    </View>
  );
};


export default function App() {
  const numColumns = 2;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Remote Monitoring Anesthesia App</Text>
      <Text style={styles.description}>
        Current status of each Operating Room:
      </Text>
      <FlatList
        data={orData}
        renderItem={({ item }) => <OrCard or={item} />}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        style={styles.list}
        contentContainerStyle={styles.flatListContentContainer} // Adjust this for better centering
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 5,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  list: {
    width: '100%',
  },
  flatListContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 20,
    width: cardWidth, // Dynamically calculated width
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: cardMargin,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  progressBar: {
    flex: 1,
  },
  progressText: {
    paddingLeft: 10,
  },
});
