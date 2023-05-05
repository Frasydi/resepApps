import { StyleSheet, View, ImageBackground, ScrollView, Text, Image, TextInput, TouchableOpacity } from "react-native"
import CustomTextInput from "../../components/CustomTextInput"
import { useState, useEffect, useMemo } from "react"
import DocumentPicker, { DocumentPickerResponse } from "react-native-document-picker"
export default function CaraForm({ TambahList }: {
    TambahList: ({langkah,file} : {langkah: string,file: DocumentPickerResponse}) => void
}) {
    const [langkah, setLangkah] = useState("")
    const [file, setFile] = useState<DocumentPickerResponse | null>(null)
    const error = useMemo(() => {

        if (langkah.trim().length == 0) {
            return "Langkah"
        }
        if (file == null) {
            return "File"
        }
        return ""
    }, [langkah, file])

    async function uploadFIle() {
        try {
            const res = await DocumentPicker.pick({

                type: [DocumentPicker.types.images],

            });

            console.log('res : ' + JSON.stringify(res));

            setFile(res[0]);
        } catch (err) {
            setFile(null);

            if (DocumentPicker.isCancel(err)) {


            } else {

                throw err;
            }
        }
    }

    async function SubmitData() {
        if (error.trim().length != 0) {
            return
        }
        if (file == null) {
            return
        }
        TambahList({langkah, file})
        
        setLangkah("")
        setFile(null)
    }
    return (
        <View style={{ gap: 20, alignItems: "center", flexDirection: "column" }}>
            <CustomTextInput multiline={true} placeholder="Langkah" value={langkah} onChange={(ev) => {
                setLangkah(ev.nativeEvent.text);
            }} />
            {error == "Langkah" && <Text style={styles.alert}>Langkah tidak boleh kosong</Text>}
            
            <TouchableOpacity onPress={() => {
                uploadFIle()
            }} style={{ width: "50%", height: 20, backgroundColor: "white", borderRadius: 50, justifyContent: "center" }}>
                <Text style={{ color: "black", textAlign: "center", fontWeight: "900" }} >Upload File</Text>
            </TouchableOpacity>
            {
                error == "File" && <Text style={styles.alert}>File Kosong</Text>
            }
            {
                file != null && <Image style={{width:300, height : 300, resizeMode:"contain"}} source={{uri :file.uri}} />
            }
            <TouchableOpacity style={{ width: "60%", height: 50, backgroundColor: "white", borderRadius: 50, justifyContent: "center" }} onPress={() => {
                SubmitData()
            }} >
                <Text style={{ color: "black", textAlign: "center", fontWeight: "900" }} >Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    alert: {
        fontWeight: "bold",
        fontSize: 12,
        color: "red"
    }
})