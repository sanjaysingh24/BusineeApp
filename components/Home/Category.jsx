import { View, Text ,FlatList,Image,StyleSheet, TouchableNativeFeedback} from 'react-native'
import React,{useEffect,useState} from 'react'
import { useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors'
import {db} from './../../config/FirebaseConfig'
import {collection,getDocs,query} from 'firebase/firestore'
import Categorylist from './Categorylist'



export default function Category({explore=false,onCategorySelect}) {

const[categorylist,setcategorylist] = useState([])

// make a router  using useRouter
const router = useRouter();

const Getcategory = async()=>{
    setcategorylist([]);
    let q =query(collection(db,'Category'));
    const quersnapshot =await getDocs(q);
    quersnapshot.forEach((doc)=>{
        setcategorylist(prev =>[...prev,doc.data()])
        console.log(doc.data());
    })
}
useEffect(()=>{
    Getcategory()
},[])
const categoryhandler =(category)=>{
  if(!explore){
    router.push('/businesslist/'+category.Name)
  }else{
    onCategorySelect(category.Name)
  }
}
    return (
    <View>
      {!explore&& 
<View style={{padding:20,display:'flex',flexDirection:'row',justifyContent:'space-between', alignItems:'baseline', marginTop:10}}>
<Text style = {{fontSize:20,marginTop:10,fontWeight:'bold'}}>Category



</Text>
<Text style={{color:Colors.PRIMARY,fontSize:20,fontWeight:500}}>View All</Text>
</View>}
<View style={{paddingLeft:20}}>
    
<FlatList
      nestedScrollEnabled
      data={categorylist}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item ,index}) => (
    //       <TouchableNativeFeedback>
    //     <View style={{marginRight:15}}>
    //     <Image style = {styles.image} source={{ uri: item.Imageurl }} />
   
    //   </View>
    //   </TouchableNativeFeedback>
<Categorylist key = {index} onCategoryPress ={(category)=>categoryhandler(category)} category = {item}/>
      )}
       // Add a key extractor if sliderList items don't have unique keys
    />

</View>


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
      width:40,
      height:40,
      borderRadius:15,
      backgroundColor:Colors.ICONBG,
      marginRight:20
      
    }
  })
