import React, {useContext, useState, useEffect} from 'react';
import { Text } from 'react-native';
import {NavigationContainer, createNavigationContainerRef} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

//code from firebase to listen for AuthState changes
const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [routeName, setRouteName] = useState();

  console.log(routeName)

  const ref = createNavigationContainerRef();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  //Modification to code here to use a ternary to conditionally render 1 of two stacks if a user is signed in
  return (
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
      {user ? <AppStack routeName={routeName}/> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;