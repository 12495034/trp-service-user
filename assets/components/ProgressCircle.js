import React from 'react'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

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
