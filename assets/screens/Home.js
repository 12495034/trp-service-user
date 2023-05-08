import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ImageBackground } from 'react-native';
import { Badge } from 'react-native-paper';

import { AuthContext } from '../context/AuthProvider';
import { welcomeMessageHome1, welcomeMessageHome2 } from '../content/Message';
import { ProgressCircle } from '../components/ProgressCircle';
import useCountOnSnapshot from '../CustomHooks/useCountOnSnapshot';

/**
 * Home screen welcomes the user to the app and displays a live count of scheduled Active clinics
 */
export default function Home() {
    //User Object passed to screen by AuthContext Provider
    const { user} = useContext(AuthContext);

    //custom hook for real time data retrieval, live count of clinics scheduled
    const { countData, isCountLoading, countError } = useCountOnSnapshot("Clinics", "clinicStatus", "Active")
   
    return (
        <View style={HomeStyles.body}>
            <View style={HomeStyles.imageContainer}>
                <ImageBackground source={require('../images/splash_screen.jpg')} resizeMode='cover' style={HomeStyles.backgroundImage} />
            </View>
            <View style={HomeStyles.introduction}>
                <Text testID='WelcomeText' style={HomeStyles.title}>Welcome {user.displayName}</Text>
                <Text style={HomeStyles.message}>{welcomeMessageHome1}</Text>
                <Text style={HomeStyles.message}>Currently clinics are scheduled in Belfast only</Text>
            </View>
            <Text style={HomeStyles.subtitle}>Active Clinics</Text>
            {isCountLoading ?
                <View>
                    <ProgressCircle />
                </View>
                :
                <View style={HomeStyles.badge}>
                    <Badge visible={true} size={30}>{countData}</Badge>
                </View>
            }
            {countError ? <Text style={HomeStyles.error}>{countError}</Text> : null}
            <View style={HomeStyles.callToAction}>
                <Text style={HomeStyles.message}>{welcomeMessageHome2}</Text>
            </View>
        </View>

    )
}

const HomeStyles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
    },
    introduction: {
        flex: 1,
    },
    title: {
        color: '#e7665e',
        fontWeight: '800',
        fontSize: 23,
        fontWeight: '400',
        textAlign: 'left',
        margin: 10,
    },
    message: {
        color: 'black',
        fontSize: 15,
        fontWeight: '400',
        textAlign: 'justify',
        textAlignVertical: 'bottom',
        margin: 10,
        opacity: 1.0,
    },
    subtitle: {
        color: 'blue',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    error: {
        color: 'red',
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
    },
    badge: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    callToAction: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.20,
    },

})

