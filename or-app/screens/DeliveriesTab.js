import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useObstetrics } from "../context/ObstetricsContext";
import { Colors, Fonts, Spacing, Borders } from "../Theme"; // Import theme variables

const { width } = Dimensions.get("window");
const cardWidth = width * 0.9; // Set the card width to 90% of the screen width

const DeliveriesTab = () => {
  const { obCases, getSteps, getCompletionPercentage } = useObstetrics();
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const steps = getSteps(item.id); // Retrieve steps for each case
    const completionText = getCompletionPercentage(item.id); // Get progression percentage

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("DetailedObstetrics", { caseId: item.id })
        }
      >
        <Text style={styles.cardTitle}>
          Room {item.roomNumber}: {item.caseType}
        </Text>
        <Text style={styles.cardContent}>Patient: {item.patientName}</Text>
        <Text style={styles.cardContent}>Doctor: {item.doctorName}</Text>
        <Text style={styles.cardContent}>Status: {item.status}</Text>
        <Text style={styles.cardContent}>Type: {item.caseType}</Text>
        <Text style={styles.cardContent}>Progression: {completionText}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={obCases}
        renderItem={renderItem}
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
    backgroundColor: Colors.background, // Match background color with ORDashboard
  },
  card: {
    backgroundColor: Colors.cardBackground, // Match card background color
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
    color: Colors.primary, // Match primary color for title
    marginBottom: Spacing.xs,
  },
  cardContent: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.regular,
    color: Colors.textLight, // Match light text color for content
    marginBottom: Spacing.xs,
  },
  contentContainer: {
    paddingTop: Spacing.large,
    paddingBottom: Spacing.large,
  },
});

export default DeliveriesTab;
