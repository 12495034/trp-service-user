import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ClinicInformationCard(props) {
    return (
        <View style={ClinicInformationCardStyles.content}>
            <View style={ClinicInformationCardStyles.col1}>
                <Text style={ClinicInformationCardStyles.text}>Test Center: </Text>
                <Text style={ClinicInformationCardStyles.text}>Address: </Text>
                <Text style={ClinicInformationCardStyles.text}>City: </Text>
                <Text style={ClinicInformationCardStyles.text}>Postcode: </Text>
                <Text style={ClinicInformationCardStyles.text}>Date: </Text>
            </View>
            <View style={ClinicInformationCardStyles.col2}>
                <Text style={ClinicInformationCardStyles.text}>{props.clinicData.center}</Text>
                {props.locationData.length == 1 ? <Text style={ClinicInformationCardStyles.text}>{props.locationData[0].line1}</Text> : null}
                <Text style={ClinicInformationCardStyles.text}>{props.clinicData.location}</Text>
                {props.locationData.length == 1 ? <Text style={ClinicInformationCardStyles.text}>{props.locationData[0].postcode}</Text> : null}
                <Text style={ClinicInformationCardStyles.text}>{props.clinicData.date}</Text>
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
        backgroundColor: 'white',
    },
    col1: {
        flexDirection: 'column'
    },
    col2: {
        flexDirection: 'column'
    },
    text:{
        color:'black',
        fontSize:14,
    }
})
