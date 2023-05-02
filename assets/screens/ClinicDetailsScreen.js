import React, { useState, useContext } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Text, Button } from 'react-native-paper'
import { useNetInfo } from '@react-native-community/netinfo'

import { AuthContext } from '../context/AuthProvider';
import { removeSlotFromMap } from '../FirestoreFunctions/FirestoreDelete';

import AvailableSlotCard from '../components/AvailableSlotCard';
import UnverifiedEmail from '../components/UnverifiedEmail';
import ClinicInformationCard from '../components/ClinicInformationCard';
import BookingProgress from '../components/BookingProgress';
import { ProgressCircle } from '../components/ProgressCircle';
import useDuplicateCheck from '../CustomHooks/useDuplicateCheck';
import useDocOnSnapshot from '../CustomHooks/useDocOnSnapshot';
import useFilteredCollection from '../CustomHooks/useFilteredCollection';
import { formatSlotsData } from '../DataFormatFunctions/formatSlotData';
import { buttonStyle } from '../constants/Constants';

export default function ClinicDetailsScreen({ route, navigation }) {
    const { user, verificationEmail } = useContext(AuthContext);
    const netInfo = useNetInfo()

    const { clinicId } = route.params;
    const [selectedSlot, setSelectedSlot] = useState(undefined)
    const [selectedTime, setSelectedTime] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState()

    //custom hook to check if the user already has an appointment booked
    const { docData, isDocLoading: snapShotLoading, docError: listenerError } = useDocOnSnapshot(`Clinics`, clinicId)
    const { isDocPresent, isDocLoading, docError } = useDuplicateCheck(`Users/${user.uid}/Appointments`, clinicId)
    const { filteredCollectionData, isFilteredCollectionLoading, filteredCollectionError } = 
    useFilteredCollection(`Location/${docData.location}/Centers`, 'name', '==', docData.center)

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
                addDetails: docData.addDetails,
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
        setLoading(true)
        await verificationEmail()
            .then(() => {
                setMessage(`Verification email sent to ${email}, please check your inbox`)
                setSent(true)
                setLoading(false)
            })
            .catch((e) => {
                setError(e.message)
                setSent(false)
                setLoading(false)
            })
    }

    //data rendering
    //format data taken from firestore into an array so that it can be rendered using a flatlist
    var timeSlots = <FlatList
        data={formatSlotsData(docData.slots, docData.date)}
        keyExtractor={(Item, index) => index.toString()}
        renderItem={({ item }) => (
            <AvailableSlotCard
                active={selectedSlot === item.slotid ? true : false}
                clinicId={clinicId}
                slotId={item.slotid}
                time={item.time}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                selectedSlot={selectedSlot}
                setSelectedSlot={setSelectedSlot} />
        )}
    />

    if (user.emailVerified) {
        return (
            <>
                <View>
                    <BookingProgress progress={0.50} />
                </View>

                <View style={ClinicDetailStyles.body}>

                    <View style={ClinicDetailStyles.clinicInformation}>
                        {isFilteredCollectionLoading ?
                            <View style={ClinicDetailStyles.progress}>
                                <ProgressCircle />
                            </View>
                            :
                            <View>
                                {listenerError ? <Text style={ClinicDetailStyles.error}>{listenerError}</Text> : null}
                                <ClinicInformationCard
                                    clinicData={docData}
                                    locationData={filteredCollectionData}
                                />

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
                                    labelStyle={buttonStyle.MDLabel}
                                    color='pink'
                                    mode={'contained'}
                                    disabled={netInfo.isInternetReachable ? false : true}
                                    onPress={() => {
                                        removeSlotFromMap(selectedSlot, clinicId);
                                        confirmAppointment();
                                    }}>
                                    {netInfo.isInternetReachable ? "Confirm Slot" : "You are currently offline"}
                                </Button>
                            </View>

                        </View>
                        :
                        <View><Text style={ClinicDetailStyles.error}>You currently have an appointment booked for this clinic. To change your're appointment time you must first cancel your current appointment</Text></View>}
                </View>
            </>
        )
    } else {
        return (
            <UnverifiedEmail loading={loading} setLoading={setLoading} sent={sent} setSent={setSent} message={message} error={error} action={handleVerificationEmail} email={user.email} />
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

    appointmentSelection: {
        flex: 1,
        width: '100%',
    },
    appointmentSlots: {
        flex: 1,
        marginBottom: 2
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

