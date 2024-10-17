import React, { useState, useEffect } from "react"; // Import React and hooks
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native"; // Import necessary components from React Native

// Import data files for cases, tracks, and surgeries
import casesData from "../data/cases_filtered_json.json";
import tracksData from "../data/tracks_info_filtered_json.json";
import surgeries from "../data/surgeries.json";

// Import SurgeryContext to access surgery-related data
import { useSurgery } from "../context/SurgeryContext";
import { LineChart } from "react-native-chart-kit"; // Import charting component

// Function to select a random case from the list of cases
const selectRandomCase = (cases) => {
  const randomIndex = Math.floor(Math.random() * cases.length);
  return cases[randomIndex];
};

const DetailedOR = ({ route, navigation }) => {
  const { orId } = route.params; // Get the OR ID passed from the previous screen
  const { orData, getSurgerySteps } = useSurgery(); // Access OR data and surgery steps from context
  const or = orData.find((o) => o.id === orId); // Find the OR data corresponding to the orId

  if (!or) {
    // If no OR data is found, return a message
    return <Text>No data available for this OR.</Text>;
  }

  const steps = getSurgerySteps(or.surgeryType); // Get surgery steps based on the surgery type
  const currentStepIndex = steps.indexOf(or.surgeryStage); // Find the current step index in the surgery

  // Function to calculate and return the completion percentage of the current surgery step
  const getCompletionPercentage = (surgeryType, currentStep) => {
    const surgery = surgeries.find((s) => s.surgeryType === surgeryType);
    if (surgery) {
      const totalSteps = surgery.steps.length; // Total steps in the surgery
      const currentStepIndex = surgery.steps.indexOf(currentStep) + 1; // Find the index of the current step
      const percentage = (currentStepIndex / totalSteps) * 100; // Calculate the completion percentage
      return `${percentage.toFixed(0)}% Complete (Stage ${currentStepIndex}/${totalSteps})`; // Format the result
    }
    return "0% Complete"; // Default to 0% if no surgery is found
  };

  // Select a random case from the cases data to simulate
  const [surgeryInfo, setSurgeryInfo] = useState(selectRandomCase(casesData));
  const opStart = surgeryInfo.opstart; // Operation start time

  const [operationStartTime, setOperationStartTime] = useState("");
  useEffect(() => {
    const currentTime = new Date();
    const opStartDate = new Date(currentTime.getTime() - opStart * 1000); // Calculate the operation start time
    const opStartString = opStartDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setOperationStartTime(opStartString); // Set the formatted operation start time
  }, [surgeryInfo.opstart]);

  // State for heart rate, blood pressure, and loading indicator
  const [currentHeartRate, setCurrentHeartRate] = useState(null);
  const [heartRateData, setHeartRateData] = useState([]);
  const [currentSBP, setCurrentSBP] = useState(null);
  const [sbpData, setSBPData] = useState([]);
  const [currentDBP, setCurrentDBP] = useState(null);
  const [dbpData, setDBPData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading indicator state
  const [chartData, setChartData] = useState([]); // Data for chart display

  // Use effect to fetch data related to heart rate, SBP, and DBP from VitalDB API based on track information
  useEffect(() => {
    const heartRateTrack = tracksData.filter(
      (track) =>
        track.caseid === surgeryInfo.caseid &&
        track.tname.startsWith("Solar8000/HR"),
    );

    const systolicPressureTrack = tracksData.filter(
      (track) =>
        track.caseid === surgeryInfo.caseid &&
        track.tname.startsWith("Solar8000/ART_SBP"),
    );

    const diastolicPressureTrack = tracksData.filter(
      (track) =>
        track.caseid === surgeryInfo.caseid &&
        track.tname.startsWith("Solar8000/ART_DBP"),
    );

    // Fetch function to get data from the API
    const fetchDataForTrack = async (tid, setData) => {
      try {
        const response = await fetch(`https://api.vitaldb.net/${tid}`); // Fetch data for a specific track
        if (response.ok) {
          const csvText = await response.text();
          const data = csvToJSON(csvText); // Parse CSV to JSON
          setData(data); // Update state with fetched data
        } else {
          throw new Error("Response not successful");
        }
      } catch (error) {
        console.error("Error fetching data from VitalDB:", error); // Handle fetch errors
      }
    };

    const fetchData = async () => {
      setIsLoading(true); // Set loading state
      try {
        // Fetch heart rate data
        if (heartRateTrack.length > 0) {
          const heartRateTID = heartRateTrack[0].tid;
          await fetchDataForTrack(heartRateTID, setHeartRateData);
        }
        // Fetch systolic blood pressure data
        if (systolicPressureTrack.length > 0) {
          const systolicPressureTID = systolicPressureTrack[0].tid;
          await fetchDataForTrack(systolicPressureTID, setSBPData);
        }
        // Fetch diastolic blood pressure data
        if (diastolicPressureTrack.length > 0) {
          const diastolicPressureTID = diastolicPressureTrack[0].tid;
          await fetchDataForTrack(diastolicPressureTID, setDBPData);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchData(); // Call the fetch function
  }, [surgeryInfo.caseid]); // Trigger when case ID changes

  // Function to parse CSV data into JSON
  const csvToJSON = (csv) => {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");
    lines.slice(1).forEach((line) => {
      const obj = {};
      const currentline = line.split(",");
      headers.forEach((header, i) => {
        obj[header] = currentline[i];
      });
      result.push(obj);
    });
    return result;
  };

  // Use effect to update heart rate data over time
  useEffect(() => {
    if (heartRateData.length > 0) {
      const startIndex = heartRateData.findIndex(
        (d) => parseFloat(d.Time) >= opStart,
      );
      let index = startIndex;
      const intervalId = setInterval(() => {
        if (index < heartRateData.length) {
          setCurrentHeartRate(heartRateData[index]["Solar8000/HR"]); // Update heart rate
          index++;
        } else {
          clearInterval(intervalId); // Stop interval when data ends
        }
      }, 2000); // Update every 2 seconds
      return () => clearInterval(intervalId); // Cleanup
    }
  }, [heartRateData, opStart]); // Trigger on heart rate data or operation start time change

  // Similar use effect for systolic blood pressure (SBP)
  useEffect(() => {
    if (sbpData.length > 0) {
      const startIndex = sbpData.findIndex(
        (d) => parseFloat(d.Time) >= opStart,
      );
      let index = startIndex;
      const intervalId = setInterval(() => {
        if (index < sbpData.length) {
          setCurrentSBP(sbpData[index]["Solar8000/ART_SBP"]);
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [sbpData, opStart]);

  // Similar use effect for diastolic blood pressure (DBP)
  useEffect(() => {
    if (dbpData.length > 0) {
      const startIndex = dbpData.findIndex(
        (d) => parseFloat(d.Time) >= opStart,
      );
      let index = startIndex;
      const intervalId = setInterval(() => {
        if (index < dbpData.length) {
          setCurrentDBP(dbpData[index]["Solar8000/ART_DBP"]);
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [dbpData, opStart]);

  // Handle updating chart data with the current heart rate
  useEffect(() => {
    if (
      currentHeartRate &&
      !isNaN(currentHeartRate) &&
      currentHeartRate > 1 &&
      currentHeartRate < 200
    ) {
      setChartData((prevData) =>
        [...prevData, parseFloat(currentHeartRate)].filter(
          (val) => !isNaN(val),
        ),
      );
    }
  }, [currentHeartRate]);

  const screenWidth = Dimensions.get("window").width; // Get the width of the device screen for chart

  // Data for heart rate chart
  const heartRateChartData = {
    labels: chartData.map((_, index) => index.toString()), // Labels for the x-axis
    datasets: [
      {
        data: chartData.filter((val) => !isNaN(val)), // Filter out NaN values
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 0, // No decimal places in values
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for chart lines
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
    yAxisLabel: "",
    yAxisSuffix: " BPM", // Label suffix for y-axis
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

        {/* Display current vitals */}
        <View style={styles.anesBox}>
          <Text style={styles.detailText}>
            Type of Anesthesia:{" "}
            <Text style={styles.vital}>{surgeryInfo.ane_type}</Text>
          </Text>
          <Text style={styles.detailText}>
            Current Heart Rate:{" "}
            <Text style={styles.vital}>{currentHeartRate}</Text>
          </Text>
          <Text style={styles.detailText}>
            Current Blood Pressure:{" "}
            <Text style={styles.vital}>
              {currentSBP && currentDBP
                ? `${currentSBP}/${currentDBP}`
                : currentSBP || currentDBP || ""}
            </Text>
          </Text>
        </View>

        {/* Display heart rate chart */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Current Patient HR</Text>
            <LineChart
              data={heartRateChartData} // Heart rate data for chart
              width={screenWidth * 0.9} // Width of the chart
              height={220} // Height of the chart
              chartConfig={chartConfig} // Chart config
              bezier // Smooth curve
              style={{
                borderRadius: 16, // Rounded corners
              }}
            />
            <Text style={styles.chartAxisXLabel}>Time</Text>
          </View>
        )}

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
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  detailBox: {
    margin: 10,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    width: "90%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 5,
  },
  largeBox: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: "90%",
  },
  anesBox: {
    backgroundColor: "lightpink",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    marginVertical: 10,
    alignItems: "flex-start",
  },
  vital: {
    fontWeight: "bold",
    color: "#007bff",
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chartAxisXLabel: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default DetailedOR;
