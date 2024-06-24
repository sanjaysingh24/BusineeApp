import { View, Text, StyleSheet,Image ,TextInput} from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import {Colors} from './../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
export default function Header() {
//extract the user detail from the clerk using the useUser hook
    const {user} = useUser();
  return (
    <View style={styles.container}>
      <View style  ={styles.flex}>
        <Image style={styles.image} source ={{uri:user?.imageUrl}}></Image>

        <View>
            <Text style={{color:'white'}}>Welcome </Text>
            <Text style={{fontSize:19,color:'white'}}>{user?.fullName}</Text>
        </View>
      </View>

{/* search_bar */}
<View style ={styles.search}>
<Ionicons name="search" size={24} color={Colors.PRIMARY} />
{/* //similar like input box */}
<TextInput placeholder='Search....' style={{fontSize:16}}></TextInput>
</View>

    </View>
  )
}
const styles = StyleSheet.create({
    image:{
        width:45,
        height:45,
        borderRadius:99
    },
    container:{
        padding:20,
        paddingTop:60,
        backgroundColor:Colors.PRIMARY,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
    },
    flex:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:20  
    }
    ,search:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:20  ,
        backgroundColor:'white',
        padding:10,
        marginVertical:10,
        marginTop:15,
        borderRadius:8
    }
})