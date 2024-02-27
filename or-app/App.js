import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

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

// OR Card component
const OrCard = ({ or }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>OR #{or.id}</Text>
      <Text>Surgeon Name: {or.surgeonName}</Text>
      <Text>R.A. Name: {or.raName}</Text>
      <Text>Surgery Type: {or.surgeryType}</Text>
      <Text>Surgery Stage: {or.surgeryStage}</Text>
    </View>
  );
};


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Remote Monitoring Anesthesia App.</Text>
      <Text style={styles.description}>
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
    marginVertical: 10,
    marginHorizontal: 16,
    // Add shadows and other styling as per your design
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Add additional styling as needed
});
