import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, Pressable, Text, TouchableOpacity, View } from 'react-native'

const ViewAllScreen = ({ navigation, route }) => {
    const { image_base_url, base_URL, API_KEY, title, genre } = route.params;
    const [page, setPage] = useState(1)
    const [discoverMovies, setDiscoverMovies] = useState([]);
    const discover = `${base_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}&append_to_response=videos,images&page=${page}`;
    const flatListRef = useRef();

    const onPressSearch = () => {
        navigation.navigate("Search", { base_URL, API_KEY, image_base_url });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: title,
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

    useEffect(() => {
        async function fetchUrl() {
            const aa = await fetch(discover)
                .then((response) => response.json())
                .then((data) => {
                    setDiscoverMovies(data?.results);
                    // setDiscoverMovies([...discoverMovies, ...data?.results]);
                    // console.log(data)
                });
            return aa;
        }
        fetchUrl();
    }, []);

    const onPress = (item) => {
        navigation.push("Movie", { item, base_URL, API_KEY, image_base_url });
    }

    return (
        <View style={{ backgroundColor: "black", height: "100%" }}>

            <FlatList contentContainerStyle={{ alignItems: "stretch" }} style={{ marginHorizontal: 10 }} data={discoverMovies} keyExtractor={(item, index) => index}
                numColumns={2}
                onEndReachedThreshold={0}
                ref={flatListRef}
                onEndReached={() => {
                    setPage(page + 1)
                    async function fetchUrl() {
                        const aa = await fetch(discover)
                            .then((response) => response.json())
                            .then((data) => {
                                const aa = [...new Map([...discoverMovies, ...data?.results].map((m) => [m.id, m])).values()]
                                setDiscoverMovies(aa);
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
                                        { height: 220, resizeMode: "stretch", borderRadius: 6, width: 150 },
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

export default ViewAllScreen