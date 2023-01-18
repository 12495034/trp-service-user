import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import { AuthContext } from '../Navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import UserCard from '../components/UserCard';

export default function Profile(props) {

    const { logout, user } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState({});

    console.log(userDetails)

    useEffect(() => {
        fetchUserData()
    }, [user])

    function fetchUserData() {
        firestore().collection('Users')
            .doc(`${user.uid}`)
            .get()
            .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    setUserDetails(documentSnapshot.data())
                } else {
                    console.log("No such document!");
                }
            })
    }


    return (
        <View style={ProfileStyles.body}>
            {/* Issue here that the user information does not seem be immediately available on login */}
            {user ?
                <UserCard
                    proNouns={userDetails.ProNouns}
                    firstName={userDetails.FirstName}
                    lastName={userDetails.LastName}
                    dob={userDetails.dob}
                    email={userDetails.Email}
                    phoneNumber={userDetails.PhoneNumber}
                    isAgreedTC={userDetails.isAgreedTC}
                    role={userDetails.Role}
                    status={userDetails.status}
                />
                :
                <View>
                    <Text>
                        User data not available at this time
                    </Text>
                </View>
            }
            <Pressable
                style={({ pressed }) => [
                    { backgroundColor: pressed ? '#dddddd' : '#ffb269'},
                    ProfileStyles.button
                ]}
                onPress={() => console.log("Editing user details...")}
            >
                <Text>
                    Edit Details
                </Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [
                    { backgroundColor: pressed ? '#dddddd' : '#F37973'},
                    ProfileStyles.button
                ]}
                onPress={() => console.log("Deleting user account....")}
            >
                <Text>
                    Delete Account
                </Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [
                    { backgroundColor: pressed ? '#dddddd' : '#79e75e'},
                    ProfileStyles.button
                ]}
                onPress={() => logout()}
            >
                <Text>
                    Sign Out
                </Text>
            </Pressable>

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
        marginTop:1,
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:5,
    },
})
