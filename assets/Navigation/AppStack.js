import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Appointments from '../screens/Appointments';
import BookStackScreen from './BookStack';
import ProfileStackScreen from './ProfileStack';
import { useNetInfo } from '@react-native-community/netinfo'
import { AuthContext } from '../context/AuthProvider';
import useCountOnSnapshot from '../CustomHooks/useCountOnSnapshot';

const Tab = createBottomTabNavigator();
const AppStack = (props) => {
  const { user } = useContext(AuthContext);
  const { countData, isCountLoading, countError } = useCountOnSnapshot(`Users/${user.uid}/Appointments`, "Active")

  //use of netinfo hook to retrieve device connectivity information
  const netInfo = useNetInfo()
  //set firestore to disable offline persistence
  const { offlineMode } = useContext(AuthContext)
  offlineMode(false)
  //hide bottom tab navigator if the following stack screen is visible
  const hide = props.routeName == "Appointment Confirmation"

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: '#FC81E1',
        // headerStyle: { backgroundColor: netInfo.isInternetReachable ? '#B9E6FF' : '#F3F15C' },
        headerStyle: { backgroundColor: '#B9E6FF' },
        tabBarStyle: {
          // backgroundColor: netInfo.isInternetReachable ? '#B9E6FF' : '#F3F15C',
          backgroundColor: '#B9E6FF',
          height: 60,
          paddingTop: 0,
          paddingBottom: 5,
          display: hide ? 'none' : 'flex'
        }
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ route }) => ({
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="New Booking"
        component={BookStackScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={({ route }) => ({
          tabBarBadge: countData > 0 ? countData : null,
          tabBarLabel: 'Appointments',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "calendar-account" : "calendar-blank"}
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "person" : "person-outline"} color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator >
  );
};

export default AppStack;