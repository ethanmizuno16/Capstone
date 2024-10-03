import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { DataTable } from "react-native-paper"; // Import DataTable from react-native-paper
import { Picker } from "@react-native-picker/picker"; // Import Picker for assigning clinicians

const RegionalScreen = () => {
  const [consultRequests, setConsultRequests] = useState([
    {
      id: 1,
      patientName: "John Doe",
      mrn: "123456",
      dob: "Jan 15, 1980",
      timeOfRequest: "10:30",
      nerveBlock: "Femoral Nerve Block",
      requestingPhysician: "Dr. Green",
      isUrgent: true,
      assignedClinician: "Dr. Smith",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      mrn: "654321",
      dob: "Mar 22, 1975",
      timeOfRequest: "11:00",
      nerveBlock: "Sciatic Nerve Block",
      requestingPhysician: "Dr. White",
      isUrgent: false,
      assignedClinician: "Dr. Lee",
    },
    {
      id: 3,
      patientName: "Mike Johnson",
      mrn: "789123",
      dob: "Jul 10, 1990",
      timeOfRequest: "09:15",
      nerveBlock: "Interscalene Block",
      requestingPhysician: "Dr. Adams",
      isUrgent: false,
      assignedClinician: "Dr. Lee",
    },
    {
      id: 4,
      patientName: "Sarah Wilson",
      mrn: "987654",
      dob: "Feb 19, 1985",
      timeOfRequest: "12:45",
      nerveBlock: "Popliteal Nerve Block",
      requestingPhysician: "Dr. Clark",
      isUrgent: true,
      assignedClinician: "Dr. Smith",
    },
    {
      id: 5,
      patientName: "Chris Brown",
      mrn: "123789",
      dob: "Aug 30, 1972",
      timeOfRequest: "08:45",
      nerveBlock: "Axillary Nerve Block",
      requestingPhysician: "Dr. Taylor",
      isUrgent: false,
      assignedClinician: null,
    },
  ]);

  const [anesthesiologists, setAnesthesiologists] = useState([
    { id: 1, name: "Dr. Smith", status: "Available" },
    { id: 2, name: "Dr. Lee", status: "Busy" },
    { id: 3, name: "Dr. Adams", status: "Available" },
  ]);

  const toggleUrgency = (id) => {
    setConsultRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id
          ? { ...request, isUrgent: !request.isUrgent }
          : request,
      ),
    );
  };

  const assignClinician = (id, clinician) => {
    setConsultRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id
          ? { ...request, assignedClinician: clinician }
          : request,
      ),
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Title for the consult requests table */}
        <Text style={styles.tableTitle}>Consult Requests</Text>

        {/* Horizontal ScrollView for the consult requests table */}
        <ScrollView horizontal={true}>
          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={styles.patientName}>
                Patient Name
              </DataTable.Title>
              <DataTable.Title style={styles.mrn}>MRN</DataTable.Title>
              <DataTable.Title style={styles.dob}>DOB</DataTable.Title>
              <DataTable.Title style={styles.timeOfRequest}>
                Time of Request (24H)
              </DataTable.Title>
              <DataTable.Title style={styles.nerveBlock}>
                Nerve Block
              </DataTable.Title>
              <DataTable.Title style={styles.requestingPhysician}>
                Requesting Physician
              </DataTable.Title>
              <DataTable.Title style={styles.assignedClinician}>
                Assigned Clinician
              </DataTable.Title>
              <DataTable.Title style={styles.urgency}>Urgency</DataTable.Title>
            </DataTable.Header>

            {consultRequests.map((request) => (
              <DataTable.Row key={request.id}>
                <DataTable.Cell style={styles.patientName}>
                  {request.patientName}
                </DataTable.Cell>
                <DataTable.Cell style={styles.mrn}>
                  {request.mrn}
                </DataTable.Cell>
                <DataTable.Cell style={styles.dob}>
                  {request.dob}
                </DataTable.Cell>
                <DataTable.Cell style={styles.timeOfRequest}>
                  {request.timeOfRequest}
                </DataTable.Cell>
                <DataTable.Cell style={styles.nerveBlock}>
                  {request.nerveBlock}
                </DataTable.Cell>
                <DataTable.Cell style={styles.requestingPhysician}>
                  {request.requestingPhysician}
                </DataTable.Cell>

                <DataTable.Cell style={styles.assignedClinician}>
                  <Picker
                    selectedValue={
                      request.assignedClinician || "Select a clinician"
                    }
                    style={styles.picker}
                    onValueChange={(value) =>
                      assignClinician(request.id, value)
                    }
                  >
                    <Picker.Item label="Select a clinician" value="" />
                    {anesthesiologists
                      .filter((a) => a.status === "Available")
                      .map((clinician) => (
                        <Picker.Item
                          key={clinician.id}
                          label={clinician.name}
                          value={clinician.name}
                        />
                      ))}
                  </Picker>
                </DataTable.Cell>

                <DataTable.Cell style={styles.urgency}>
                  <TouchableOpacity onPress={() => toggleUrgency(request.id)}>
                    <Text
                      style={
                        request.isUrgent
                          ? styles.urgentText
                          : styles.notUrgentText
                      }
                    >
                      {request.isUrgent ? "★ Urgent" : "☆ Not Urgent"}
                    </Text>
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>

        {/* Anesthesiologist Availability Table */}
        <View style={styles.anesthesiologistsContainer}>
          <Text style={styles.anesthesiologistsHeader}>
            Anesthesiologists Availability
          </Text>
          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={styles.anesthesiologistName}>
                Name
              </DataTable.Title>
              <DataTable.Title style={styles.anesthesiologistStatus}>
                Status
              </DataTable.Title>
            </DataTable.Header>

            {anesthesiologists.map((anesthesiologist) => (
              <DataTable.Row key={anesthesiologist.id}>
                <DataTable.Cell style={styles.anesthesiologistName}>
                  {anesthesiologist.name}
                </DataTable.Cell>
                <DataTable.Cell style={styles.anesthesiologistStatus}>
                  {anesthesiologist.status}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
  },
  patientName: {
    flex: 3,
    minWidth: 150,
  },
  mrn: {
    flex: 1,
    minWidth: 100,
  },
  dob: {
    flex: 2,
    minWidth: 150,
  },
  timeOfRequest: {
    flex: 2,
    minWidth: 180,
  },
  nerveBlock: {
    flex: 3,
    minWidth: 200,
  },
  requestingPhysician: {
    flex: 2,
    minWidth: 150,
  },
  assignedClinician: {
    flex: 2,
    minWidth: 150,
  },
  urgency: {
    flex: 1,
    minWidth: 100,
  },
  picker: {
    width: 130,
    height: 40,
  },
  urgentText: {
    color: "red",
    fontWeight: "bold",
  },
  notUrgentText: {
    color: "black",
  },
  anesthesiologistsContainer: {
    marginTop: 20,
  },
  anesthesiologistsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  anesthesiologistName: {
    flex: 2,
    minWidth: 150,
  },
  anesthesiologistStatus: {
    flex: 1,
    minWidth: 100,
  },
});

export default RegionalScreen;
