import { useEffect, useState } from 'react';
import { FlatList, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import ResepData from '../../views/home/resepData';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
export default function Home() {

  useEffect(() => {

  }, [])
  return (
    <ImageBackground source={require("../../assets/2d53d984dd646611cfc7a08cf5948544.jpg")} style={styles.container}>
        <ScrollView contentContainerStyle={{justifyContent:"center"}}>

        <Text style={styles.title} >Resepku</Text>
        <ResepData />
        </ScrollView>
        
      <StatusBar  />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    resizeMode : "cover",

  },
  title : {
    paddingTop : "70%",
    fontSize : 40,
    fontWeight: "bold",
    color : "black",
    textAlign : "center"

  },
  scroll : {
    flex : 1,
    alignItems : "center"
    
  }
});
