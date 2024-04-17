import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import surgeries from './surgeries.json'; // Make sure this is the correct path to your JSON file

const orData = [
  {
    id: 'OR 1',
    surgeonName: 'Dr. Smith',
    raName: 'Dr. Johnson',
    surgeryType: 'Open Appendectomy',
    surgeryStage: 'Intubation',
  },
  {
    id: 'OR 2',
    surgeonName: 'Dr. Jones',
    raName: 'Dr. Williams',
    surgeryType: 'Single Lung Transplant',
    surgeryStage: 'Lung Exposure',
  },
  {
    id: 'OR 3',
    surgeonName: 'Dr. Vogel',
    raName: 'Dr. Neils',
    surgeryType: 'Spinal Fusion: Anterior Lumbar Interbody Fusion (ALIF)',
    surgeryStage: 'Spine exposure',
  },
  {
    id: 'OR 4',
    surgeonName: 'Dr. Lee',
    raName: 'Dr. Kim',
    surgeryType: 'Cesarean Section',
    surgeryStage: 'Suctioning of Amniotic Fluids',
  },
  {
    id: 'OR 5',
    surgeonName: 'Dr. Gomez',
    raName: 'Dr. Santos',
    surgeryType: 'Herniorrhaphy (Repair)',
    surgeryStage: 'Hernia isolation',
  },
  {
    id: 'OR 6',
    surgeonName: 'Dr. Patel',
    raName: 'Dr. Murray',
    surgeryType: 'Herniorrhaphy (Removal)',
    surgeryStage: 'Initial incision',
  },
];

const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;

const HomeInterface = ({ navigation }) => {
  
  // Function to calculate the completion percentage of the current surgery step
  const getCompletionPercentage = (surgeryType, currentStep) => {
    const surgery = surgeries.find(s => s.surgeryType === surgeryType);
    if (surgery) {
      const totalSteps = surgery.steps.length;
      const currentStepIndex = surgery.steps.indexOf(currentStep) + 1; // +1 for 1-based index
      const percentage = (currentStepIndex / totalSteps) * 100; // Calculate the percentage
      return `${percentage.toFixed(0)}% Complete`; // Convert to a string with 0 decimal places and append 'Complete'
    }
    return '0% Complete'; // Default if not found, also append 'Complete'
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orData}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('DetailedOR', { or: item })}
          >
            <Text style={styles.cardTitle}>{item.id}: {item.surgeryType}</Text>
            <Text style={styles.cardContent}>Surgeon: {item.surgeonName}</Text>
            <Text style={styles.cardContent}>R.A.: {item.raName}</Text>
            <Text style={styles.cardContent}>
              Stage: {item.surgeryStage}
            </Text>
            {/* Updated line for Surgery Progression with 'Complete' */}
            <Text style={styles.cardContent}>
              Surgery Progression: {getCompletionPercentage(item.surgeryType, item.surgeryStage)}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: cardWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5, // Ensure space between lines for readability
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default HomeInterface;