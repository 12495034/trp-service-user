import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import PressableButton from '../components/PressableButton';
import PronounPicker from '../components/PronounPicker'
import { AuthContext } from '../Navigation/AuthProvider';

export default function CreateAccount() {
    const { register } = useContext(AuthContext);

    const [data, setData] = useState({
        pronouns: 'They\Them',
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        email: '',
        password: '',
        phoneNumber: '',
        isAgreedTC: false
    });
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    console.log(data)

    function pronounChange(val) {
        if (val.length != 0) {
            setData({
                ...data, pronouns: val
            })
        }
    }

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
                ...data, lastName: val
            })
        }
    }

    function dobChange(val) {
        if (val.length != 0) {
            setData({
                ...data, dob: val
            })
        }
    }


    function signupHandle(data) {
        console.log(data)
        register(data)
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={CreateAccountStyles.body}>
                    <Text style={CreateAccountStyles.label}> Preferred Pro-Nouns</Text>
                    <PronounPicker selectedPronoun={data.pronouns} setPronoun={pronounChange} />
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
                    />
                    <Text style={CreateAccountStyles.label}> Last Name</Text>
                    <TextInput
                        style={CreateAccountStyles.input}
                        placeholder="Last Name"
                        keyboardType="default"
                        onChangeText={(val) => lastNameChange(val)}
                    />
                    <Text style={CreateAccountStyles.label}> Date of Birth (18+?)</Text>
                    <TextInput
                        style={CreateAccountStyles.input}
                        placeholder="Date of Birth"
                        keyboardType="default"
                        onChangeText={(val) => dobChange(val)}
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
                    <View style={CreateAccountStyles.checkBox}>
                        <CheckBox
                            disabled={false}
                            value={data.isAgreedTC}
                            onValueChange={(newValue) => setData({ ...data, isAgreedTC: newValue })}
                        />
                        <Text>Accept Terms and conditions</Text>
                    </View>
                    <PressableButton title="Submit" width='90%' pressed='#dddddd' unpressed='#FFC1BE' handlePress={() => signupHandle(data)} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const CreateAccountStyles = StyleSheet.create({
    body: {
        marginTop: 10,
        marginBottom:10,
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
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 5,
        paddingLeft: 10,
    },
    label: {
        width: '90%',
        textAlign: 'left',
        fontSize: 15,
        color: '#e7665e'
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    }
})
