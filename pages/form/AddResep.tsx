import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import { useMemo, useState } from "react";
import DocumentPicker, {DocumentPickerResponse} from 'react-native-document-picker';
import { useNavigation } from "@react-navigation/native";
import { Loading } from "./AddCara";

export default function AddResep() {
    const [nama, setName] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [file, setFile] = useState<DocumentPickerResponse | null>(null)
    const navigate = useNavigation()
    const [loading, setLoading] = useState(false)

    const error = useMemo(() => {
        
        if(nama.trim().length == 0) {
           return "Nama"
        }
        if(deskripsi.trim().length == 0) {
            return "Deskripsi"
        } 

        if(file == null) {
            return "File"
        }
        return ""
    }, [nama, deskripsi, file])
    
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
        // Check if any file is selected or not
    if (file != null) {
        // If file selected then create FormData
        const fileToUpload = file;
        const data = new FormData();
        
        data.append('image', fileToUpload);
        data.append('judul', nama);
        data.append('deskripsi', deskripsi);
        setLoading(true)
        // Please change file upload URL
        try {
        let res = await fetch(
            "http://168.138.184.186:3050/resep",
          {
            method: 'post',
            body: data
          }
        );
            const result = await res.json()
            if(!res.ok) {

                Alert.alert("Error", result.message)
                return 
            }
            Alert.alert("Success", result.message)
            setLoading(false)
            //@ts-ignore
            navigate.navigate("AddBahan", {
                id : result.data,
            })
        } catch(err) {
            Alert.alert("Error", "Internal Error")
            setLoading(false)
        } finally {
            
        }
      } else {
        // If no file selected the show alert
        
      }
    }
    return(
        <ImageBackground source={require("../../assets/754f611e7ab1ad716c9af731daab522d.jpg")} style={styles.container}>
            <ScrollView>

            <View style={{paddingTop : "20%"}} />
            <Text style={styles.title}>Membuat Resep</Text>
            <View style={styles.box}>
                <CustomTextInput autoFocus={true} placeholder="Nama Resep" onChange={({nativeEvent}) => {
                    setName(nativeEvent.text)
                }} />
                {
                    error == "Nama" && <Text style={styles.alert}>Nama tidak boleh kosong</Text>
                }
                <CustomTextInput onChange={({nativeEvent}) => {
                    setDeskripsi(nativeEvent.text)
                }} multiline={true} placeholder="Deskripsi" />
                {
                    error == "Deskripsi" && <Text style={styles.alert}>Deskripsi tidak boleh kosong</Text>
                }
                <TouchableOpacity onPress={() => {
                    uploadFIle()
                }} style={{width : "50%",height : 20, backgroundColor:"white", borderRadius :50, justifyContent:"center"}}>
                    <Text style={{color : "black", textAlign:"center", fontWeight :"900"}} >Upload File</Text>
                </TouchableOpacity>
                {
                    error == "File" && <Text style={styles.alert}>File Kosong</Text>
                }
                {
                    file != null && <Image style={{width:300, height : 300, resizeMode:"contain"}} source={{uri :file.uri}} />
                }
                <TouchableOpacity style={{width : "60%",height : 50, backgroundColor:"white", borderRadius :50, justifyContent:"center"}} onPress={() => {
                    SubmitData()
                }} > 
                    <Text style={{color : "black", textAlign:"center", fontWeight :"900"}} >Submit</Text>
                </TouchableOpacity>
            </View>
            {
                    loading && <Loading/>
                }
            </ScrollView>

        </ImageBackground>  
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        resizeMode : "cover",
    },
    title : {
        fontSize:30,
        fontWeight:"bold",
        color : "black",
        textAlign:"center"
    },
    box : {
        alignItems : "center",
        flexDirection : "column",
        gap : 30
    },
    alert : {
        fontWeight : "bold",
        fontSize : 12,
        color : "red"
    }
    
})