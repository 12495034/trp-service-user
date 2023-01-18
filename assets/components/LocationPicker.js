import React from 'react'
import { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import ModalSelector from 'react-native-modal-selector'
import { Modal } from 'react-native-paper'

export default function LocationPicker(props) {
    return (
        <View style={styles.dropdown}>
            <ModalSelector
                data={props.locationData}
                keyExtractor={item=>item.location}
                labelExtractor= {item => item.location}
                onChange={currentLocation => props.setChosenLocation(currentLocation.location)}
                accessible={true}
            >
                <TextInput
                    style={{ backgroundColor: '#0000', color:'black', height: 35 }}
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
        marginTop:5,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    }
})
