import React, { useState, useEffect } from "react";
import { Colors, Fonts, Spacing, Borders } from "../Theme";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import casesData from "../data/cases_filtered_json.json";
import surgeries from "../data/surgeries.json";
import { useSurgery } from "../context/SurgeryContext";
import VitalsDataSection from "../components/VitalsDataSection"; // Import the VitalsDataSection component

const selectRandomCase = (cases) => {
  const randomIndex = Math.floor(Math.random() * cases.length);
  return cases[randomIndex];
};

// Main DetailedOR component
const DetailedOR = ({ route, navigation }) => {
  const { orId } = route.params;
  const { orData, getSurgerySteps } = useSurgery();
  const or = orData.find((o) => o.id === orId);

  if (!or) {
    return <Text>No data available for this OR.</Text>;
  }

  const steps = getSurgerySteps(or.surgeryType);
  const currentStepIndex = steps.indexOf(or.surgeryStage);

  const getCompletionPercentage = (surgeryType, currentStep) => {
    const surgery = surgeries.find((s) => s.surgeryType === surgeryType);
    if (surgery) {
      const totalSteps = surgery.steps.length;
      const currentStepIndex = surgery.steps.indexOf(currentStep) + 1;
      const percentage = (currentStepIndex / totalSteps) * 100;
      return `${percentage.toFixed(0)}% Complete (Stage ${currentStepIndex}/${totalSteps})`;
    }
    return "0% Complete";
  };

  const [surgeryInfo, setSurgeryInfo] = useState(selectRandomCase(casesData));
  const opStart = surgeryInfo.opstart;
  const [operationStartTime, setOperationStartTime] = useState("");

  useEffect(() => {
    const currentTime = new Date();
    const opStartDate = new Date(currentTime.getTime() - opStart * 1000);
    const opStartString = opStartDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setOperationStartTime(opStartString);
  }, [surgeryInfo.opstart]);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Display OR and surgery details */}
        <View style={styles.detailBox}>
          <Text style={styles.title}>{or.id}</Text>
          <Text style={styles.detailText}>Surgeon Name: {or.surgeonName}</Text>
          <Text style={styles.detailText}>
            {or.replacement
              ? `Anesthesia: ${or.raName} (${or.shift}) → ${or.replacement.name} (${or.replacement.shift})`
              : `Anesthesia: ${or.raName} (${or.shift}) → finish case`}
          </Text>
          <Text style={styles.detailText}>Surgery Type: {or.surgeryType}</Text>
          <Text style={styles.detailText}>
            Surgery Stage: {or.surgeryStage}
          </Text>
          <Text style={styles.detailText}>
            Surgery Progression:{" "}
            {getCompletionPercentage(or.surgeryType, or.surgeryStage)}
          </Text>
          <Text style={styles.detailText}>
            Operation Start Time: {operationStartTime}
          </Text>
        </View>

        {/* Vitals Section */}
        <VitalsDataSection />

        {/* Messaging Button */}
        <View style={{ paddingHorizontal: Spacing.medium }}>
          <TouchableOpacity
            style={styles.messagingButton}
            onPress={() => navigation.navigate("PushNotifications", { or: or })}
          >
            <Text style={styles.buttonText}>Messaging</Text>
          </TouchableOpacity>
        </View>

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
    backgroundColor: Colors.primary || "#007AFF", // Adjust color if needed
    borderRadius: Borders.radius.medium,
    paddingVertical: Spacing.medium, // Vertical padding for height
    marginHorizontal: Spacing.medium, // Side margins for spacing within container
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF", // White text for contrast
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.bold,
  },
});

export default DetailedOR;
