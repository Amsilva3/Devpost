import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from '@expo/vector-icons/Feather';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import NewPost from '../pages/NewPost';
import PostsUser from '../pages/PostsUser';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name="NewPost"
        component={NewPost}
        options={{
          title: 'New Post',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#36393F',
          },
        }}
      />
      <Stack.Screen
        name="PostsUser"
        component={PostsUser}
        options={{
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#36393F',
          },
        }}
      />
    </Stack.Navigator>
  );
}

function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFF',
        tabBarStyle: {
          backgroundColor: '#202225',
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={StackRoutes}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="home" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="search" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="user" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default AppRoutes;
