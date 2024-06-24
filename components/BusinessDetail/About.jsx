import { View, Text } from 'react-native'
import React from 'react'

export default function About({businessdetail}) {
  return (
    <View style ={{padding:20, paddingTop:0,backgroundColor:'#fff'}}>
      <Text style = {{fontSize:20,fontWeight:'bold'}}>About</Text>
      <Text style={{lineHeight:25}}>{businessdetail?.about}</Text>

    </View>
  )
}