import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { Text, Button } from 'react-native-paper'
import * as Progress from 'react-native-progress';

import { AuthContext } from '../context/AuthProvider';
import { removeSlotFromMap } from '../FirestoreFunctions/FirestoreDelete';

import AvailableSlotCard from '../components/AvailableSlotCard';
import UnverifiedEmail from '../components/UnverifiedEmail';
import useDuplicateCheck from '../CustomHooks/useDuplicateCheck';
import useDocOnSnapshot from '../CustomHooks/useDocOnSnapshot';
import useFilteredCollection from '../CustomHooks/useFilteredCollection';

import { formatSlotsData } from '../DataFormatFunctions/formatSlotData';


export default function ClinicDetailsScreen({ route, navigation }) {

    const { user, verificationEmail } = useContext(AuthContext);
    const { clinicId } = route.params;

    const [selectedSlot, setSelectedSlot] = useState(undefined)
    const [selectedTime, setSelectedTime] = useState(undefined)
    const [error, setError] = useState("")
    const [message, setMessage] = useState()

    //custom hook to check if the user already has an appointment booked
    const { docData, isDocLoading: snapShotLoading, docError: listenerError } = useDocOnSnapshot(`Clinics`, clinicId)
    const { isDocPresent, isDocLoading, docError } = useDuplicateCheck(`Clinics/${clinicId}/Appointments`, user.uid)
    const { filteredCollectionData, isFilteredCollectionLoading, filteredCollectionError } = useFilteredCollection(`Location/${docData.location}/Centers`, 'name', '==', docData.center)

    //parameters passed to appointment confirmation screen, passed rather than re-read to minimise number of calls made to database
    function confirmAppointment() {
        if (selectedSlot) {
            navigation.navigate('Appointment Confirmation', {
                clinicId: clinicId,
                status: docData.clinicStatus,
                capacity: docData.capacity,
                date: docData.date,
                location: docData.location,
                center: docData.center,
                startTime: docData.startTime,
                selectedSlot: selectedSlot,
                selectedTime: selectedTime,
                clinicAddress: filteredCollectionData[0].line1,
                clinicPostcode: filteredCollectionData[0].postcode
            })
        } else {
            setError("You must select an appointment slot!")
        }
    }

    async function handleVerificationEmail(email) {
        await verificationEmail()
            .then(() => {
                setMessage(`Verification email sent to ${email}, please check your inbox`)
            })
            .catch((e) => {
                console.log(e)
                setError(e.message)
            })
    }

    //data rendering
    //format data taken from firestore into an array so that it can be rendered using a flatlist
    const appointmentSlots = formatSlotsData(docData.slots)

    var timeSlots = <FlatList
        data={appointmentSlots}
        keyExtractor={(Item, index) => index.toString()}
        renderItem={({ item }) => (
            <AvailableSlotCard active={selectedSlot === item.slotid ? true : false} clinicId={clinicId} slotId={item.slotid} time={item.time} selectedTime={selectedTime} setSelectedTime={setSelectedTime} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
        )}
    />

    if (user.emailVerified) {
        return (
            <View style={ClinicDetailStyles.body}>
                <View style={ClinicDetailStyles.clinicInformation}>
                    {isFilteredCollectionLoading ?
                        <View style={ClinicDetailStyles.progress}>
                            <Progress.Circle
                                size={60}
                                indeterminate={true}
                                endAngle={0.6}
                                animated={true}
                                color={'red'}
                                borderColor={'red'}
                                showsText={true} />
                        </View>
                        :
                        <View>
                            {listenerError ? <Text style={ClinicDetailStyles.error}>{listenerError}</Text> : null}
                            <View style={ClinicDetailStyles.content}>
                                <View style={ClinicDetailStyles.col1}>
                                    <Text>Test Center: </Text>
                                    <Text>Address: </Text>
                                    <Text>City: </Text>
                                    <Text>Postcode: </Text>
                                    <Text>Date: </Text>
                                </View>
                                <View style={ClinicDetailStyles.col2}>
                                    <Text>{docData.center}</Text>
                                    {filteredCollectionData.length == 1 ? <Text>{filteredCollectionData[0].line1}</Text> : null}
                                    <Text>{docData.location}</Text>
                                    {filteredCollectionData.length == 1 ? <Text>{filteredCollectionData[0].postcode}</Text> : null}
                                    <Text>{docData.date}</Text>
                                </View>
                            </View>

                        </View>
                    }
                </View>

                {!isDocPresent ?
                    <View style={ClinicDetailStyles.appointmentSelection}>
                        <View style={ClinicDetailStyles.appointmentSlots}>
                            {timeSlots}
                        </View>
                        {error ? <Text style={ClinicDetailStyles.error}>{error}</Text> : null}
                        <View style={ClinicDetailStyles.Button}>
                            <Button
                                style={{ width: '100%' }}
                                labelStyle={{ fontSize: 12 }}
                                color='pink'
                                mode={'contained'}
                                onPress={() => {
                                    removeSlotFromMap(selectedSlot, clinicId);
                                    confirmAppointment();
                                }}>
                                Confirm Slot
                            </Button>
                        </View>

                    </View>
                    :
                    <View><Text style={ClinicDetailStyles.error}>You currently have an appointment booked for this clinic. To change your're appointment time you must first cancel your current appointment</Text></View>}
            </View>
        )
    } else {
        return (
            <UnverifiedEmail message={message} error={error} action={handleVerificationEmail} email={user.email} />
        );
    }
}

const ClinicDetailStyles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fffff',
        padding: 10,
    },
    clinicInformation: {
        width: '100%',
        marginBottom: 5,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        backgroundColor: 'white'
    },
    col1: {
        flexDirection: 'column'
    },
    col2: {
        flexDirection: 'column'
    },
    appointmentSelection: {
        flex: 1,
        width: '100%',
    },
    appointmentSlots: {
        flex: 1,
        marginBottom:2
    },
    error: {
        color: 'red',
        marginBottom: 5,
        marginTop: 5,
        textAlign: 'center'
    },
    progress: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginBottom: 5,
        textAlign: 'center'
    }
});

