import React from 'react'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'

export default function PronounPicker(props) {

    return (
        <Picker
        style={styles.dropdown}
            selectedValue={props.selectedPronoun}
            onValueChange={currentPronoun => props.setPronoun(currentPronoun)}>
            <Picker.Item label="He/Him" value="He/Him" />
            <Picker.Item label="She/Her" value="She/Her" />
            <Picker.Item label="They/Them" value="They/Them" />
        </Picker>
    )
}

const styles = StyleSheet.create({
    dropdown:{
        width:'100%',
        paddingLeft:10,
        backgroundColor:''
    }
})
