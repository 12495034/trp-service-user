import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function TestCompleteIcon(props) {
    if (props.checkedIn === true && props.complete === true) {
        return <Icon name="thumbs-up" color="green" size={20} solid/>
    } else if (props.checkedIn === true && props.complete === false) {
        return <Icon name="thumbs-up" color="grey" size={20} solid/>
    }

}