import { View, Text,Image } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'

export default function BusinessListCart({business}) {
    const router  = useRouter();
  return (
    <TouchableOpacity onPress={()=>router.push('/businessDetail/' +business?.id)} style={{marginTop:20,backgroundColor:'#fff', borderTopLeftRadius:15,borderTopRightRadius:15}}>
    
    <Image source = {{uri:business?.Imageurl}} style={{width:'100%',height:150, borderTopLeftRadius:15,borderTopRightRadius:15}}></Image>


    <View style={{padding:10}}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>{business?.name}</Text>
        <Text style={{color:Colors.GRAY}}>{business?.address}</Text>
    </View>
    </TouchableOpacity>
  )
}