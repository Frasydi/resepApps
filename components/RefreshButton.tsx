import { Image, TouchableOpacity } from "react-native";

export default function RefeshButton({refetch}: {refetch : any}) {
    
    return(
        <TouchableOpacity style={{width:50, height:50}} activeOpacity={0.5} onPress={() => {refetch()}}>
            <Image style={{width:50, height:50, resizeMode:"contain"}} source={require("../assets/pngwing.com.png")} />
        </TouchableOpacity>
    )
}