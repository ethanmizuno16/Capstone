import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper"; // Import Checkbox from react-native-paper

const PACUScreen = () => {
  // Sample data for patients in PACU
  const [pacuPatients, setPacuPatients] = useState([
    {
      id: 1,
      patientName: "John Doe",
      mrn: "123456",
      dob: "Jan 15, 1980",
      isReadyForDischarge: false,
    },
    {
      id: 2,
      patientName: "Jane Smith",
      mrn: "654321",
      dob: "Mar 22, 1975",
      isReadyForDischarge: false,
    },
    {
      id: 3,
      patientName: "Mike Johnson",
      mrn: "789123",
      dob: "Jul 10, 1990",
      isReadyForDischarge: true,
    },
    {
      id: 4,
      patientName: "Sarah Wilson",
      mrn: "987654",
      dob: "Feb 19, 1985",
      isReadyForDischarge: false,
    },
  ]);

  // Toggle discharge readiness for a patient
  const toggleDischargeReadiness = (id) => {
    setPacuPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === id
          ? { ...patient, isReadyForDischarge: !patient.isReadyForDischarge }
          : patient
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
        {/* Title for PACU patients */}
        <Text style={styles.tableTitle}>PACU Patients</Text>

        {/* PACU patients table */}
        {pacuPatients.map((patient) => (
          <View style={styles.patientRow} key={patient.id}>
            {/* Patient Details */}
            <View style={styles.patientDetails}>
              <Text style={styles.patientName}>{patient.patientName}</Text>
              <Text style={styles.patientInfo}>MRN: {patient.mrn}</Text>
              <Text style={styles.patientInfo}>DOB: {patient.dob}</Text>
            </View>

            {/* Discharge Checkbox */}
            <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => toggleDischargeReadiness(patient.id)}
          >
            <Text style={styles.dischargeLabel}>Ready for Discharge</Text>
            <Checkbox
              status={patient.isReadyForDischarge ? "checked" : "unchecked"}
              color={patient.isReadyForDischarge ? "#4CAF50" : "#f44336"} // Change color based on readiness
            />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", // Light background for the whole screen
    padding: 16,
  },
  tableTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  patientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12, // More rounded for modern look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, // Slight elevation for a card effect
    borderWidth: 1,
    borderColor: "#ddd",
  },
  patientDetails: {
    flex: 2,
    paddingRight: 10,
  },
  patientName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  patientInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f4",
    padding: 8,
    borderRadius: 8,
  },
  dischargeLabel: {
    fontSize: 14,
    marginRight: 8,
    color: "#333",
  },
});

export default PACUScreen;