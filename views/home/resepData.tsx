import { Text, FlatList, View, Image, TouchableOpacity } from "react-native"
import useFetch from "../../hooks/useFetch"
import RefeshButton from "../../components/RefreshButton"
import { useNavigation, useRoute } from '@react-navigation/native';
import {useEffect} from "react"

export default function ResepData() {
    const navigation = useNavigation()
    const route = useRoute()
    const { data, loading, fetchData } = useFetch("http://168.138.184.186:3050/resep")
    useEffect(()=> {
        fetchData()
    }, [route])
    return (
        <>
            <Data data={data} loading={loading} />
            <View style={{ flex: 1, flexWrap: "wrap", gap: 10, flexDirection: "row", justifyContent:"center" }}>
                <RefeshButton refetch={fetchData} />
                <TouchableOpacity onPress={() => {
                    //@ts-ignore
                    navigation.navigate("AddResep")
                }}>
                    <Image style={{ width: 50, height: 50, resizeMode: "contain" }} source={require("../../assets/add.png")} />
                </TouchableOpacity>
            </View>
        </>

    )
}

function Data({ data, loading }: any) {
    if (loading) return <Text>Loading...</Text>
    const navigation = useNavigation()

    
    return(
        <>
        
        <View style={{flex : 2, justifyContent:"center", flexDirection :"row", flexWrap :"wrap" }} >
        {
            data.map((el: any) => 
                <TouchableOpacity key={el.id+"resep"} onPress={() => {
                    //@ts-ignore
                    navigation.navigate("Detail", { id: el.id })
                }} style={{width:"40%"}} >
                    <View style={{ marginHorizontal: 4, marginBottom: 10 }}>
                        <View style={{alignItems:"center"}}>
                        <Image style={{ width: 100, height: 100 }} source={{ uri: "http://168.138.184.186:3050/gambar/resep/" + el.gambar }} />
                        </View>
                        <Text style={{ fontWeight: "bold", textAlign: "center", color: "black" }}>
                            {el.judul}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        
        }
        </View>
        </>

    ) 
    

}