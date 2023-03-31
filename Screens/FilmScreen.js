import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const FilmScreen = ({ navigation, route }) => {

    const { image_base_url, base_URL, API_KEY } = route.params;
    const [cat, setCat] = useState("popular")
    const filmListUrl = `${base_URL}/movie/${cat}?api_key=${API_KEY}&append_to_response=videos,images`;
    const [film, setFilm] = useState([])
    useEffect(() => {
        async function fetchUrl() {
            const aa = await fetch(filmListUrl)
                .then((response) => response.json())
                .then((data) => {
                    setFilm(data?.results);
                    // console.log(data)
                });
            return aa;
        }
        fetchUrl();
    }, [cat])

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable
                onPress={() => onPressSearch()}
                style={{ marginRight: 8, marginLeft: 25 }}
                activeOpacity={0.5}
              >
                <Image
                  style={{ width: 15, height: 15, tintColor: "white" }}
                  source={require("../assets/search.png")}
                />
              </Pressable>
            </View>
          ),
        });
      }, []);

    const onPress = (item) => {
        navigation.push("Movie", { item, base_URL, API_KEY, image_base_url });
    }


    return (
        <View style={{ backgroundColor: "black", height: "100%" }}>
            <ScrollView horizontal style={{ maxHeight: 40, marginBottom: 10 }}>
                <Pressable onPress={() => setCat("popular")} style={[styles.back, styles.margin]}>
                    <Text style={[styles.white]}>Popular</Text>
                </Pressable>
                <Pressable onPress={() => setCat("top_rated")} style={[styles.back, styles.margin]}>
                    <Text style={[styles.white]}>Top Rated</Text>
                </Pressable>
                <Pressable onPress={() => setCat("upcoming")} style={[styles.back, , styles.margin]}>
                    <Text style={[styles.white]}>Upcoming</Text>
                </Pressable>
            </ScrollView>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                {film?.map((item) => {
                    return (
                        <View key={item?.id} style={{ width: Dimensions.get("window").width - 110, justifyContent: "center", marginVertical: 10 }}>
                            <TouchableOpacity onPress={() => onPress(item)}>
                                <>
                                    <Image
                                        style={[
                                            styles.img,
                                            { height: 350, resizeMode: "stretch", borderRadius: 10 },
                                        ]}
                                        source={{
                                            uri: `${image_base_url}${item?.poster_path}`,
                                        }}
                                    />
                                    <Text style={{ color: "white", fontSize: 20, textAlign: "center", marginTop: 5, fontWeight: "600" }}>{item?.original_title || item?.title}</Text>
                                </>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView> 
        </View>
    )
}

export default FilmScreen;

const styles = StyleSheet.create({
    white: {
        color: "white"
    },
    margin: {
        // margin: 5,
        marginHorizontal: 10,
    },
    back: {
        backgroundColor: "rgb(12, 20, 56)",
        padding: 5,
        borderRadius: 6,
        paddingHorizontal: 15,
        justifyContent: "center"
    },
})