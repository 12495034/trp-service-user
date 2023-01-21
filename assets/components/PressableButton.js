import React from 'react'
import { Pressable, Text } from 'react-native'

export default function PressableButton(props) {
    return (
        <Pressable
            style={({ pressed }) => [
                { 
                    backgroundColor: pressed ? props.pressed : props.unpressed,
                    padding: 15, 
                    borderRadius: 5, 
                    width: props.width ? props.width : 'auto',
                    alignItems: 'center',
                },
            ]}
            onPress={props.handlePress}
        >
            <Text style={{color:props.textColor}}>
                {props.title}
            </Text>
        </Pressable>
    )
}
