import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import BackgroundTimer from "react-native-background-timer"
import { handleAlertInformation } from "../functions/generalFunctions/Alerts";

/**
 * Background timer runs even if the app screen is minimised. Ensures the user can only hold the appointment for a specified duration
 * @param {timeLimit, callBack} props 
 * @returns on screen count down with with callback function triggered at 0
 */
export function BgTimer(props) {
  const [secondsLeft, setSecondsLeft] = useState(props.timeLimit);
  const [timerOn, setTimerOn] = useState(false);

  function clockify() {
    let seconds = Math.floor(secondsLeft % 60)
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds
    return {
      displaySecs,
    }
  }

  function startTimer() {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        if (secs > 0) return secs - 1
        else return 0
      })
    }, 1000)
  }

  //Set timer to on immediately following screen render
  useEffect(() => {
    setTimerOn(timerOn => !timerOn)
  }, [])

  // Runs when timerOn value changes to start or stop timer
  useEffect(() => {
    if (timerOn) startTimer();
    else BackgroundTimer.stopBackgroundTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);

  //Checks if secondsLeft = 0 and stops timer if so
  //also runs callback function that is passed into the component
  useEffect(() => {
    if (secondsLeft === 0) {
      BackgroundTimer.stopBackgroundTimer()
      props.callBack()
      handleAlertInformation("Time Out", "You took too long to confirm your appointment and your request timed out. Please start the booking process again.")
    }
  }, [secondsLeft])

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Appointment slot will be released in
      </Text>
      <Text style={styles.time}>
        {clockify().displaySecs} seconds
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  message: {
    fontSize: 18,
    color: "#000",
    marginBottom: 30,
    textAlign: "center",
  },
  time: {
    fontSize: 18,
    color: "red",
    marginBottom: 30,
    textAlign: "center",
  },
})