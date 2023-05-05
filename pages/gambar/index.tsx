import {StyleSheet, View, ImageBackground} from "react-native"
import { useRoute, useNavigation } from '@react-navigation/native'
import {useEffect} from "react"
export default function ShowGambar() {
    const navigate = useNavigation()
    const route = useRoute()
    useEffect(() => {
        navigate.setOptions({
            //@ts-ignore
            title : route.params?.nama
        })
    },[])
    return (
        <View style={styles.container}>
            <ImageBackground resizeMode="contain" style={{width:"100%", height:"100%"}} source={
                //@ts-ignore
                route.params?.gambar} >

                </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent  : 'center',
        alignItems : 'center',
    }
})