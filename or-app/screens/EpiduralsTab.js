import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper";

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
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  requestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f9f9f9",
    marginVertical: 6,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
});

export default EpiduralsTab;
