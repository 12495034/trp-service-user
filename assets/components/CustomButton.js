import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

export default function CustomButton(props) {
    return (
        <Pressable
        style={({pressed})=>[
            {backgroundColor:pressed?'#dddddd':props.color},
            styles.button
            ]}
            onPress={props.onPress}>
            <Text style={styles.text}>
                {props.name}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button:{
        width:150,
        height:50,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        margin:10,
        

    },
    text:{
        color:'#000000',
        fontSize:20,
        fontWeight:'400',
        margin:10,
    }
})
