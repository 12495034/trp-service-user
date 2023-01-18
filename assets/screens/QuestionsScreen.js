import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

export default function QuestionsScreen({  route, navigation }) {

  //intend to pass the required information down the stack rather than making additional calls to firestore
  //there is a free quota for CRUD operations. Therefore number of calls should be minimised
  //stack is not that deep so prop drilling should be manageable
  const { clinicId, slotId } = route.params;

  return (
    <View>
      <Text>{clinicId}</Text>
      <Text>{slotId}</Text>
    </View>
  )
}

const QuestionStyles = StyleSheet.create({

})
