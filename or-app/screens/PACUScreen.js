import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper"; // Import Checkbox from react-native-paper
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../services/firebase";

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
        console.error("Error fetching PACU patients data: ", error);
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
      {/* Title for PACU patients */}
      <Text style={styles.tableTitle}>PACU Patients</Text>

      {/* PACU patients table */}
      {pacuPatients.map((patient) => (
        <View style={styles.patientRow} key={patient.id}>
          {/* Patient Details */}
          <View style={styles.patientDetails}>
            <Text style={styles.patientName}>{patient.name}</Text>
            <Text style={styles.patientInfo}>MRN: {patient.mrn}</Text>
            <Text style={styles.patientInfo}>DOB: {patient.dob}</Text>

            {/* New: Anesthesiologist Details */}
            <Text style={styles.anesthesiaInfo}>
              Anesthesiologist: {patient.anesthesiologist} ({patient.shift})
            </Text>
          </View>

          {/* Discharge Checkbox */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => toggleDischargeReadiness(patient.id)}
          >
            <Text style={styles.dischargeLabel}>Ready for Discharge</Text>
            <Checkbox
              status={patient.readyfordischarge ? "checked" : "unchecked"}
              color={patient.readyfordischarge ? "#4CAF50" : "#f44336"} // Change color based on readiness
            />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

// Styles for the screen
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
  anesthesiaInfo: {
    fontSize: 14,
    color: "#007bff", // Make anesthesiologist information blue for visibility
    marginTop: 5,
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
