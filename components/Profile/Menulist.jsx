import { View, Text,FlatList,Image, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import {Colors} from '../../constants/Colors'
import { useRouter } from 'expo-router'
import {useAuth } from '@clerk/clerk-expo';

export default function  Menulist() {
const{signOut}  = useAuth();

  const router  = useRouter();
  const onMenuClick  = (item)=>{
    if(item.path==='logout'){
      signOut();
      return ;
    }
    if(item.path==='share'){
      Share.share({
        message:'Find more details on Business Directory download the business directory'
      });
      return;
    }
    router.push(item.path)
  }
    const menuList = [
        {
            id:1,
            name:'Add business',
            icon:require('./../../assets/images/Add.png'),
            path:'/business/add-business'
        }, 
        {
            id:2,
            name:'My business',
            icon:require('./../../assets/images/building.png'),
            path:'/business/my-business'
        },
        {
            id:3,
            name:'Share App',
            icon:require('./../../assets/images/share.png'),
            path:'share'
        },
        {
            id:4,
            name:'Logout',
            icon:require('./../../assets/images/logout.png'),
            path:'logout'
            
        }
    ]
  return (
    <View style ={{marginTop:50}}>
     <FlatList data ={menuList}
     numColumns={2}
     renderItem={({item,index})=>(
        <TouchableOpacity onPress={()=>onMenuClick(item)} key={index} style = {{display:'flex', flexDirection:'row',alignItems:'center' ,gap:10,flex:1,padding:10,borderRadius:15,borderWidth:1,margin:10,backgroundColor:"#fff", width:'20%',borderColor:Colors.PRIMARY}}>
            <Image source ={item.icon} style ={{width:38,height:38}}></Image>
            <Text style={{fontSize:16,fontWeight:'bold'  }}>{item.name}</Text>
         

        </TouchableOpacity>
     )}
     >

     </FlatList>
     <Text style ={{textAlign:'center',marginTop:50,color:Colors.GRAY}}>Develop by sanju @ 2024</Text>
    </View>
  )
}