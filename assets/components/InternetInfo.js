import { useNetInfo } from '@react-native-community/netinfo'
import React from 'react'
import { View, Text } from 'react-native';

export default function InternetInfo() {
    const netInfo = useNetInfo();

    return (
        <View>
            <Text>Device Connection:{netInfo.isConnected? "Yes":"No"}</Text>
            <View style={{
                marginTop: 20,
                width: 50,
                height: 50,
            }}>
            </View>
        </View>
    )
}
