import React, { useState, useContext, Fragment } from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { FormBuilder } from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';
import { Button, TextInput } from 'react-native-paper';

import { AuthContext } from '../context/AuthProvider';
import { ProgressCircle } from '../components/ProgressCircle';
import packageJson from '../../package.json'
import { buttonStyle } from '../constants/Constants';

export default function Login({ navigation }) {

    const { signIn } = useContext(AuthContext);
    const [loginProcessing, setLoginProcessing] = useState(undefined)
    const [error, setError] = useState()
    const { control, setFocus, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    async function loginHandle(userName, password) {
        setError('')
        setLoginProcessing(true)
        if (userName.length != 0 && password.length != 0) {
            await signIn(userName, password)
                .then(() => {
                    setLoginProcessing(false)
                })
                .catch((e) => {
                    setError(e.message)
                    setLoginProcessing(false)
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
                    <Text style={LoginStyles.headingStyle}>Rapid HIV testing</Text>
                    <Text>Version: {packageJson.version}</Text>
                </View>
                <View style={LoginStyles.inputs}>
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
                                        secureTextEntry: true,
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
                        {loginProcessing ? <View style={{ flex: 1, justifyContent: 'center' }}><ProgressCircle /></View>
                            :
                            <View>
                                <Button
                                    testID='loginButton'
                                    style={{ width: '100%'}}
                                    labelStyle={{ fontSize: 15, height:36, textAlignVertical:'center' }}
                                    color='lightgreen'
                                    mode={'contained'}
                                    onPress={handleSubmit((data) => {
                                        loginHandle(data.email, data.password)
                                    })}>
                                    Login
                                </Button>
                                <View style={LoginStyles.options}>
                                    <Button
                                        testID='newAccountButton'
                                        style={{ width: '49%' }}
                                        labelStyle={buttonStyle.MDLabel}
                                        color='pink'
                                        mode={'contained'}
                                        onPress={() => navigation.push('Signup')}>
                                        New Account
                                    </Button>
                                    <Button
                                        testID='resetButton'
                                        style={{ width: '50%', }}
                                        labelStyle={{ fontSize: 12, height:36, textAlignVertical:'center' }}
                                        color='orange'
                                        mode={'contained'}
                                        onPress={() => navigation.push('Reset')}>
                                        Reset Password
                                    </Button>
                                </View>
                            </View>
                        }
                    </Fragment>
                </View>
            </ScrollView>
        </View>
    );
}

const LoginStyles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    logo: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    error: {
        color: 'red',
        textAlign: 'justify'
    },
    inputs: {
        width: '100%',
    },
    options: {
        width: '100%',
        marginTop: 6,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    scrollViewStyle: {
        padding: 20,
    },
    headingStyle: {
        fontSize: 20,
        textAlign: 'center',
    },
    tinyLogo: {
        width: 150,
        height: 150,
    },

})
