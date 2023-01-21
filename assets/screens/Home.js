import React, { useContext } from 'react'
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native'
import Instructions from '../components/Instructions';
import { AuthContext } from '../Navigation/AuthProvider';

export default function Home() {

    const { user } = useContext(AuthContext);

    return (
            <View style={HomeStyles.body}>
                <View>
                    <Text style={HomeStyles.title}>Welcome</Text>
                    {/* <Text style={HomeStyles.title}>{user.email}</Text> */}
                    <Text style={HomeStyles.message}>to the rainbow project Rapid HIV & syphillis testing service. Through this app you can book a rapid HIV test at one of our scheduled clinics</Text>
                    {/* <Text style={HomeStyles.message}>If you are un-familiar with our booking process please review the steps below.</Text> */}
                </View>
            </View>

    )
}

const HomeStyles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 20,
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
        textAlign: 'left',
        margin: 10,
    },
    instruction: {
        flex: 1,
        width: '100%'
    }

})

