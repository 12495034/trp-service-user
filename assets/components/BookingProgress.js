import React from 'react'
import { ProgressBar } from 'react-native-paper'
import { progressBarColor } from '../constants/Constants'

//booking progress bar used to inform user of progress when booking an appointment
export default function BookingProgress(props) {
  return (
    <ProgressBar progress={props.progress} color={progressBarColor} style={{height:10}}/>
  )
}
