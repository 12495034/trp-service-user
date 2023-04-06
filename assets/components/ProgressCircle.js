import React from 'react'
import { ActivityIndicator } from 'react-native-paper';

//loading circle component to indicate when data is being loaded or information processing is occurring
export function ProgressCircle() {
    return (
            <ActivityIndicator 
            size='60'
            animating={true} 
            color={'red'} 
            hidesWhenStopped={true}
            />
    )
}
