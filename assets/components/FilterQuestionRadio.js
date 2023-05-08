import React from 'react'
import { View, StyleSheet } from 'react-native';
import { RadioButton, Card } from 'react-native-paper'
import { radioButtonSelectColor, radioButtonUnselectedColor } from '../constants/Constants';


/**
 * Radio button selection group, used for determining if a test is suitible
 */
export default function FilterQuestionRadio(props) {
  return (
    <Card mode='outlined'>
      <Card.Content >
        <RadioButton.Group onValueChange={value => props.setRadioValue(value)} value={props.radioValue}>
          <View style={styles.groupLayout}>
            <RadioButton.Item labelStyle={styles.labelStyle} label="Less than 72 hours" value={1} uncheckedColor={radioButtonUnselectedColor} color={radioButtonSelectColor} />
            <RadioButton.Item labelStyle={styles.labelStyle} label="Less than 6 weeks" value={2} uncheckedColor={radioButtonUnselectedColor} color={radioButtonSelectColor} />
            <RadioButton.Item labelStyle={styles.labelStyle} label="More than 6 weeks" value={3} uncheckedColor={radioButtonUnselectedColor} color={radioButtonSelectColor} />
            <RadioButton.Item labelStyle={styles.labelStyle} label="12 weeks" value={4} uncheckedColor={radioButtonUnselectedColor} color={radioButtonSelectColor} />
            <RadioButton.Item labelStyle={styles.labelStyle} label="Routine Test" value={0} uncheckedColor={radioButtonUnselectedColor} color={radioButtonSelectColor} />
          </View>
        </RadioButton.Group >
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  groupLayout: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  labelStyle:{
    fontSize:15,
    color:'black'
  }
})
