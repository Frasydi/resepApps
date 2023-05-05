import { Button, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native"
import useFetch from "../../hooks/useFetch"
import { useNavigation } from '@react-navigation/native';

export default function DetailData({ id }: { id: number }) {
    const { data, fetchData, loading } = useFetch("http://168.138.184.186:3050/resep/" + id)
    if (loading || data == null) return <Text>Loading</Text>
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {data?.judul}
            </Text>
            <View style={{alignItems:"center"}}>

            <Image source={{ uri: "http://168.138.184.186:3050/gambar/resep/" + data?.gambar }} style={{ width: 300, height: 300 }} />
            </View>
            <Text style={{ color: "black", paddingTop : 20, textAlign:"left", marginLeft:30  }}>
                {data?.deskripsi}
            </Text>
            <View style={{ paddingTop: "40%" }} />
            <View style={{
                flex: 1, flexDirection: 'row', justifyContent: "center",
                flexWrap: 'wrap', height: 200
            }}>
                <PathButton title={"Bahan"} image={require("../../assets/380029-200.png")} path={"Bahan"} id={id} />
                <PathButton title={"Cara Pembuatan"} image={require("../../assets/380021-200.png")} path={"Cara"} id={id} />
                <Delete id={id} />
            </View>
        </View>
    )
}

function Delete({ id }: { id: number }) {
    const navigation = useNavigation()
    async function deleteData() {
        try {
            Alert.alert("Peringatan", "Apakah anda ingin menghapus ini?", [
                {
                    text: "Ya",
                    onPress: () => {
                        const fet = fetch("http://168.138.184.186:3050/resep/" + id, {
                            method: "DELETE",
                        })
                        //@ts-ignore
                        navigation.navigate("Home")
                    }
                },
                {
                    text : "Tidak",
                    onPress : () => {
                        
                    }
                }
            ])

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <TouchableOpacity style={{ width: "30%", height: "50%" }} onPress={() => {
            deleteData()
        }} >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image style={{ width: 50, height: 50, resizeMode: "contain" }} source={require("../../assets/delete.png")} />
            </View>
            <Text style={styles.iconBtn}>Hapus</Text>
        </TouchableOpacity>
    )
}

function PathButton({ image, title, path, id }: any) {
    const navigate = useNavigation()

    return (
        <TouchableOpacity style={{ width: "30%", height: "50%" }} onPress={() => {
            //@ts-ignore
            navigate.navigate(path, {
                id: id,
            })
        }} >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image style={{ width: 50, height: 50, resizeMode: "contain" }} source={image} />
            </View>
            <Text style={styles.iconBtn}>{title}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        color: "black"

    },
    iconBtn: {
        fontWeight: "bold",
        textAlign: "center",
        color: "black"
    }
})