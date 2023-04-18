import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { AuthContext } from '../context/AuthProvider';


export default function WelcomeScreen() {
    
    const { logOut, initializing, setInitializing } = useContext(AuthContext);
    

    return (
        <View style={WelcomeScreenStyles.body}>
            <View style={WelcomeScreenStyles.message}>
                <Text style={WelcomeScreenStyles.title}>Thank You</Text>
                <Text style={WelcomeScreenStyles.messageText}>Your account has been successfully created. Please check the email you used to register for a verification email. You will need to have verified your email before you can start booking appointments.</Text>
                <Text style={WelcomeScreenStyles.messageText}>Be sure to read our privacy policy which outlines how the Rainbow Project stores and processes your personal informtion</Text>
                <Text
                    style={WelcomeScreenStyles.link}
                    onPress={() => Linking.openURL('https://trp-developement.web.app/privacy-policy-mobile')}>
                    View Privacy Policy
                </Text>
                <Text style={WelcomeScreenStyles.messageText}>Login to your account now to start booking appointments</Text>
            </View>
            <View style={WelcomeScreenStyles.button}>
                <Button
                    testID='signOutButton'
                    style={{ width: '100%' }}
                    labelStyle={{ fontSize: 12, height:36, textAlignVertical:'center'}}
                    color='pink'
                    mode={'contained'}
                    onPress={logOut}>
                    Proceed to Login
                </Button>
            </View>
        </View>
    )
}

const WelcomeScreenStyles = StyleSheet.create({
    body: {
        flex: 1,
        margin:15
    },
    message: {
        flex: 1,
    },
    title: {
        marginBottom: 10,
        fontSize: 20,
        color: 'green'
    },
    messageText: {
        fontSize: 15,
        color: 'black',
        textAlign: 'justify',
        marginTop: 15
    },
    button: {
        flex: 0,
        alignItems: 'center',
        marginBottom: 10
    },
    link: {
        marginTop: 5,
        color: 'blue',
        textDecorationLine: 'underline',
        textAlign:'left'
    }

})
