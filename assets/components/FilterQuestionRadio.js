import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { RadioButton } from 'react-native-paper'

export default function FilterQuestionRadio(props) {

  return (
    <RadioButton.Group onValueChange={value => props.setRadioValue(value)} value={props.radioValue}>
      <View style={styles.groupLayout}>
        <View style={styles.layout}>
          <RadioButton.Item label="< 72 hrs" value={1} color='blue' />
          <RadioButton.Item label="> 6 weeks" value={3} color='blue' />

        </View>
        <View style={styles.layout} >
          <RadioButton.Item label="< 6 weeks" value={2} color='blue' />
          <RadioButton.Item label="12 weeks" value={4} color='blue' />
          <RadioButton.Item label="Routine Test" value={0} color='blue' />
        </View>
      </View>
    </RadioButton.Group >
  )
}

const styles = StyleSheet.create({
  groupLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'lightpink',
    borderRadius: 10,
  },
  layout: {
    flexDirection: 'column',

  },
  text: {
    padding: 15,
    color: 'black',
  }

})
