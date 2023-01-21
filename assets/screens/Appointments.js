import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, ScrollView, SafeAreaView, FlatList } from 'react-native'
import { Modal, Portal, Text, Provider, Button } from 'react-native-paper';
import AppointmentCard from '../components/AppointmentCard';
import Filter from '../components/Filter';
import { AuthContext } from '../Navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { addSlotToMap } from '../FirestoreFunctions/CommonFirestoreFunctions';

export default function Appointments() {

    const { user } = useContext(AuthContext);
    const [filter, setFilter] = useState("Active");
    const [appointments, setAppointments] = useState([])
    // const [visible, setVisible] = React.useState(false);
    // const showModal = () => setVisible(true);
    // const hideModal = () => setVisible(false);
    // const containerStyle = { backgroundColor: 'white', padding: 20 };

    fetchUserAppointments()

    function cancelAppointment(selectedClinic) {
        //need to remove appointment record from Users and Clinics appointment sub-collections
        firestore().collection(`Users/${user.uid}/Appointments`).doc(`${selectedClinic}`).delete()
            .then(() => {
                console.log('Appointment deleted from users collection!');
            });

        firestore().collection(`Clinics/${selectedClinic}/Appointments`).doc(`${user.uid}`).delete()
            .then(() => {
                console.log('Appointment deleted from clinics collection!');
            });

    }

    function fetchUserAppointments() {
        useEffect(() => {
            const subscriber = firestore()
                .collection(`Users/${user.uid}/Appointments`)
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
            return () => subscriber
        }, [user])
    }

    //Data Rendering
    const appointmentList = <FlatList
        data={appointments}
        keyExtractor={(Item, index) => index.toString()}
        renderItem={({ item }) => (
            <AppointmentCard clinicId={item.id} tester={item.calledBy} location={item.location} center={item.center} date={item.date} time={item.time} slot={item.slot} checkedIn={item.checkedIn} called={item.called} wasSeen={item.wasSeen} cancel={cancelAppointment} addSlot={addSlotToMap} status={item.status}/>
        )}
    />

    //TODO: Need to be able to see who called the user in the case of multiple testers
    return (
        <Provider>
            <View style={AppointmentStyles.body}>
                <Filter filter={filter} setFilter={setFilter} />
                {/* //These should be pulled from the users appointment subcollection */}
                <SafeAreaView>
                    <View style={AppointmentStyles.appointments}>
                        {appointments.length > 0 ? appointmentList : <Text>You currently do not have any appointments scheduled</Text>}
                    </View>
                </SafeAreaView>
            </View >

            {/* <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text>Do you want to cancel this appointment?</Text>
                    <Button icon="camera" mode="contained" onPress={() => console.log('Cancelled appointment:', selectedAppointment)}>
                        Yes
                    </Button>
                    <Button icon="camera" mode="contained" onPress={hideModal}>
                        No
                    </Button>
                </Modal>
            </Portal> */}
        </Provider>
    )
}

const AppointmentStyles = StyleSheet.create({
    body: {
        marginTop: 10,
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    appointments: {
        width: '90%',
    }

})
