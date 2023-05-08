import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Button } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useForm } from 'react-hook-form';
import { buttonStyle } from '../constants/Constants';
import { ProgressCircle } from '../components/ProgressCircle';

import { AuthContext } from '../context/AuthProvider';

export default function ResetPassword({ navigation }) {

    //reset function passed to screen through AuthContext Provider
    const { reset } = useContext(AuthContext)

    //state management
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState()
    const [message, setMessage] = useState('')
    const { control, setFocus, handleSubmit } = useForm({
        defaultValues: {
            email: '',
        },
        mode: 'onChange',
    });

    /**
     * Function to send a password reset email
     * @param {String} email Users email address
     */
    async function resetHandle(email) {
        setLoading(true)
        await reset(email)
            .then(() => {
                setSent(true)
                setMessage(`Reset email sent to ${email}, please check your inbox`)
                setLoading(false)
            })
            .catch((e) => {
                setSent(false)
                setError(e.message)
                setLoading(false)
            })
    }

    return (
        <View style={ResetStyles.containerStyle}>
            <ScrollView contentContainerStyle={ResetStyles.scrollViewStyle}>
                <View>
                    <Text style={ResetStyles.instructionText}>If you have a registered email address an email will be sent to your account. From that email you can use a link to reset your password</Text>
                </View>
                <FormBuilder
                    control={control}
                    setFocus={setFocus}
                    formConfigArray={[
                        {
                            type: 'email',
                            name: 'email',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Email is required',
                                },
                            },
                            textInputProps: {
                                label: 'Email',
                                mode: 'outlined',
                                outlineColor: '#F98AF9',
                                activeOutlineColor: '#F98AF9',
                            },
                        },
                    ]}
                />
                {/* Conditional rendering to show processing icon while request is made to firebase back end */}
                {loading ?
                    <ProgressCircle />
                    :
                    <Button
                        disabled={sent}
                        labelStyle={buttonStyle.MDLabel}
                        color='orange'
                        mode={'contained'}
                        onPress={handleSubmit((data) => {
                            resetHandle(data.email)
                        })}>
                        Request password reset email
                    </Button>}
                <Text style={ResetStyles.error}>{error}</Text>
                <Text style={ResetStyles.message}>{message}</Text>
            </ScrollView>
        </View>
    );

}

const ResetStyles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    scrollViewStyle: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
    },
    instructionText: {
        color: 'black',
        fontSize: 15,
        textAlign: 'justify',
        marginBottom: 10,
    },
    error: {
        textAlign: 'justify',
        marginTop: 10,
        color: 'red',
        fontSize: 15,
    },
    message: {
        textAlign: 'justify',
        marginTop: 10,
        color: 'green',
        fontSize: 15,
    }
});
