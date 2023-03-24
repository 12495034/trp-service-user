import React, { useState, useContext, Fragment } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Checkbox, Button, List } from 'react-native-paper';
import { AuthContext } from '../context/AuthProvider';
import DatePicker from '../CustomHooks/DatePicker';
import { useController, useForm } from 'react-hook-form';
import { FormBuilder } from 'react-native-paper-form-builder';
import { ActivityIndicator } from 'react-native-paper';

export default function CreateAccount() {
    const { createUser } = useContext(AuthContext);

    const [text, setText] = useState("")
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

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
            emailOptIn: 'unchecked'
        },
        mode: 'onChange',
    });

    console.log("dob:",text)

    function handleCreateUser(data) {
        if (data.isAgreedTC == "checked") {
            setIsLoading(true)
            createUser(data)
                .then((e) => {
                    console.log("User Created")
                    setIsLoading(false)
                })
                .catch((e) => {
                    console.log(e.message)
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
                        status={field.value}
                        onPress={() => {
                            field.onChange(field.value === 'checked' ? 'unchecked' : 'checked');
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
                        status={field.value}
                        onPress={() => {
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
                <DatePicker text={text} setText={setText} />
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
                                    mode: 'flat',
                                    underlineColor: 'grey',
                                    activeUnderlineColor: '#F98AF9',
                                },
                                rules: {
                                    required: {
                                        value: true,
                                        message: 'Please select your preferred pronouns',
                                    },
                                },
                                options: [
                                    {
                                        value: 'They/Them',
                                        label: 'They/Them',
                                    },
                                    {
                                        value: 'He/Him',
                                        label: 'He/Him',
                                    },
                                    {
                                        value: 'She/Her',
                                        label: 'She/Her',
                                    },
                                    {
                                        value: 'Prefer not to say',
                                        label: 'Prefer not to say',
                                    },
                                ],
                            },
                            {
                                name: 'firstname',
                                type: 'text',
                                textInputProps: {
                                    label: 'First Name',
                                    left: <TextInput.Icon name={'account'} />,
                                    mode: 'flat',
                                    underlineColor: 'grey',
                                    activeUnderlineColor: '#F98AF9',
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
                                    mode: 'flat',
                                    underlineColor: 'grey',
                                    activeUnderlineColor: '#F98AF9',
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
                                    mode: 'flat',
                                    label: 'Last Name',
                                    left: <TextInput.Icon name={'account'} />,
                                    underlineColor: 'grey',
                                    activeUnderlineColor: '#F98AF9',
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
                                    mode: 'flat',
                                    underlineColor: 'grey',
                                    activeUnderlineColor: '#F98AF9',
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
                                    mode: 'flat',
                                    underlineColor: 'grey',
                                    activeUnderlineColor: '#F98AF9',
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
                                    mode: 'flat',
                                    label: 'Password',
                                    left: <TextInput.Icon name={'lock'} />,
                                    outlineColor: 'red',
                                    underlineColor: 'grey',
                                    activeUnderlineColor: '#F98AF9'
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
                    {isLoading?<ActivityIndicator animating={true} color={'red'} size={'large'}/>
                    :
                    <Button color='pink' disabled={false} mode={'contained'} onPress={handleSubmit((data) => {
                        const combinedData = { ...data, dob: text }
                        handleCreateUser(combinedData)
                    })}>
                        Create Account
                    </Button>
                    }
                </Fragment>
            </ScrollView>
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
