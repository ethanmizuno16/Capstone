import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Colors, Fonts, Spacing, Borders } from "../Theme"; // Import theme variables

const convertTo24Hour = (time) => {
  const [hourMinute, modifier] = time.split(" ");
  let [hours, minutes] = hourMinute.split(":");
  if (hours === "12") {
    hours = "00";
  }
  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}`;
};

const RegionalScreen = () => {
  const [consultRequests, setConsultRequests] = useState([
    {
      id: 1,
      name: "John Doe",
      mrn: "123456",
      dob: "Jan 15, 1980",
      procedure: "Femoral Nerve Block",
      time: "10:30 AM",
      urgent: false,
      requestingPhysician: "Dr. Green",
      assignedClinician: "",
    },
    {
      id: 2,
      name: "Jane Smith",
      mrn: "654321",
      dob: "Mar 22, 1975",
      procedure: "Sciatic Nerve Block",
      time: "11:00 AM",
      urgent: true,
      requestingPhysician: "Dr. White",
      assignedClinician: "",
    },
    {
      id: 3,
      name: "Mike Johnson",
      mrn: "789123",
      dob: "Jul 10, 1990",
      procedure: "Interscalene Block",
      time: "9:15 AM",
      urgent: false,
      requestingPhysician: "Dr. Adams",
      assignedClinician: "",
    },
    {
      id: 4,
      name: "Emily Brown",
      mrn: "456789",
      dob: "Oct 5, 1982",
      procedure: "Axillary Nerve Block",
      time: "8:00 AM",
      urgent: true,
      requestingPhysician: "Dr. Brown",
      assignedClinician: "",
    },
  ]);

  const [anesthesiologists] = useState([
    { name: "Dr. Lee", available: true },
    { name: "Dr. Adams", available: false },
    { name: "Dr. Jones", available: true },
    { name: "Dr. Smith", available: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedConsultId, setSelectedConsultId] = useState(null);
  const [sortField, setSortField] = useState("time");

  const toggleUrgency = (id) => {
    setConsultRequests((prevConsults) =>
      prevConsults.map((consult) =>
        consult.id === id ? { ...consult, urgent: !consult.urgent } : consult,
      ),
    );
  };

  const selectClinician = (clinician) => {
    setConsultRequests((prevConsults) =>
      prevConsults.map((consult) =>
        consult.id === selectedConsultId
          ? { ...consult, assignedClinician: clinician }
          : consult,
      ),
    );
    setModalVisible(false);
  };

  const sortConsults = (field) => {
    const sortedConsults = [...consultRequests].sort((a, b) => {
      if (field === "time") {
        return (
          new Date(`1970-01-01T${convertTo24Hour(a.time)}`) -
          new Date(`1970-01-01T${convertTo24Hour(b.time)}`)
        );
      } else if (field === "urgent") {
        return a.urgent === b.urgent ? 0 : a.urgent ? -1 : 1;
      }
    });
    setSortField(field);
    setConsultRequests(sortedConsults);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sortingButtons}>
        <TouchableOpacity onPress={() => sortConsults("time")}>
          <Text
            style={[
              styles.sortButton,
              sortField === "time" && styles.activeSortButton,
            ]}
          >
            Sort by Time
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sortConsults("urgent")}>
          <Text
            style={[
              styles.sortButton,
              sortField === "urgent" && styles.activeSortButton,
            ]}
          >
            Sort by Urgency
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {consultRequests.map((consult) => (
          <View style={styles.consultRow} key={consult.id}>
            <View style={styles.consultDetails}>
              <Text style={styles.consultName}>{consult.name}</Text>
              <Text style={styles.consultInfo}>MRN: {consult.mrn}</Text>
              <Text style={styles.consultInfo}>DOB: {consult.dob}</Text>
              <Text style={styles.consultInfo}>
                Procedure: {consult.procedure}
              </Text>
              <Text style={styles.consultInfo}>
                Time of Request: {convertTo24Hour(consult.time)}
              </Text>
              <Text style={styles.consultInfo}>
                Requesting Physician: {consult.requestingPhysician}
              </Text>
              <TouchableOpacity
                style={styles.assignedClinicianBtn}
                onPress={() => {
                  setSelectedConsultId(consult.id);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.consultInfo}>
                  Assigned Clinician:{" "}
                  {consult.assignedClinician ? (
                    consult.assignedClinician
                  ) : (
                    <Text style={styles.selectText}>Select</Text>
                  )}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.urgentSwitch}>
              <Text style={styles.urgentLabel}>Urgent</Text>
              <Switch
                value={consult.urgent}
                onValueChange={() => toggleUrgency(consult.id)}
                trackColor={{ false: Colors.border, true: Colors.secondary }}
                thumbColor={
                  consult.urgent ? Colors.secondary : Colors.lightBackground
                }
              />
            </View>
          </View>
        ))}

        <View style={styles.anesthesiologistsSection}>
          <Text style={styles.anesthesiologistsTitle}>Anesthesiologists</Text>
          {anesthesiologists.map((anesthesiologist, index) => (
            <View key={index} style={styles.anesthesiologistRow}>
              <Text
                style={[
                  styles.anesthesiologistName,
                  anesthesiologist.available ? styles.available : styles.busy,
                ]}
              >
                {anesthesiologist.name} (
                {anesthesiologist.available ? "Available" : "Busy"})
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Assigned Clinician</Text>
            <FlatList
              data={anesthesiologists}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    !item.available && {
                      backgroundColor: Colors.lightBackground,
                    },
                  ]}
                  onPress={() => item.available && selectClinician(item.name)}
                  disabled={!item.available}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      !item.available && { color: Colors.textLight },
                    ]}
                  >
                    {item.name} {item.available ? "" : "(Busy)"}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.medium,
    backgroundColor: Colors.background,
  },
  consultRow: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.medium,
    marginVertical: Spacing.small,
    borderRadius: Borders.radius.medium,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  consultDetails: { flex: 1 },
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
  urgentSwitch: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  urgentLabel: {
    marginRight: Spacing.xs,
    fontWeight: "bold",
    color: Colors.text,
  },
  sortingButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.medium,
  },
  sortButton: {
    fontSize: Fonts.size.small,
    color: Colors.secondary,
    fontFamily: Fonts.family.bold,
  },
  activeSortButton: { textDecorationLine: "underline" },
  anesthesiologistsSection: { marginTop: Spacing.large },
  anesthesiologistsTitle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.bold,
    color: Colors.primary,
    marginBottom: Spacing.small,
  },
  anesthesiologistRow: { paddingVertical: Spacing.xs },
  anesthesiologistName: { fontSize: Fonts.size.small },
  available: { color: Colors.success },
  busy: { color: Colors.error },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: Colors.cardBackground,
    borderRadius: Borders.radius.medium,
    padding: Spacing.medium,
  },
  modalTitle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.bold,
    marginBottom: Spacing.medium,
  },
  modalItem: {
    padding: Spacing.small,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  modalItemText: { fontSize: Fonts.size.small },
  closeButton: { marginTop: Spacing.medium, alignItems: "center" },
  closeButtonText: { color: Colors.secondary, fontFamily: Fonts.family.bold },

  selectText: { color: Colors.secondary, fontFamily: Fonts.family.bold },
});

export default RegionalScreen;
