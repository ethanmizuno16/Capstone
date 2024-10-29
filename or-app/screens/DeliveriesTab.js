import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSurgery } from "../context/SurgeryContext";
import { Colors, Fonts, Spacing } from "../Theme"; // Import theme variables

const DeliveriesTab = ({ navigation }) => {
  const { orData, getSurgerySteps } = useSurgery();

  // Filter OR data to only show delivery-related cases (e.g., C-Sections)
  const deliveryCases = orData?.filter(
    (or) => or.surgeryType === "Cesarean Section",
  );

  // Memoize completion percentage calculation for efficiency
  const getCompletionPercentage = useMemo(
    () => (surgeryType, currentStep) => {
      const steps = getSurgerySteps(surgeryType);
      if (!steps) return 0; // Handle case where steps might be undefined
      const currentStepIndex = steps.indexOf(currentStep);
      return ((currentStepIndex + 1) / steps.length) * 100;
    },
    [getSurgerySteps],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Active Deliveries</Text>
      {deliveryCases && deliveryCases.length > 0 ? (
        <FlatList
          data={deliveryCases}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("DetailedOR", { orId: item.id })
              }
            >
              <Text style={styles.name}>Patient: {item.id}</Text>
              <Text style={styles.details}>Surgeon: {item.surgeonName}</Text>
              <Text style={styles.details}>
                Anesthesiologist: {item.raName}
              </Text>
              <Text style={styles.details}>
                Progress:{" "}
                {getCompletionPercentage(
                  item.surgeryType,
                  item.surgeryStage,
                ).toFixed(0)}
                % Complete
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noDataText}>
          No active delivery cases available.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.medium,
    backgroundColor: Colors.background,
  },
  header: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    color: Colors.primary,
    marginBottom: Spacing.small,
  },
  card: {
    padding: Spacing.medium,
    backgroundColor: Colors.cardBackground,
    marginVertical: Spacing.small,
    borderRadius: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.bold,
    color: Colors.primary,
  },
  details: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.family.regular,
    color: Colors.textLight,
  },
  noDataText: {
    fontSize: Fonts.size.medium,
    color: Colors.textLight,
    textAlign: "center",
    marginTop: Spacing.large,
  },
});

export default DeliveriesTab;
