import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthProvider';
import { Button, TextInput } from 'react-native-paper';
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from '@react-native-picker/picker'
import { updateDocument } from '../FirestoreFunctions/FirestoreUpdate';
import { fetchDocumentData } from '../FirestoreFunctions/FirestoreRead';
import CheckBox from '@react-native-community/checkbox';

export default function EditDetails({ navigation }) {
    const { user } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState({})
    const [error, setError] = useState("")
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
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
                if (documentSnapshot.exists) {
                    setUserDetails({
                        ProNouns: documentSnapshot.data().ProNouns,
                        FirstName: documentSnapshot.data().FirstName,
                        MiddleName: documentSnapshot.data().MiddleName,
                        LastName: documentSnapshot.data().LastName,
                        dob: documentSnapshot.data().dob,
                        Email: documentSnapshot.data().email,
                        PhoneNumber: documentSnapshot.data().PhoneNumber,
                        notifications:documentSnapshot.data().emailOptIn,
                    })
                } else {
                    console.log("No such document!");
                }
            })
            .catch((e) => {
                console.log(e.message)
            })
    }

    return (
        <ScrollView>
            <View style={EditDetailsStyles.container}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Picker
                            style={EditDetailsStyles.dropdown}
                            selectedValue={userDetails.ProNouns}
                            onValueChange={currentPronoun => setUserDetails({ ...userDetails, ProNouns: currentPronoun })}>
                            <Picker.Item label="He/Him" value="He/Him" />
                            <Picker.Item label="She/Her" value="She/Her" />
                            <Picker.Item label="They/Them" value="They/Them" />
                            <Picker.Item label="Prefer not to say" value="Prefer not to say" />
                        </Picker>
                    )}
                    name="ProNouns"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            underlineColor='grey'
                            activeUnderlineColor='#F98AF9'
                            style={EditDetailsStyles.inputBox}
                            label='First Name'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="FirstName"
                />
                <Controller
                    control={control}
                    rules={{
                        required: false,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            underlineColor='grey'
                            activeUnderlineColor='#F98AF9'
                            style={EditDetailsStyles.inputBox}
                            label='Middle Name'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="MiddleName"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            underlineColor='grey'
                            activeUnderlineColor='#F98AF9'
                            style={EditDetailsStyles.inputBox}
                            label='Last Name'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="LastName"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            underlineColor='grey'
                            activeUnderlineColor='#F98AF9'
                            style={EditDetailsStyles.inputBox}
                            label='Date of Birth'
                            keyboardType='numeric'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="dob"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            underlineColor='grey'
                            activeUnderlineColor='#F98AF9'
                            style={EditDetailsStyles.inputBox}
                            label='Phone Number'
                            keyboardType='numeric'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="PhoneNumber"
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={EditDetailsStyles.inputBox}
                            label='Email'
                            keyboardType='email-address'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            disabled={true}
                        />
                    )}
                    name="Email"
                />
                {/* <Controller
                    control={control}
                    rules={{
                        required: false,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <input
                        type='checkBox'
                        checked={emailOptIn?true:false}
                        onChange={onChange}
                        />
                    )}
                    name="notifications"
                /> */}
                <Button
                    style={{ width: '100%', marginTop: 5 }}
                    labelStyle={{ fontSize: 12 }}
                    color='pink'
                    mode={'contained'}
                    onPress={handleSubmit((data) => {
                        updateDocument("Users", user.uid, data).then(() => console.log("user updated")).catch((e) => setError(e.message))
                        navigateTo("User Details")
                    })}>
                    Save changes
                </Button>
                {errors.FirstName && <Text style={EditDetailsStyles.error}>A first name is required.</Text>}
                {errors.LastName && <Text style={EditDetailsStyles.error}>A last name is required.</Text>}
                {errors.PhoneNumber && <Text style={EditDetailsStyles.error}>A phone number is required.</Text>}
                {errors.dob && <Text style={EditDetailsStyles.error}>A valid dob number is required.</Text>}
                {error && <Text style={EditDetailsStyles.error}>{error}</Text>}
            </View>
        </ScrollView >
    );
}


const EditDetailsStyles = StyleSheet.create({
    container: {
        margin: 10,
        flex: 1
    },
    inputBox: {
        backgroundColor: 'white',

    },
    dropdown: {
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    error: {
        paddingTop: 10,
        color: 'red',
        textAlign: 'center'
    }
})

