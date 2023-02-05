import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import { Button } from 'react-native-paper';
import { AuthContext } from '../Navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import UserCard from '../components/UserCard';
import { deleteUserSubcollection, deleteUserDocument } from '../FirestoreFunctions/FirestoreDelete';


export default function Profile({ navigation }) {

    const { logOut, user, deleteUserAuth } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const subscriber = firestore()
            .collection('Users')
            .doc(`${user.uid}`)
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot.exists) {
                    setUserDetails(documentSnapshot.data())
                } else {
                    console.log("No such document!");
                }
            });
        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [])

    function navigateTo(screen) {
        navigation.navigate(screen)
    }

    async function handleDeleteUser() {
        console.log("Running handleDeleteUser function")
        //delete firestore subcollections and user documents
        //firestore security rules allow only users with an id matching the document to perform CRUD operations
        //delete user authorisation
        await deleteUserSubcollection(user.uid)
        await deleteUserDocument(user.uid)
        await deleteUserAuth()
        console.log("All user delete operations complete")
    }

    async function handleLogOut() {
        await logOut()
            .then(() => {
                console.log("Log out successful")
            })
            .catch((e) => {
                //catch errors here
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
                        handleDeleteUser()
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
            {/* Issue here that the user information does not seem be immediately available on login */}
            {user ?
                <UserCard
                    proNouns={userDetails.ProNouns}
                    firstName={userDetails.FirstName}
                    middleName={userDetails.MiddleName}
                    lastName={userDetails.LastName}
                    dob={userDetails.dob}
                    email={userDetails.Email}
                    emailVerified={user.emailVerified ? "Yes" : "No"}
                    phoneNumber={userDetails.PhoneNumber}
                    isAgreedTC={userDetails.isAgreedTC}
                />
                :
                <View>
                    <Text>
                        User data not available at this time
                    </Text>
                </View>
            }
            <Button
                style={{ width: '100%' }}
                labelStyle={{ fontSize: 12 }}
                color='green'
                mode={'contained'}
                onPress={handleLogOut}>
                Sign Out
            </Button>
            <View style={ProfileStyles.options}>
                <Button
                    style={{ width: '49%' }}
                    labelStyle={{ fontSize: 12 }}
                    color='orange'
                    mode={'contained'}
                    onPress={() => navigateTo("Edit User Details")}>
                    Edit details
                </Button>
                <Button
                    style={{ width: '49%', marginTop: 0 }}
                    labelStyle={{ fontSize: 12 }}
                    color='red'
                    mode={'contained'}
                    onPress={handleAlert}>
                    Delete Account
                </Button>
            </View>

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
