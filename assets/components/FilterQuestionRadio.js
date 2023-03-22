import React from 'react'
import { View, StyleSheet } from 'react-native';
import { RadioButton, Card } from 'react-native-paper'
import { radioButtonSelectColor } from '../constants/Constants';


export default function FilterQuestionRadio(props) {

  return (
    <Card mode='outlined'>
      <Card.Content>
        <RadioButton.Group onValueChange={value => props.setRadioValue(value)} value={props.radioValue}>
          <View style={styles.groupLayout}>
            <View style={styles.layout}>
              <RadioButton.Item label="< 72 hrs" value={1} color={radioButtonSelectColor} />
              <RadioButton.Item label="> 6 weeks" value={3} color={radioButtonSelectColor} />
            </View>
            <View style={styles.layout} >
              <RadioButton.Item label="< 6 weeks" value={2} color={radioButtonSelectColor} />
              <RadioButton.Item label="12 weeks" value={4} color={radioButtonSelectColor} />
              <RadioButton.Item label="Routine Test" value={0} color={radioButtonSelectColor} />
            </View>
          </View>
        </RadioButton.Group >
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  groupLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    // borderColor: 'black',
    // borderRadius: 10,
    // borderStyle: 'solid',
    // borderWidth: 5,
  },
  layout: {
    flexDirection: 'column',

  },
  text: {
    padding: 15,
    color: 'black',
  }

})
