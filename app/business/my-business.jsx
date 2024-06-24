import { View, Text,FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import BusinessListCart from '../../components/Business/BusinessListCart';
import { useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function mybusiness() {
const[mybusiness,setmybusiness] = useState();
const[loading,setloading] = useState(false);
    const {user} = useUser();

 const navigation = useNavigation();
    useEffect(()=>{
      navigation.setOptions({
        headerShown:true,
        headerTitle:'My Business',
        headerStyle:{
          backgroundColor:Colors.PRIMARY
        }
      })
        user&&getuserbusiness()
    },[user])

//used to get business list by user email

    const getuserbusiness =async()=>{
      setloading(true);
        setmybusiness([]);
        const q = query(collection(db,'BusinessList'),where("userEmail",'==',user?.primaryEmailAddress?.emailAddress));
        const querysnapshots = await getDocs(q);
        querysnapshots.forEach((doc)=>{
            console.log(doc.data());
            setmybusiness(prev=>[...prev,{id:doc.id,...doc.data()}])
        })
        setloading(false);
    }

  return (
    <View style ={{padding:20,marginTop:10}}>
      <Text style={{fontWeight:'bold',fontSize:30}}>My business</Text>

      <FlatList onRefresh={getuserbusiness()} refreshing ={loading} data = {mybusiness} renderItem={({item,index})=>(
        <BusinessListCart key = {index} business={item}></BusinessListCart>
      )}>


      </FlatList>
    </View>
  )
}