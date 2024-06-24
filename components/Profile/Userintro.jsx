import { View, Text ,Image} from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from '../../constants/Colors';
export default function Userintro() {
    const{user} = useUser();
  return (
    <View style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:30}}>
      <Image source = {{uri:user?.imageUrl}} style ={{width:100,height:100, borderRadius:99}}/>

      <Text style ={{fontSize:20,fontWeight:'bold'}}>
        {user?.fullName}
      </Text>
      <Text style={{fontSize:16,color:Colors.GRAY, marginTop:2}}>
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
    </View>
  )
}