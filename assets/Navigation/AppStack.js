import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Appointments from '../screens/Appointments';
import BookStackScreen from './BookStack';
import ProfileStackScreen from './ProfileStack';
import { useNetInfo } from '@react-native-community/netinfo'

const Tab = createBottomTabNavigator();

const AppStack = (props) => {

  //use of netinfo hook to retrieve device connectivity information
  const netInfo = useNetInfo()

  //hide bottom tab navigator if the following stack screen is visible
  const hide = props.routeName == "Appointment Confirmation"
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FC81E1',
        headerStyle: { backgroundColor: netInfo.isInternetReachable? '#B9E6FF':'#F3F15C' },
        tabBarStyle: {
          backgroundColor: netInfo.isInternetReachable? '#B9E6FF':'#F3F15C',
          height: 60,
          paddingTop: 0,
          paddingBottom: 5,
          display: hide? 'none':'flex'
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