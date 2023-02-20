import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import EditDetails from '../screens/EditDetails';

const ProfileStack = createStackNavigator();

//Profile stack when viewing information and editing profile details
export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="User Details"
        component={Profile}
      />
      <ProfileStack.Screen
        name="Edit User Details"
        component={EditDetails}
      />
    </ProfileStack.Navigator>
  );
}
