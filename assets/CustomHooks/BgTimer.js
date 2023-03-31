import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import BackgroundTimer from "react-native-background-timer"
import { handleAlertInformation } from "../commonFunctions/Alerts";

export function BgTimer(props) {
  const [secondsLeft, setSecondsLeft] = useState(props.timeLimit);
  const [timerOn, setTimerOn] = useState(false);

  function clockify() {
    let hours = Math.floor(secondsLeft / 60 / 60)
    let mins = Math.floor((secondsLeft / 60) % 60)
    let seconds = Math.floor(secondsLeft % 60)
    let displayHours = hours < 10 ? `0${hours}` : hours
    let displayMins = mins < 10 ? `0${mins}` : mins
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds
    return {
      //displayHours,
      //displayMins,
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

  // Checks if secondsLeft = 0 and stop timer if so
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
      <Text style={styles.time}>
        {/* {clockify().displayHours} Hours {clockify().displayMins} Mins{" "} */}
        Appointment slot will be released in {clockify().displaySecs} seconds
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
  time: {
    fontSize: 18,
    color: "#000",
    marginBottom: 30,
    textAlign: "center",
  },
})