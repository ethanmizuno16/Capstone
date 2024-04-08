import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';

const DetailedOR = ({ route, navigation }) => {
  const { or } = route.params;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.detailBox}>
          <Text style={styles.title}>{or.id}</Text>
          <Text style={styles.detailText}>Surgeon Name: {or.surgeonName}</Text>
          <Text style={styles.detailText}>R.A. Name: {or.raName}</Text>
          <Text style={styles.detailText}>Surgery Type: {or.surgeryType}</Text>
          <Text style={styles.detailText}>Current Stage: {or.surgeryStage}</Text>
        </View>
        
        <View style={styles.largeBox}>
          <Text style={styles.boxTitle}>Biosignal Data</Text>
          {/* Placeholder for biosignal data */}
        </View>

        <View style={styles.largeBox}>
          <Text style={styles.boxTitle}>Messaging</Text>
          {/* Placeholder for messaging */}
        </View>

        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailBox: {
    margin: 10,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: '90%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 5,
  },
  largeBox: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: '90%',
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DetailedOR;
