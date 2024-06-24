import { View, Text,Image } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

export default function PopularBusinessCart({businesslist}) {

  const router = useRouter();
  return (
    <TouchableOpacity onPress={()=>router.push("/businessDetail/"+businesslist?.id)} style={{marginLeft:20,padding:10,backgroundColor:'#fff',borderRadius:15}}>
     <Image source={{uri:businesslist?.Imageurl}} style={{width:200,height:130,borderRadius:8}}/>

     <View style={{marginTop:7,gap:3}}>
        <Text style ={{fontSize:17 , fontWeight:'bold'}}>{businesslist.name}
     

        </Text>
        <Text style ={{fontSize:13,color:Colors.GRAY}}>
            {businesslist?.address}
         </Text>
         <View style ={{display:'flex', flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
         <View style={{display:'flex',flexDirection:'row',marginTop:8 ,gap:5}}>
          <Image source={require('../../assets/images/star.png')} style={{width:15,height:15}}/>
          <Text  >4.5</Text>
         </View>

         <View>
          <Text style={{backgroundColor:Colors.PRIMARY,color:'#fff',padding:3, paddingLeft:8, paddingRight:8,fontSize:10,borderRadius:5}}>{businesslist.category}</Text>
         </View>
         </View>

     </View>
    </TouchableOpacity>
  )
}