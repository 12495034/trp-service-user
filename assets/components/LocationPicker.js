import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import ModalSelector from 'react-native-modal-selector'

export default function LocationPicker(props) {
    return (
        <View style={styles.dropdown}>
            <ModalSelector
                data={props.locationData}
                keyExtractor={item => item.id}
                labelExtractor={item => item.id}
                onChange={currentLocation => props.setChosenLocation(currentLocation.id)}
                accessible={true}
            >
                <TextInput
                    style={{ backgroundColor: '#0000', color: 'black', height: 35 }}
                    editable={false}
                    placeholder="Choose a Location"
                    value={props.chosenLocation}

                />

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
        marginTop: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    }
})
