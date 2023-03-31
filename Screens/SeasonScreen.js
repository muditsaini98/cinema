import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native'
import { Text } from 'react-native'

const SeasonScreen = ({ navigation, route }) => {
    const { item, details, base_URL, API_KEY } = route.params;
    // console.log("item", item)
    // console.log("details", details)

    const [seasons, setSeasons] = useState([])
    const [seasonsNo, setSeasonsNo] = useState(1)
    const seasonsDetail = `${base_URL}/tv/${item?.id}/season/${seasonsNo}?api_key=${API_KEY}&language=en-US&page=1`;
    useEffect(() => {
        async function fetchUrl() {
            await fetch(seasonsDetail)
                .then((response) => response.json())
                .then((data) => {
                    setSeasons(data);
                    //   console.log(data);
                })
                .catch((err) => console.log(err));
        }
        fetchUrl()
    }, [seasonsNo])

    const seasonChange = (season_number) => {
        setSeasonsNo(season_number)
    }

    const episodeClick = (episode_number) => {
        // setSeasonsNo(episode_number)
        navigation.push("Server", { item, episode_number, seasonsNo })
    }

    return (
        <View style={{ backgroundColor: 'black', height: "100%" }}>
            <View style={{ marginBottom: 20}}>
                <Text style={[styles.light, { fontSize: 24, marginBottom: 20 }]}>Seasons</Text>
                <ScrollView
                // style={{flex: 1}}
                    horizontal
                    contentContainerStyle={styles.contentContainer}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    {details?.seasons?.map((item) => {
                        return (
                            <View key={item.id}>
                                {item?.season_number !== 0 && <TouchableHighlight onPress={() => seasonChange(item?.season_number)} style={[styles.view, styles.light, { marginHorizontal: 5, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "rgb(100, 100, 100)", borderRadius: 8 }]} key={item.id}>
                                    <Text style={styles.light}>
                                        {item?.season_number}
                                    </Text>
                                </TouchableHighlight>}
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <View>
                <Text style={[styles.light, { fontSize: 24, marginBottom: 20 }]}>Episodes</Text>
                <ScrollView style={{ height: "100%" }}
                    // horizontal
                    contentContainerStyle={{ alignItems: "center" }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    {seasons?.episodes?.map((item) => {
                        return (
                            <TouchableHighlight onPress={() => episodeClick(item?.episode_number)} style={[styles.view, styles.light, { marginVertical: 6, width: "100%", paddingVertical: 5, backgroundColor: "rgb(100, 100, 100)", maxWidth: Dimensions.get("window").width - 60, borderRadius: 8 }]} key={item.id}>
                                <>
                                    <Text style={[styles.light, { textAlign: "center", paddingBottom: 10, fontSize: 18, fontWeight: "700" }]}>
                                        {item?.episode_number}
                                    </Text>
                                    <Text style={[styles.light, { textAlign: "center", fontSize: 15 }]}>{item?.name}</Text>
                                </>
                            </TouchableHighlight>
                        )
                    })}
                    <View style={{ height: 150 }}></View>
                </ScrollView>
            </View>
        </View>
    )
}

export default SeasonScreen;

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1,
        flexGrow: 1
    },
    light: {
        color: "white"
    }
})