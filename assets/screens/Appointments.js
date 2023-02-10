import React, { useState, useContext } from 'react'
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native'
import { Text } from 'react-native-paper';
import AppointmentCard from '../components/AppointmentCard';
import FilterAppointmentStatus from '../components/FilterAppointmentStatus';
import { AuthContext } from '../context/AuthProvider';
import { addSlotToMap } from '../FirestoreFunctions/FirestoreUpdate';
import { deleteUserDocument } from '../FirestoreFunctions/FirestoreDelete';
import useCollectionOnSnapshot from '../CustomHooks/useCollectionOnSnapshot';
import { ProgressCircle } from '../components/ProgressCircle';

export default function Appointments() {

    const { user } = useContext(AuthContext);
    const [filter, setFilter] = useState("Active");
    const [userError, setUserError] = useState('')
    const [clinicError, setClinicError] = useState('')

    //custom hook to setup a listener on the users appointments collection
    const { appointmentsData, isCollectionLoading, collectionError } = useCollectionOnSnapshot(`Users/${user.uid}/Appointments`, filter)

    //deletes appointment from Users and Clinics Appointments subcollection
    //risk using the current approach that it will be deleted from one location and not the other
    //improvement here would be to use batch write
    function cancelAppointment(slot, time, clinicId) {
        deleteUserDocument(`Users/${user.uid}/Appointments`, clinicId)
            .then(() => {
                console.log('Appointment deleted from users collection!');
                deleteUserDocument(`Clinics/${clinicId}/Appointments`, user.uid)
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
        data={appointmentsData}
        keyExtractor={(Item, index) => index.toString()}
        renderItem={({ item }) => (
            <AppointmentCard clinicId={item.id} tester={item.calledBy} location={item.location} center={item.center} date={item.date} time={item.time} slot={item.slot} checkedIn={item.checkedIn} called={item.called} wasSeen={item.wasSeen} cancel={item.status == 'Active' ? cancelAppointment : () => console.log("no function passed")} status={item.status} />
        )}
    />

    return (
        isCollectionLoading ?
            <View style={AppointmentStyles.progress}>
                <ProgressCircle />
            </View>
            :
            <View style={AppointmentStyles.body}>
                {userError ? <Text style={AppointmentStyles.error}>{userError}</Text> : null}
                {clinicError ? <Text style={AppointmentStyles.error}>{clinicError}</Text> : null}
                <FilterAppointmentStatus filter={filter} setFilter={setFilter} />
                <SafeAreaView>
                    <View style={AppointmentStyles.appointments}>
                        {appointmentsData.length > 0 ? appointmentList : <Text>You currently do not have any {filter} appointments to view</Text>}
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
        textAlign: 'justify'
    },
    progress: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        marginBottom: 5,
        marginTop: 5,
        textAlign: 'center'
    },

})
