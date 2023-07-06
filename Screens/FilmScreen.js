import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import Pagination from 'react-native-pagination';

const FilmScreen = ({ navigation, route }) => {

    const { image_base_url, base_URL, API_KEY } = route.params;
    const flatListRef = useRef();

    const [cat, setCat] = useState("popular")
    const [page, setPage] = useState(1)
    const filmListUrl = `${base_URL}/movie/${cat}?api_key=${API_KEY}&append_to_response=videos,images&page=${page}`;
    const [film, setFilm] = useState([])
    useEffect(() => {
        async function fetchUrl() {
            setPage(1)
            const aa = await fetch(filmListUrl)
                .then((response) => response.json())
                .then((data) => {
                    setFilm(data?.results);
                    // setFilm([...film, ...data?.results]);
                    // console.log(cat)
                    // console.log(data)
                });
            return aa;
        }
        fetchUrl();
    }, [cat])

    const onPressSearch = () => {
        navigation.navigate("Search", { base_URL, API_KEY, image_base_url });
      };

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

    const onPressCat = async (item) => {
        setCat(item)
        setPage(1)
        // console.log(flatListRef)
        await flatListRef?.current?.scrollToIndex({ animated: true, index: 0, viewPosition: 0 })
        // await fetch(filmListUrl)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setFilm(data?.results);
        //     });
    }


    return (
        <View style={{ backgroundColor: "black", height: "100%" }}>
            <ScrollView horizontal style={{ maxHeight: 40, marginBottom: 10 }}>
                <TouchableOpacity onPress={() => onPressCat("popular")} style={[styles.back, styles.margin]}>
                    <Text style={[styles.white, {fontWeight: "600"}]}>Popular</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressCat("top_rated")} style={[styles.back, styles.margin]}>
                    <Text style={[styles.white, {fontWeight: "600"}]}>Top Rated</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressCat("upcoming")} style={[styles.back, , styles.margin]}>
                    <Text style={[styles.white, {fontWeight: "600"}]}>Upcoming</Text>
                </TouchableOpacity>
            </ScrollView>
            {/* <ScrollView contentContainerStyle={{ alignItems: "center" }}>
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
            </ScrollView> */}
            <FlatList contentContainerStyle={{ alignItems: "stretch" }} style={{ marginHorizontal: 10 }} data={film} keyExtractor={(item, index) => index}
                numColumns={2}
                onEndReachedThreshold={0}
                ref={flatListRef}
                onEndReached={() => {
                    setPage(page + 1)
                    async function fetchUrl() {
                        const aa = await fetch(filmListUrl)
                            .then((response) => response.json())
                            .then((data) => {
                                // setFilm(data?.results);
                                const aa = [...new Map([...film, ...data?.results].map((m) => [m.id, m])).values()]
                                setFilm(aa);
                                // console.log(cat)
                                // console.log(data)
                            });
                        return aa;
                    }
                    fetchUrl();
                    // flatListRef?.current?.scrollToIndex({ animated: true, index: 0, viewPosition: 0 })
                }}
                renderItem={({ item }) =>
                    <View key={item?.id} style={{ justifyContent: "flex-start", marginVertical: 10, width: "50%" }}>
                        <TouchableOpacity onPress={() => onPress(item)}>
                            <View style={{ alignItems: "center" }}>
                                <Image
                                    style={[
                                        styles.img,
                                        { height: 220, resizeMode: "stretch", borderRadius: 6, width: 150},
                                    ]}
                                    source={{
                                        uri: `${image_base_url}${item?.poster_path}`,
                                    }}
                                />
                                <Text style={{ color: "white", fontSize: 14, fontWeight: "600", width: 120, textAlign: "center", marginTop: 5 }}>{item?.title || item?.original_title}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>} />
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