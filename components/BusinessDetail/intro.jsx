import { View, Text,Image, StyleSheet,TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Intro({businessdetail}) {
  const{user} = useUser();
  const router = useRouter();
  const ondelete = ()=>{
    Alert.alert('Do you want to delete?','Do you really want to Delete this business?',[
      {
        text:'Cancel',
        style:'cancel'
      },
      {
        text:'Delete',
        style:'destructive',
        onPress:()=>deletebusiness()
      }
    ])
  }
  const deletebusiness=async()=>
  {
    console.log('deletebusiness');
    await deleteDoc(doc(db,'BusinessList',businessdetail?.id));
    router.back();
    ToastAndroid.show('Business Deleted!',ToastAndroid.LONG);
  }
  return (
    <View>
        <View style={styles.arrow_icon}>
          {/* // just go for back */}
      <TouchableOpacity onPress={()=>router.back()}>

        <Ionicons name="arrow-back-circle" size={40} color="white" />
      </TouchableOpacity>
        <Ionicons name="heart-outline" size={40} color="white" />
        </View>
        <Image source = {{uri:businessdetail.Imageurl}} style={{width:'100%', height:300} }/>
        <View style={{display:'flex',flexDirection:'row',backgroundColor:'#fff',justifyContent:'space-between',borderTopLeftRadius:25,borderTopRightRadius:25, marginTop:-20,padding:20}}>
      <View style={{padding:20,marginTop:-20,backgroundColor:"#fff",borderTopLeftRadius:25,borderTopRightRadius:25}}>
        <Text style ={{fontSize:26,fontWeight:'bold' }}>{businessdetail.name}  </Text>
   <Text style={{fontSize:18}}>{businessdetail.address}</Text>
      </View>
    {user?.primaryEmailAddress?.emailAddress==businessdetail.userEmail&&  <TouchableOpacity onPress={()=>ondelete()}>

      <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  arrow_icon:{
    display:'flex',flexDirection:'row',justifyContent:'space-between', position:'absolute',zIndex:999,
  width:'100%',top:'5%', padding:20
  }
})