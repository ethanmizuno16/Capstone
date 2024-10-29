import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { Colors, Fonts, Spacing, Borders } from "../Theme"; // Import theme variables

const PACUScreen = () => {
  const [pacuPatients, setPacuPatients] = useState([]);

  // Fetch PACU patients from Firebase
  useEffect(() => {
    const fetchPacuPatients = async () => {
      try {
        const patientsCollection = collection(db, "PACU", "People", "Patients");
        const querySnapshot = await getDocs(patientsCollection);
        const patientsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPacuPatients(patientsData);
      } catch (error) {
        console.error("Error fetching PACU patients data:", error);
      }
    };

    fetchPacuPatients();
  }, []);

  // Toggle discharge readiness for a patient
  const toggleDischargeReadiness = async (id) => {
    const currentStatus = pacuPatients.find(
      (patient) => patient.id === id,
    ).readyfordischarge;

    try {
      const patientDocRef = doc(db, "PACU", "People", "Patients", id);
      await updateDoc(patientDocRef, {
        readyfordischarge: !currentStatus,
      });

      setPacuPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient.id === id
            ? { ...patient, readyfordischarge: !patient.readyfordischarge }
            : patient,
        ),
      );
    } catch (error) {
      console.error("Error updating discharge status:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tableTitle}>PACU Patients</Text>
      {pacuPatients.map((patient) => (
        <View style={styles.patientRow} key={patient.id}>
          <View style={styles.patientDetails}>
            <Text style={styles.patientName}>{patient.name}</Text>
            <Text style={styles.patientInfo}>MRN: {patient.mrn}</Text>
            <Text style={styles.patientInfo}>DOB: {patient.dob}</Text>
            <Text style={styles.anesthesiaInfo}>
              Anesthesiologist: {patient.anesthesiologist} ({patient.shift})
            </Text>
          </View>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => toggleDischargeReadiness(patient.id)}
          >
            <Text style={styles.dischargeLabel}>Ready for Discharge</Text>
            <Checkbox
              status={patient.readyfordischarge ? "checked" : "unchecked"}
              color={patient.readyfordischarge ? Colors.success : Colors.error}
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
    backgroundColor: Colors.background,
    padding: Spacing.medium,
  },
  tableTitle: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    color: Colors.primary,
    marginBottom: Spacing.small,
    textAlign: "center",
  },
  patientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.cardBackground,
    padding: Spacing.medium,
    marginBottom: Spacing.small,
    borderRadius: Borders.radius.medium,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  patientDetails: {
    flex: 2,
    paddingRight: Spacing.small,
  },
  patientName: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  patientInfo: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.regular,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  anesthesiaInfo: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.regular,
    color: Colors.secondary,
    marginTop: Spacing.xs,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightBackground, // Optional lighter background
    padding: Spacing.small,
    borderRadius: Borders.radius.small,
  },
  dischargeLabel: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.bold,
    marginRight: Spacing.xs,
    color: Colors.text,
  },
});

export default PACUScreen;
