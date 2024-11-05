import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Colors, Fonts, Spacing } from "../Theme";
import { LineChart } from "react-native-chart-kit";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import sampleVitals from "../data/vitalsSampleData";

const VitalBox = ({ label, value, unit, icon }) => (
  <View style={styles.vitalBox}>
    {icon}
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>
      {value} <Text style={styles.unit}>{unit}</Text>
    </Text>
  </View>
);

const VitalsDataSection = () => {
  const [currentVitals, setCurrentVitals] = useState({
    heartRate: sampleVitals.heartRate[0],
    oxygenSaturation: sampleVitals.oxygenSaturation[0],
    bloodPressure: sampleVitals.bloodPressure[0],
    temperature: sampleVitals.temperature[0],
    endTidalCO2: sampleVitals.endTidalCO2[0],
    respiratoryRate: sampleVitals.respiratoryRate[0],
  });

  const [selectedVital, setSelectedVital] = useState("heartRate");
  const [chartData, setChartData] = useState(
    sampleVitals[selectedVital].slice(-10), // Only the last 10 values initially
  );

  useEffect(() => {
    let index = 0;

    // Reset chartData to the last 10 values of the selected vital
    setChartData(sampleVitals[selectedVital].slice(-10));

    const intervalId = setInterval(() => {
      // Update current vitals
      setCurrentVitals({
        heartRate:
          sampleVitals.heartRate[index % sampleVitals.heartRate.length],
        oxygenSaturation:
          sampleVitals.oxygenSaturation[
            index % sampleVitals.oxygenSaturation.length
          ],
        bloodPressure:
          sampleVitals.bloodPressure[index % sampleVitals.bloodPressure.length],
        temperature:
          sampleVitals.temperature[index % sampleVitals.temperature.length],
        endTidalCO2:
          sampleVitals.endTidalCO2[index % sampleVitals.endTidalCO2.length],
        respiratoryRate:
          sampleVitals.respiratoryRate[
            index % sampleVitals.respiratoryRate.length
          ],
      });

      // Update chart data dynamically
      setChartData((prevChartData) => {
        const newValue =
          sampleVitals[selectedVital][
            index % sampleVitals[selectedVital].length
          ];
        const updatedData = [...prevChartData, newValue].slice(-10); // Keep only the last 10 values
        return updatedData;
      });

      index += 1;
    }, 1000);

    return () => clearInterval(intervalId);
  }, [selectedVital]); // Reset data on new vital selection

  // Function to capitalize words for button labels
  const formatLabel = (label) =>
    label.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  return (
    <View style={styles.container}>
      {/* Vital Boxes including Blood Pressure */}
      <View style={styles.vitalsContainer}>
        <VitalBox
          label="Heart Rate"
          value={currentVitals.heartRate}
          unit="bpm"
          icon={<FontAwesome5 name="heartbeat" size={24} color="red" />}
        />
        <VitalBox
          label="Oxygen Saturation"
          value={currentVitals.oxygenSaturation}
          unit="%"
          icon={<MaterialCommunityIcons name="water" size={24} color="red" />}
        />
        <VitalBox
          label="Blood Pressure"
          value={currentVitals.bloodPressure}
          unit="mmHg"
          icon={<FontAwesome5 name="syringe" size={24} color="red" />}
        />
        <VitalBox
          label="Temperature"
          value={currentVitals.temperature}
          unit="°C"
          icon={<FontAwesome5 name="thermometer-half" size={24} color="red" />}
        />
        <VitalBox
          label="End Tidal CO₂"
          value={currentVitals.endTidalCO2}
          unit="mmHg"
          icon={<FontAwesome5 name="lungs" size={24} color="red" />}
        />
        <VitalBox
          label="Respiratory Rate"
          value={currentVitals.respiratoryRate}
          unit="bpm"
          icon={
            <MaterialCommunityIcons name="airballoon" size={24} color="red" />
          }
        />
      </View>

      {/* Chart Selection Buttons (excluding Blood Pressure) */}
      <View style={styles.selectionContainer}>
        {Object.keys(sampleVitals)
          .filter((vital) => vital !== "bloodPressure") // Exclude Blood Pressure from chart options
          .map((vital) => (
            <TouchableOpacity
              key={vital}
              style={[
                styles.selectionButton,
                selectedVital === vital && styles.selectedButton,
              ]}
              onPress={() => setSelectedVital(vital)}
            >
              <Text style={styles.buttonText}>{formatLabel(vital)}</Text>
            </TouchableOpacity>
          ))}
      </View>

      {/* Centered Chart */}
      <Text style={styles.chartTitle}>
        {formatLabel(selectedVital)} Over Time
      </Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: Array.from({ length: 10 }, (_, i) => (i + 1).toString()), // 10 labels for 10 points
            datasets: [{ data: chartData.map((value) => parseFloat(value)) }],
          }}
          width={Dimensions.get("window").width * 0.85} // Set width to 85% of the screen for centering
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#f0f0f0",
            color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`, // Blue line color
            labelColor: () => Colors.text,
            strokeWidth: 3,
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "#2280B0",
            },
            propsForBackgroundLines: {
              stroke: "#e0e0e0",
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.medium,
    backgroundColor: Colors.background,
  },
  vitalsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: Spacing.medium,
  },
  vitalBox: {
    width: "45%",
    padding: Spacing.medium,
    backgroundColor: "#F8F9FA",
    marginBottom: Spacing.small,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: Fonts.size.small,
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  value: {
    fontSize: Fonts.size.large,
    fontWeight: "bold",
    color: "#2280B0",
  },
  unit: {
    fontSize: Fonts.size.small,
    color: Colors.textLight,
  },
  selectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: Spacing.small,
  },
  selectionButton: {
    padding: Spacing.small,
    backgroundColor: "#FFFFFF", // Default button color
    borderRadius: 20,
    marginHorizontal: Spacing.small,
    marginBottom: Spacing.small,
    paddingHorizontal: Spacing.medium,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  selectedButton: {
    backgroundColor: "#2280B0", // Blue color for selected button
  },
  buttonText: {
    fontSize: Fonts.size.small,
    color: Colors.text,
    textTransform: "capitalize",
  },
  chartTitle: {
    fontSize: Fonts.size.medium,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginVertical: Spacing.small,
    textTransform: "capitalize",
  },
  chartContainer: {
    alignItems: "center", // Centers the chart within this container
    marginTop: Spacing.medium,
  },
  chart: {
    borderRadius: 12,
  },
});

export default VitalsDataSection;
