import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
// Correct the import paths for the data files
import casesData from "../data/cases_filtered_json.json"; 
import tracksData from "../data/tracks_info_filtered_json.json"; 
import surgeries from "../data/surgeries.json"; 

// Update the import path for SurgeryContext
import { useSurgery } from "../context/SurgeryContext";  // Corrected path
import { LineChart } from "react-native-chart-kit";

// select a random case
const selectRandomCase = (cases) => {
  const randomIndex = Math.floor(Math.random() * cases.length);
  return cases[randomIndex];
};

const DetailedOR = ({ route, navigation }) => {
  const { orId } = route.params;
  const { orData, getSurgerySteps } = useSurgery(); // Use the context
  const or = orData.find((o) => o.id === orId);

  if (!or) {
    return <Text>No data available for this OR.</Text>;
  }

  const steps = getSurgerySteps(or.surgeryType); // Get steps from context
  const currentStepIndex = steps.indexOf(or.surgeryStage);

  // Function to get the completion percentage of the current surgery step
  const getCompletionPercentage = (surgeryType, currentStep) => {
    const surgery = surgeries.find((s) => s.surgeryType === surgeryType);
    if (surgery) {
      const totalSteps = surgery.steps.length;
      const currentStepIndex = surgery.steps.indexOf(currentStep) + 1; // +1 for 1-based index
      const percentage = (currentStepIndex / totalSteps) * 100; // Calculate the percentage
      return `${percentage.toFixed(0)}% Complete (Stage ${currentStepIndex}/${totalSteps})`; // Convert to a string with "Stage" before fraction
    }
    return "0% Complete"; // Default if not found
  };

  // grab surgery info from the case we picked
  // right now, it's a random case ID choice
  const [surgeryInfo, setSurgeryInfo] = useState(selectRandomCase(casesData));
  const opStart = surgeryInfo.opstart;

  const [operationStartTime, setOperationStartTime] = useState("");
  useEffect(() => {
    const opStart = surgeryInfo.opstart;
    const currentTime = new Date();
    const opStartDate = new Date(currentTime.getTime() - opStart * 1000);
    const opStartString = opStartDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setOperationStartTime(opStartString);
  }, [surgeryInfo.opstart]);

  // heart rate stuff
  const [currentHeartRate, setCurrentHeartRate] = useState(null);
  const [heartRateData, setHeartRateData] = useState([]);

  // blood pressure stuff
  const [currentSBP, setCurrentSBP] = useState(null);
  const [sbpData, setSBPData] = useState([]);

  // blood pressure stuff
  const [currentDBP, setCurrentDBP] = useState(null);
  const [dbpData, setDBPData] = useState([]);

  // loading
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  // when we open, we filter the tracks to only certain machines from our current patient
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

    // Fetch data only once
    const fetchDataForTrack = async (tid, setData) => {
      try {
        const response = await fetch(`https://api.vitaldb.net/${tid}`);
        if (response.ok) {
          const csvText = await response.text();
          const data = csvToJSON(csvText);
          setData(data);
        } else {
          throw new Error("Response not successful");
        }
      } catch (error) {
        console.error("Error fetching data from VitalDB:", error);
      }
    };

    // Fetch data for each track
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true when starting fetch

      try {
        if (heartRateTrack.length > 0) {
          const heartRateTID = heartRateTrack[0].tid;
          await fetchDataForTrack(heartRateTID, setHeartRateData);
        }

        if (systolicPressureTrack.length > 0) {
          const systolicPressureTID = systolicPressureTrack[0].tid;
          await fetchDataForTrack(systolicPressureTID, setSBPData);
        }

        if (diastolicPressureTrack.length > 0) {
          const diastolicPressureTID = diastolicPressureTrack[0].tid;
          await fetchDataForTrack(diastolicPressureTID, setDBPData);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false); // Set loading to false after all data is fetched and processed
      }
    };

    fetchData();
  }, [surgeryInfo.caseid]);

  // for parsing
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

  // now, we display and update the HR data
  useEffect(() => {
    if (heartRateData.length > 0) {
      // find the index of the starting point based on when the op started
      const startIndex = heartRateData.findIndex(
        (d) => parseFloat(d.Time) >= opStart,
      );
      let index = startIndex;

      // keep updating
      const intervalId = setInterval(() => {
        if (index < heartRateData.length) {
          setCurrentHeartRate(heartRateData[index]["Solar8000/HR"]);
          index++;
        } else {
          clearInterval(intervalId); // stop when data ends
        }
      }, 2000); // update every 2 seconds

      return () => clearInterval(intervalId); // cleanup
    }
  }, [heartRateData, opStart]);

  // SBP instead of HR
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

  // DBP instead of HR
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

  // Handle track selection
  const handleTrackSelect = (tid) => {
    setSelectedTrack(tid);
    fetchDataForTrack(tid);
  };

  // Add new heart rate to chartData
  useEffect(() => {
    if (
      currentHeartRate &&
      !isNaN(currentHeartRate) &&
      currentHeartRate > 1 &&
      currentHeartRate < 200
    ) {
      console.log("Adding heart rate to chart data:", currentHeartRate); // Log the current heart rate
      setChartData((prevData) => {
        const newData = [...prevData, parseFloat(currentHeartRate)];
        console.log("New chart data:", newData); // Log the updated chart data
        return newData.filter((val) => !isNaN(val));
      });
    }
  }, [currentHeartRate]);

  const screenWidth = Dimensions.get("window").width;

  const heartRateChartData = {
    labels: chartData.map((_, index) => index.toString()), // labels
    datasets: [
      {
        data: chartData.filter((val) => !isNaN(val)), // Ensure all values are numbers
      },
    ],
  };

  const staticChartData = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        data: [60, 65, 70, 75, 80], // Example data points
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
    yAxisSuffix: " BPM",
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.detailBox}>
          <Text style={styles.title}>{or.id}</Text>
          <Text style={styles.detailText}>Surgeon Name: {or.surgeonName}</Text>
          <Text style={styles.detailText}>Anesthesiologist: {or.raName}</Text>
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

        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Current Patient HR</Text>
            <LineChart
              data={staticChartData}
              width={Dimensions.get("window").width * 0.9} // from react-native
              height={220}
              chartConfig={chartConfig}
              withVerticalLabels={true}
              withHorizontalLabels={true}
              bezier
              style={{
                borderRadius: 16,
              }}
            />
            <Text style={styles.chartAxisXLabel}>Time</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.largeBox}
          onPress={() => navigation.navigate("PushNotifications", { or: or })}
        >
          <Text style={styles.boxTitle}>Messaging</Text>
        </TouchableOpacity>

        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

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
