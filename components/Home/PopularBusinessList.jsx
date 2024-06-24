import { View, Text ,FlatList,Image,StyleSheet} from 'react-native'
import React,{useState,useEffect} from 'react'
import {db} from './../../config/FirebaseConfig'
import {collection,getDocs,query} from 'firebase/firestore'
import { Colors } from '../../constants/Colors'
import PopularBusinessCart from './PopularBusinessCart'
export default function PopularBusinessList() {
const[businesslist,setbusinesslist] = useState([]);

const GetbusinessList  =async()=>{
    setbusinesslist([]);
    const q = query(collection(db,'BusinessList'));
    const querySnapshots = await getDocs(q);
    querySnapshots.forEach((doc)=>{ 
        console.log(doc.data());
        setbusinesslist(prev=>[...prev,{id:doc.id,...doc.data()}]);
    })


}

useEffect(()=>{
    GetbusinessList()
},[])
  return (
    <View>
     <View style={{padding:20,display:'flex',flexDirection:'row',justifyContent:'space-between', alignItems:'baseline', marginTop:10}}>
<Text style = {{fontSize:20,marginTop:10,fontWeight:'bold'}}>Popular Business



</Text>
<Text style={{color:Colors.PRIMARY,fontSize:20,fontWeight:500}}>View All</Text>
</View>
<FlatList
      data={businesslist}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
    
    <PopularBusinessCart businesslist={item}/>

      )}
     // Add a key extractor if sliderList items don't have unique keys
    />




    </View>
  )
}
const styles = StyleSheet.create({
    container:{
      fontSize:20,
      paddingLeft:20,
      paddingTop:20,
      marginBottom:5
  
    },
    image:{
      width:300,
      height:160,
      borderRadius:15,
      marginRight:20
      
    }
  })