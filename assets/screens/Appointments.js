import React, { useState, useContext } from 'react'
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native'
import { Text, List } from 'react-native-paper';
import { AuthContext } from '../context/AuthProvider';
import { addSlotToMap } from '../FirestoreFunctions/FirestoreUpdate';
import useCollectionOnSnapshot from '../CustomHooks/useCollectionOnSnapshot';
import FilterAppointmentStatus from '../components/FilterAppointmentStatus';
import AppointmentCard from '../components/AppointmentCard';
import { ProgressCircle } from '../components/ProgressCircle';
import canCancel from '../functions/SpecialFunctions/canCancel'
import firestore from '@react-native-firebase/firestore';

/**
 * Appointments Screen where the users current appointments and appointment history can be viewed
 */
export default function Appointments() {
    const { user } = useContext(AuthContext);
    const [filter, setFilter] = useState("Active");
    const [error, setError] = useState('')
    const [expandedAtClinic, setExpandedAtClinic] = useState(false);

    //custom hook to setup a listener on the users appointments collection
    const { collectionData, isCollectionLoading, collectionError } = useCollectionOnSnapshot(`Users/${user.uid}/Appointments`, `status`, filter)

    /**
     * Function to expand and collapse the instructions to the user on the Active appointments screen
     */
    const handlePressAtClinic = () => {
        setExpandedAtClinic(!expandedAtClinic)
    };

    /**
     * Function to check in user
     * @param {String} status Appointment status
     * @param {String} userId firebase user id
     * @param {String} clinicId id of the clinic
     * @param {Boolean} checkInStatus The check in status for the current appointment
     */
    function handleUserCheckIn(status, userId, clinicId, checkInStatus) {
        //data to update checkin status with
        var data = {}
        //toggle check in status
        checkInStatus ? data = { checkedIn: false } : data = { checkedIn: true }

        const ref1 = firestore().doc(`Users/${userId}/Appointments/${clinicId}`)
        const ref2 = firestore().doc(`Clinics/${clinicId}/Appointments/${userId}`)
        if (status == "Active") {
            firestore().runTransaction(async transaction => {
                transaction.update(ref1, data);
                transaction.update(ref2, data);
            })
                .then(() => {
                    //user checked in indicated by icon turning green
                })
                .catch((e) => {
                    setError('')
                    setError(e.message)
                })
        }
    }

    /**
     * Function to delete appointment from Appointments subcollection in applicable Users and Clinic documents using a transaction
     * transactions fail if the user is offline or all operations do not complete
     * @param {String} slot id of the appointment Slot
     * @param {String} time time of the appointment slot
     * @param {String} clinicId id of the clinic
     * @param {String} userId Firebase user id
     */
    function cancelAppointment(slot, time, clinicId, userId) {
        const ref1 = firestore().doc(`Users/${userId}/Appointments/${clinicId}`)
        const ref2 = firestore().doc(`Clinics/${clinicId}/Appointments/${userId}`)
        firestore().runTransaction(async transaction => {
            transaction.delete(ref1);
            transaction.delete(ref2);
        })
            .then(() => {
                addSlotToMap(slot, time, clinicId)
            })
            .catch((e) => {
                setError('')
                setError(e.message)
            })
    }

    //Data Rendering
    const appointmentList = <FlatList
        data={collectionData}
        keyExtractor={(Item, index) => index.toString()}
        renderItem={({ item }) => (
            <View style={AppointmentStyles.card}>
                <AppointmentCard
                    userId={user.uid}
                    clinicId={item.id}
                    tester={item.calledBy}
                    location={item.location}
                    center={item.center}
                    date={item.date}
                    addDetails={item.addDetails}
                    clinicAddress={item.clinicAddress}
                    clinicPostcode={item.clinicPostcode}
                    time={item.time}
                    slot={item.slot}
                    checkedIn={item.checkedIn}
                    called={item.called}
                    wasSeen={item.wasSeen}
                    cancel={item.status == 'Active' ? cancelAppointment : null}
                    userCheckIn={() => !item.called ? handleUserCheckIn(item.status, user.uid, item.id, item.checkedIn) : null}
                    status={item.status}
                    isCancellable={canCancel(new Date(), new Date(`${item.date}T${item.time}:00.000`))}
                />
            </View>
        )}
    />

    return (
        isCollectionLoading ?
            <View style={AppointmentStyles.progress}><ProgressCircle /></View>
            :
            <View style={AppointmentStyles.body}>
                <FilterAppointmentStatus filter={filter} setFilter={setFilter} />
                {filter === "Active" ? <View style={AppointmentStyles.instruction}>
                    <List.Accordion
                        title="What to do at the clinic"
                        expanded={expandedAtClinic}
                        onPress={handlePressAtClinic}>
                        <List.Item
                            title="Check in"
                            descriptionNumberOfLines={3}
                            description="Press the red user icon to let the clinic know you have arrived"
                            left={props => <List.Icon {...props} color='green' icon="account-check" />}
                        />
                        <List.Item
                            title="Called"
                            descriptionNumberOfLines={3}
                            description="When called for your test the bell icon will turn purple and the testers name will be shown"
                            left={props => <List.Icon {...props} color='purple' icon="bell" />}
                        />
                        <List.Item
                            title="Test complete"
                            descriptionNumberOfLines={3}
                            description="When your test is complete the thumb icon will turn green"
                            left={props => <List.Icon {...props} color='green' icon="thumb-up" />}
                        />
                        <List.Item
                            title="Cancellations"
                            descriptionNumberOfLines={3}
                            description="You can cancel an appointment with a minimum of24hrs. Press and hold the appointment to cancel."
                            left={props => <List.Icon {...props} color='red' icon="cancel" />}
                        />
                    </List.Accordion>
                </View> :
                    null}
                {error ? <Text style={AppointmentStyles.error}>{error}</Text> : null}
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={AppointmentStyles.appointments}>
                        {collectionData.length != [] ? appointmentList : <Text style={AppointmentStyles.text}>You currently do not have any {filter} appointments to view</Text>}
                    </View>
                </SafeAreaView>
            </View >

    )
}

const AppointmentStyles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 15,
    },
    appointments: {
        width: '100%',
    },
    card: {
        marginBottom: 5,
    },
    progress: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    instruction: {
        marginTop: 5,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 5,
        marginTop: 5,
        textAlign: 'center'
    },

})
