import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TextInput, Button, Pressable } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker(props) {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)

    function onChange(event, selectedDate) {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'iso');
        setDate(currentDate);

        //TODO:There is an issue with format between the web client and the mobile app. Mobile app is not using leading '0' when a single value month or day is used
        //Modify format to make it consistent
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
        props.setText(fDate)
    }

    function showMode(currentMode) {
        setShow(true)
        setMode(currentMode)
    }
    return (
        <View>
            <View style={styles.dropdown}>
                <Text style={styles.text} onPress={() => showMode('date')}>{props.text ? props.text : "Choose a Date (optional)"}</Text>
            </View>
            {show && <DateTimePicker
                testId='dateTimePicker'
                value={date}
                mode={mode}
                display='default'
                onChange={onChange}
            />}
        </View>

    )
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: '100%',
        marginTop: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropdown: {
        justifyContent: 'center',
        paddingHorizontal: 17,
        paddingVertical: 10,
        borderWidth: 0.5,
        borderColor: 'black'
    },
    text: {
        color: 'grey',
    }
})
