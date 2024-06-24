import { View, Text,FlatList,Image ,TouchableOpacity, Linking, Share} from 'react-native'
import React from 'react'

export default function Action({businessdetail}) {
const openonpresshandler = (item)=>{
  if (item.name === 'Share') {
    Share.share({
      message: businessdetail?.name + '\nAddress: ' + businessdetail.address + '\nFind more details on Business Directory',
    });
  } else if (item?.website) {
    Linking.openURL(item?.website);
  } else {
    console.warn(`No URL provided for action: ${item.name}`);
  }
}
const actionbuttonmenu = [
    {
        id:1,
        name:'Call',
        icon:require('./../../assets/images/call.png'),
        url:'tel:'+businessdetail?.contact
    },{
        id:2,
        name:'Location',
        icon:require('./../../assets/images/pin.png'),
        url:'https://www.google.com/maps/search/?api=1&query='+businessdetail?.address
    },{
        id:3,
        name:'Web',
        icon:require('./../../assets/images/internet.png'),
        url:businessdetail?.website 
    },{
        id:4,
        name:'Share',
        icon:require('./../../assets/images/sharewith.png')
    }
]

  return (
    <View style = {{backgroundColor:'#fff',padding:20,paddingTop:0}}>

      <FlatList
        data = {actionbuttonmenu}
        numColumns={4}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item,index})=>(
            <TouchableOpacity key ={index} onPress={()=>openonpresshandler(item)}>
              <Image source ={item?.icon} style={{width:50,height:50}}/>
              <Text style={{fontWeight:600,textAlign:'center' ,marginTop:5}}>{item?.name}</Text>
</TouchableOpacity>       
  )}
/>
    </View>
  )
}