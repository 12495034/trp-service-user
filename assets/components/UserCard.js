import React from 'react'
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { Linking } from 'react-native';

/**
 * User card component renders personal details entered by the user at signup
 */
export default function UserCard(props) {
    return (
        <View style={UserCardStyles.body}>
            <View style={UserCardStyles.title}>
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
                    <Text style={UserCardStyles.detailText}>Created On:</Text>
                    <Text style={UserCardStyles.detailText}>Notifications:</Text>
                    <Text style={UserCardStyles.detailText}>Status:</Text>
                    <Text></Text>
                    <Text
                        style={{ color: 'blue', textDecorationLine: 'underline', }}
                        onPress={() => Linking.openURL('https://trp-developement.web.app/privacy-policy-mobile')}>
                        View Privacy Policy
                    </Text>

                </View>
                <View>
                    <Text style={UserCardStyles.detailText}>{props.proNouns}</Text>
                    <Text style={UserCardStyles.detailText}>{props.firstName}</Text>
                    <Text style={UserCardStyles.detailText}>{props.middleName}</Text>
                    <Text style={UserCardStyles.detailText}>{props.lastName}</Text>
                    <Text style={UserCardStyles.detailText}>{props.phoneNumber}</Text>
                    <Text style={UserCardStyles.detailText}>{props.dob}</Text>
                    <Text style={UserCardStyles.detailText}>{props.emailVerified ? "Yes" : "No"}</Text>
                    <Text style={UserCardStyles.detailText}>{props.creationDate}</Text>
                    <Text style={UserCardStyles.detailText}>{props.emailOptIn ? "Yes" : "No"}</Text>
                    <Text style={UserCardStyles.detailText}>{props.status}</Text>
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
        padding: 5,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'blue',
        backgroundColor: '#F2D6F3',
        padding: 10,
        borderRadius: 5,
        elevation: 5,
    },
    detailText: {
        fontSize: 15,
        paddingBottom: 2,
        color: 'black',
    }
})
