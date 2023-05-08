import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CreateAccount from '../screens/CreateAccount'
import Login from '../screens/Login'
import ResetPassword from '../screens/ResetPassword';


const Stack = createStackNavigator();

/**
 * authentication stack consisting of login, create account and reset password screens in a stack
 */
const AuthStack = () => {

  let routeName = 'Login';

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Signup"
        component={CreateAccount}
      />
      <Stack.Screen
        name="Reset"
        component={ResetPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;