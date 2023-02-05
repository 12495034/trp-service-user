import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, BackHandler, Alert } from 'react-native'
import { AuthContext } from '../Navigation/AuthProvider';
import { timeLimit } from '../constants/Constants';
import firestore from '@react-native-firebase/firestore';
import { StackActions } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { addSlotToMap } from '../FirestoreFunctions/FirestoreUpdate';
import { handleAlertInformation } from '../commonFunctions/Alerts';
import { BgTimer } from '../components/BgTimer';
import { BookingCancelAlertBody, BookingCancelAlertTitle, BookingSuccessfulAlertBody, BookingSuccessfulAlertTitle } from '../content/Message';
import { handleAlertDecision } from '../commonFunctions/Alerts';

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

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go back? You will lose all your booking information', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => cancelBookingRequest() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

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
            });
    }

    function cancelBookingRequest() {
        console.log("Cancelling booking request")
        addSlotToMap(selectedSlot, selectedTime, clinicId)
        navigation.dispatch(StackActions.popToTop())
        console.log("Request cancelled")
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
                                    <Text>Appointment Time: </Text>
                                </View>
                                <View style={AppointConfirmStyles.col1}>
                                    <Text>{status}</Text>
                                    <Text>{location}</Text>
                                    <Text>{center}</Text>
                                    <Text>{date}</Text>
                                    <Text>{selectedTime}</Text>
                                </View>
                            </View>

                        </View>
                    </SafeAreaView>}
            </View>
            <View style={AppointConfirmStyles.message}>
                <Text style={AppointConfirmStyles.messageText}>Please check the details above and confirm your appointment within the time specified. If you do not confirm the appointment your slot will be released for other bookings</Text>
            </View>
            <View style={AppointConfirmStyles.timer}>
                {/* //count down timer component can be commented in or out to turn this functionality on and off */}
                {/* <BgTimer timeLimit={timeLimit} callBack={cancelBookingRequest}/> */}
            </View>
            <View style={AppointConfirmStyles.options}>
                <Button
                    style={{ width: '49%' }}
                    labelStyle={{ fontSize: 12 }}
                    color='green'
                    mode={'contained'}
                    onPress={() => {
                        createNewAppointment()
                        //reset booking stack prior to leaving
                        navigation.dispatch(StackActions.popToTop())
                        //show newly created appointment
                        navigation.navigate("Appointments")
                        //inform user that appointment has been confirmed and policy with regard to cancellation
                        handleAlertInformation(BookingSuccessfulAlertTitle, BookingSuccessfulAlertBody)
                    }}>
                    Submit Request
                </Button>
                <Button
                    style={{ width: '49%' }}
                    labelStyle={{ fontSize: 12 }}
                    color='red'
                    mode={'contained'}
                    onPress={() => {
                        handleAlertDecision(
                            BookingCancelAlertTitle,
                            BookingCancelAlertBody,
                            cancelBookingRequest,
                            null
                        )
                    }}>
                    Cancel request
                </Button>
            </View>
        </View >
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
        width: '90%',
        justifyContent: 'center',
    },
    messageText: {
        textAlign: 'justify'
    },
    timer: {
        flex: 1,
        justifyContent: 'center'
    },
    options: {
        width: '100%',
        marginTop: 6,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

