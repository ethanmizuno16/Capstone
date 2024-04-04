import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button } from 'react-native-elements';

const ProfileScreen = () => {
  // Dummy data for the user
  const user = {
    name: 'Jordan Vogel',
    email: 'jvogel33@uw.edu',
    avatarUrl: 'https://media.licdn.com/dms/image/D5603AQFmUSc7eE6kiw/profile-displayphoto-shrink_800_800/0/1707021977294?e=2147483647&v=beta&t=SnfXi2bwnn9pv-nzbbu8fJQQIfJl5tH_ivfote_JklM', // Placeholder avatar image
  };

  // Dummy function for logging out of profile
  const handleLogout = () => {
    console.log('Logout button pressed');
    // Add your logout logic here
  };

  return (
    <View style={styles.container}>
      <Avatar
        size="xlarge"
        rounded
        source={{
          uri: user.avatarUrl,
        }}
        containerStyle={styles.avatar}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Button
        title="Logout"
        containerStyle={styles.logoutButtonContainer}
        buttonStyle={styles.logoutButton}
        onPress={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
  },
  logoutButtonContainer: {
    width: '80%',
    marginHorizontal: '10%',
  },
  logoutButton: {
    backgroundColor: '#2089dc',
  },
});

export default ProfileScreen;