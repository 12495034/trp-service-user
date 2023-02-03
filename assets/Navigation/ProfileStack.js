import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Book from '../screens/Book';
import QuestionsScreen from '../screens/QuestionsScreen';
import ClinicDetailsScreen from '../screens/ClinicDetailsScreen';
import AppointmentConfirmation from '../screens/AppointmentConfirmation';
import Profile from '../screens/Profile';
import EditDetails from '../screens/EditDetails';

const ProfileStack = createStackNavigator();

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="User Details" component={Profile} />
      <ProfileStack.Screen name="Edit User Details" component={EditDetails} />
    </ProfileStack.Navigator>
  );
}
