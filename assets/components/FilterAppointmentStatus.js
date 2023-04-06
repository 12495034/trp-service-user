import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import useDoc from '../CustomHooks/useDoc'

//Drop down menu on the appointments screen that allows users to filter their appointments by status (eg. attended, un-attended)
export default function FilterAppointmentStatus(props) {
    const { docData, isDocLoading, docError } = useDoc('Supporting', 'Data', null)
    return (
        <View style={styles.dropdown}>
            <ModalSelector
                data={docData.appointmentStatus}
                labelExtractor={item => item.label}
                onChange={filter => props.setFilter(filter.label)}
                accessible={true}
            >
                <TextInput
                    style={{ backgroundColor: '#0000', color:'black', height: 35 }}
                    editable={true}
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
        marginBottom:5,
    }
})
