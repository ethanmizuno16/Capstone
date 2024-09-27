import React from "react"; // Import React
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native"; // Import necessary components from React Native

// Import the surgery context to get OR data and surgery steps
import { useSurgery } from "../context/SurgeryContext";

// Get the window dimensions for responsive card sizing
const { width } = Dimensions.get("window");
const cardWidth = width * 0.9; // Set the card width to 90% of the screen width

// Main component for the OR Dashboard
const ORDashboard = ({ navigation }) => {
  // Access OR data and the function to get surgery steps from context
  const { orData, getSurgerySteps } = useSurgery();

  // Function to calculate the completion percentage of the current surgery step
  const getCompletionPercentage = (surgeryType, currentStep) => {
    const steps = getSurgerySteps(surgeryType); // Get steps for the given surgery type
    const currentStepIndex = steps.indexOf(currentStep); // Find the index of the current step
    const percentage = ((currentStepIndex + 1) / steps.length) * 100; // Calculate completion percentage
    return `${percentage.toFixed(0)}% Complete (Stage ${currentStepIndex + 1}/${steps.length})`; // Format the percentage and step count
  };

  return (
    <View style={styles.container}>
      {/* FlatList is used to efficiently render the list of ORs */}
      <FlatList
        data={orData} // OR data is fetched from context
        renderItem={({ item }) => (
          // Each item is a card showing details about the OR
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DetailedOR", { orId: item.id })} // Navigate to detailed view when a card is pressed
          >
            {/* OR details including surgeon, anesthesiologist, and surgery stage */}
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
              {getCompletionPercentage(item.surgeryType, item.surgeryStage)}{" "}
              {/* Show surgery progress */}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id} // Use OR id as the unique key for each item
        contentContainerStyle={styles.contentContainer} // Apply padding to the FlatList content
      />
    </View>
  );
};

// Styles for the dashboard
const styles = StyleSheet.create({
  container: {
    flex: 1, // Full-screen height
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
    backgroundColor: "#f5f5f5", // Light grey background
  },
  card: {
    backgroundColor: "#ffffff", // White background for the card
    borderRadius: 10, // Rounded corners
    padding: 20, // Padding inside the card
    marginVertical: 10, // Margin between cards
    width: cardWidth, // Card width calculated earlier
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 3, // Shadow elevation for Android
  },
  cardTitle: {
    fontSize: 20, // Font size for the title
    fontWeight: "bold", // Bold text
    color: "#333", // Dark text color
    marginBottom: 5, // Space below the title
  },
  cardContent: {
    fontSize: 16, // Font size for the content text
    color: "#666", // Grey text color
    marginBottom: 5, // Space below each content line
  },
  contentContainer: {
    paddingTop: 20, // Padding at the top of the FlatList
    paddingBottom: 20, // Padding at the bottom of the FlatList
  },
});

export default ORDashboard; // Export the ORDashboard component so it can be used in other parts of the app
