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
                    shadowColor: 'black',
                    shadowOpacity: 0.8,
                    elevation: 6,
                    shadowRadius: 15,
                    shadowOffset: { width: 1, height: 13 }
                },
            ]}
            onPress={props.handlePress}
        >
            <Text style={{ color: props.textColor, fontSize:15}}>
                {props.title}
            </Text>
        </Pressable>
    )
}
