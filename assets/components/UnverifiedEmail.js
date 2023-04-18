import { ClinicDetailEmailUnverified1, ClinicDetailEmailUnverified2 } from '../content/Message';
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper'
import { ProgressCircle } from './ProgressCircle';

//component rendered if a user attempts to book and appointment without first verifying their email address
export default function UnverifiedEmail(props) {
    return (
        <View style={UnverifiedEmailStyles.body}>
            <View>
                <Text style={UnverifiedEmailStyles.textTitle}>User Notice</Text>
            </View>
            <View>
                <Text style={UnverifiedEmailStyles.text}>{ClinicDetailEmailUnverified1}</Text>
            </View>
            <View>
                <Text style={UnverifiedEmailStyles.text}>{ClinicDetailEmailUnverified2}</Text>
            </View>
            {props.loading ?
                <View style={{ width:'100%', flex: 1, alignItems:'center' }}>
                    <ProgressCircle />
                </View>
                :
                <Button
                    disabled={props.sent}
                    style={{ width: '100%' }}
                    labelStyle={{ fontSize: 12, height: 36, textAlignVertical: 'center' }}
                    color='pink'
                    mode={'contained'}
                    onPress={() => props.action(props.email)}>
                    Resend verification Email
                </Button>}
            <Text style={UnverifiedEmailStyles.message}>{props.message}</Text>
            <Text style={UnverifiedEmailStyles.error}>{props.error}</Text>
        </View>
    )
}

const UnverifiedEmailStyles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fffff',
        alignItems: 'flex-start',
        padding: 10,
    },
    error: {
        marginTop: 10,
        width: '100%',
        textAlign: 'justify',
        color: 'red'
    },
    message: {
        marginTop: 10,
        width: '100%',
        textAlign: 'justify',
        color: 'green'
    },
    textTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    text: {
        textAlign: 'justify',
        marginBottom: 10,
    }
});


