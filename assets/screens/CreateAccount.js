import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, Pressable } from 'react-native'
import PronounPicker from '../components/PronounPicker'
import { AuthContext } from '../Navigation/AuthProvider';

export default function CreateAccount() {
    const { register } = useContext(AuthContext);

    const [data, setData] = useState({
        firstName:'',
        middleName:'',
        lastName:'',
        email: '',
        password: '',
        phoneNumber:'',
    });

    console.log(data)

    function emailChange(val) {
        if (val.length != 0) {
            setData({
                ...data, email: val
            })
        }
    }

    function passwordChange(val) {
        if (val.length != 0) {
            setData({
                ...data, password: val
            })
        }
    }

    function telephoneChange(val) {
        if (val.length != 0) {
            setData({
                ...data, phoneNumber: val
            })
        }
    }

    function firstNameChange(val) {
        if (val.length != 0) {
            setData({
                ...data, firstName: val
            })
        }
    }

    function middleNameChange(val) {
        if (val.length != 0) {
            setData({
                ...data, middleName: val
            })
        }
    }

    function lastNameChange(val) {
        if (val.length != 0) {
            setData({
                ...data,lastName: val
            })
        }
    }

    function signupHandle() {
        console.log(data)
        register(data)
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={CreateAccountStyles.body}>
                    {/* <Text style={CreateAccountStyles.label}> Preferred Pro-Nouns</Text> */}
                    {/* <PronounPicker /> */}
                    <Text style={CreateAccountStyles.label}> First Name</Text>
                    <TextInput
                        style={CreateAccountStyles.input}
                        placeholder="First name"
                        keyboardType="default"
                        onChangeText={(val) => firstNameChange(val)}
                    />
                    <Text style={CreateAccountStyles.label}> Middle Name</Text>
                    <TextInput
                        style={CreateAccountStyles.input}
                        placeholder="Middle Name (Optional)"
                        keyboardType="default"
                        onChangeText={(val) => middleNameChange(val)}
                        selectionColor={{
                            color: '#f0f'
                        }}
                    />
                    <Text style={CreateAccountStyles.label}> Last Name</Text>
                    <TextInput
                        style={CreateAccountStyles.input}
                        placeholder="Last Name"
                        keyboardType="default"
                        onChangeText={(val) => lastNameChange(val)}
                    />
                    <Text style={CreateAccountStyles.label}> Email Address</Text>
                    <TextInput
                        style={CreateAccountStyles.input}
                        placeholder="Enter email address"
                        keyboardType="email-address"
                        onChangeText={(val) => emailChange(val)}
                    />
                    <Text style={CreateAccountStyles.label}> Choose a Password</Text>
                    <TextInput
                        style={CreateAccountStyles.input}
                        placeholder="Minimum 8 characters"
                        keyboardType="default"
                        secureTextEntry={true}
                        onChangeText={(val) => passwordChange(val)}
                    />
                    <Text style={CreateAccountStyles.label}> Contact Number</Text>
                    <TextInput
                        style={CreateAccountStyles.input}
                        placeholder="phone number"
                        keyboardType="numeric"
                        onChangeText={(val) => telephoneChange(val)}
                    />
                    <Pressable
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? '#dddddd' : '#e7665e' },
                            CreateAccountStyles.button
                        ]}
                        onPress={() => signupHandle()}

                    >
                        <Text style={CreateAccountStyles.text}>
                            Submit
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const CreateAccountStyles = StyleSheet.create({
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
