import { View, Text, StyleSheet,TextInput } from 'react-native'
import React,{useState} from 'react'
import {Colors} from './../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import Category from '../../components/Home/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import Explorebusinesslist from '../../components/Explore/Explorebusinesslist';
export default function search() {
const [businesslist,setbusinesslist] = useState([]);
  const getbusinessCategory = async(category)=>{
    setbusinesslist([])
const q  = query(collection(db,'BusinessList'),where ('category','==',category));
const querysnapshot = await getDocs(q);
querysnapshot.forEach((doc)=>{
  console.log(doc.data());
  setbusinesslist(prev=>[...prev,{id:doc.id,...doc.data()}]);
})
  }
  return (
    <View style={{padding:20,marginTop:20}}>
      <Text style={{fontWeight:'bold',fontSize:20}}>
        Explore More
      </Text>

      {/* Searchbar */}
      
      <View style ={styles.search}>
<Ionicons name="search" size={24} color={Colors.PRIMARY} />

<TextInput placeholder='Search....' style={{fontSize:16}}></TextInput>
</View>

{/* End Searchbar */}


      {/* Category */}
      <Category
      explore={true}
      onCategorySelect ={(category)=>getbusinessCategory(category)}
      ></Category>


      {/* BusinessList */}

      <Explorebusinesslist businesslist = {businesslist}></Explorebusinesslist>

    </View>
  )
}
const styles = StyleSheet.create({
  search:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:20  ,
    backgroundColor:'white',
padding:10,

    marginVertical:10,
    marginTop:15,
    borderRadius:8,
    borderWidth:1,
    borderColor:Colors.PRIMARY
}
})