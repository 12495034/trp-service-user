import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Button } from 'react-native-paper';
import { AuthContext } from '../context/AuthProvider';
import UserCard from '../components/UserCard';
import useDocOnSnapshot from '../CustomHooks/useDocOnSnapshot';
import { ProgressCircle } from '../components/ProgressCircle';
import { convertFirestoreTimeStamp } from '../SpecialFunctions/convertFirestoreTimeStamp';

export default function Profile({ navigation }) {

    const [deleteAuthError, setDeleteAuthError] = useState('')

    const { logOut, user, role, status, deleteUserAuth } = useContext(AuthContext);
    const { docData, isDocLoading, docError } = useDocOnSnapshot('Users', user.uid, user)

    async function handleLogOut() {
        await logOut()
            .then(() => {
                console.log("Log out successful")
            })
            .catch((e) => {
                //catch errors here
            })
    }

    async function handleDeleteUser(userId) {
        //cloud function handles the deletion of user data in firestore when triggered by User deletion
        await deleteUserAuth()
            .then(() => {
                console.log("User Authentication deleted at users request")
            })
            .catch((e) => {
                console.log(e.message)
                setDeleteAuthError(e.message)
            })
    }

    function handleAlert() {
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
                    onPress: () => console.log("User account not deleted"),
                    style: 'cancel',
                },
            ],
            {
                cancelable: true,
                onDismiss: () => console.log("Alert cancelled by pressing outside box"),
            },
        );
    }

    return (
        <View style={ProfileStyles.body}>
            {false ?
                <View>
                    <ProgressCircle />
                </View>
                :
                <>
                    {deleteAuthError ? <Text>{deleteAuthError}</Text> : null}
                    <UserCard
                        status={status}
                        role={role}
                        proNouns={docData.ProNouns}
                        firstName={docData.FirstName}
                        middleName={docData.MiddleName}
                        lastName={docData.LastName}
                        dob={docData.dob}
                        email={docData.email}
                        emailVerified={user.emailVerified}
                        phoneNumber={docData.PhoneNumber}
                        isAgreedTC={docData.isAgreedTC}
                        emailOptIn={docData.emailOptIn}
                        creationDate={convertFirestoreTimeStamp(docData.createdAt)}
                    />
                    <Button
                        testID='signOutButton'
                        style={{ width: '100%' }}
                        labelStyle={{ fontSize: 12 }}
                        color='green'
                        mode={'contained'}
                        onPress={handleLogOut}>
                        Sign Out
                    </Button>
                    <View style={ProfileStyles.options}>
                        <Button
                            testID='editDetailsButton'
                            style={{ width: '49%' }}
                            labelStyle={{ fontSize: 12 }}
                            color='orange'
                            mode={'contained'}
                            onPress={() => navigation.navigate("Edit User Details")}>
                            Edit details
                        </Button>
                        <Button
                            testID='deleteAccountButton'
                            style={{ width: '49%', marginTop: 0 }}
                            labelStyle={{ fontSize: 12 }}
                            color='red'
                            mode={'contained'}
                            onPress={handleAlert}>
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
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})
