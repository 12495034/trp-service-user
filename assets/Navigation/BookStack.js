import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Book from '../screens/Book';
import QuestionsScreen from '../screens/QuestionsScreen';
import ClinicDetailsScreen from '../screens/ClinicDetailsScreen';
import AppointmentConfirmation from '../screens/AppointmentConfirmation';

const BookStack = createStackNavigator();

export default function BookStackScreen() {
  return (
    <BookStack.Navigator>
      <BookStack.Screen name="Search for a Clinic" component={Book} />
      <BookStack.Screen name="Questions" component={QuestionsScreen} />
      <BookStack.Screen name="Clinic Information" component={ClinicDetailsScreen} />
      <BookStack.Screen name="Appointment Confirmation" component={AppointmentConfirmation}/>
    </BookStack.Navigator>
  );
}
