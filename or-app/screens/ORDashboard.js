import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSurgery } from "../context/SurgeryContext";
import { Colors, Fonts, Spacing, Borders } from "../Theme"; // Import theme variables

const { width } = Dimensions.get("window");
const cardWidth = width * 0.9; // Set the card width to 90% of the screen width

const ORDashboard = ({ navigation }) => {
  const { orData, getSurgerySteps } = useSurgery();

  const getCompletionPercentage = (surgeryType, currentStep) => {
    const steps = getSurgerySteps(surgeryType);
    const currentStepIndex = steps.indexOf(currentStep);
    const percentage = ((currentStepIndex + 1) / steps.length) * 100;
    return `${percentage.toFixed(0)}% Complete (Stage ${currentStepIndex + 1}/${steps.length})`;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orData}
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
              {item.replacement
                ? `Anesthesia: ${item.raName} (${item.shift}) → ${item.replacement.name} (${item.replacement.shift})`
                : `Anesthesia: ${item.raName} (${item.shift}) → finish case`}
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
    backgroundColor: Colors.background, // Theme background color
  },
  card: {
    backgroundColor: Colors.cardBackground, // Theme card background color
    borderRadius: Borders.radius.medium,
    padding: Spacing.medium,
    marginVertical: Spacing.small,
    width: cardWidth,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.bold,
    color: Colors.primary, // Primary color for title
    marginBottom: Spacing.xs,
  },
  cardContent: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.regular,
    color: Colors.textLight, // Light text color for content
    marginBottom: Spacing.xs,
  },
  contentContainer: {
    paddingTop: Spacing.large,
    paddingBottom: Spacing.large,
  },
});

export default ORDashboard;
