import React from 'react'
import { Pressable, ScrollView, Text, TouchableHighlight, View } from 'react-native'

const ServerScreen = ({ navigation, route }) => {
    const { item, details, episode_number, seasonsNo } = route.params;
    const selectServer = (no) => {
        navigation.push("Video", { item, details, no, episode_number, seasonsNo })
    }
    return (
        <ScrollView contentContainerStyle={{alignItems: "center"}} style={{backgroundColor: "black", height: "100%" }}>
            <Text style={{ fontSize: 26, padding: 12, color: "white" }}>Choose Server</Text>
            <Text style={{ fontSize: 16, padding: 5, color: "gray" }}>If one server doesn't work, choose another.</Text>
            <TouchableHighlight activeOpacity={0.5} style={{ backgroundColor: "rgb(100, 100, 100)", borderColor: "white", borderRadius: 5, padding: 10, paddingHorizontal: 20, marginVertical: 20 }} onPress={() => selectServer(2)}>
                <View style={{minWidth : 150}}>
                    <Text style={{ color: "white" }}>VidCLoud</Text>
                    <Text style={{ fontSize: 12, color: "lightgray", paddingTop: 5 }}>Recommended, lesser ads.</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={.5} style={{ backgroundColor: "rgb(100, 100, 100)", borderColor: "white", borderRadius: 5, padding: 10, paddingHorizontal: 20 }} onPress={() => selectServer(1)}>
                <View style={{minWidth : 150}}>
                    <Text style={{ color: "white" }}>VidSrc</Text>
                    <Text style={{ fontSize: 12, color: "lightgray", paddingTop: 5 }}>Suitable for slower internet.</Text>
                </View>
            </TouchableHighlight>
        </ScrollView>
    )
}

export default ServerScreen