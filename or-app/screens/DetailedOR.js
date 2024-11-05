import React, { useState, useEffect } from "react";
import { Colors, Fonts, Spacing, Borders } from "../Theme";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import casesData from "../data/cases_filtered_json.json";
import tracksData from "../data/tracks_info_filtered_json.json";
import surgeries from "../data/surgeries.json";
import { useSurgery } from "../context/SurgeryContext";
import { LineChart } from "react-native-chart-kit";
import VitalsDataSection from "../components/VitalsDataSection"; // Import the VitalsDataSection component

const selectRandomCase = (cases) => {
  const randomIndex = Math.floor(Math.random() * cases.length);
  return cases[randomIndex];
};

// Main DetailedOR component
const DetailedOR = ({ route, navigation }) => {
  const { orId } = route.params;
  const { orData, getSurgerySteps } = useSurgery();
  const or = orData.find((o) => o.id === orId);

  if (!or) {
    return <Text>No data available for this OR.</Text>;
  }

  const steps = getSurgerySteps(or.surgeryType);
  const currentStepIndex = steps.indexOf(or.surgeryStage);

  const getCompletionPercentage = (surgeryType, currentStep) => {
    const surgery = surgeries.find((s) => s.surgeryType === surgeryType);
    if (surgery) {
      const totalSteps = surgery.steps.length;
      const currentStepIndex = surgery.steps.indexOf(currentStep) + 1;
      const percentage = (currentStepIndex / totalSteps) * 100;
      return `${percentage.toFixed(0)}% Complete (Stage ${currentStepIndex}/${totalSteps})`;
    }
    return "0% Complete";
  };

  const [surgeryInfo, setSurgeryInfo] = useState(selectRandomCase(casesData));
  const opStart = surgeryInfo.opstart;
  const [operationStartTime, setOperationStartTime] = useState("");

  useEffect(() => {
    const currentTime = new Date();
    const opStartDate = new Date(currentTime.getTime() - opStart * 1000);
    const opStartString = opStartDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setOperationStartTime(opStartString);
  }, [surgeryInfo.opstart]);

  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const screenWidth = Dimensions.get("window").width;

  const heartRateChartData = {
    labels: chartData.map((_, index) => index.toString()),
    datasets: [
      {
        data: chartData.filter((val) => !isNaN(val)),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: Colors.secondary,
    backgroundGradientFrom: Colors.secondary,
    backgroundGradientTo: Colors.highlight,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: Borders.radius.medium,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: Colors.highlight,
    },
    yAxisLabel: "",
    yAxisSuffix: " BPM",
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Display OR and surgery details */}
        <View style={styles.detailBox}>
          <Text style={styles.title}>{or.id}</Text>
          <Text style={styles.detailText}>Surgeon Name: {or.surgeonName}</Text>
          <Text style={styles.detailText}>
            {or.replacement
              ? `Anesthesia: ${or.raName} (${or.shift}) —> ${or.replacement.name} (${or.replacement.shift})`
              : `Anesthesia: ${or.raName} (${or.shift}) —> finish case`}
          </Text>
          <Text style={styles.detailText}>Surgery Type: {or.surgeryType}</Text>
          <Text style={styles.detailText}>
            Surgery Stage: {or.surgeryStage}
          </Text>
          <Text style={styles.detailText}>
            Surgery Progression:{" "}
            {getCompletionPercentage(or.surgeryType, or.surgeryStage)}
          </Text>
          <Text style={styles.detailText}>
            Operation Start Time: {operationStartTime}
          </Text>
        </View>

        {/* Vitals Section */}
        <VitalsDataSection />

        {/* Navigate to Push Notifications */}
        <TouchableOpacity
          style={styles.largeBox}
          onPress={() => navigation.navigate("PushNotifications", { or: or })}
        >
          <Text style={styles.boxTitle}>Messaging</Text>
        </TouchableOpacity>

        {/* Button to go back to the previous screen */}
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  detailBox: {
    margin: Spacing.small,
    padding: Spacing.medium,
    backgroundColor: Colors.cardBackground,
    borderRadius: Borders.radius.medium,
    width: "90%",
  },
  title: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    marginBottom: Spacing.small,
  },
  detailText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.regular,
    marginBottom: Spacing.xs,
  },
  largeBox: {
    backgroundColor: Colors.primary,
    borderRadius: Borders.radius.medium,
    padding: Spacing.medium,
    marginVertical: Spacing.small,
    width: "90%",
    alignItems: "center",
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: Spacing.small,
  },
  chartTitle: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    marginBottom: Spacing.small,
  },
  chartAxisXLabel: {
    fontSize: Fonts.size.small,
    marginTop: Spacing.xs,
  },
});

export default DetailedOR;
