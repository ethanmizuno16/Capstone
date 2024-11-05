import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useObstetrics } from "../context/ObstetricsContext";
import { Colors, Fonts, Spacing } from "../Theme";

const DeliveriesTab = () => {
  const { obCases } = useObstetrics();
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("DetailedObstetrics", { caseId: item.id })
      }
    >
      <View style={styles.caseContainer}>
        <Text style={styles.caseTitle}>{item.patientName}</Text>
        <Text style={styles.caseDetail}>Room: {item.roomNumber}</Text>
        <Text style={styles.caseDetail}>Doctor: {item.doctorName}</Text>
        <Text style={styles.caseDetail}>Status: {item.status}</Text>
        <Text style={styles.caseDetail}>Type: {item.caseType}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={obCases}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.medium,
  },
  caseContainer: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.medium,
    borderRadius: Spacing.small,
    marginBottom: Spacing.small,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  caseTitle: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  caseDetail: {
    fontSize: Fonts.size.small,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
});

export default DeliveriesTab;
