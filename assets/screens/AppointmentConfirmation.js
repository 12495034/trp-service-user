import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, BackHandler, Alert } from 'react-native'
import { StackActions } from '@react-navigation/native';
import { Button } from 'react-native-paper';

import { AuthContext } from '../context/AuthProvider';
import { timeLimit } from '../constants/Constants';
import { clinicAppointmentData, userAppointmentData } from '../constants/Constants';
import { appointmentConfirmation1, BookingCancelAlertBody, BookingCancelAlertTitle, BookingSuccessfulAlertBody, BookingSuccessfulAlertTitle } from '../content/Message';
import { addSlotToMap } from '../FirestoreFunctions/FirestoreUpdate';
import { BgTimer } from '../CustomHooks/BgTimer';
import { handleAlertDecision, handleAlertInformation } from '../commonFunctions/Alerts';
import { useNetInfo } from '@react-native-community/netinfo'
import BookingProgress from '../components/BookingProgress';

import firestore from '@react-native-firebase/firestore';

export default function AppointmentConfirmation({ route, navigation }) {

    const { user } = useContext(AuthContext);
    const netInfo = useNetInfo();

    //data passed to from clinic details screen
    const {
        clinicId,
        date,
        location,
        center,
        addDetails,
        selectedSlot,
        selectedTime,
        clinicAddress,
        clinicPostcode,
    } = route.params;

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        //handling the user pressing the hardware back button and that they will lose saved data if they proceed
        const backAction = () => {
            Alert.alert("Cancel Booking process", "Hold on!, Are you sure you want leave the booking process? You will lose all your booking information", [
                {
                    text: 'No',
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

    //new appointment documents created in two sub-collections using a transaction
    function createNewAppointment() {
        const ref1 = firestore().doc(`Users/${user.uid}/Appointments/${clinicId}`)
        const ref2 = firestore().doc(`Clinics/${clinicId}/Appointments/${user.uid}`)
        firestore().runTransaction(async transaction => {
            transaction.set(ref1, userAppointmentData(selectedSlot, selectedTime, location, center, addDetails, clinicAddress, clinicPostcode, date));
            transaction.set(ref2, clinicAppointmentData(selectedSlot, selectedTime));
        })
            .then(() => {
                //pop to top of stack
                navigation.dispatch(StackActions.popToTop())
                //show newly created appointment on the appointments tab
                navigation.navigate("Appointments")
                //inform user that appointment has been confirmed and policy with regard to cancellation
                handleAlertInformation(BookingSuccessfulAlertTitle, BookingSuccessfulAlertBody)
            })
            .catch((e) => {
                setError('')
                setError(e.message)
            })
    }

    //function that cancels the current booking request by releasing the selected booking slot
    function cancelBookingRequest() {
        addSlotToMap(selectedSlot, selectedTime, clinicId)
        navigation.dispatch(StackActions.popToTop())
    }

    return (
        <>
            <View>
                <BookingProgress progress={0.75} />
            </View>

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
                                        <Text style={AppointConfirmStyles.text}>Test Center: </Text>
                                        <Text style={AppointConfirmStyles.text}>Additional Details: </Text>
                                        <Text style={AppointConfirmStyles.text}>Address: </Text>
                                        <Text style={AppointConfirmStyles.text}>Location: </Text>
                                        <Text style={AppointConfirmStyles.text}>Postcode: </Text>
                                        <Text style={AppointConfirmStyles.text}>Date: </Text>
                                        <Text style={AppointConfirmStyles.text}>Appointment Time: </Text>
                                        <Text style={AppointConfirmStyles.text}>Slot Number: </Text>
                                    </View>
                                    <View style={AppointConfirmStyles.col1}>
                                        <Text style={AppointConfirmStyles.text}>{center}</Text>
                                        <Text style={AppointConfirmStyles.text}>{addDetails}</Text>
                                        <Text style={AppointConfirmStyles.text}>{clinicAddress}</Text>
                                        <Text style={AppointConfirmStyles.text}>{location}</Text>
                                        <Text style={AppointConfirmStyles.text}>{clinicPostcode}</Text>
                                        <Text style={AppointConfirmStyles.text}>{date}</Text>
                                        <Text style={AppointConfirmStyles.text}>{selectedTime}</Text>
                                        <Text style={AppointConfirmStyles.text}>{selectedSlot}</Text>
                                    </View>
                                </View>
                            </View>
                        </SafeAreaView>}
                </View>
                <View style={AppointConfirmStyles.message}>
                    <Text style={AppointConfirmStyles.text}>{appointmentConfirmation1}</Text>
                </View>
                <View style={AppointConfirmStyles.timer}>
                    {/* //count down timer component can be commented in or out to turn this functionality on and off */}
                    <BgTimer timeLimit={timeLimit} callBack={cancelBookingRequest} />
                </View>
                <Text style={AppointConfirmStyles.error}>{error}</Text>
                <View style={AppointConfirmStyles.options}>
                    <Button
                        style={{ width: '49%' }}
                        labelStyle={{ fontSize: 12 }}
                        color='green'
                        mode={'contained'}
                        disabled={netInfo.isInternetReachable ? false : true}
                        onPress={() => {
                            createNewAppointment()
                        }}>
                        Finish Booking
                    </Button>
                    <Button
                        style={{ width: '49%' }}
                        labelStyle={{ fontSize: 12 }}
                        color='red'
                        mode={'contained'}
                        onPress={() => {
                            handleAlertDecision(BookingCancelAlertTitle, BookingCancelAlertBody, "Yes", "No", cancelBookingRequest, null
                            )
                        }}>
                        Cancel Booking
                    </Button>
                </View>
            </View >
        </>
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
        width: '100%',
        margin: 15,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white'
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
        textAlign: 'justify'
    },
    message: {
        width: '100%',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'justify',
        color: 'black'
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

