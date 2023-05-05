import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import DetailData from "./data";
import {useEffect} from "react"
export default function DetailResep() {
    const navigation = useRoute()
    const navigate = useNavigation()
    useEffect(() => {
        //@ts-ignore
        if(navigation.params?.id == null) navigate.navigate("Home")
    }, [])
    
    return(
        <>
        <ImageBackground source={require("../../assets/754f611e7ab1ad716c9af731daab522d.jpg")} style={styles.container}>
        <ScrollView contentContainerStyle={styles.box}>
        <View style={{paddingTop : "20%"}}/>

        <DetailData id={
            //@ts-ignore
            navigation.params?.id} />

        </ScrollView>

        </ImageBackground>
    </>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        resizeMode : "cover",
        width : "100%",
    },
    box : {
        width : "100%",
    }
})