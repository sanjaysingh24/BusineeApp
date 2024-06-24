import { View, Text } from 'react-native'
import React from 'react'
import Userintro from '../../components/Profile/Userintro'
import Menulist from '../../components/Profile/Menulist'


export default function profile() {
  return (
    <View style={{padding:20,marginTop:15}}>
      {/* // divide into two components one is use profile and another is action button */}
      <Text style={{fontSize:30, fontWeight:"bold"}}>Profile</Text>
      {/* Userinfo */}
  <Userintro></Userintro>
      {/* menulist */}
      <Menulist></Menulist>
    </View>
  )
}