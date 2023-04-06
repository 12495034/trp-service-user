import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker(props) {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)

    function onChange(event, selectedDate) {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'iso');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() < 10 ? "0" + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1) + '-' + tempDate.getDate();
        props.setChosenDate(fDate)
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
