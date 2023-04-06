import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function CalledIcon(props) {
    if (props.checkedIn == true && props.called == false) {
        return <MaterialCommunityIcons name="bell-outline" color="black" size={25} />
    } else if (props.checkedIn == true && props.called == true) {
        return <MaterialCommunityIcons name="bell" color="purple" size={25} />
    } else {
        return null
    }

}
