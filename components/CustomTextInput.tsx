import { TextInput, TextInputProps } from "react-native";

export default function CustomTextInput(props: TextInputProps) {
    return (
        <TextInput style={{
            width: "60%",
            backgroundColor: "white",
            color: "black",
        }} placeholderTextColor={"black"}  {...props}  />
    )
}