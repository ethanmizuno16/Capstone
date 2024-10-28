import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";

const AcutePainScreen = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      mrn: "123456",
      dob: "Jan 15, 1980",
      seenToday: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      mrn: "654321",
      dob: "Mar 22, 1975",
      seenToday: false,
    },
    {
      id: 3,
      name: "Michael Brown",
      mrn: "789123",
      dob: "Jul 10, 1990",
      seenToday: true,
    },
  ]);

  const [newConsults, setNewConsults] = useState([
    {
      id: 1,
      name: "Emily Johnson",
      mrn: "456789",
      dob: "Oct 5, 1982",
      procedure: "Nerve Block",
    },
    {
      id: 2,
      name: "William Lee",
      mrn: "987654",
      dob: "Dec 19, 1987",
      procedure: "Epidural Injection",
    },
  ]);

  const toggleSeenToday = (id) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === id
          ? { ...patient, seenToday: !patient.seenToday }
          : patient,
      ),
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Current Patients</Text>
      {patients.map((patient) => (
        <View key={patient.id} style={styles.patientRow}>
          <View style={styles.patientDetails}>
            <Text style={styles.patientName}>{patient.name}</Text>
            <Text style={styles.patientInfo}>MRN: {patient.mrn}</Text>
            <Text style={styles.patientInfo}>DOB: {patient.dob}</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Seen Today</Text>
            <Checkbox
              status={patient.seenToday ? "checked" : "unchecked"}
              onPress={() => toggleSeenToday(patient.id)}
              color="#007BFF" // Consistent checkbox color
            />
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>New Consults</Text>
      {newConsults.map((consult) => (
        <View key={consult.id} style={styles.consultRow}>
          <Text style={styles.consultName}>{consult.name}</Text>
          <Text style={styles.consultInfo}>MRN: {consult.mrn}</Text>
          <Text style={styles.consultInfo}>DOB: {consult.dob}</Text>
          <Text style={styles.consultProcedure}>
            Procedure: {consult.procedure}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Consistent title color
    marginBottom: 10,
  },
  patientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  patientDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B2E83", // Primary color for names
  },
  patientInfo: {
    fontSize: 14,
    color: "#666", // Secondary color for info text
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 14,
    marginRight: 10,
    color: "#333",
    fontWeight: "bold",
  },
  consultRow: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  consultName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B2E83",
  },
  consultInfo: {
    fontSize: 14,
    color: "#666",
  },
  consultProcedure: {
    fontSize: 14,
    color: "#007BFF",
    fontStyle: "italic",
  },
});

export default AcutePainScreen;
