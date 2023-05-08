import React, { useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Text, Button } from 'react-native-paper'

import FilterQuestionRadio from '../components/FilterQuestionRadio';
import { Message3Question } from '../content/Message';
import useFilteredCollection from '../CustomHooks/useFilteredCollection';
import { ProgressCircle } from '../components/ProgressCircle';
import BookingProgress from '../components/BookingProgress';
import { buttonStyle } from '../constants/Constants';

/**
 * The Questions screen helps the user to determine if a test is suitible
 */
export default function QuestionsScreen({ navigation }) {
  //state management
  const [radioValue, setRadioValue] = useState(undefined);
  //Custom hook for data retrieval from firestore. Returns the advice based on how long it has been since they had unprotected sex
  const { filteredCollectionData, isFilteredCollectionLoading, filteredCollectionError } = useFilteredCollection('Questions', 'question', '==', radioValue)

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
        <View>
          {!item.test ?
            <View style={QuestionStyles.advice}>
              <Text style={QuestionStyles.adviceMessage}>{item.onAgree}</Text>
            </View>
            :
            <View style={QuestionStyles.advice}>
              <Text style={QuestionStyles.adviceMessage}>{item.onAgree}</Text>
              <Button
                disabled={item.test ? false : true}
                style={{ width: '100%' }}
                labelStyle={buttonStyle.MDLabel}
                color='#FFC1BE'
                mode={'contained'}
                onPress={() => navigateTo("Search for a Clinic")}>
                Search for a clinic
              </Button>
            </View>
          }
        </View>
      )
      }
    />

  return (
    <>
      <View>
        <BookingProgress progress={0} />
      </View>
      <View style={QuestionStyles.body}>
        <View style={QuestionStyles.content}>
          <Text style={QuestionStyles.message}>{Message3Question}</Text>
          <FilterQuestionRadio radioValue={radioValue} setRadioValue={setRadioValue} />
        </View>
        <View>
          {isFilteredCollectionLoading ? <View style={QuestionStyles.advice}><ProgressCircle /></View> : adviceMessage}
        </View>
      </View>
    </>
  )
}

const QuestionStyles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10
  },
  content: {
    flex: 1,

  },
  message: {
    fontSize: 15,
    textAlign: 'justify',
    marginBottom: 10,
  },
  advice: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  adviceMessage: {
    width: '100%',
    color: 'green',
    textAlign: 'justify',
    fontSize: 15,
    paddingBottom: 10,
  },
  progress: {
    flex: 0.75,
    justifyContent: 'flex-start',
    alignItems: 'center',
  }

})
