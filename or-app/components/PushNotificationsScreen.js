import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useSurgery } from "../context/SurgeryContext";
import { Colors, Fonts, Spacing, Borders } from "../Theme"; // Import theme

const PushNotificationsScreen = ({ route, navigation }) => {
  const { or } = route.params;
  const { getSurgerySteps, updateSurgeryStage } = useSurgery();
  const steps = getSurgerySteps(or.surgeryType);

  const currentStageIndex = steps.findIndex((step) => step === or.surgeryStage);
  const [completed, setCompleted] = useState(
    steps.map((_, index) => index <= currentStageIndex),
  );

  const animations = useRef(
    steps.map(
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
      updateSurgeryStage(or.id, steps[index]);
      sendPushNotification(or.id, steps[index], or.surgeryType);
    }
  };

  const sendPushNotification = async (orId, newStage, surgeryType) => {
    console.log(`Sending push notification for OR ${orId}, stage ${newStage}`);
    try {
      const response = await fetch("http://10.0.0.55:8081/send-notification", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Surgery Update",
          body: `${orId} is now at ${newStage} stage.`,
          data: { orId, newStage },
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
        <Text style={styles.header}>{or.surgeryType}</Text>
        <Text style={styles.subHeader}>Operating Room: {or.id}</Text>
        <Text style={styles.subHeader}>Surgeon: {or.surgeonName}</Text>
        <Text style={styles.notificationHeader}>Push Notification</Text>

        {steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Animated.Text
              style={[
                styles.stepText,
                {
                  backgroundColor: animations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      Colors.successBackground,
                      Colors.inactiveBackground,
                    ],
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
                      outputRange: ["transparent", Colors.primary],
                    }),
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* Go Back Button */}
        <TouchableOpacity
          style={[styles.baseButton, styles.secondaryButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.background,
  },
  container: {
    padding: Spacing.medium,
    backgroundColor: Colors.background,
  },
  header: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.family.bold,
    color: Colors.primary,
    textAlign: "center",
    marginVertical: Spacing.small,
  },
  subHeader: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.regular,
    color: Colors.text,
    textAlign: "center",
    marginVertical: Spacing.xs,
  },
  notificationHeader: {
    textAlign: "right",
    fontWeight: Fonts.family.bold,
    fontSize: Fonts.size.small,
    color: Colors.secondary,
    marginTop: Spacing.small,
    marginBottom: Spacing.medium,
  },
  stepContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.small,
    backgroundColor: Colors.cardBackground,
    borderRadius: Borders.radius.medium,
    paddingHorizontal: Spacing.medium,
    marginBottom: Spacing.xs,
  },
  stepText: {
    flex: 0.8,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.regular,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.small,
    borderRadius: Borders.radius.small,
    color: Colors.text,
  },
  notificationButton: {
    width: 30,
    height: 30,
    borderRadius: Borders.radius.full,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: Borders.radius.full,
  },
  baseButton: {
    borderRadius: Borders.radius.medium,
    paddingVertical: Spacing.medium,
    alignItems: "center",
    marginVertical: Spacing.small, // Consistent spacing
    width: "100%",
  },
  secondaryButton: {
    backgroundColor: Colors.secondary, // Secondary color for "Go Back" button
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.family.bold,
  },
});

export default PushNotificationsScreen;
