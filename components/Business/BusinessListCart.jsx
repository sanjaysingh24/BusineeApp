import { View, Text ,Image,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors'

export default function BusinessListCart({business}) {
    const router = useRouter();
  return (
    <TouchableOpacity style = {styles.container} onPress={()=>router.push('/businessDetail/'+business.id)}>
        <Image source={{uri:business.Imageurl}} style={{height:120,width:120, borderRadius:15}}/>
  
     <View style={{flex:1, marginTop:10,gap:7}}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>{business.name}</Text>
        <Text style ={{color:Colors.GRAY,fontSize:15}}>{business.address}</Text>
        <View style={{display:'flex',flexDirection:'row',marginTop:8 ,gap:5}}>
          <Image source={require('../../assets/images/star.png')} style={{width:15,height:15}}/>
          <Text  >4.5</Text>
         </View>
     </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container:{
        padding:10,
        margin:10,
        borderRadius:15,
        backgroundColor:"#fff",
        display:'flex',
        flexDirection:'row',
        gap:10,
    }
})
