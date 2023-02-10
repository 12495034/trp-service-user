import React from 'react'
import * as Progress from 'react-native-progress';

export function ProgressCircle() {
    return (
        <Progress.Circle
            size={60}
            indeterminate={true}
            endAngle={0.6}
            animated={true}
            color={'red'}
            borderColor={'red'}
            borderWidth={5}
            showsText={true} 
            />
    )
}
