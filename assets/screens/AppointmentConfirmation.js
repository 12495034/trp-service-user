import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Pressable, Alert } from 'react-native'
import { AuthContext } from '../Navigation/AuthProvider';
import CountDown from 'react-native-countdown-component';
import { timeLimit } from '../constants/Constants';
import firestore from '@react-native-firebase/firestore';
import { StackActions } from '@react-navigation/native';

export default function AppointmentConfirmation({ route, navigation }) {
    const [loading, setLoading] = useState(false)

    const { user } = useContext(AuthContext);
    const {
        clinicId,
        status,
        capacity,
        date,
        location,
        center,
        startTime,
        selectedSlot,
        selectedTime } = route.params;

    function createNewAppointment() {
        //this function must add a new appointment to the clinics subcollection and the users subcollection
        //the function must also remove the booked slot from the clinic slots map
        //add record to clinic appointments
        firestore()
            .collection(`Clinics/${clinicId}/Appointments`)
            .doc(`${user.uid}`)
            .set({
                called: false,
                calledBy: "",
                checkedIn: false,
                wasSeen: false,
                slot: selectedSlot,
                time: selectedTime,
                status: "Active"
            })
            .then(() => {
                console.log('Appointment added to clinic!');
            });
        firestore()
            .collection(`Users/${user.uid}/Appointments`)
            .doc(`${clinicId}`)
            .set({
                called: false,
                calledBy: "",
                checkedIn: false,
                wasSeen: false,
                location: location,
                center: center,
                slot: selectedSlot,
                time: selectedTime,
                date: date,
                status: "Active"
            })
            .then(() => {
                console.log('Appointment added to user appointment history!');
                Alert.alert("Your booking has been confirmed")
                StackActions.popToTop();
            });
    }

    function showAppointments(){
        navigation.navigate("Appointments")
    }

    return (
        <View style={AppointConfirmStyles.body}>
            <View style={AppointConfirmStyles.clinicInformation}>
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
                        <View style={AppointConfirmStyles.main}>
                            <View style={AppointConfirmStyles.content}>
                                <View style={AppointConfirmStyles.col1}>
                                    <Text>Status: </Text>
                                    <Text>Location: </Text>
                                    <Text>Test Center: </Text>
                                    <Text>Date: </Text>
                                    <Text>Start Time: </Text>
                                    <Text>Appointment Time: </Text>
                                </View>
                                <View style={AppointConfirmStyles.col1}>
                                    <Text>{status}</Text>
                                    <Text>{location}</Text>
                                    <Text>{center}</Text>
                                    <Text>{date}</Text>
                                    <Text>{startTime}</Text>
                                    <Text>{selectedTime}</Text>
                                </View>
                            </View>

                        </View>
                    </SafeAreaView>}
            </View>
            <View style={AppointConfirmStyles.message}>
                <Text>Please check the details above and confirm your appointment within the time specified. If you do not confirm the appointment your slot will be released for other bookings</Text>
            </View>
            <View>
                {/* Error here when moving back through the stack, caused by CountDown component*/}
                {/* <CountDown
                    until={timeLimit}
                    size={30}
                    onFinish={() => alert('Your time has lapsed the appointment slot has been made available for other bookings')}
                    digitStyle={{ backgroundColor: '#FFF' }}
                    digitTxtStyle={{ color: '#1CC625' }}
                    timeToShow={['M', 'S']}
                    timeLabels={{ m: 'MM', s: 'SS' }}
                /> */}
            </View>
            <Pressable
                style={({ pressed }) => [
                    { backgroundColor: pressed ? '#dddddd' : '#F9A8E7', borderBottomRightRadius: 10 },
                    AppointConfirmStyles.button
                ]}
                onPress={() => {
                    createNewAppointment()
                    //resets the clinic booking process after creating the appointment
                    navigation.dispatch(StackActions.popToTop())
                    showAppointments()
                }}
            >
                <Text>
                    Make Booking
                </Text>
            </Pressable>

        </View>
    )
}

const AppointConfirmStyles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fffff',
        alignItems: 'center',
        padding: 10,
    },
    clinicInformation: {
        flex: 1,
        width: '90%',
        margin: 15,
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
    button: {
        height: 45,
        width: '90%',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    error: {
        color: 'red',
    },
    message: {
        flex: 1,
        width: '90%',
        justifyContent: 'center'
    }
});

