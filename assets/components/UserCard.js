import React from 'react'
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-paper';

export default function UserCard(props) {
    return (
        <View style={UserCardStyles.body}>
            <View style={UserCardStyles.image}>
                <Image style={{ height: 150, width: 150 }} source={require('../images/userProfileDefault.jpeg')} />
            </View>
            <View style={UserCardStyles.userInfo}>
                <View>
                    <Text variant="bodyMedium">Pronouns:</Text>
                    <Text variant="titleLarge">First Name:</Text>
                    <Text variant="bodyMedium">Middle Name:</Text>
                    <Text variant="bodyMedium">Last Name:</Text>
                    <Text variant="bodyMedium">Email:</Text>
                    <Text variant="bodyMedium">Email Verified:</Text>
                    <Text variant="bodyMedium">Phone Number:</Text>
                    <Text variant="bodyMedium">Date of Birth:</Text>
                </View>
                <View>
                    <Text variant="bodyMedium">{props.proNouns}</Text>
                    <Text variant="titleLarge">{props.firstName}</Text>
                    <Text variant="bodyMedium">{props.middleName}</Text>
                    <Text variant="bodyMedium">{props.lastName}</Text>
                    <Text variant="bodyMedium">{props.email}</Text>
                    <Text variant="bodyMedium">{props.emailVerified?"Yes":"No"}</Text>
                    <Text variant="bodyMedium">{props.phoneNumber}</Text>
                    <Text variant="bodyMedium">{props.dob}</Text>
                </View>
            </View>
        </View>
    )
}

const UserCardStyles = StyleSheet.create({
    body: {
        flex: 1,
        width: '100%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
        marginBottom:5,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    }
})
