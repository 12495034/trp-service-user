import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { List } from 'react-native-paper';
import { AuthContext } from '../context/AuthProvider';
import { welcomeMessageHome1, welcomeMessageHome2 } from '../content/Message';

export default function Home() {

    const { user, role, status} = useContext(AuthContext);
    const [expandedBooking, setExpandedBooking] = useState(false);
    // const [expandedAtClinic, setExpandedAtClinic] = useState(false);

    console.log("role:", role)
    console.log("status:", status)

    //state set to close one accordion if another is opened to limit information overload
    const handlePressBooking = () => {
        setExpandedBooking(!expandedBooking)
        setExpandedAtClinic(false)
    };
    // const handlePressAtClinic = () => {
    //     setExpandedAtClinic(!expandedAtClinic)
    //     setExpandedBooking(false)
    // };

    return (
        <View style={HomeStyles.body}>
            <ScrollView>
                <Text testID='WelcomeText' style={HomeStyles.title}>Welcome {user.displayName}</Text>
                <Text style={HomeStyles.message}>{welcomeMessageHome1}</Text>
                <Text style={HomeStyles.message}>{welcomeMessageHome2}</Text>
                <List.Accordion
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
                        title="A quick question"
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
                        title="Pick a slot and confirm"
                        descriptionNumberOfLines={3}
                        description="choose a suitible time slot in a clinic. You will have 60 seconds to confirm the appointment or the slot will be released"
                        left={props => <List.Icon {...props} color='green' icon="clock-edit-outline" />}
                    />
                    <List.Item
                        title="View appointments"
                        descriptionNumberOfLines={3}
                        description="Any confirmed bookings and your booking history can be found on the appointments tab"
                        left={props => <List.Icon {...props} color='green' icon="format-list-bulleted-square" />}
                    />
                </List.Accordion>
                {/* <List.Accordion
                    title="What to do at the clinic"
                    expanded={expandedAtClinic}
                    onPress={handlePressAtClinic}>
                    <List.Item
                        title="View appointments"
                        descriptionNumberOfLines={3}
                        description="Access your booked appointments using the appointments tab"
                        left={props => <List.Icon {...props} color='green' icon="calendar" />}
                    />
                    <List.Item
                        title="Check in"
                        descriptionNumberOfLines={3}
                        description="Press the red user icon to let the clinic know you have arrived"
                        left={props => <List.Icon {...props} color='green' icon="account-check" />}
                    />
                    <List.Item
                        title="Called"
                        descriptionNumberOfLines={3}
                        description="When called for your test the bell icon will turn purple and the testers name will be shown"
                        left={props => <List.Icon {...props} color='purple' icon="bell" />}
                    />
                    <List.Item
                        title="Test complete"
                        descriptionNumberOfLines={3}
                        description="When your test is complete the thumb icon will turn green"
                        left={props => <List.Icon {...props} color='green' icon="thumb-up" />}
                    />
                    <List.Item
                        title="Cancellations"
                        descriptionNumberOfLines={3}
                        description="You can cancel an appointment with a minimum of24hrs. Press and hold the appointment to cancel."
                        left={props => <List.Icon {...props} color='red' icon="cancel" />}
                    />
                </List.Accordion> */}
            </ScrollView>
        </View>

    )
}

const HomeStyles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
    },
    title: {
        // flex: 0.3,
        color: '#e7665e',
        fontWeight: '800',
        fontSize: 19,
        fontWeight: '400',
        textAlign: 'left',
        margin: 10,
    },
    introduction: {
        flex: 1,
    },
    message: {
        fontSize: 15,
        fontWeight: '400',
        textAlign: 'justify',
        margin: 10,
    },
    instruction: {
        flex: 1,
        width: '100%'
    },
    listItem: {
        textAlign: 'justify',
    }

})

