import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ImageBackground } from 'react-native';
import { Badge } from 'react-native-paper';

import { AuthContext } from '../context/AuthProvider';
import { welcomeMessageHome1, welcomeMessageHome2 } from '../content/Message';
import { ProgressCircle } from '../components/ProgressCircle';
import useCountOnSnapshot from '../CustomHooks/useCountOnSnapshot';

export default function Home() {
    const { user} = useContext(AuthContext);
    //const [expandedBooking, setExpandedBooking] = useState(false);
    const { countData, isCountLoading, countError } = useCountOnSnapshot("Clinics", "clinicStatus", "Active")
    //console.log(countData)

    //state set to close one accordion if another is opened to limit information overload
    // const handlePressBooking = () => {
    //     setExpandedBooking(!expandedBooking)
    // };

    return (
        <View style={HomeStyles.body}>

            <View style={HomeStyles.imageContainer}>
                <ImageBackground source={require('../images/splash_screen.jpg')} resizeMode='cover' style={HomeStyles.backgroundImage} />
            </View>

            {/* <ScrollView> */}
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

            {/* <List.Accordion
                    title="How to book an appointment"
                    expanded={expandedBooking}
                    onPress={handlePressBooking}>
                    <List.Item
                        title="New Booking tab"
                        descriptionNumberOfLines={3}
                        description="This will start the booking process"
                        left={props => <List.Icon {...props} color='green' icon="plus-circle-outline" />}
                    />
                    <List.Item
                        title="Lets get started..."
                        descriptionNumberOfLines={3}
                        description="Answer a quick question so we can determine if a test is suitible for you"
                        left={props => <List.Icon {...props} color='green' icon="help-circle-outline" />}
                    />
                    <List.Item
                        title="Search for a clinic"
                        descriptionNumberOfLines={3}
                        description="Search for a suitible clinic by location, test center and date"
                        left={props => <List.Icon {...props} color='green' icon="card-search-outline" />}
                    />
                    <List.Item
                        title="Clinic Information"
                        descriptionNumberOfLines={3}
                        description="choose a suitible time slot at the clinic of your choice and confirm."
                        left={props => <List.Icon {...props} color='green' icon="clock-edit-outline" />}
                    />
                    <List.Item
                        title="Appointment Confirmation"
                        descriptionNumberOfLines={4}
                        description="You will have 60 seconds to confirm you are happy with the appointment details. After that time the slot is released and the booking process will restart."
                        left={props => <List.Icon {...props} color='green' icon="account-check-outline" />}
                    />
                    <List.Item
                        title="View appointments"
                        descriptionNumberOfLines={3}
                        description="Any confirmed bookings and your booking history can be found on the appointments tab"
                        left={props => <List.Icon {...props} color='green' icon="calendar" />}
                    />
                </List.Accordion> */}
            {/* </ScrollView> */}

        </View>

    )
}

const HomeStyles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#ffffff',
        // padding: 10,
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

