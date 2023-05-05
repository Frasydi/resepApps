import { Text, FlatList, View, Image, TouchableOpacity } from "react-native"
import useFetch from "../../hooks/useFetch"
import RefeshButton from "../../components/RefreshButton"
import { useNavigation } from '@react-navigation/native';


export default function ResepData() {
    const navigation = useNavigation()
    const { data, loading, fetchData } = useFetch("http://168.138.184.186:3050/resep")
    if (loading) return <Text>Loading...</Text>
    return (
        <>
        <FlatList
            data={data}
            numColumns={2}
            renderItem={({ item }) => 
            <TouchableOpacity onPress={() => {
                //@ts-ignore
                navigation.navigate("Detail", {id : item.id})
            }}>
            <View style={{marginHorizontal:4, marginBottom :10}}>
                <Image style={{ width: 150, height: 150 }} source={{ uri: "http://168.138.184.186:3050/gambar/resep/" + item.gambar }} />
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                    {item.judul}
                </Text>
            </View>
            </TouchableOpacity>
            }
            columnWrapperStyle={{
                justifyContent: "space-between"
              }}      
        />
        <RefeshButton refetch={fetchData} />
        </>

    )
}