import React, { useState } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'

export default function AvailableSlotCard(props) {
    return (
        <Pressable
            style={({ pressed }) => [
                { backgroundColor: props.active ? '#F9A8E7' : '#ffff' },
                appointmentCardStyles.button
            ]}
            onPress={() => {
                //console.log(props.clinicId, props.slotId)
                props.setSelectedSlot(props.slotId)
                props.setSelectedTime(props.time)
            }}
        >
            <View style={appointmentCardStyles.card}>
                <Text style={appointmentCardStyles.text}>
                    Slot: {props.slotId}
                </Text>
                <Text style={appointmentCardStyles.text}>
                    {props.time}
                </Text>
            </View>
        </Pressable>

    )
}

const appointmentCardStyles = StyleSheet.create({
    card: {
        flexDirection:'row',
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'space-evenly',
        borderRadius: 5,
        padding: 10,
    },
    text: {
        textAlign: 'center',
    },
    button: {
        borderRadius: 10,

    },
})
