import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
// Update the import statement to point to the correct location
import { useSurgery } from "../context/SurgeryContext";  // Corrected path

const { width } = Dimensions.get("window");
const cardWidth = width * 0.9;

const HomeInterface = ({ navigation }) => {
  const { orData, getSurgerySteps } = useSurgery(); // Use the context to access OR data and surgery steps

  // Function to calculate the completion percentage of the current surgery step
  const getCompletionPercentage = (surgeryType, currentStep) => {
    const steps = getSurgerySteps(surgeryType); // Fetch steps from context
    const currentStepIndex = steps.indexOf(currentStep); // Find the current step index
    const percentage = ((currentStepIndex + 1) / steps.length) * 100; // Calculate percentage
    return `${percentage.toFixed(0)}% Complete (Stage ${currentStepIndex + 1}/${steps.length})`; // Format with "Stage" before fraction
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orData} // Use OR data from context
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DetailedOR", { orId: item.id })}
          >
            <Text style={styles.cardTitle}>
              {item.id}: {item.surgeryType}
            </Text>
            <Text style={styles.cardContent}>Surgeon: {item.surgeonName}</Text>
            <Text style={styles.cardContent}>
              Anesthesiologist: {item.raName}
            </Text>
            <Text style={styles.cardContent}>Stage: {item.surgeryStage}</Text>
            <Text style={styles.cardContent}>
              Surgery Progression:{" "}
              {getCompletionPercentage(item.surgeryType, item.surgeryStage)}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: cardWidth,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default HomeInterface;
