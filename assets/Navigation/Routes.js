import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../context/AuthProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { View } from 'react-native';
import { ProgressCircle } from '../components/ProgressCircle';


const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const ref = createNavigationContainerRef();

  const [initializing, setInitializing] = useState(true);
  const [routeName, setRouteName] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  //use effect contains listener to monitor user state changes
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  //Screen rendering 
  if (initializing) return <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}><ProgressCircle /></View>;

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

      {user ? <AppStack routeName={routeName} /> : <AuthStack />}

    </NavigationContainer>
  );
};

export default Routes;