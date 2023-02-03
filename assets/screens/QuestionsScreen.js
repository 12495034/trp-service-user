import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Text, RadioButton, Button } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';
import FilterQuestionRadio from '../components/FilterQuestionRadio';
import { filterQuestionMessage1, filterQuestionMessage2, filterQuestionMessage3 } from '../images/content/Message';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';

export default function QuestionsScreen({ route, navigation }) {

  const [advice, setAdvice] = useState([])
  const [radioValue, setRadioValue] = useState(undefined);

  var filterValue;
  if (radioValue == undefined) {
    filterValue = 0
  } else {
    filterValue = radioValue
  }

  console.log(advice)

  useEffect(() => {
    fetchQuestionData()
  }, [radioValue])

  function fetchQuestionData() {
    const subscriber = firestore()
      .collection('Questions')
      .where('priority', '==', filterValue)
      .get()
      .then(querySnapshot => {
        let questionArray = []
        querySnapshot.forEach((doc) => {
          questionArray.push(doc.data())
        })
        setAdvice(questionArray)
      });
  }

  function navigateTo(screen) {
    navigation.navigate(screen)
  }

  //-----------------------------------------------------------------------------------
  //  Data Rendering
  //-----------------------------------------------------------------------------------
  const adviceMessage =
    <FlatList
      data={advice}
      keyExtractor={(Item, index) => index.toString()}
      renderItem={({ item }) => (
        <>
          <Text style={QuestionStyles.adviceMessage}>{item.onAgree}</Text>
          {item.test ? <Button
            style={{ width: '100%' }}
            labelStyle={{ fontSize: 12 }}
            color='#FFC1BE'
            mode={'contained'}
            onPress={() => navigateTo("Search for a Clinic")}>
            Search for a clinic
          </Button> : <Button
            disabled={true}
            style={{ width: '100%' }}
            labelStyle={{ fontSize: 12 }}
            color='#FFC1BE'
            mode={'contained'}
            onPress={() => navigateTo("Search for a Clinic")}>
            Search for a clinic
          </Button>}
        </>
      )}
    />
  // if(user.emailVerified){

  // }

  return (
    <View style={QuestionStyles.body}>
      <View style={QuestionStyles.content}>
        <Text style={QuestionStyles.message}>{filterQuestionMessage1}</Text>
        <Text style={QuestionStyles.message}>{filterQuestionMessage3}</Text>
        <FilterQuestionRadio radioValue={radioValue} setRadioValue={setRadioValue} />
      </View>
      <View style={QuestionStyles.advice}>
        {radioValue == undefined ? null : adviceMessage}
      </View>
    </View>


  )
}

const QuestionStyles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  message: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'justify',
    paddingTop: 5,
    marginBottom: 10,

  },
  advice: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  adviceMessage: {
    justifyContent: 'flex-start',
    color: 'darkblue',
    textAlign: 'justify',
    fontSize: 15,
    paddingBottom: 5,

  },
  content: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  }

})
