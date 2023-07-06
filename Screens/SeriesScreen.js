import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const FilmScreen = ({ navigation, route }) => {

    const { image_base_url, base_URL, API_KEY } = route.params;
    const flatListRef = useRef();

    const [cat, setCat] = useState("popular")
    const [page, setPage] = useState(1)
    const filmListUrl = `${base_URL}/tv/${cat}?api_key=${API_KEY}&append_to_response=videos,images&page=${page}`;
    const [series, setSeries] = useState([])
    useEffect(() => {
        async function fetchUrl() {
            setPage(1)
            const aa = await fetch(filmListUrl)
                .then((response) => response.json())
                .then((data) => {
                    // setSeries([...series, ...data?.results]);
                    setSeries(data?.results);
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

    const onPress = (items) => {
        const item = { ...items, media_type: "tv" };
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
                    <Text style={[styles.white, {fontWeight:"600"}]}>Popular</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressCat("top_rated")} style={[styles.back, styles.margin]}>
                    <Text style={[styles.white, {fontWeight:"600"}]}>Top Rated</Text>
                </TouchableOpacity>
                {/* <Pressable onPress={() => setCat("upcoming")} style={[styles.back, , styles.margin]}>
                    <Text style={[styles.white]}>Upcoming</Text>
                </Pressable> */}
            </ScrollView>
            {/* <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                {series?.map((item) => {
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
                                    <Text style={{ color: "white", fontSize: 20, textAlign: "center", marginTop: 5, fontWeight: "600" }}>{item?.name || item?.original_name}</Text>
                                </>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView> */}
            <FlatList contentContainerStyle={{ alignItems: "stretch" }} style={{ marginHorizontal: 10 }} data={series} keyExtractor={(item, index) => index}
                numColumns={2}
                onEndReachedThreshold={0}
                ref={flatListRef}
                onEndReached={() => {
                    setPage(page + 1)
                    async function fetchUrl() {
                        const aa = await fetch(filmListUrl)
                            .then((response) => response.json())
                            .then((data) => {
                                // setSeries([...series, ...data?.results]);
                                const aa = [...new Map([...series, ...data?.results].map((m) => [m.id, m])).values()]
                                setSeries(aa);
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
                                { height: 220, resizeMode: "stretch", borderRadius: 6, width: 150 },
                            ]}
                            source={{
                                uri: `${image_base_url}${item?.poster_path}`,
                            }}
                        />
                        <Text style={{ color: "white", fontSize: 14, fontWeight: "600", width: 120, textAlign: "center", marginTop: 5 }}>{item?.name || item?.original_name}</Text>
                        {/* <Text style={{ color: "white", fontSize: 14, fontWeight: "600", width: 120, textAlign: "center", marginTop: 5 }}>{item?.first_air_date?.split("-")[0] !== item?.last_air_date?.split("-")[0] ? item?.first_air_date?.split("-")[0] + " - " + item?.last_air_date?.split("-")[0] : item?.first_air_date?.split("-")[0]}</Text> */}
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