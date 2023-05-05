import { StyleSheet, View, ImageBackground, ScrollView, Text, Image, TextInput, TouchableOpacity } from "react-native"
import CustomTextInput from "../../components/CustomTextInput"
import { useState, useEffect, useMemo } from "react"
import DocumentPicker, { DocumentPickerResponse } from "react-native-document-picker"
export default function BahanForm({ TambahList }: {
    TambahList: ({nama,jumlah,file} : {nama: string,jumlah: string,file: DocumentPickerResponse}) => void
}) {
    const [nama, setNama] = useState("")
    const [jumlah, setJumlah] = useState("")
    const [file, setFile] = useState<DocumentPickerResponse | null>(null)
    const error = useMemo(() => {

        if (nama.trim().length == 0) {
            return "Nama"
        }
        if (jumlah.trim().length == 0) {
            return "Jumlah"
        }

        if (file == null) {
            return "File"
        }
        return ""
    }, [nama, jumlah, file])

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
        TambahList({nama, jumlah, file})
        setNama("")
        setJumlah("")
        setFile(null)
    }
    return (
        <View style={{ gap: 20, alignItems: "center", flexDirection: "column" }}>
            <CustomTextInput placeholder="Nama" value={nama} onChange={(ev) => {
                setNama(ev.nativeEvent.text);
            }} />
            {error == "Nama" && <Text style={styles.alert}>Nama tidak boleh kosong</Text>}
            <CustomTextInput placeholder="Jumlah" value={jumlah} onChange={(ev) => {
                setJumlah(ev.nativeEvent.text);
            }} />
            {error == "Jumlah" && <Text style={styles.alert}>Bahan tidak boleh kosong</Text>}
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