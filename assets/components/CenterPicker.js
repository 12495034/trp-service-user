import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import ModalSelector from 'react-native-modal-selector'

export default function CenterPicker(props) {
    return (
        <View style={styles.dropdown}>
            <ModalSelector
                data={props.centerData}
                keyExtractor={item => item.id}
                labelExtractor={item => item.name}
                onChange={currentCenter => props.setChosenCenter(currentCenter.name)}
                disabled={props.chosenLocation == undefined ? true : false}
            >
                <TextInput
                    style={{ borderColor: 'red', backgroundColor: '#0000', color: 'black', height: 35 }}
                    editable={false}
                    placeholder="Choose a test center (optional)"
                    value={props.chosenCenter} />
            </ModalSelector>
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: 'black',
    }
})
