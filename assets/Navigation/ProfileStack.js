import React,{useContext} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import EditDetails from '../screens/EditDetails';
import { AuthContext } from '../context/AuthProvider';

const ProfileStack = createStackNavigator();


//Profile stack when viewing information and editing profile details
export default function ProfileStackScreen() {

  const { user} = useContext(AuthContext);

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
