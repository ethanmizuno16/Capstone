import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSurgery } from '../context/SurgeryContext';

const DeliveriesTab = ({ navigation }) => {
  const { orData, getSurgerySteps } = useSurgery();
  
  // Filter OR data to only show delivery-related cases (e.g., C-Sections)
  const deliveryCases = orData.filter((or) => or.surgeryType === 'Cesarean Section');

  const getCompletionPercentage = (surgeryType, currentStep) => {
    const steps = getSurgerySteps(surgeryType);
    const currentStepIndex = steps.indexOf(currentStep);
    return ((currentStepIndex + 1) / steps.length) * 100;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Active Deliveries</Text>
      <FlatList
        data={deliveryCases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetailedOR', { orId: item.id })}
          >
            <Text style={styles.name}>Patient: {item.id}</Text>
            <Text style={styles.details}>Surgeon: {item.surgeonName}</Text>
            <Text style={styles.details}>Anesthesiologist: {item.raName}</Text>
            <Text style={styles.details}>
              Progress: {getCompletionPercentage(item.surgeryType, item.surgeryStage).toFixed(0)}% Complete
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
});

export default DeliveriesTab;
