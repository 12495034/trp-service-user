import { validatePathConfig } from '@react-navigation/native';
import React, { useState, useContext } from 'react'
import { View, Text, Image, StyleSheet, Pressable, TextInput } from 'react-native'
import { AuthContext } from '../Navigation/AuthProvider';
import PressableButton from '../components/PressableButton';

export default function Login({ navigation }) {

    const { login } = useContext(AuthContext);
    const [data, setData] = useState({
        userName: '',
        password: '',
        isValidUser: false,
        isValidPassword: false,
    })

    function navigateTo(screen) {
        navigation.navigate(screen)
    }

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
                <Text style={LoginStyles.Message}></Text>
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
                <PressableButton title='Login' width='90%' pressed='#dddddd' unpressed='#79e75e' handlePress={() => { loginHandle(data.userName, data.password) }} />
                <View style={LoginStyles.options}>
                    <PressableButton title='Create Account' width='49%' pressed='#dddddd' unpressed='#FFC1BE' handlePress={() => navigateTo("Signup")} />
                    <PressableButton title='Reset Password' width='49%' pressed='#dddddd' unpressed='#ffb269' handlePress={() => navigateTo("Reset")} />
                </View>
            </View>
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
        borderStyle: 'solid',
    },
    logo: {
        flex: 0.5,
        width: '50%',
        height: 10,
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
        textAlign: 'center',
        color:'#e7665e'
    },
    input: {
        width: '90%',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        marginTop: 2,
        marginBottom: 5,
        borderRadius: 10,
        paddingLeft:10,
    },
    options: {
        width: '90%',
        marginTop:6,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }


})
