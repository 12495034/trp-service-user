import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, Alert } from 'react-native'
import { AuthContext } from '../Navigation/AuthProvider';

export default function ResetPassword({ navigation }) {

    const { reset } = useContext(AuthContext)

    const [data, setData] = useState({
        email: ''
    });

    function emailChange(val) {
        if (val.length != 0) {
            setData({
                ...data, email: val
            })
        }
    }

    
    async function resetHandle(email) {
        await reset(email)
        // navigation.navigate("Login")
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={ResetStyles.body}>
                    <Text style={ResetStyles.label}> Enter Email Address</Text>
                    <TextInput
                        style={ResetStyles.input}
                        placeholder="Enter email address"
                        keyboardType="email-address"
                        onChangeText={(val) => emailChange(val)}
                    />
                    <Pressable
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? '#dddddd' : '#e7665e' },
                            ResetStyles.button
                        ]}
                        onPress={() => resetHandle(data.email)}
                    >
                        <Text style={ResetStyles.text}>
                            Submit
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const ResetStyles = StyleSheet.create({
    body: {
        marginTop: 10,
        flex: 1,
        // borderColor: '#000000',
        // backgroundColor: '#ffffff',
        // borderWidth: 2,
        alignItems: 'center'
    },
    title: {
        fontSize: 40,
        fontWeight: '400',
        textAlign: 'center',
        margin: 10,
    },
    input: {
        width: '90%',
        borderColor: '#000000',
        borderWidth: 1,
        margin: 5,
        borderRadius: 5,
    },
    button: {
        height: 50,
        width: '90%',
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        width: '90%',
        textAlign: 'left',
        fontSize: 20,
        color: '#e7665e'
    },
    text: {
        color: '#ffffff'
    }
})