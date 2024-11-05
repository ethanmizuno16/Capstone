import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Modal,
  Alert,
} from "react-native";
import { Colors, Fonts, Spacing, Borders } from "../Theme";
import { useObstetrics } from "../context/ObstetricsContext";
import VitalsDataSection from "../components/VitalsDataSection"; // Import VitalsDataSection
import { MaterialIcons } from "@expo/vector-icons"; // Import icons for custom checkbox

// Custom checkbox component
const CustomCheckBox = ({ isChecked, onPress, label }) => (
    <TouchableOpacity style={styles.checkBoxItem} onPress={onPress}>
      <MaterialIcons
        name={isChecked ? "check-box" : "check-box-outline-blank"}
        size={28} // Slightly increase icon size for better visibility
        color={Colors.primary}
      />
      <Text style={styles.checkBoxLabel}>{label}</Text>
    </TouchableOpacity>
  );

const DetailedObstetrics = ({ route, navigation }) => {
  const { caseId } = route.params;
  const { obCases, updateCaseStep, getCompletionPercentage } = useObstetrics();
  const obCase = obCases.find((c) => c.id === caseId);

  const [isTechModalVisible, setIsTechModalVisible] = useState(false);
  const [equipmentRequests, setEquipmentRequests] = useState({
    arterialLine: false,
    glidescope: false,
    POCUS: false,
    vascularUltrasound: false,
    CO2Absorber: false,
  });

  if (!obCase) {
    return <Text>No data available for this case.</Text>;
  }

  const handleProgression = () => {
    updateCaseStep(caseId);
  };

  const handleSubmitRequest = () => {
    const selectedRequests = Object.keys(equipmentRequests).filter(
      (item) => equipmentRequests[item],
    );
    Alert.alert(
      "Request Submitted",
      `Equipment requested: ${selectedRequests.join(", ")}`,
    );
    setIsTechModalVisible(false); // Close the modal after submitting
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.detailBox}>
          <Text style={styles.title}>{obCase.patientName}</Text>
          <Text style={styles.detailText}>Doctor: {obCase.doctorName}</Text>
          <Text style={styles.detailText}>Room: {obCase.roomNumber}</Text>
          <Text style={styles.detailText}>Status: {obCase.status}</Text>
          <Text style={styles.detailText}>Type: {obCase.caseType}</Text>
          <Text style={styles.detailText}>Current Stage: {obCase.currentStep}</Text>
          <Text style={styles.detailText}>
            Surgery Progression: {getCompletionPercentage(caseId)}
          </Text>
        </View>

        {/* Vitals Data Section */}
        <VitalsDataSection />

        {/* Surgery Progression Button */}
        <TouchableOpacity
          style={styles.messagingButton}
          onPress={() =>
            navigation.navigate("ObstetricsProgression", { caseId: obCase.id })
          }
        >
          <Text style={styles.buttonText}>Surgery Progression</Text>
        </TouchableOpacity>

        {/* Anesthesia Tech Button */}
        <TouchableOpacity
          style={styles.messagingButton}
          onPress={() => setIsTechModalVisible(true)}
        >
          <Text style={styles.buttonText}>Anesthesia Tech</Text>
        </TouchableOpacity>

        {/* Anesthesia Tech Modal */}
        <Modal
          visible={isTechModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsTechModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Anesthesia Tech Options</Text>

              {/* Call Tech Button */}
              <TouchableOpacity style={styles.callButton}>
                <Text style={styles.buttonText}>Call Tech</Text>
              </TouchableOpacity>

              {/* Quick Request Section */}
              <Text style={styles.quickRequestTitle}>Quick Request:</Text>
              <View style={styles.checkBoxContainer}>
                {Object.keys(equipmentRequests).map((item) => (
                  <CustomCheckBox
                    key={item}
                    label={item.replace(/([A-Z])/g, " $1")} // Format label
                    isChecked={equipmentRequests[item]}
                    onPress={() =>
                      setEquipmentRequests((prevState) => ({
                        ...prevState,
                        [item]: !prevState[item],
                      }))
                    }
                  />
                ))}
              </View>

              {/* Submit Request Button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmitRequest}
              >
                <Text style={styles.buttonText}>Submit Request</Text>
              </TouchableOpacity>

              <Button title="Close" onPress={() => setIsTechModalVisible(false)} />
            </View>
          </View>
        </Modal>

        {/* Button to go back to the previous screen */}
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.medium,
  },
  detailBox: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Borders.radius.medium,
    padding: Spacing.medium,
    marginVertical: Spacing.small,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    color: Colors.primary,
    marginBottom: Spacing.small,
  },
  detailText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.regular,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  messagingButton: {
    backgroundColor: Colors.primary,
    borderRadius: Borders.radius.medium,
    paddingVertical: Spacing.medium,
    alignItems: "center",
    marginBottom: Spacing.small,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.bold,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    padding: Spacing.medium,
    borderRadius: Borders.radius.medium,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    color: Colors.primary,
    marginBottom: Spacing.small,
    textAlign: "center",
  },
  callButton: {
    backgroundColor: Colors.secondary,
    borderRadius: Borders.radius.medium,
    paddingVertical: Spacing.medium,
    alignItems: "center",
    marginVertical: Spacing.small,
  },
  quickRequestTitle: {
    fontSize: Fonts.size.large, // Larger font size for the title
    fontFamily: Fonts.family.bold,
    marginBottom: Spacing.small,
    color: Colors.primary, // Primary color to make it stand out
  },
  checkBoxContainer: {
    marginVertical: Spacing.small,
  },
  checkBoxItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.xs, // Add padding between items
  },
  checkBoxLabel: {
    fontSize: Fonts.size.medium, // Increase font size for better readability
    fontFamily: Fonts.family.bold, // Make the text bold for emphasis
    marginLeft: Spacing.small, // Space between checkbox and label
    textTransform: "capitalize", // Capitalize each label for consistency
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: Borders.radius.medium,
    paddingVertical: Spacing.medium,
    alignItems: "center",
    marginVertical: Spacing.small,
  },
});

export default DetailedObstetrics;
