import { View, Text } from 'react-native'
import React from 'react'
import LoginScreen from './../../components/LoginScreen'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularBusinessList from '../../components/Home/PopularBusinessList'
import { ScrollView } from 'react-native'

export default function home() {
  return (
    <ScrollView>
      {/* Header */}
    <Header></Header>

      {/* {Slider} */}
       <Slider></Slider>
      {/* Category */}

      <Category></Category>
      {/* Popularbusinesslist */}


     <PopularBusinessList>

     </PopularBusinessList>

    </ScrollView>
  )
}