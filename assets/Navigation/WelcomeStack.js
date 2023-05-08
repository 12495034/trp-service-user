import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';

/**
 * Welcome Stack shown to user following signup
 */
const Stack = createStackNavigator();

const WelcomeStack = () => {

  let routeName = 'Welcome';

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
      />
    </Stack.Navigator>
  );
};

export default WelcomeStack;