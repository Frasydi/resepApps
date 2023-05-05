import { StyleSheet, View, ImageBackground, ScrollView, Text, Image } from "react-native"
import {useState} from "react"
import useFetch from "../../hooks/useFetch"
import { DocumentPickerResponse } from "react-native-document-picker";
export default function CaraList({data} : {data : Array<{langkah: string,file: DocumentPickerResponse}>}) {
    return(
        <View style={{gap : 20, alignItems:"center"}}>
            {
                data.map((item, ind) => (
                    <View key={item.langkah+""+ind} style={{flex : 1, flexDirection:"row"}}>
                        <View style={{alignItems:"center",justifyContent:"center", width:"30%"}}>

                        <Image style={{ width: 100, height: 100 }} source={{ uri: item.file.uri }} />
                        </View>
                        <View style={{justifyContent: "center", alignItems: "center",maxWidth:"60%"}}>
                            <Text style={{ paddingHorizontal: 20, fontSize: 15, fontWeight: "bold", color : "black",flexWrap:"wrap"  }}>{item.langkah}</Text>
                        </View>
                    </View>
                ))
            }
        {/* {
            data.map((el) => {
            <View style={{flex : 1, flexDirection:"row", flexWrap:"wrap"}}>
                <Image style={{ width: 100, height: 100 }} source={{ uri:  }} />
                <Text style={{ paddingHorizontal: 20, fontSize: 15, fontWeight: "bold" }}>{el.jumlah} {el.nama}</Text>
            </View>
            })
        } */}
        </View>
    )
}