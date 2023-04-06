import React, { useState, useEffect, useContext, Fragment } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Checkbox, Button, List, ActivityIndicator } from 'react-native-paper';
import { useController, useForm } from 'react-hook-form';
import { FormBuilder } from 'react-native-paper-form-builder';

import { AuthContext } from '../context/AuthProvider';
import DatePicker from '../CustomHooks/DatePicker';
import useDoc from '../CustomHooks/useDoc';
import { fetchDocumentData } from '../FirestoreFunctions/FirestoreRead';
import { updateDocumentGeneral } from '../FirestoreFunctions/FirestoreUpdate';

export default function EditDetails({ navigation }) {
    const [chosenDate, setChosenDate] = useState("")
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState({})

    //populate pronouns drop down menu with options from firestore database
    const { docData, isDocLoading, docError } = useDoc('Supporting', 'pronouns', null)

    const { control, setFocus, reset, handleSubmit } = useForm({
        userDetails
    });

    useEffect(() => {
        fetchUserData()
    }, [])

    useEffect(() => {
        reset(userDetails)
    }, [userDetails])

    function navigateTo(screen) {
        navigation.navigate(screen)
    }

    function fetchUserData() {
        fetchDocumentData('Users', `${user.uid}`)
            .then(documentSnapshot => {
                let emailOptInFlag
                if (documentSnapshot.data().emailOptIn) {
                    emailOptInFlag = "checked"
                } else {
                    emailOptInFlag = "unchecked"
                }
                if (documentSnapshot.exists) {
                    setUserDetails({
                        ProNouns: documentSnapshot.data().ProNouns,
                        FirstName: documentSnapshot.data().FirstName,
                        MiddleName: documentSnapshot.data().MiddleName,
                        LastName: documentSnapshot.data().LastName,
                        email: documentSnapshot.data().email,
                        PhoneNumber: documentSnapshot.data().PhoneNumber,
                        emailOptIn: emailOptInFlag,
                    })
                    setChosenDate(documentSnapshot.data().dob)
                } 
            })
            .catch((e) => {
                //console.log(e.message)
            })
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
                                name: 'ProNouns',
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
                                name: 'FirstName',
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
                                name: 'MiddleName',
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
                                name: 'LastName',
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
                                    disabled: true,
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
                                name: 'PhoneNumber',
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
                        <View>
                            <Button style={{ marginBottom: 5 }} color='green' disabled={false} mode={'contained'} onPress={handleSubmit((data) => {
                                //required to ammend variables to type boolean from string
                                var emailOptInflag = false
                                if (data.emailOptIn == "checked") {
                                    emailOptInflag = true
                                }
                                const combinedData = { ...data, dob: chosenDate, emailOptIn: emailOptInflag }
                                updateDocumentGeneral("Users", user.uid, combinedData).then(() => console.log("user updated")).catch((e) => setError(e.message))
                                navigateTo("User Details")
                            })}>
                                Save Changes
                            </Button>
                            <Button color='orange' disabled={false} mode={'contained'} onPress={() => navigateTo("User Details")}>Cancel Changes</Button>
                        </View>
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