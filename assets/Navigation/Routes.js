import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../context/AuthProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import WelcomeStack from './WelcomeStack';
import { View } from 'react-native';
import { ProgressCircle } from '../components/ProgressCircle';


const Routes = ({ navigation }) => {
  const { user, status } = useContext(AuthContext);
  const { initializing, setInitializing } = useState(false)
  const ref = createNavigationContainerRef();

  const [routeName, setRouteName] = useState();

  //Screen rendering 
  if (initializing) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ProgressCircle /></View>;

  let display = ""

  if (user != null && status != undefined) {
    display = <AppStack routeName={routeName} />
  } else if (user != null && status === undefined) {
    display = <WelcomeStack />
  } else {
    display = <AuthStack />
  }

  return (
    //navigation container uses createnavigationcontainer ref to be able to 
    //retrieve route of stack navigator nested within tab navigator. This is to enable changes to be made to tab navigator
    //options based on the stack screen that is currently visible
    <NavigationContainer
      ref={ref}
      onReady={() => {
        setRouteName(ref.getCurrentRoute().name)
      }}
      onStateChange={async () => {
        const previousRouteName = routeName;
        const currentRouteName = ref.getCurrentRoute().name;
        setRouteName(currentRouteName);
      }}>

      {/* render the following based on conditional logic above */}
      {display}

    </NavigationContainer>
  );
};

export default Routes;