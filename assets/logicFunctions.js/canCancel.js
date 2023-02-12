import React from 'react'
import { cancelLimit } from '../constants/Constants';

//calculate the full number of hours between two dates
export default function canCancel(dateTime1, dateTime2) {
    //calculate milliseconds between two dateTime stamps
    var diff = (dateTime2.getTime() - dateTime1.getTime()) / 1000;
    diff /= (60 * 60);
    console.log(Math.abs(Math.round(diff)));
    if (diff >= cancelLimit) {
        return true
    } else {
        return false
    }
    //return Math.abs(Math.round(diff));
}
