import React, { useContext } from 'react'
import { View, StyleSheet, Pressable, Alert } from 'react-native'
import CalledIcon from '../Icons/CalledIcon'
import CheckInIcon from '../Icons/CheckInIcon'
import TestCompleteIcon from '../Icons/TestCompleteIcon'

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../Navigation/AuthProvider';
import { Text } from 'react-native-paper';

export default function AppointmentCard(props) {

    const { user } = useContext(AuthContext);

    function handleAlert() {
        if (props.status == "Active") {
            Alert.alert(
                'Cancel Appointment',
                'Do you wish to cancel this appointment?',
                [
                    {
                        text: 'Yes',
                        onPress: () => {
                            props.cancel(props.slot, props.time, props.clinicId)
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'No',
                        onPress: () => console.log("Appointment not cancelled"),
                        style: 'cancel',
                    },
                ],
                {
                    cancelable: true,
                    onDismiss: () => console.log("Alert cancelled by pressing outside box"),
                },
            );
        } else {
            console.log("Appointment is not active, therefore changes cannot be made")
        }
    }

    function userCheckIn() {
        if (props.status == "Active") {
            //update status in Users Appointments sub-collection
            firestore()
                .collection(`Users/${user.uid}/Appointments`)
                .doc(`${props.clinicId}`)
                .update({
                    checkedIn: true,
                })
                .then(() => {
                    console.log('User checked in in clinic sub-collection!');
                })
                .catch((e) => {
                    console.log(e.message)
                })

            //update status in Users Appointments sub-collection
            firestore()
                .collection(`Clinics/${props.clinicId}/Appointments`)
                .doc(`${user.uid}`)
                .update({
                    checkedIn: true,
                })
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

    return (
        <Pressable
            style={({ pressed }) => [
                { backgroundColor: pressed ? '#F7C3E9' : '#0000', borderRadius: 5 },
            ]}
            onLongPress={() => {
                handleAlert()
            }}
        >
            <View style={styles.card}>
                <View style={styles.col1}>
                    <Text>{props.location}</Text>
                    <Text>{props.center}</Text>
                    <Text style={styles.hilight}>{props.tester}</Text>
                </View>
                <View style={styles.col2}>
                    <Text>{props.date}</Text>
                    <Text >{props.time}</Text>
                    <Text>Slot: {props.slot}</Text>
                    <Text>{props.status}</Text>
                </View>
                <View style={styles.col3} onTouchStart={userCheckIn}>
                    <CheckInIcon checkedIn={props.checkedIn} />
                    <CalledIcon checkedIn={props.checkedIn} called={props.called} />
                    <TestCompleteIcon checkedIn={props.checkedIn} complete={props.wasSeen} />
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5,
    },
    col1: {
        flexDirection: 'column',

    },
    col2: {
        flexDirection: 'column',
    },
    col3: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    hilight: {
        color: 'red'
    }
})
