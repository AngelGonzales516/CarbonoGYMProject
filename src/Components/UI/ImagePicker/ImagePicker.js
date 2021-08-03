import React, { useState, useEffect} from 'react';
import { StyleSheet, Image, View, Platform, TouchableOpacity,Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const {width, height} = Dimensions.get("screen");



const ImagePickerExample = () => {
    let urii = 'https://reactnative.dev/img/tiny_logo.png'

    const [image, setImage] = useState(urii);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        console.log(result.uri)
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={pickImage}>
                <View style={style.Conteiner}>
                    {image && <Image source={{ uri: image }} style={style.Imagen} />}
                </View>
                <View style={style.Conteiner2}>
                    <AntDesign name="pluscircleo" size={60} style={style.Icon} />
                </View>
            </TouchableOpacity>
        </View>
    );
}


export default ImagePickerExample;


const style = StyleSheet.create({
    Conteiner: {
        resizeMode: "contain",
        borderRadius: 30,
        borderColor: "#2f3640",
        borderWidth: 5,
        width: width * 0.325,
        height: height * 0.143,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Imagen: {
        borderRadius: 30,
        width: width * 0.305,
        height: height * 0.141
    },

    Conteiner2: {
        position: 'absolute',
        marginLeft: 37,
        marginTop: 18

    },
    Icon: {
        color: "black",
        opacity: 0.4
    }

})
