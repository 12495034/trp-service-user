import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, Alert } from 'react-native'
import PressableButton from '../components/PressableButton';
import { AuthContext } from '../Navigation/AuthProvider';

export default function ResetPassword({ navigation }) {

    const { reset } = useContext(AuthContext)

    const [data, setData] = useState({
        email: ""
    });
    const [message, setMessage] = useState()

    console.log(data)

    function emailChange(val) {
        if (val.length != 0) {
            setData({
                ...data, email: val
            })
        }
    }

    async function resetHandle(email) {
        if (data.email.length != 0) {
            const response = await reset(email)
            setMessage(response)
            // navigation.navigate("Login")
        } else { 
            setMessage("Please enter an email address")
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={ResetStyles.body}>
                    <View style={ResetStyles.input}>
                        <TextInput
                            style={ResetStyles.inputBar}
                            placeholder="Enter email address"
                            keyboardType="email-address"
                            onChangeText={(val) => emailChange(val)}
                        />
                        <PressableButton title='Send reset Password Email' width='90%' textColor='black' pressed='#dddddd' unpressed='#ffb269' handlePress={() => resetHandle(data.email)} />
                    </View>
                    <View style={ResetStyles.instruction}>
                        <Text style={ResetStyles.error}>{message}</Text>
                    </View>
                    <View style={ResetStyles.instruction}>
                        <Text style={ResetStyles.instructionText}>If you have a registered email address an email will be sent to your account. From that email you can use a link to reset your password</Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const ResetStyles = StyleSheet.create({
    body: {
        marginTop: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    inputBar: {
        width: '90%',
        borderColor: '#000000',
        borderWidth: 1,
        margin: 5,
        borderRadius: 5,
        paddingLeft: 10,
    },
    instruction: {
        flex: 1,
        width: '90%',
        paddingTop: 10,
    },
    instructionText: {
        textAlign: 'left',
        fontSize: 15,
    },
    error: {
        color: 'red'
    }
})