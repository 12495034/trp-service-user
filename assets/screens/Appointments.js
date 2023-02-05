import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, ScrollView, SafeAreaView, FlatList } from 'react-native'
import { Modal, Portal, Text, Provider, Button, List } from 'react-native-paper';
import AppointmentCard from '../components/AppointmentCard';
import FilterAppointmentStatus from '../components/FilterAppointmentStatus';
import { AuthContext } from '../Navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { addSlotToMap } from '../FirestoreFunctions/FirestoreUpdate';


export default function Appointments() {

    const { user } = useContext(AuthContext);
    const [filter, setFilter] = useState("Active");
    const [appointments, setAppointments] = useState([])

    //real time appointment information so that test center and service user can communicate
    useEffect(() => {
        const subscriber = firestore()
            .collection(`Users/${user.uid}/Appointments`)
            .where('status', '==', `${filter}`)
            .onSnapshot(querySnapshot => {
                let appointmentListArray = []
                querySnapshot.forEach((doc) => {
                    const combined = {}
                    const data = doc.data()
                    const id = {
                        id: doc.id
                    }
                    Object.assign(combined, data, id)
                    appointmentListArray.push(combined)
                })
                setAppointments(appointmentListArray)
            });
        return () => subscriber()
    }, [filter])

    function cancelAppointment(slot, time, clinicId) {
        console.log("Removing appointment from users and clinics sub-collection")
        firestore().collection(`Users/${user.uid}/Appointments`).doc(`${clinicId}`).delete()
            .then(() => {
                console.log('Appointment deleted from users collection!');
            });

        firestore().collection(`Clinics/${clinicId}/Appointments`).doc(`${user.uid}`).delete()
            .then(() => {
                console.log('Appointment deleted from clinics collection!');
            });
            addSlotToMap(slot, time, clinicId)
    }

    //Data Rendering
    const appointmentList = <FlatList
        data={appointments}
        keyExtractor={(Item, index) => index.toString()}
        renderItem={({ item }) => (
            <AppointmentCard clinicId={item.id} tester={item.calledBy} location={item.location} center={item.center} date={item.date} time={item.time} slot={item.slot} checkedIn={item.checkedIn} called={item.called} wasSeen={item.wasSeen} cancel={item.status == 'Active' ? cancelAppointment : () => console.log("no function passed")} status={item.status} />
        )}
    />

    return (
        <Provider>
            <View style={AppointmentStyles.body}>
                <FilterAppointmentStatus filter={filter} setFilter={setFilter} />
                <SafeAreaView>
                    {/* conditional rendering to show actions available for active appointments */}
                    <View style={AppointmentStyles.appointments}>
                        {appointments.length > 0 ? appointmentList : <Text>You currently do not have any {filter} appointments to view</Text>}
                    </View>
                </SafeAreaView>
            </View >
        </Provider >
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
    }

})
