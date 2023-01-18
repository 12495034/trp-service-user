import { validatePathConfig } from '@react-navigation/native';
import React, { useState, useContext } from 'react'
import { View, Text, Image, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'

import { AuthContext } from '../Navigation/AuthProvider';
import CustomButton from '../components/CustomButton'



export default function Login({ navigation }) {

    const { login } = useContext(AuthContext);

    const [data, setData] = useState({
        userName: '',
        password: '',
        isValidUser: false,
        isValidPassword: false,
    })

    function emailChange(val) {
        if (val.length != 0) {
            setData({
                ...data, userName: val, isValidUser: true
            })
        } else if (val.length == 0) {
            setData({ ...data, isValidUser: false })
        }
    }

    function passwordChange(val) {
        if (val.length != 0) {
            setData({
                ...data, password: val, isValidPassword: true
            })
        } else if (val.length == 0) {
            setData({ ...data, isValidPassword: false })
        }
    }

    function loginHandle(userName, password) {
        //TODO:need or operator here to include or password length = 0. cant find shortcut key to get the OR
        if (!userName.length == 0) {
            login(userName, password)
        } else {
            alert("Please enter a valid email address")
        }
    }

    return (
        <View style={LoginStyles.body}>
            {/* <View style={LoginStyles.logo}>
                <Image     
                        source={require('../images/logo.png')}
                    />
            </View> */}
            <View style={LoginStyles.title}>
                <Text style={LoginStyles.appTitle}>Rapid HIV & Syphillus Testing</Text>
            </View>
            <View style={LoginStyles.inputOptions}>
                <TextInput
                    style={LoginStyles.input}
                    onChangeText={(val) => emailChange(val)}
                    placeholder='Enter Email Address'
                />
                <TextInput
                    style={LoginStyles.input}
                    onChangeText={(val) => passwordChange(val)}
                    placeholder='Enter Password'
                    secureTextEntry={true}
                />
                <Pressable
                    style={({ pressed }) => [
                        { backgroundColor: pressed ? '#dddddd' : '#79e75e' },
                        LoginStyles.button
                    ]}
                    onPress={() => { loginHandle(data.userName, data.password) }}
                >
                    <Text style={LoginStyles.text}>
                        Login
                    </Text>
                </Pressable>
                <View style={LoginStyles.options}>
                    <Pressable
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? '#dddddd' : '#ffb269', padding: 10, borderRadius: 5 },
                        ]}
                        onPress={() => { navigation.navigate("Signup") }}
                    >
                        <Text style={LoginStyles.text}>
                            Need an account?
                        </Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? '#dddddd' : '#ff714b', padding: 10, borderRadius: 5 },
                        ]}
                        onPress={() => { navigation.navigate("Reset") }}
                    >
                        <Text style={LoginStyles.text}>
                            Forgotten Password?
                        </Text>
                    </Pressable>
                </View>

                {/* <View style={LoginStyles.testDetails}>
                    <Text>
                        Email: {data.userName}
                        valid: {data.isValidUser}
                        Password: {data.password}
                        valid: {data.isValidPassword}
                    </Text>
                </View>  */}
            </View>

            <Text style={LoginStyles.validationMessage}>
            </Text>
        </View>
    )
}

const LoginStyles = StyleSheet.create({
    body: {
        flex: 1,
        // borderColor: '#000000',
        backgroundColor: '#ffffff',
        // borderWidth: 2,
        alignItems: 'center'
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderwidth: 1,
        borderStyle: 'solid'
    },
    logo: {
        flex: 0.5,
        width: '50%',
        height:10,
        resizeMode: 'contain',
        margin: 20,
    },
    inputOptions: {
        backgroundColor: '#ffffff',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        // borderColor: '#000000',
        // borderWidth: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appTitle: {
        margin: 20,
        fontSize: 25,
        textAlign: 'center'
    },
    button: {
        height: 50,
        width: '90%',
        marginTop: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '90%',
        borderWidth: 1,
        textAlign: 'center',
        backgroundColor: '#ffffff',
        marginTop: 2,
        marginBottom: 5,
        borderRadius: 10,
    },
    options: {
        width: '90%',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }


})
