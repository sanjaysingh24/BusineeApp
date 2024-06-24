import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import {Tabs} from 'expo-router'
import { Colors } from './../../constants/Colors';
export default function Tablayout() {
  return (
    <Tabs screenOptions={{headerShown:false, tabBarActiveTintColor:Colors.PRIMARY}}>
        <Tabs.Screen name='home' options={{tabBarLabel:'home', tabBarIcon:({color})=><Ionicons name="home" size={24} color={color} />
    }}/>
        <Tabs.Screen name='explore' options={{tabBarLabel:'explore',tabBarIcon:({color})=><Ionicons name="search" size={24} color={color} />}}/>
        <Tabs.Screen name='profile' options={{tabBarLabel:'profile',tabBarIcon:({color})=><Ionicons name="people-circle" size={24} color={color} />}}/>
    </Tabs>
  )
}