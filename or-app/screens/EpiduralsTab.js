import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Colors, Fonts, Spacing, Borders } from "../Theme"; // Import theme variables

const EpiduralsTab = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Emily Johnson",
      procedure: "Epidural",
      time: "10:00 AM",
      requestingPhysician: "Dr. White",
      completed: false,
    },
    {
      id: 2,
      name: "Michael Brown",
      procedure: "Epidural",
      time: "12:00 PM",
      requestingPhysician: "Dr. Green",
      completed: false,
    },
  ]);

  const toggleCompletion = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id
          ? { ...request, completed: !request.completed }
          : request,
      ),
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Epidural Requests</Text>
      {requests.map((request) => (
        <View key={request.id} style={styles.requestItem}>
          <View>
            <Text style={styles.name}>{request.name}</Text>
            <Text style={styles.details}>Procedure: {request.procedure}</Text>
            <Text style={styles.details}>Time: {request.time}</Text>
            <Text style={styles.details}>
              Requesting Physician: {request.requestingPhysician}
            </Text>
          </View>
          <Checkbox
            status={request.completed ? "checked" : "unchecked"}
            onPress={() => toggleCompletion(request.id)}
            color={Colors.primary} // Use primary color from theme for checked color
          />
        </View>
      ))}
    </ScrollView>
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
  requestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.medium,
    backgroundColor: Colors.cardBackground,
    marginVertical: Spacing.xs,
    borderRadius: Borders.radius.medium,
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
});

export default EpiduralsTab;
