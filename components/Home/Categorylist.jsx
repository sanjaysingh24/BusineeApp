import { View, Text ,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
export default function Categorylist({category,onCategoryPress}) {
  return (
   <TouchableOpacity onPress ={()=>onCategoryPress(category)} style={{display:'flex',alignItems:'center'}}>
    <View style ={{padding:15,backgroundColor:Colors.ICONBG ,borderRadius:99,marginRight:15,textAlign:'center'}}>

      <Image source ={{uri:category.Imageurl}} style={{height:40,width:40
      }}></Image>
</View>
      <Text style={{marginLeft:-10,fontWeight:500, fontSize:14}}>{category.Name}</Text>
   
   </TouchableOpacity>


  )
}