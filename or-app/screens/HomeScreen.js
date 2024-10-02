import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the OR App!</Text>

      {/* OR Dashboard Box */}
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate("ORDashboard")}
      >
        <FontAwesome name="dashboard" size={24} color="#4B2E83" />
        <Text style={styles.boxText}>OR Dashboard</Text>
      </TouchableOpacity>

      {/* PACU Box */}
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate("PACUScreen")}
      >
        <FontAwesome name="hospital-o" size={24} color="#4B2E83" />
        <Text style={styles.boxText}>PACU</Text>
      </TouchableOpacity>

      {/* Regional Box */}
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate("RegionalScreen")}
      >
        <FontAwesome name="map-marker" size={24} color="#4B2E83" />
        <Text style={styles.boxText}>Regional</Text>
      </TouchableOpacity>

      {/* Acute Pain Box */}
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate("AcutePainScreen")}
      >
        <FontAwesome name="heartbeat" size={24} color="#4B2E83" />
        <Text style={styles.boxText}>Acute Pain</Text>
      </TouchableOpacity>

      {/* Obstetrics Box */}
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate("ObstetricsScreen")}
      >
        <FontAwesome name="user-md" size={24} color="#4B2E83" />
        <Text style={styles.boxText}>Obstetrics</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4B2E83",
    marginBottom: 40,
  },
  box: {
    width: "85%",
    padding: 20,
    marginVertical: 15,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    shadowColor: "#4B2E83",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boxText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4B2E83",
    marginLeft: 15,
  },
});

export default HomeScreen;
