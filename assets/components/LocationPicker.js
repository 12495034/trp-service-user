import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import ModalSelector from 'react-native-modal-selector'

//Component that allows users to select a location when searching for a clinic on the book screen
export default function LocationPicker(props) {
    return (
        <View style={styles.dropdown}>
            <ModalSelector
                testID='modalSelector'
                data={props.locationData}
                keyExtractor={item => item.id}
                labelExtractor={item => item.id}
                onChange={currentLocation => props.setChosenLocation(currentLocation.id)}
                accessible={true}
            >
                <TextInput
                    testID='selectedLocation'
                    style={{ backgroundColor: '#0000', color: 'black', height: 60, fontSize:16, fontWeight:'600' }}
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
        paddingVertical: 0,
        borderWidth: 0.5,
        borderColor: 'black',
        marginTop: 5,
        borderRadius: 5,
    }
})
