import React, { useState, useContext, Fragment } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Checkbox, Button, List } from 'react-native-paper';
import { useController, useForm } from 'react-hook-form';
import { FormBuilder } from 'react-native-paper-form-builder';
import { ActivityIndicator } from 'react-native-paper';

import { AuthContext } from '../context/AuthProvider';
import DatePicker from '../CustomHooks/DatePicker';
import DialogBox from '../components/DialogBox';
import { termsAndConditions } from '../content/Message';
import { emailNotificationMessage } from '../content/Message';
import useDoc from '../CustomHooks/useDoc';
import { buttonStyle } from '../constants/Constants';

export default function CreateAccount({ navigation }) {
    const { createUser } = useContext(AuthContext);

    const [chosenDate, setChosenDate] = useState("")
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    //terms and conditions dialog state control
    const [isTCAgreed, setIsTCAgreed] = useState("unchecked")
    const [tcVisible, setTcVisible] = React.useState(false);
    const showTcDialog = () => setTcVisible(true);
    const hideTcDialog = () => setTcVisible(false);

    //Email notifications dialog state control
    const [isEmailNotAgreed, setIsEmailNotAgreed] = useState("unchecked")
    const [emailNotVisible, setEmailNotVisible] = React.useState(false);
    const showEmailNotDialog = () => setEmailNotVisible(true);
    const hideEmailNotDialog = () => setEmailNotVisible(false);

    const { docData, isDocLoading, docError } = useDoc('Supporting', 'pronouns', null)
    const { control, setFocus, handleSubmit } = useForm({
        defaultValues: {
            pronouns: '',
            firstname: '',
            middlename: '',
            lastname: '',
            email: '',
            dob: '',
            phonenumber: '',
            password: '',
            isAgreedTC: 'unchecked',
            emailOptIn: 'unchecked',
        },
        mode: 'onChange',
    });

    function handleCreateUser(data) {
        if (data.isAgreedTC) {
            setIsLoading(true)
            createUser(data)
                .then(() => {
                    setIsLoading(false)
                })
                .catch((e) => {
                    setError(e.message)
                    setIsLoading(false)
                })
        } else {
            setError("You must agree to T&C's before using the App")
        }
    }

    function agreeTC(props) {
        const { name, rules, shouldUnregister, defaultValue, control } = props;
        const { field } = useController({
            name,
            rules,
            shouldUnregister,
            defaultValue,
            control,
        });

        return (
            <List.Item
                title={'Agree to terms an conditions'}
                left={() => (
                    <Checkbox.Android
                        status={isTCAgreed}
                        onPress={() => {
                            showTcDialog()
                            field.onChange(field.value === 'checked' ? 'unchecked' : 'checked')
                        }}
                    />
                )}
            />
        );
    }

    function emailOptIn(props) {
        const { name, rules, shouldUnregister, defaultValue, control } = props;
        const { field } = useController({
            name,
            rules,
            shouldUnregister,
            defaultValue,
            control,
        });

        return (
            <List.Item
                title={'Consent to Email Notifications'}
                left={() => (
                    <Checkbox.Android
                        status={isEmailNotAgreed}
                        onPress={() => {
                            showEmailNotDialog()
                            field.onChange(field.value === 'checked' ? 'unchecked' : 'checked');
                        }}
                    />
                )}
            />
        );
    }

    function selectDate(props) {
        const { name, rules, shouldUnregister, defaultValue, control } = props;
        const { field } = useController({
            name,
            rules,
            shouldUnregister,
            defaultValue,
            control,
        });
        return (
            <View>
                <DatePicker chosenDate={chosenDate} setChosenDate={setChosenDate} placeholder="Select your date of birth" />
            </View>
        );
    }

    return (
        <View style={styles.containerStyle}>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                <Fragment>
                    <FormBuilder
                        control={control}
                        setFocus={setFocus}
                        formConfigArray={[

                            {
                                name: 'pronouns',
                                type: 'select',
                                textInputProps: {
                                    label: 'Pro-Nouns',
                                    mode: 'outlined',
                                    outlineColor: '#F98AF9',
                                    activeOutlineColor: '#F98AF9',
                                },
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'Please select your preferred pronouns',
                                    },
                                },
                                options: docData.pronouns
                            },
                            {
                                name: 'firstname',
                                type: 'text',
                                textInputProps: {
                                    autoComplete: 'name',
                                    label: 'First Name',
                                    left: <TextInput.Icon name={'account'} />,
                                    mode: 'outlined',
                                    outlineColor: 'grey',
                                    activeOutlineColor: '#F98AF9',
                                },
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'First name is required',
                                    },
                                },
                            },
                            {
                                name: 'middlename',
                                type: 'text',
                                textInputProps: {
                                    label: 'Middle Name',
                                    left: <TextInput.Icon name={'account'} />,
                                    mode: 'outlined',
                                    outlineColor: 'grey',
                                    activeOutlineColor: '#F98AF9',
                                },
                                rules: {
                                    required: {
                                        value: false,
                                        message: 'middle name is optional',
                                    },
                                },
                            },
                            {
                                name: 'lastname',
                                type: 'text',
                                textInputProps: {
                                    mode: 'outlined',
                                    label: 'Last Name',
                                    left: <TextInput.Icon name={'account'} />,
                                    outlineColor: 'grey',
                                    activeOutlineColor: '#F98AF9',
                                },
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'last name is required',
                                    },
                                },
                            },
                            {
                                name: 'dob',
                                type: 'custom',
                                JSX: selectDate,
                            },
                            {
                                name: 'email',
                                type: 'email',
                                textInputProps: {
                                    label: 'Email',
                                    left: <TextInput.Icon name={'email'} />,
                                    mode: 'outlined',
                                    outlineColor: 'grey',
                                    activeOutlineColor: '#F98AF9',
                                },
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'Email is required',
                                    },
                                    pattern: {
                                        value:
                                            /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
                                        message: 'Email is invalid',
                                    },
                                },
                            },
                            {
                                name: 'phonenumber',
                                type: 'text',
                                textInputProps: {
                                    label: 'Phone Number',
                                    left: <TextInput.Icon name={'phone'} />,
                                    mode: 'outlined',
                                    outlineColor: 'grey',
                                    activeOutlineColor: '#F98AF9',
                                },
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'phone number is required',
                                    },
                                },
                            },
                            {
                                name: 'password',
                                type: 'password',
                                textInputProps: {
                                    mode: 'outlined',
                                    label: 'Password',
                                    left: <TextInput.Icon name={'lock'} />,
                                    outlineColor: 'grey',
                                    activeOutlineColor: '#F98AF9',
                                },
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'Password is required',
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Password should be atleast 8 characters',
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: 'Password should be between 8 and 30 characters',
                                    },
                                },
                            },
                            {
                                name: 'isAgreedTC',
                                type: 'custom',
                                JSX: agreeTC,
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'You must agree to T&C',
                                    },
                                },
                            },
                            {
                                name: 'emailOptIn',
                                type: 'custom',
                                JSX: emailOptIn,
                                rules: {

                                },
                            },
                        ]}
                    />
                    <View>
                        <Text style={styles.error}>{error}</Text>
                    </View>
                    {isLoading ? <ActivityIndicator animating={true} color={'red'} size={'large'} />
                        :
                        <Button color='pink' labelStyle={buttonStyle.MDLabel} disabled={false} mode={'contained'} onPress={handleSubmit((data) => {
                            //required to ammend variables to type boolean from string
                            var isAgreedTCflag = false
                            var emailOptInflag = false

                            if (data.isAgreedTC == "checked") {
                                isAgreedTCflag = true
                            }
                            if (data.emailOptIn == "checked") {
                                emailOptInflag = true
                            }
                            const combinedData = { ...data, dob: chosenDate, isAgreedTC: isAgreedTCflag, emailOptIn: emailOptInflag }
                            handleCreateUser(combinedData)
                        })}>
                            Create Account
                        </Button>
                    }
                </Fragment>

            </ScrollView>
            <DialogBox title="Terms and conditions" content={termsAndConditions} visible={tcVisible} showDialog={showTcDialog} hideDialog={hideTcDialog} setIsAgreed={setIsTCAgreed} />
            <DialogBox title="Email Notifications" content={emailNotificationMessage} visible={emailNotVisible} showDialog={showEmailNotDialog} hideDialog={hideEmailNotDialog} setIsAgreed={setIsEmailNotAgreed} />
        </View >


    )
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    scrollViewStyle: {
        // flex: 1,
        padding: 15,
        justifyContent: 'center',
    },
    headingStyle: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 40,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    datePicker: {
        backgroundColor: 'white'
    }
});