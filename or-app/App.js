// Import necessary modules and components from React and React Native
import "react-native-gesture-handler"; // Enables gesture handling for navigation
import React, { useState, useEffect, useRef } from "react"; // Core React hooks
import { NavigationContainer } from "@react-navigation/native"; // Provides navigation context

// Import your custom components and services
import MenuInterface from "./navigation/MenuInterface"; // Your navigation menu interface
import { SurgeryProvider } from "./context/SurgeryContext"; // Context provider for surgeries
import { registerForPushNotificationsAsync } from "./services/notifications"; // Function to register for push notifications

// Import notifications handling from Expo and alert handling from React Native
import * as Notifications from "expo-notifications"; // Manages notification features
import { Alert } from "react-native"; // Provides native alert functionality

// Import react-native-paper components
import { Provider as PaperProvider } from "react-native-paper"; // Import the PaperProvider for Material Design UI

// Define the main functional component of your app
export default function App() {
  // State to hold the Expo push notification token
  const [expoPushToken, setExpoPushToken] = useState("");

  // Refs to store notification listeners, allowing them to persist between renders
  const notificationListener = useRef();
  const responseListener = useRef();

  // useEffect hook runs once when the component mounts, handling push notification setup
  useEffect(() => {
    // Call function to register for push notifications and store the token
    registerForPushNotificationsAsync(setExpoPushToken);

    // Set up listener for incoming notifications when the app is running in the foreground
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // Extract title, body, and data from the notification
        const { title, body, data } = notification.request.content;
        // Show an alert with the notification details
        Alert.alert(
          title || "Notification Received", // Default title if none is provided
          body || `OR ${data.orId} is now at ${data.newStage} stage.`, // Show a message based on the OR stage if no body is provided
        );
      });

    // Set up listener for when the user interacts with a notification (foreground, background, or app killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // Extract the notification content from the response
        const { notification } = response;
        const { title, body, data } = notification.request.content;
        // Show an alert based on the notification content when a response is received
        Alert.alert(
          title || "Notification Received", // Default title
          body || `OR ${data.orId} is now at ${data.newStage} stage.`, // Show a message based on the OR stage
        );
      });

    // Cleanup function: removes the notification listeners when the component is unmounted
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current, // Remove notification listener
      );
      Notifications.removeNotificationSubscription(responseListener.current); // Remove response listener
    };
  }, []); // Empty dependency array means this effect only runs once (on mount)

  // Return the app's main component tree
  return (
    // Wrap everything in the SurgeryProvider to make surgery-related data available to all components
    <SurgeryProvider>
      {/* Wrap the entire app in PaperProvider to enable react-native-paper components */}
      <PaperProvider>
        {/* NavigationContainer provides the navigation context for the app */}
        <NavigationContainer>
          {/* MenuInterface contains the navigation menu (drawer or stack) */}
          <MenuInterface />
        </NavigationContainer>
      </PaperProvider>
    </SurgeryProvider>
  );
}
