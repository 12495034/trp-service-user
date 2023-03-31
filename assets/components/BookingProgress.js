import React from 'react'
import { ProgressBar } from 'react-native-paper'
import { progressBarColor } from '../constants/Constants'

export default function BookingProgress(props) {
  return (
    <ProgressBar progress={props.progress} color={progressBarColor} style={{height:10}}/>
  )
}
