import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import {
  Colors,
  Fonts,
  Spacing,
  Borders,
  Shadows,
  ButtonStyles,
} from "../Theme";

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
              color={Colors.primary} // Consistent checkbox color from theme
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
    padding: Spacing.medium,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    color: Colors.text,
    marginBottom: Spacing.small,
  },
  patientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.cardBackground,
    padding: Spacing.medium,
    borderRadius: Borders.radius.medium,
    marginBottom: Spacing.small,
    ...Shadows, // Apply shadow styles from theme
  },
  patientDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.bold,
    color: Colors.primary,
  },
  patientInfo: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.regular,
    color: Colors.textLight,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: Fonts.size.small,
    marginRight: Spacing.small,
    color: Colors.text,
    fontFamily: Fonts.family.bold,
  },
  consultRow: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.medium,
    borderRadius: Borders.radius.medium,
    marginBottom: Spacing.small,
    ...Shadows, // Apply shadow styles from theme
  },
  consultName: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.bold,
    color: Colors.primary,
  },
  consultInfo: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.regular,
    color: Colors.textLight,
  },
  consultProcedure: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.italic,
    color: Colors.secondary,
  },
});

export default AcutePainScreen;
