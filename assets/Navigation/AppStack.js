import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Profile from '../screens/Profile';
import Book from '../screens/Book';
import Home from '../screens/Home';
import Appointments from '../screens/Appointments';
import BookStackScreen from './BookStack';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  const getTabBarVisibility = (route) => {
    //TODO: need to work out what this code is actually used for, can it be removed
    const routeName = route.state? route.state.routes[route.state.index].name: '';
    if (routeName === 'chat') {
      return false;
    }
    return true;
  };
  

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FC81E1',
        headerStyle: { backgroundColor: '#B9E6FF' },
        tabBarStyle: {
          backgroundColor: '#B9E6FF',
          height: 60,
          paddingTop: 0,
          paddingBottom: 5,
        }
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ route }) => ({
          tabBarLabel: 'Home',
          // tabBarVisible: route.state && route.state.index === 0,
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
          tabBarVisible: getTabBarVisibility(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
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
          // tabBarVisible: route.state && route.state.index === 0,
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
        component={Profile}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "person" : "person-outline"} color={color} size={size} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default AppStack;