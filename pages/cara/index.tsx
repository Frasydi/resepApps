import {ImageBackground, ScrollView, StyleSheet, Text, View} from "react-native"
import CaraData from "./data"
export default function Cara() {
    return(
        <ImageBackground source={require("../../assets/754f611e7ab1ad716c9af731daab522d.jpg")} style={styles.container}>
            <View style={{paddingTop : "20%"}}/>
            <Text style={styles.title}>Cara penyajian</Text>
            <View style={{paddingTop : "10%"}}/>
            <CaraData/>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        resizeMode : "cover",
        alignItems : "center",
    },
    title : {
        fontSize : 30,
        fontWeight : "bold",
        color : "black",
    }
})