import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

/**
 * Date picker component used to select a date on the clinic search screen
 * @returns Selected date
 */
export default function DatePicker(props) {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)

    function onChange(event, selectedDate) {
        setShow(false)
        setDate(selectedDate);
        console.log(event.type)

        //if date is set run logic below. If user cancels out of date picker skip this logic
        if (event.type === "set") {
            let tempDate = new Date(selectedDate);
            //date string formatted to match format used by the service provider app with leading zeros (eg. 2023-05-04 not 2023-05-4)
            //Note: getMonth() is zero indexed
            let fDate = tempDate.getFullYear() + '-'
                + (tempDate.getMonth() < 10 ? "0" + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1) + '-'
                + (tempDate.getDate() < 10 ? "0" + (tempDate.getDate()) : tempDate.getDate());
            props.setChosenDate(fDate)
        } 
    }

    function showMode(currentMode) {
        setShow(true)
        setMode(currentMode)
    }

    return (
        <View>
            <View style={styles.dropdown}>
                <Text style={styles.text} onPress={() => showMode('date')}>{props.chosenDate ? props.chosenDate : props.placeholder}</Text>
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
    dropdown: {
        justifyContent: 'center',
        paddingHorizontal: 17,
        paddingVertical: 10,
        borderWidth: 0.5,
        borderColor: 'black',
        height: 60,
        borderRadius: 5,
    },
    text: {
        color: 'grey',
        fontSize: 16,
    }
})
