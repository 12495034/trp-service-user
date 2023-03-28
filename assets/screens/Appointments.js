import React, { useState, useContext } from 'react'
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native'
import { Text } from 'react-native-paper';
import AppointmentCard from '../components/AppointmentCard';
import FilterAppointmentStatus from '../components/FilterAppointmentStatus';
import { AuthContext } from '../context/AuthProvider';
import { addSlotToMap, updateDocumentGeneral } from '../FirestoreFunctions/FirestoreUpdate';
import { deleteDocument } from '../FirestoreFunctions/FirestoreDelete';
import useCollectionOnSnapshot from '../CustomHooks/useCollectionOnSnapshot';
import { ProgressCircle } from '../components/ProgressCircle';
import canCancel from '../logicFunctions.js/canCancel'
import { List } from 'react-native-paper';
import useDoc from '../CustomHooks/useDoc';
import useDocOnSnapshot from '../CustomHooks/useDocOnSnapshot';

export default function Appointments() {
    const { user } = useContext(AuthContext);
    const [filter, setFilter] = useState("Active");
    const [userError, setUserError] = useState('')
    const [clinicError, setClinicError] = useState('')
    const [expandedAtClinic, setExpandedAtClinic] = useState(false);

    //custom hook to setup a listener on the users appointments collection
    const { collectionData, isCollectionLoading, collectionError } = useCollectionOnSnapshot(`Users/${user.uid}/Appointments`, filter)

    const handlePressAtClinic = () => {
        setExpandedAtClinic(!expandedAtClinic)
    };

    //checks in user in users and clinics appointments sub-collection
    function handleUserCheckIn(status, userId, clinicId) {
        //data to update checkin status with
        var data = {
            checkedIn: true,
        }

        if (status == "Active") {
            updateDocumentGeneral(`Users/${userId}/Appointments`, `${clinicId}`, data)
                .then(() => {
                    console.log('User checked in in clinic sub-collection!');
                })
                .catch((e) => {
                    console.log(e.message)
                })
            updateDocumentGeneral(`Clinics/${clinicId}/Appointments`, `${userId}`, data)
                .then(() => {
                    console.log('User checked in in users sub-collection!');
                })
                .catch((e) => {
                    console.log(e.message)
                })
        } else {
            console.log("Appointment is not active, therefore changes cannot be made")
        }
    }

    //deletes appointment from Users and Clinics Appointments subcollection
    //risk using the current approach that it will be deleted from one location and not the other
    //improvement here would be to use batch write
    function cancelAppointment(slot, time, clinicId) {
        deleteDocument(`Users/${user.uid}/Appointments`, clinicId)
            .then(() => {
                console.log('Appointment deleted from users collection!');
                deleteDocument(`Clinics/${clinicId}/Appointments`, user.uid)
                    .then(() => {
                        console.log('Appointment deleted from clinics collection!');
                        //add slot to map making it available to other users
                        addSlotToMap(slot, time, clinicId)
                    })
                    .catch((e) => {
                        console.log("Clinic Collection Error:", e.message)
                        setClinicError(e.message)
                    })
            })
            .catch((e) => {
                console.log("User Collection Error:", e.message)
                setUserError(e.message)
            })
    }

    //Data Rendering
    const appointmentList = <FlatList
        data={collectionData}
        keyExtractor={(Item, index) => index.toString()}
        renderItem={({ item }) => (
            <View style={AppointmentStyles.card}>
                <AppointmentCard
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
                    cancel={item.status == 'Active' ? cancelAppointment : () => console.log("no function passed")}
                    userCheckIn={() => handleUserCheckIn(item.status, user.uid, item.id)} status={item.status}
                    isCancellable={canCancel(new Date(), new Date(`${item.date}T${item.time}:00Z`))}
                />
            </View>
        )}
    />

    return (
        isCollectionLoading ?
            <View style={AppointmentStyles.progress}><ProgressCircle /></View>
            :
            <View style={AppointmentStyles.body}>
                {userError ? <Text style={AppointmentStyles.error}>{userError}</Text> : null}
                {clinicError ? <Text style={AppointmentStyles.error}>{clinicError}</Text> : null}
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
                </View>:
                null}
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={AppointmentStyles.appointments}>
                        {collectionData.length > 0 ? appointmentList : <Text style={AppointmentStyles.text}>You currently do not have any {filter} appointments to view</Text>}
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
