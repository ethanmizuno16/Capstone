import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Bar } from 'react-native-progress';

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
  }
];

const getSurgeryProgress = (surgeryStage) => {
  const stages = {
    'Pre-Op': 0.1,
    'Intubation': 0.3,
    'Incision': 0.5,
    'Surgery': 0.7,
    'Stitching': 0.9,
    'Post-Op': 1.0,
    'Dead': 0, // Assuming 0 for 'Dead', you may need to handle this case separately
  };
  return stages[surgeryStage] || 0;
};

// OR Card component
const OrCard = ({ or }) => {
  const progress = getSurgeryProgress(or.surgeryStage);
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>OR #{or.id}</Text>
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Remote Monitoring Anesthesia App.</Text>
      <Text style={styles.description}>
        T
      Below is the current status of each Operating Room:
      </Text>
      <FlatList
        data={orData}
        renderItem={({ item }) => <OrCard or={item} />}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed to flex-start to align items to the top
    paddingTop: 50, // Add padding at the top
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10, // Add some space below the title
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20, // Horizontal margin for better text alignment
    marginBottom: 20, // Space before the list starts
  },
  list: {
    width: '100%', // List takes full width of the screen
  },
  card: {
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 20,
    width: 150, // Set a fixed width for square shape
    height: 150, // Set a fixed height for square shape
    justifyContent: 'center', // centers the text vertically
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 16,
    // Add shadows and other styling as per your design
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Add additional styling as needed
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', // Ensure the container fills the width of the card
  },
  progressBar: {
    flex: 1, // Allow the progress bar to fill as much space as possible
  },
  progressText: {
    paddingLeft: 10, // Add some space between the progress bar and the text
  },
});
