import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import casesData from './cases_filtered_json.json';
import tracksData from './tracks_info_filtered_json.json';
import surgeries from './surgeries.json'; // Import the surgery steps data



// select a random case
const selectRandomCase = (cases) => {
    const randomIndex = Math.floor(Math.random() * cases.length);
    return cases[randomIndex];
};

const DetailedOR = ({ route, navigation }) => {
    const { or } = route.params;

    const getCurrentStepFraction = (surgeryType, currentStep) => {
        const surgery = surgeries.find(s => s.surgeryType === surgeryType);
        if (surgery) {
          const totalSteps = surgery.steps.length;
          const currentStepIndex = surgery.steps.indexOf(currentStep) + 1; // +1 for 1-based index
          return `(${currentStepIndex}/${totalSteps})`; // e.g., "(1/8)"
        }
        return '(0/0)'; // Default if not found
      };

    // grab surgery info from the case we picked
    // right now, it's a random case ID choice
    const [surgeryInfo, setSurgeryInfo] = useState(selectRandomCase(casesData));
    const opStart = surgeryInfo.opstart

    // heart rate stuff
    const [currentHeartRate, setCurrentHeartRate] = useState(null);
    const [heartRateData, setHeartRateData] = useState([]);

    // blood pressure stuff
    const [currentSBP, setCurrentSBP] = useState(null);
    const [sbpData, setSBPData] = useState([]);

    // blood pressure stuff
    const [currentDBP, setCurrentDBP] = useState(null);
    const [dbpData, setDBPData] = useState([]);

    // when we open, we filter the tracks to only certain machines from our current patient
    useEffect(() => {
        const heartRateTrack = tracksData.filter(track =>
            track.caseid === surgeryInfo.caseid &&
            track.tname.startsWith('Solar8000/HR')
        );

        const systolicPressureTrack = tracksData.filter(track =>
            track.caseid === surgeryInfo.caseid &&
            track.tname.startsWith('Solar8000/ART_SBP')
        );

        const diastolicPressureTrack = tracksData.filter(track =>
            track.caseid === surgeryInfo.caseid &&
            track.tname.startsWith('Solar8000/ART_DBP')
        );

        // we fetch the vitals data from the vitalDB API
        // this could be upgraded to Epic, for example
        const fetchDataForTrack = async (tid, setData) => {
            try {
                const response = await fetch(`https://api.vitaldb.net/${tid}`);
                if (response.ok) {
                    const csvText = await response.text();
                    const data = csvToJSON(csvText);
                    setData(data);
                } else {
                    throw new Error('Response not successful');
                }
            } catch (error) {
                console.error("Error fetching data from VitalDB:", error);
            }
        };

        // make sure we got usable data, then grab the tid of the HR data
        // which is a unique identifier
        if (heartRateTrack.length > 0) {
            const heartRateTID = heartRateTrack[0].tid;
            fetchDataForTrack(heartRateTID, setHeartRateData);
        }

        if (systolicPressureTrack.length > 0) {
            const systolicPressureTID = systolicPressureTrack[0].tid;
            fetchDataForTrack(systolicPressureTID, setSBPData);
        }

        if (diastolicPressureTrack.length > 0) {
            const diastolicPressureTID = diastolicPressureTrack[0].tid;
            fetchDataForTrack(diastolicPressureTID, setDBPData);
        }

        return () => {
            // Cleanup: Clear interval if set
        }
    }, [surgeryInfo]);

    // for parsing
    const csvToJSON = (csv) => {
        const lines = csv.split('\n');
        const result = [];
        const headers = lines[0].split(',');

        lines.slice(1).forEach((line) => {
            const obj = {};
            const currentline = line.split(',');

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
            const startIndex = heartRateData.findIndex(d => parseFloat(d.Time) >= opStart);
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
            const startIndex = sbpData.findIndex(d => parseFloat(d.Time) >= opStart);
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
            const startIndex = dbpData.findIndex(d => parseFloat(d.Time) >= opStart);
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

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.detailBox}>
                    <Text style={styles.title}>{or.id}</Text>
                    <Text style={styles.detailText}>Surgeon Name: {or.surgeonName}</Text>
                    <Text style={styles.detailText}>R.A. Name: {or.raName}</Text>
                    <Text style={styles.detailText}>Surgery Type: {or.surgeryType}</Text>
                    <Text style={styles.detailText}>
                        Surgery Stage: {or.surgeryStage} {getCurrentStepFraction(or.surgeryType, or.surgeryStage)}
                    </Text>
                </View>

                <View style={styles.anesBox}>
                    <Text style={styles.detailText}>
                        Type of Anesthesia: <Text style={styles.vital}>{surgeryInfo.ane_type}</Text>
                    </Text>
                    <Text style={styles.detailText}>
                        Current Heart Rate: <Text style={styles.vital}>{currentHeartRate}</Text>
                    </Text>
                    <Text style={styles.detailText}>
                        Current Blood Pressure:{" "}
                        <Text style={styles.vital}>
                            {currentSBP && currentDBP ? `${currentSBP}/${currentDBP}` : currentSBP || currentDBP || ''}
                        </Text>
                    </Text>
                </View>

                <TouchableOpacity 
          style={styles.largeBox}
          onPress={() => navigation.navigate('PushNotifications', { or: or })}
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
    anesBox: {
        backgroundColor: 'lightpink',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        marginVertical: 10,
        alignItems: 'flex-start',
    },
    vital: {
        fontWeight: 'bold',
        color: '#007bff',
    },
    boxTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});


export default DetailedOR;