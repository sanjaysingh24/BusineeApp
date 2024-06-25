import { View, Text ,FlatList, ScrollView} from 'react-native'
import React from 'react'
import BusinessListCart from './BusinessListCart'

export default function Explorebusinesslist({businesslist}) {
  return (
    <View>
      <FlatList data = {businesslist}
      nestedScrollEnabled
      scrollEnabled
      showsVerticalScrollIndicator={false}
      renderItem={({item,index})=>(
       <BusinessListCart key={index} business ={item}/>
      )}>
        

      </FlatList>

      <View style ={{height:400}}>

      </View>
    </View>
  )
}