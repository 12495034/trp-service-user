import React, { useState} from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Text, Button } from 'react-native-paper'
import FilterQuestionRadio from '../components/FilterQuestionRadio';
import { Message1Question, Message3Question } from '../content/Message';
import useFilteredCollection from '../CustomHooks/useFilteredCollection';
import { ProgressCircle } from '../components/ProgressCircle';


export default function QuestionsScreen({ navigation }) {

  const [radioValue, setRadioValue] = useState(undefined);
  const { filteredCollectionData, isFilteredCollectionLoading, filteredCollectionError } = useFilteredCollection('Questions', 'priority', '==', radioValue)

  function navigateTo(screen) {
    navigation.navigate(screen)
  }

  //-----------------------------------------------------------------------------------
  //  Data Rendering
  //-----------------------------------------------------------------------------------
  const adviceMessage =
    <FlatList
      data={filteredCollectionData}
      keyExtractor={(Item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={QuestionStyles.advice}>
          <Text style={QuestionStyles.adviceMessage}>{item.onAgree}</Text>
          <Button
            disabled={item.test ? false : true}
            style={{ width: '100%' }}
            labelStyle={{ fontSize: 12 }}
            color='#FFC1BE'
            mode={'contained'}
            onPress={() => navigateTo("Search for a Clinic")}>
            Search for a clinic
          </Button>
        </View>
      )}
    />

  return (
    <View style={QuestionStyles.body}>
      <View style={QuestionStyles.content}>
        <Text style={QuestionStyles.message}>{Message1Question}</Text>
        <Text style={QuestionStyles.message}>{Message3Question}</Text>
        <FilterQuestionRadio radioValue={radioValue} setRadioValue={setRadioValue} />
      </View>
      <View>
        {isFilteredCollectionLoading ? <View style={QuestionStyles.advice}><ProgressCircle /></View> : adviceMessage}
      </View>
    </View>
  )
}

const QuestionStyles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  message: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'justify',
    paddingTop: 5,
    marginBottom: 10,
  },
  advice: {
    padding: 15,
    justifyContent: 'center',
    alignItems:'center',
  },
  adviceMessage: {
    width:'100%',
    color: 'darkblue',
    textAlign: 'justify',
    fontSize: 15,
    paddingBottom: 20,
  },
  progress: {
    flex: 0.75,
    justifyContent: 'flex-start',
    alignItems: 'center',
  }

})
