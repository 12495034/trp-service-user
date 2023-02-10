import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import ModalSelector from 'react-native-modal-selector'

export default function FilterAppointmentStatus(props) {

    const data = [
        //this data should be compiled from the firestore database
        { key: 1, label: "Active" },
        { key: 2, label: "Attended" },
        { key: 3, label: "Un-Attended" },
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
        width:'100%',
        marginBottom:10,
    }
})
