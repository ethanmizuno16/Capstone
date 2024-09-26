import "react-native-gesture-handler";
import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";

// Update imports based on your new structure
import MenuInterface from "./navigation/MenuInterface"; 
import { SurgeryProvider } from "./context/SurgeryContext";
import { registerForPushNotificationsAsync } from "./services/notifications";

import * as Notifications from "expo-notifications";
import { Alert } from "react-native";


export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync(setExpoPushToken);

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const { title, body, data } = notification.request.content;
        Alert.alert(
          title || "Notification Received",
          body || `OR ${data.orId} is now at ${data.newStage} stage.`,
        );
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { notification } = response;
        const { title, body, data } = notification.request.content;
        Alert.alert(
          title || "Notification Received",
          body || `OR ${data.orId} is now at ${data.newStage} stage.`,
        );
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <SurgeryProvider>
      <NavigationContainer>
        <MenuInterface />
      </NavigationContainer>
    </SurgeryProvider>
  );
}

