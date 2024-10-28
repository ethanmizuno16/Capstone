# OR Management App

This OR Management App is a React Native application designed to streamline the management of operating rooms (ORs), patient care in post-anesthesia care units (PACUs), regional anesthesiology, and acute pain consultations. It includes modules for monitoring current OR surgeries, managing patient consults, tracking anesthesia and surgical steps, and sending notifications to medical staff.

## Features

- **OR Dashboard**: View and monitor ongoing surgeries, with details about the current step in each procedure.
- **Regional Anesthesia Management**: Manage and assign anesthesiologists to patients requiring regional blocks.
- **Acute Pain Management**: Track patients requiring pain management consults, with a checkbox for daily rounding status.
- **PACU Tracking**: Track post-operative patients in PACU, with a ready-for-discharge indicator.
- **Notifications**: Push notifications for updating clinicians on critical changes in OR or patient care status.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/username/or-management-app.git
   cd or-management-app

2. **Install Dependencies:**:
    ```bash
    npm install

2. **Run the Application:**:
    ```bash
    npx expo start

## Project Structure

- **`/components`**: Reusable components, such as checkboxes and notifications.
- **`/screens`**: Main app screens like OR Dashboard, RegionalScreen, PACUScreen, and more.
- **`/context`**: Context API files for managing and sharing state across components.
- **`/data`**: Static data files such as surgeries, cases, and tracks information.

## Configuration

For push notifications, configure the IP address in `PushNotificationsScreen.js`:
   
```javascript
const response = await fetch("http://10.0.0.55:8081/send-notification", { ... });
```
Replace the IP address with your backend server’s address to enable push notifications.

## Dependencies

- **React Native**: The main framework for building the application.
- **Expo**: For development, testing, and easy distribution.
- **React Native Paper**: For UI components like checkboxes.
- **React Navigation**: For navigating between screens.