import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, SafeAreaView, FlatList, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import * as Progress from 'react-native-progress';
import firestore from '@react-native-firebase/firestore';
import AvailableSlotCard from '../components/AvailableSlotCard';
import { AuthContext } from '../Navigation/AuthProvider';
import { removeSlotFromMap } from '../FirestoreFunctions/CommonFirestoreFunctions';

export default function ClinicDetailsScreen({ route, navigation }) {

    const { user } = useContext(AuthContext);
    const { clinicId } = route.params;

    const [clinicInfo, setClinicInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [slots, setSlots] = useState({})
    const [selectedSlot, setSelectedSlot] = useState(undefined)
    const [selectedTime, setSelectedTime] = useState(undefined)
    const [error, setError] = useState("")
    const [duplicateCheck, setDuplicateCheck] = useState(false)

    console.log(clinicInfo)

    //important here to get real time updates as people will be booking slots. Therefore up to date available slots
    //is essential
    useEffect(() => {
        getClinicInformation()
        checkForDuplicate()
    }, [])

    function checkForDuplicate() {
        firestore()
            .collection(`Clinics/${clinicId}/Appointments`)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.id === user.uid) {
                        setDuplicateCheck(true)
                    }
                });
            });
    }

    function getClinicInformation() {
        firestore()
            .collection('Clinics')
            .doc(clinicId)
            .onSnapshot(documentSnapshot => {
                setClinicInfo(documentSnapshot.data())
                setSlots(documentSnapshot.data().slots)
                if (!Object.hasOwnProperty(selectedSlot)) {
                    setSelectedSlot(undefined)
                    setSelectedTime(undefined)
                }
            });
    }

    function formatSlotsList() {
        //need to clear selected slot on every render so that its not possible to select a slot that has been booked
        const appointmentList = [];
        // need to ensure that the server has returned the required data before preformating the data so that it can be rendered
        if (Object.keys(slots).length !== 0) {
            const size = Object.keys(slots).length
            for (let i = 0; i < size; i++) {
                let slotid = Object.keys(slots)[i];
                let time = Object.values(slots)[i];
                appointmentList.push({
                    slotid: slotid,
                    time: time
                });
            }
            return appointmentList
        }
    }

    function confirmAppointment() {
        if (selectedSlot) {
            navigation.navigate('Appointment Confirmation', {
                clinicId: clinicId,
                status: clinicInfo.clinicStatus,
                capacity: clinicInfo.capacity,
                date: clinicInfo.date,
                location: clinicInfo.location,
                center: clinicInfo.center,
                startTime: clinicInfo.startTime,
                selectedSlot: selectedSlot,
                selectedTime: selectedTime
            })
        } else {
            setError("You must selected an appointment slot!")
        }

    }

    //data rendering
    var timeSlots = <FlatList
        data={formatSlotsList()}
        keyExtractor={(Item, index) => index.toString()}
        renderItem={({ item }) => (
            <AvailableSlotCard active={selectedSlot === item.slotid ? true : false} clinicId={clinicId} slotId={item.slotid} time={item.time} selectedTime={selectedTime} setSelectedTime={setSelectedTime} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
        )}
    />

    return (
        <View style={ClinicDetailStyles.body}>
            <View style={ClinicDetailStyles.clinicInformation}>
                {loading ?
                    <View>
                        <Progress.Circle
                            size={60}
                            indeterminate={true}
                            endAngle={0.6}
                            animated={true}
                            color={'red'}
                            borderColor={'red'}
                            showsText={true} />
                    </View> :
                    <SafeAreaView>
                        <View style={ClinicDetailStyles.content}>
                            <View style={ClinicDetailStyles.col1}>
                                {/* <Text>Status: </Text> */}
                                <Text>Location: </Text>
                                <Text>Test Center: </Text>
                                <Text>Date: </Text>
                                <Text>Clinic Start Time: </Text>
                                {/* <Text>Capacity: </Text> */}
                                {/* <Text>Free Slots: </Text> */}
                            </View>
                            <View style={ClinicDetailStyles.col2}>
                                {/* <Text>{clinicInfo.clinicStatus}</Text> */}
                                <Text>{clinicInfo.location}</Text>
                                <Text>{clinicInfo.center}</Text>
                                <Text>{clinicInfo.date}</Text>
                                <Text>{clinicInfo.startTime}</Text>
                                {/* <Text>{clinicInfo.capacity}</Text> */}
                                {/* <Text>{clinicInfo.slots ? Object.keys(clinicInfo.slots).length : null}</Text> */}
                            </View>
                        </View>
                    </SafeAreaView>}
            </View>
            {!duplicateCheck ? <>
                <View style={ClinicDetailStyles.cta}>
                    <Text variant="titleLarge">Select an appointment time</Text>
                </View>
                <View style={ClinicDetailStyles.appointmentCards}>
                    {timeSlots}
                </View>
                <Text style={ClinicDetailStyles.error}>{error}</Text>
                <Pressable
                    style={({ pressed }) => [
                        { backgroundColor: pressed ? '#dddddd' : '#FFB9B9' },
                        ClinicDetailStyles.button
                    ]}
                    onPress={() => {
                        removeSlotFromMap(selectedSlot, clinicId);
                        confirmAppointment();
                    }}
                >
                    <Text>
                        Confirm appointment Slot
                    </Text>
                </Pressable>
            </> : <View style={ClinicDetailStyles.message}><Text style={ClinicDetailStyles.error}>You currently have an appointment booked for this clinic. To change your're appointment time you must first cancel your current appointment</Text></View>}
        </View>
    )
}

const ClinicDetailStyles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fffff',
        alignItems: 'center',
        padding: 10,
    },
    clinicInformation: {
        width: '90%',
        marginTop: 5,
        marginBottom:10,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    col1: {
        flexDirection: 'column'
    },
    col2: {
        flexDirection: 'column'
    },
    appointmentCards: {
        flex: 2,
        width: '90%',
        marginTop: 10,
        paddingTop: 2,
        paddingBottom: 2,
    },
    button: {
        height: 45,
        width: '90%',
       
        marginBottom: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    error: {
        color: 'red',
    },
    message: {
        flex:1,
        width:'90%',
        justifyContent: 'center',
    },
    cta:{
        marginTop:5,
        
    }
});

