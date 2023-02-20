import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Button } from 'react-native-paper';
import { AuthContext } from '../context/AuthProvider';
import UserCard from '../components/UserCard';
import { deleteUserSubcollection, deleteUserDocument } from '../FirestoreFunctions/FirestoreDelete';
import useDocOnSnapshot from '../CustomHooks/useDocOnSnapshot';
import { ProgressCircle } from '../components/ProgressCircle';

export default function Profile({ navigation }) {

    const [deleteAuthError, setDeleteAuthError] = useState('')
    const [deleteUserCollectionError, setDeleteUserCollectionError] = useState('')
    const [deleteUserDocError, setDeleteUserDocError] = useState('')
    
    const { logOut, user, deleteUserAuth } = useContext(AuthContext);
    const { docData, isDocLoading, docError } = useDocOnSnapshot('Users', user.uid)

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
        //delete firestore subcollections and user documents
        //firestore security rules allow only users with an id matching the document to perform CRUD operations
        //delete user authorisation
        await deleteUserSubcollection(userId)
            .then((querySnapshot) => {
                Promise.all(querySnapshot.docs.map((d) => d.ref.delete()));
                console.log("All appointments deleted")
            })
            .catch((e) => {
                console.log(e.message)
                setDeleteUserCollectionError(e.message)
            })
        await deleteUserDocument("User", userId)
            .then(() => {
                console.log("User document deleted")
            })
            .catch((e) => {
                console.log(e.message)
                setDeleteUserDocError(e.message)
            })
        await deleteUserAuth()
            .then(() => {
                console.log("All user delete operations complete")
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
            {isDocLoading ?
                <View>
                    <ProgressCircle />
                </View>
                :
                <>
                    {deleteAuthError ? <Text>{deleteAuthError}</Text> : null}
                    {deleteUserCollectionError ? <Text>{deleteUserCollectionError}</Text> : null}
                    {deleteUserDocError ? <Text>{deleteUserDocError}</Text> : null}
                    <UserCard
                        proNouns={docData.ProNouns}
                        firstName={docData.FirstName}
                        middleName={docData.MiddleName}
                        lastName={docData.LastName}
                        dob={docData.dob}
                        email={docData.Email}
                        emailVerified={user.emailVerified}
                        phoneNumber={docData.PhoneNumber}
                        isAgreedTC={docData.isAgreedTC}
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
