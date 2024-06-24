import { View, Text,FlatList,Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import {db} from './../../config/FirebaseConfig'
import {collection,getDocs,query,where} from 'firebase/firestore'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import BusinessListCart from '../../components/Business/BusinessListCart'
import { Colors } from '../../constants/Colors'
import { ActivityIndicator } from 'react-native'
export default function BusinessListbycategory() {
    const navigation = useNavigation();
    const {category} = useLocalSearchParams();
    const[businesslist,setbusinesslist] = useState([]);
    const[loading,setloading] = useState(false);

   //business list by category 

  
    useEffect(()=>{
        navigation.setOptions({headerShown:true,headerTitle:category}) 
        getbusinesslist();
    },[])
    const getbusinesslist = async()=>{
      setloading(true);
      setbusinesslist([]);
      const q = query(collection(db,'BusinessList'), where("category",'==',category));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc)=>{
        // store the document alog with the id
        setbusinesslist(prev=>[...prev,{id:doc?.id,...doc.data()}])
        console.log(doc.data());
      })
  setloading(false);
    }
  return (
    <View>
    {businesslist.length>0&&loading==false?
    <FlatList
      onRefresh={getbusinesslist}
      refreshing={loading}
      data={businesslist}
 
      renderItem={({ item }) => (
    
    <BusinessListCart business={item}/>

      )}
     // Add a key extractor if sliderList items don't have unique keys
    />:loading?<ActivityIndicator
    style={{marginTop:'60%'}}
    size={'large'}
    color={Colors.PRIMARY}

c    />:
    
    <Text style={{fontSize:20,fontWeight:'bold' ,color:Colors.GRAY,textAlign:'center', marginTop:'50%'}}>No Business Found</Text>}

 

      
    </View>
  )
}