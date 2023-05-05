import { useNavigation, useRoute } from "@react-navigation/native"
import { StyleSheet, View, ImageBackground, ScrollView, Button, Alert } from "react-native"
import useFetch from "../../hooks/useFetch"
import BahanList from "../../views/form/BahanList"
import BahanForm from "../../views/form/BahanForm"
import { useState } from "react"
import { DocumentPickerResponse } from "react-native-document-picker"
import { Loading } from "./AddCara"
export default function AddBahan() {
    const route = useRoute()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    //@ts-ignore
    const [data, setData] = useState<{
        nama: string,
        jumlah: string,
        file: DocumentPickerResponse
    }[]>([])

    function TambahList(newItem: any) {
        setData(prev => {
            return [...prev, newItem]
        })
    }

    async function submitBahan() {
        try {
            if (data.length == 0) return Alert.alert("Ada masalah", "Data masih kosong")
            setLoading(true)

            const forms = new FormData()
            data.forEach(el => {
                forms.append("gambar", el.file)
            })
            forms.append("nama", data.map(el => el.nama).join("<split>"))
            forms.append("jumlah", data.map(el => el.jumlah).join("<split>"))
            //@ts-ignore
            const fet = await fetch("http://168.138.184.186:3050/bahan/" + route.params?.id, {
                method: "POST",
                body: forms,
            })
            const hasil = await fet.json()
            if (!fet.ok) {
                return Alert.alert("Ada masalah", hasil.message)
            }
            Alert.alert("Success", hasil.message)
            setLoading(false)
            //@ts-ignore
            navigation.navigate("AddCara", {
                //@ts-ignore
                id: route.params?.id
            })
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    return (
        <ImageBackground source={require("../../assets/754f611e7ab1ad716c9af731daab522d.jpg")} style={styles.container}>
            <ScrollView contentContainerStyle={{minHeight:"100%"}}>
                <View style={{ paddingTop: "50%" }} />
                <BahanList data={data} />
                <View style={{ paddingTop: 50 }} />
                <BahanForm TambahList={TambahList} />
                <View style={{ paddingTop: 90 }} />
                <View style={{ width: "100%", position: "absolute", bottom: 0 }}>
                    <Button onPress={() => {
                        submitBahan()
                    }} title="Submit Semua Bahan" />
                </View>
                {
                    loading && <Loading />
                }
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'flex',
    }
})