import { View, Text,FlatList ,Image,StyleSheet} from 'react-native'
import React,{useEffect, useState} from 'react'
import {db} from './../../config/FirebaseConfig'
import {collection,getDocs,query} from 'firebase/firestore'

export default function Slider() {

const[sliderList,setsliderList] = useState([])
    const GetSliderList =async()=>{
      //make an empty whenver
      setsliderList([])
    
        const q =query(collection(db,'Slider'));
        const querySnapshots = await getDocs(q);
        querySnapshots.forEach((doc)=>{
     // it save the previous data and also new data

     setsliderList(prev=>[...prev,doc.data()]);
    
 
        })
    }
    useEffect(()=>{
        GetSliderList();
  },[])


  return (
    <View style={styles.container}>
      <Text style={{fontSize:20,paddingBottom:20,fontWeight:'bold'}}># Special for you</Text>
      <FlatList
      data={sliderList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View>
        <Image style = {styles.image} source={{ uri: item.ImageURl }} />
   
      </View>
      )}
      keyExtractor={(item, index) => index.toString()} // Add a key extractor if sliderList items don't have unique keys
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