import { FlatList, Image, Text, View } from 'react-native'
import useFetch from '../../hooks/useFetch'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import CheckBox from 'react-native-check-box'
import { TouchableOpacity } from "react-native"

import Tts from 'react-native-tts';

export default function CaraData() {
    const route = useRoute()
    const navigate = useNavigation()
    useEffect(() => {

        return () => {
            Tts.stop()
        }
    }, [])
    //@ts-ignore
    const { data, loading, fetchData } = useFetch("http://168.138.184.186:3050/cara/" + route.params?.id)
    if (loading) return <Text>Loading</Text>
    return (
        <>
            <FlatList
                data={data.cara}
                renderItem={({ item, index }) => <View style={{
                    flex: 1,
                    flexDirection: "row",
                    marginBottom: 30
                }}>
                    <BahanCheckbox />
                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", width: "30%" }} onPress={() => {
                        //@ts-ignore
                        navigate.navigate("Gambar", {
                            gambar: { uri: "http://168.138.184.186:3050/gambar/cara/" + item.gambar },
                            nama: `Langkah dari ${data.judul} ke ${index + 1}`
                        })
                    }}>
                        <Image style={{ width: 100, height: 100 }} source={{ uri: "http://168.138.184.186:3050/gambar/cara/" + item.gambar }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", minWidth: "60%" }} onPress={() => {
                        //@ts-ignore
                        Tts.getInitStatus().then(() => {
                            Tts.setDefaultLanguage("id-ID")
                            Tts.stop()
                            //@ts-ignore
                            Tts.speak(item.langkah, {
                                androidParams: {
                                    KEY_PARAM_PAN: 0,
                                    KEY_PARAM_VOLUME: 1,
                                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                                },
                            });
                        });
                    }}>
                        <Text style={{ flex: 1, fontSize: 15, fontWeight: "bold", color: "black", flexWrap: "wrap" }}>{item.langkah}</Text>
                    </TouchableOpacity>
                </View>}
            />
        </>
    )
}

function BahanCheckbox() {
    const [select, setSelected] = useState(false)

    return (
        <View style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 10, width: "10%" }}>
            <CheckBox isChecked={select} onClick={() => setSelected(prev => !prev)} />
        </View>
    )
}