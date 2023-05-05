import { useNavigation, useRoute } from "@react-navigation/native"
import { StyleSheet, View, ImageBackground, ScrollView, Button, Alert, Text } from "react-native"
import useFetch from "../../hooks/useFetch"
import BahanList from "../../views/form/BahanList"
import BahanForm from "../../views/form/BahanForm"
import {useState} from "react"
import { DocumentPickerResponse } from "react-native-document-picker"
import CaraList from "../../views/form/CaraList"
import CaraForm from "../../views/form/CaraForm"
export default function AddCara() {
    const route = useRoute()
    const navigation = useNavigation()
    //@ts-ignore
    const [data, setData] = useState<{
        
        langkah : string,
        file : DocumentPickerResponse
    }[]>([])
    
    function TambahList(newItem : any) {
        setData(prev => {
            return [...prev, newItem] 
        })
    }

    async function submitBahan() {
        try {
            
            if(data.length == 0) return Alert.alert("Ada masalah", "Data masih kosong")
            const forms = new FormData()
            data.forEach(el => {
                forms.append("gambar", el.file)
            })
            forms.append("langkah", data.map(el => el.langkah).join("<split>"))
            //@ts-ignore
            const fet = await fetch("http://168.138.184.186:3050/cara/"+route.params?.id, {
                method : "POST",
                body : forms,
            })
            const hasil = await fet.json()
            if(!fet.ok) {
                return Alert.alert("Ada masalah", hasil.message)
            }
            Alert.alert("Success", hasil.message)
            //@ts-ignore
            navigation.navigate("Home")
        }catch(err) {
            console.log(err)
        }
    }

    return(
        <ImageBackground source={require("../../assets/754f611e7ab1ad716c9af731daab522d.jpg")} style={styles.container}>
            <ScrollView contentContainerStyle={{minHeight:"100%"}}>
                <View style={{paddingTop:"50%"}} />
                <CaraList data={data} />
                <View style={{paddingTop : 50}} />
                <CaraForm TambahList={TambahList} />
                <View style={{ paddingTop: 90 }} />
                <View style={{position : "absolute", bottom : 0, width:"100%"}}>
                <Button onPress={() => {
                    submitBahan()
                }} title="Submit Semua Langkah" />
                
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export function Loading() {
    return(
        <View style={{position:"absolute", bottom : 0, width:"100%", height:"100%", backgroundColor:"white", justifyContent:"center", alignItems:"center", flex : 1}}>
            <Text style={{color : "black", fontSize:30, fontWeight:"bold"}} >Loading</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        resizeMode : 'flex',
    }
})

