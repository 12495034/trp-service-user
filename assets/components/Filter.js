import React from 'react'
import { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import ModalSelector from 'react-native-modal-selector'
import { Modal } from 'react-native-paper'

export default function Filter(props) {

    const data = [
        //this data should be compiled from the firestore database
        { key: 1, label: "Show All" },
        { key: 2, label: "Active" },
        { key: 3, label: "Complete" },
        { key: 4, label: "Clinic Cancelled" },
    ]
    return (
        <View style={styles.dropdown}>
            <ModalSelector
                data={data}
                initValue="Choose a Location"
                onChange={filter => props.setFilter(filter.label)}
                accessible={true}
            >
                <TextInput
                    style={{ backgroundColor: '#0000', color:'black', height: 35 }}
                    editable={false}
                    value={props.filter} />
            </ModalSelector>

        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        width:'90%',
        marginBottom:10,
    }
})
