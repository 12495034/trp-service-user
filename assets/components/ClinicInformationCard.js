import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ClinicInformationCard(props) {
    return (
        <View style={ClinicInformationCardStyles.content}>
            <View style={ClinicInformationCardStyles.col1}>
                <Text>Test Center: </Text>
                <Text>Address: </Text>
                <Text>City: </Text>
                <Text>Postcode: </Text>
                <Text>Date: </Text>
            </View>
            <View style={ClinicInformationCardStyles.col2}>
                <Text>{props.clinicData.center}</Text>
                {props.locationData.length == 1 ? <Text>{props.locationData[0].line1}</Text> : null}
                <Text>{props.clinicData.location}</Text>
                {props.locationData.length == 1 ? <Text>{props.locationData[0].postcode}</Text> : null}
                <Text>{props.clinicData.date}</Text>
            </View>
        </View>
    )
}

const ClinicInformationCardStyles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white'
    },
    col1: {
        flexDirection: 'column'
    },
    col2: {
        flexDirection: 'column'
    },
})
