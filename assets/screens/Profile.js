import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Button } from 'react-native-paper';
import { StackActions, NavigationActions } from '@react-navigation/native';

import { AuthContext } from '../context/AuthProvider';
import UserCard from '../components/UserCard';
import useDocOnSnapshot from '../CustomHooks/useDocOnSnapshot';
import { ProgressCircle } from '../components/ProgressCircle';
import { convertFirestoreTimeStamp } from '../functions/SpecialFunctions/convertFirestoreTimeStamp';
import { buttonStyle } from '../constants/Constants';
import { handleAlertInformation } from '../functions/generalFunctions/Alerts';

/**
 * Profile screen displays users profile information
 */
export default function Profile({ navigation }) {
    const [deleteAuthError, setDeleteAuthError] = useState('')
    const { logOut, user, role, status, deleteUserAuth } = useContext(AuthContext);
    const { docData, isDocLoading, docError } = useDocOnSnapshot('Users', user.uid, user)

    /**
     * Function to handle the current user logging out of the system
     */
    async function handleLogOut() {
        await logOut()
            .then(() => {
                //clearing the navigator following logout to ensure 'home' screen is the initial screen
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "Login" })],
                  });
                  navigation.dispatch(resetAction);
            })
            .catch((e) => {
                //catch errors here
            })
    }

    /**
     * Function to delete the current users authentication profile
     * This action triggers a cloud function to perform database clean up operations 
     * See web app cloud function source code.
     */
    async function handleDeleteUser(userId) {
        //cloud function handles the deletion of user data in firestore when triggered by User deletion
        //prior to user authentication profile being deleted all Active user appointments should be cancelled
        await deleteUserAuth()
            .then(() => {
                //user is automatically logged out when authentication is deleted successfully
            })
            .catch((e) => {
                setDeleteAuthError(e.message)
                handleAlertInformation("Delete Account",e.message)
            })
    }

    /**
     * Function to alert the user that they are about to permanently delete their account
     */
    function handleUserDeleteAlert() {
        Alert.alert(
            'Delete Account',
            'You will lose access the app and all stored information will be deleted. This operation cannot be un-done. Do you wish to continue ?',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        handleDeleteUser(user.uid)
                    },
                    style: 'cancel',
                },
                {
                    text: 'No',
                    onPress: () => {},
                    style: 'cancel',
                },
            ],
            {
                cancelable: true,
                onDismiss: () => {},
            },
        );
    }

    return (
        <View style={ProfileStyles.body}>
            {isDocLoading ?
                <View>
                    <ProgressCircle />
                </View>
                :
                <>
                    <UserCard
                        status={status}
                        proNouns={docData.ProNouns}
                        firstName={docData.FirstName}
                        middleName={docData.MiddleName}
                        lastName={docData.LastName}
                        dob={docData.dob}
                        email={docData.email}
                        emailVerified={user.emailVerified}
                        phoneNumber={docData.PhoneNumber}
                        emailOptIn={docData.emailOptIn}
                        creationDate={convertFirestoreTimeStamp(docData.createdAt)}
                    />
                    <Button
                        testID='signOutButton'
                        style={{ width: '100%' }}
                        labelStyle={buttonStyle.MDLabel}
                        color='green'
                        mode={'contained'}
                        onPress={handleLogOut}>
                        Sign Out
                    </Button>
                    <View style={ProfileStyles.options}>
                        <Button
                            testID='editDetailsButton'
                            style={{ width: '49%' }}
                            labelStyle={buttonStyle.MDLabel}
                            color='orange'
                            mode={'contained'}
                            onPress={() => navigation.navigate("Edit User Details")}>
                            Edit details
                        </Button>
                        <Button
                            testID='deleteAccountButton'
                            style={{ width: '49%', marginTop: 0 }}
                            labelStyle={buttonStyle.MDLabel}
                            color='red'
                            mode={'contained'}
                            onPress={handleUserDeleteAlert}>
                            Delete Account
                        </Button>
                    </View>
                </>}
        </View>
    )
}

const ProfileStyles = StyleSheet.create({
    body: {
        flex: 1,
        // borderColor: '#000000',
        backgroundColor: '#ffffff',
        // borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    button: {
        marginTop: 1,
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    options: {
        width: '100%',
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    error: {
        color: 'red',
        paddingBottom:10
    }
})
