import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'

/**
 * Pressable component for each bookable slot that can be selected by the user on the clinic details screen
 */
export default function AvailableSlotCard(props) {
    return (
        <Pressable
            style={({ pressed }) => [
                { backgroundColor: props.active ? '#F9A8E7' : '#ffff' },
                appointmentCardStyles.button
            ]}
            onPress={() => {
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
        height:53,
        flexDirection:'row',
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius:5,
        justifyContent: 'space-evenly',
        padding: 10,
    },
    text: {
        textAlign: 'center',
        textAlignVertical:'center',
    },
})
