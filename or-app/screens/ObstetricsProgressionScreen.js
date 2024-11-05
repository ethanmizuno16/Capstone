import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useObstetrics } from "../context/ObstetricsContext";

const ObstetricsProgressionScreen = ({ route }) => {
  const { caseId } = route.params;
  const { obCases, updateObCaseStage } = useObstetrics();
  const obCase = obCases.find((c) => c.id === caseId);

  if (!obCase) {
    return <Text>No data available for this case.</Text>;
  }

  // Get the current stage index and set up the steps and animation state
  const currentStageIndex = obCase.steps.findIndex(
    (step) => step === obCase.status,
  );
  const [completed, setCompleted] = useState(
    obCase.steps.map((_, index) => index <= currentStageIndex),
  );

  const animations = useRef(
    obCase.steps.map(
      (_, index) => new Animated.Value(index <= currentStageIndex ? 1 : 0),
    ),
  ).current;

  const toggleStep = (index) => {
    let newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);

    Animated.timing(animations[index], {
      toValue: newCompleted[index] ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    if (newCompleted[index]) {
      updateObCaseStage(obCase.id, obCase.steps[index]); // Update the stage in the context
      sendPushNotification(obCase.id, obCase.steps[index], obCase.caseType); // Send push notification
    }
  };

  const sendPushNotification = async (caseId, newStage, caseType) => {
    console.log(
      `Sending push notification for Case ${caseId}, stage ${newStage}`,
    );
    try {
      const response = await fetch("http://10.0.0.55:8081/send-notification", {
        // Replace with your local IP address
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Obstetrics Case Update",
          body: `${caseId} is now at ${newStage} stage.`,
          data: { caseId, newStage },
          priority: "normal",
        }),
      });
      console.log("Notification sent:", response);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>{obCase.caseType}</Text>
        <Text style={styles.subHeader}>{obCase.id}</Text>
        <Text style={styles.subHeader}>Doctor: {obCase.doctorName}</Text>
        <Text style={styles.notificationHeader}>Push Notification</Text>

        {obCase.steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Animated.Text
              style={[
                styles.stepText,
                {
                  backgroundColor: animations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ["lightgreen", "#cccccc"],
                  }),
                },
              ]}
            >
              {step}
            </Animated.Text>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => toggleStep(index)}
            >
              <Animated.View
                style={[
                  styles.checkboxInner,
                  {
                    backgroundColor: animations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: ["transparent", "blue"],
                    }),
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 5,
  },
  notificationHeader: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  stepContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  stepText: {
    flex: 0.8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  notificationButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#add8e6",
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default ObstetricsProgressionScreen;
