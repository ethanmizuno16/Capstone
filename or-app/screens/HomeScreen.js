import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors, Fonts, Spacing, Borders } from "../Theme"; // Import theme variables

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the OR App!</Text>

      {/* OR Dashboard Box */}
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate("ORDashboard")}
      >
        <FontAwesome name="dashboard" size={24} color={Colors.primary} />
        <Text style={styles.boxText}>OR Dashboard</Text>
      </TouchableOpacity>

      {/* PACU Box */}
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate("PACUScreen")}
      >
        <FontAwesome name="hospital-o" size={24} color={Colors.primary} />
        <Text style={styles.boxText}>PACU</Text>
      </TouchableOpacity>

      {/* Regional Box */}
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate("RegionalScreen")}
      >
        <FontAwesome name="map-marker" size={24} color={Colors.primary} />
        <Text style={styles.boxText}>Regional</Text>
      </TouchableOpacity>

      {/* Acute Pain Box */}
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate("AcutePainScreen")}
      >
        <FontAwesome name="heartbeat" size={24} color={Colors.primary} />
        <Text style={styles.boxText}>Acute Pain</Text>
      </TouchableOpacity>

      {/* Obstetrics Box */}
      <TouchableOpacity
        style={styles.box}
        onPress={() => navigation.navigate("ObstetricsScreen")}
      >
        <FontAwesome name="user-md" size={24} color={Colors.primary} />
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
    backgroundColor: Colors.background, // Background color from theme
  },
  title: {
    fontSize: Fonts.size.title,
    fontFamily: Fonts.family.bold,
    color: Colors.primary,
    marginBottom: Spacing.large,
  },
  box: {
    width: "85%",
    padding: Spacing.medium,
    marginVertical: Spacing.small,
    backgroundColor: Colors.cardBackground,
    borderRadius: Borders.radius.medium,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boxText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.bold,
    color: Colors.primary,
    marginLeft: Spacing.small,
  },
});

export default HomeScreen;
