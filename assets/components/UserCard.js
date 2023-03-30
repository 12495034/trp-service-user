import React from 'react'
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-paper';

export default function UserCard(props) {
    return (
        <View style={UserCardStyles.body}>
            <View style={UserCardStyles.title}>
                {/* <Image style={{ height: 50, width: 50 }} source={require('../images/userProfileDefault.jpeg')} /> */}
                <Text style={UserCardStyles.titleText}>{props.email}</Text>
            </View>
            <View style={UserCardStyles.userInfo}>
                <View>
                    <Text style={UserCardStyles.detailText}>Pronouns:</Text>
                    <Text style={UserCardStyles.detailText}>First Name:</Text>
                    <Text style={UserCardStyles.detailText}>Middle Name:</Text>
                    <Text style={UserCardStyles.detailText}>Last Name:</Text>
                    <Text style={UserCardStyles.detailText}>Phone Number:</Text>
                    <Text style={UserCardStyles.detailText}>Date of Birth:</Text>
                    <Text style={UserCardStyles.detailText}>Email Verified:</Text>
                    {/* <Text style={UserCardStyles.detailText}>Agreed to T&C:</Text> */}
                    <Text style={UserCardStyles.detailText}>Created On:</Text>
                    <Text style={UserCardStyles.detailText}>Notifications:</Text>
                    <Text style={UserCardStyles.detailText}>Status:</Text>
                    {/* <Text style={UserCardStyles.detailText}>Role:</Text> */}
                </View>
                <View>
                    <Text style={UserCardStyles.detailText}>{props.proNouns}</Text>
                    <Text style={UserCardStyles.detailText}>{props.firstName}</Text>
                    <Text style={UserCardStyles.detailText}>{props.middleName}</Text>
                    <Text style={UserCardStyles.detailText}>{props.lastName}</Text>
                    <Text style={UserCardStyles.detailText}>{props.phoneNumber}</Text>
                    <Text style={UserCardStyles.detailText}>{props.dob}</Text>
                    <Text style={UserCardStyles.detailText}>{props.emailVerified ? "Yes" : "No"}</Text>
                    {/* <Text style={UserCardStyles.detailText}>{props.isAgreedTC ? "Yes" : "No"}</Text> */}
                    <Text style={UserCardStyles.detailText}>{props.creationDate}</Text>
                    <Text style={UserCardStyles.detailText}>{props.emailOptIn ? "Yes" : "No"}</Text>
                    <Text style={UserCardStyles.detailText}>{props.status}</Text>
                    {/* <Text style={UserCardStyles.detailText}>{props.role}</Text> */}
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
        marginBottom: 5,
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
    },
    title: {
        padding: 20,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'blue',
        backgroundColor: '#F2D6F3',
        padding: 10,
        borderRadius: 5,
        elevation:5,
    },
    detailText: {
        fontSize: 15,
        paddingBottom: 2,
        color: 'black',
    }
})
