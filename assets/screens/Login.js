import React, { useState, useContext, Fragment } from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { AuthContext } from '../Navigation/AuthProvider';
import { FormBuilder } from 'react-native-paper-form-builder';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextInput } from 'react-native-paper';
import { LogicProps } from 'react-native-paper-form-builder/dist/Types/Types';

export default function Login({ navigation }) {

    const { signIn } = useContext(AuthContext);

    const [error, setError] = useState()
    const { control, setFocus, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });


    function navigateTo(screen) {
        navigation.navigate(screen)
    }

    async function loginHandle(userName, password) {
        setError('')
        if (userName.length != 0 && password.length != 0) {
            await signIn(userName, password)
                .then(() => {
                    console.log("User sign in successful")
                })
                .catch((e) => {
                    setError(e.message)
                })
        } else {
            setError("Please enter a valid email address and password")
        }
    }

    return (
        <View style={LoginStyles.body}>
            <ScrollView contentContainerStyle={LoginStyles.scrollViewStyle}>
                <View style={LoginStyles.logo}>
                    <Image
                        style={LoginStyles.tinyLogo}
                        source={require('../images/logo.png')}
                    />
                    <Text style={LoginStyles.headingStyle}>The Rainbow Project Rapid HIV & Syphillis Testing</Text>
                </View>
                <Fragment>
                    <Text style={LoginStyles.error}>{error}</Text>
                    <FormBuilder
                        control={control}
                        setFocus={setFocus}
                        formConfigArray={[
                            {
                                type: 'email',
                                name: 'email',
                                textInputProps: {
                                    label: 'Email',
                                    mode: 'outlined',
                                    outlineColor: 'grey',
                                    activeOutlineColor: '#F98AF9',
                                    left: <TextInput.Icon name={'email'} />
                                },
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'Email is required',
                                    },
                                },

                            },
                            {
                                type: 'password',
                                name: 'password',
                                textInputProps: {
                                    label: 'Password',
                                    mode: 'outlined',
                                    secureTextEntry:true,
                                    outlineColor: 'grey',
                                    activeOutlineColor: '#F98AF9',
                                    left: <TextInput.Icon name={'lock'} 
                                    />
                                },
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'Password is required',
                                    },
                                },
                            },
                        ]}
                    />
                    <Button
                        style={{ width: '100%' }}
                        labelStyle={{ fontSize: 15 }}
                        color='lightgreen'
                        mode={'contained'}
                        onPress={handleSubmit((data) => {
                            loginHandle(data.email, data.password)
                        })}>
                        Login
                    </Button>
                    <View style={LoginStyles.options}>
                        <Button
                            style={{ width: '49%' }}
                            labelStyle={{ fontSize: 12 }}
                            color='pink'
                            mode={'contained'}
                            onPress={() => navigateTo("Signup")}>
                            New Account
                        </Button>
                        <Button
                            style={{ width: '50%' }}
                            labelStyle={{ fontSize: 12 }}
                            color='orange'
                            mode={'contained'}
                            onPress={() => navigateTo("Reset")}>
                            Reset Password
                        </Button>
                    </View>
                </Fragment>
            </ScrollView>
        </View>
    );
}

const LoginStyles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        alignItems: 'center',
    },
    error: {
        color: 'red',
        textAlign:'justify'
    },
    options: {
        width: '100%',
        marginTop: 6,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    scrollViewStyle: {
        padding:20,
    },
    headingStyle: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    tinyLogo: {
        width: 150,
        height: 150,
    },

})
