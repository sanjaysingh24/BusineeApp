import { View, Text, ScrollView } from 'react-native'
import React,{useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/BusinessDetail/intro';
import Action from '../../components/BusinessDetail/Action';
import About from '../../components/BusinessDetail/About';
import Review from '../../components/BusinessDetail/Review';
export default function businessid() {
const[businessdetail,setbusinessdetail]=useState([]);
const {businessid} = useLocalSearchParams();
const[loading,setloading]  = useState(false);
useEffect(()=>{
    getbusinessdetail();
},[])

const getbusinessdetail = async()=>{
    setloading(true);
    const docref = doc(db,'BusinessList',businessid);
   const docsnap  = await getDoc(docref);
   if(docsnap.exists()){
   //console.log('document data :',docsnap.data());
   setbusinessdetail({id:docsnap.id , ...docsnap.data()});
   setloading(false);
   }
   else{
    console.log("no data found")
   }
}
  return (
    <ScrollView>
        {loading?<ActivityIndicator
        size={'large'}
color={Colors.PRIMARY}
style={{marginTop:'70%'}}        />:
        <View>


            </View>
            
            
            }
      {/* <Text>{businessid}</Text> */}
      <Intro businessdetail = {businessdetail}></Intro>

      {/* Actionbuttons */}

       <Action businessdetail = {businessdetail}></Action>

      {/* About_section */}
      <About businessdetail={businessdetail}></About>

      {/* ReviewSection */}

      <Review businessdetail ={businessdetail} getbusinessdetail ={getbusinessdetail}></Review>
    </ScrollView>
  )
}