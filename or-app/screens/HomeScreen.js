import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the OR App!</Text>
      
      {/* Button for OR Dashboard Screen */}
      <Button 
        title="Go to OR Dashboard" 
        onPress={() => navigation.navigate('ORDashboard')}  // Updated navigation to ORDashboard
      />

      {/* Button for PACU Screen */}
      <Button 
        title="Go to PACU" 
        onPress={() => navigation.navigate('PACUScreen')}
      />
      
      {/* Button for Regional Screen */}
      <Button 
        title="Go to Regional" 
        onPress={() => navigation.navigate('RegionalScreen')}
        style={styles.button}
      />
      
      {/* Button for Acute Pain Screen */}
      <Button 
        title="Go to Acute Pain" 
        onPress={() => navigation.navigate('AcutePainScreen')}
        style={styles.button}
      />
      
      {/* Button for Obstetrics Screen */}
      <Button 
        title="Go to Obstetrics" 
        onPress={() => navigation.navigate('ObstetricsScreen')}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
});

export default HomeScreen;