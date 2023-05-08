import React from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

/**
 * Check In Icon Component, returns icon based on appointments checked in state
 */
export default function CheckInIcon(props) {
    if(props.checkedIn){
        return <FontAwesome5Icon name="user-check" color="green" size={20}/>
    } else { 
        return <FontAwesome5Icon name="user-clock" color="red" size={20}/>
    }
    
}
