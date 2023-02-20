import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import CalledIcon from '../Icons/CalledIcon'
import CheckInIcon from '../Icons/CheckInIcon'
import TestCompleteIcon from '../Icons/TestCompleteIcon'
import { AlertCancel } from '../commonFunctions/AlertCancel'
import { Text } from 'react-native-paper';
import { handleAlertInformation } from '../commonFunctions/Alerts'

export default function AppointmentCard(props) {
       return (
        <Pressable
            style={({ pressed }) => [
                { backgroundColor: pressed ? '#F7C3E9' : '#0000', borderRadius: 5 },
            ]}
            onLongPress={() => {
                if (props.isCancellable) {
                    AlertCancel(
                        props.status,
                        props.checkedIn,
                        "Cancel Appointment",
                        "Do you wish to cancel this appointment?",
                        "Yes", "No",
                        () => props.cancel(props.slot, props.time, props.clinicId))
                } else {
                    handleAlertInformation("Cancel Appointment", "You are unable to cancel this appointment as it is less than 24 hrs until you are due to attend. If you are not able to make the appointment please inform the rainbow project on 02890 319030 or you will be marked as un-attended")
                }

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
                <View style={styles.col3} onTouchStart={props.userCheckIn}>
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
