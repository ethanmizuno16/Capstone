import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { DataTable } from 'react-native-paper';

const PACUScreen = () => {
  // Sample list of PACU patients
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", mrn: "123456", procedure: "Knee Replacement", readyForDischarge: false },
    { id: 2, name: "Jane Smith", mrn: "654321", procedure: "Hip Replacement", readyForDischarge: false },
    { id: 3, name: "Mike Johnson", mrn: "789123", procedure: "Appendectomy", readyForDischarge: false },
  ]);

  // Function to toggle the ready-for-discharge state
  const toggleDischarge = (id) => {
    const updatedPatients = patients.map((patient) =>
      patient.id === id ? { ...patient, readyForDischarge: !patient.readyForDischarge } : patient
    );
    setPatients(updatedPatients);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>PACU Patients</Text>

      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title style={styles.column}>Patient Name</DataTable.Title>
          <DataTable.Title style={styles.column}>MRN</DataTable.Title>
          <DataTable.Title style={styles.column}>Procedure</DataTable.Title>
          <DataTable.Title style={styles.column}>Ready for Discharge</DataTable.Title>
        </DataTable.Header>

        {patients.map((patient) => (
          <DataTable.Row key={patient.id} style={styles.tableRow}>
            <DataTable.Cell style={styles.column}>{patient.name}</DataTable.Cell>
            <DataTable.Cell style={styles.column}>{patient.mrn}</DataTable.Cell>
            <DataTable.Cell style={styles.column}>{patient.procedure}</DataTable.Cell>
            <DataTable.Cell style={styles.column}>
              <Switch
                value={patient.readyForDischarge}
                onValueChange={() => toggleDischarge(patient.id)}
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    width: '100%', // Ensures table takes up the full width of the screen
  },
  tableRow: {
    height: 50, // Adjust row height for more space
  },
  column: {
    flex: 1, // Distribute columns evenly across the table
    justifyContent: 'flex-start',
  },
});

export default PACUScreen;
