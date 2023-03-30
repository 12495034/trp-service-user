import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { List } from 'react-native-paper';
import { AuthContext } from '../context/AuthProvider';
import { welcomeMessageHome1, welcomeMessageHome2 } from '../content/Message';
import useFilteredCollection from '../CustomHooks/useFilteredCollection';


export default function Home() {

    const { user } = useContext(AuthContext);
    const [expandedBooking, setExpandedBooking] = useState(false);
    const { filteredCollectionData, filteredCollectionSize, filteredCollectionError } = useFilteredCollection("Clinics", "clinicStatus", "==", "Active")

    console.log(filteredCollectionData)
    
    //state set to close one accordion if another is opened to limit information overload
    const handlePressBooking = () => {
        setExpandedBooking(!expandedBooking)
    };

    return (
        <View style={HomeStyles.body}>
            <ScrollView>
                <Text testID='WelcomeText' style={HomeStyles.title}>Welcome {user.displayName}</Text>
                <Text style={HomeStyles.message}>{welcomeMessageHome1}</Text>
                <Text style={HomeStyles.message}>{`Active Clinics: ${filteredCollectionSize}`}</Text>
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
                </List.Accordion>
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
        color: 'black',
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

