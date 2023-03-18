import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Text } from 'react-native'

const SeasonScreen = ({ navigation, route }) => {
    const { item, details, base_URL, API_KEY } = route.params;
    // console.log("item", item)
    console.log("details", details)

    const seasonsDetail = `${base_URL}/tv/${item?.id}/season/1?api_key=${API_KEY}&language=en-US&page=1`;
    const [seasons, setSeasons] = useState([])
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
    }, [])

    return (
        <View style={{ backgroundColor: 'black', height: "100%" }}>
            <View style={{ marginBottom: 20 }}>
                <Text style={[styles.light, { fontSize: 24, marginBottom: 20 }]}>Seasons</Text>
                <ScrollView style={{}}
                    horizontal
                    contentContainerStyle={styles.contentContainer}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    {details?.seasons?.map((item) => {
                        return (
                            <>
                                {item?.season_number !== 0 && <Pressable style={[styles.view, styles.light, { marginHorizontal: 5, borderWidth: 2, borderColor: "white", paddingVertical: 3, paddingHorizontal: 6, backgroundColor: "gray" }]} key={item.id}>
                                    <Text style={styles.light}>
                                        {item?.season_number}
                                    </Text>
                                </Pressable>}
                            </>
                        )
                    })}
                </ScrollView>
            </View>
            <View>
                <Text style={[styles.light, { fontSize: 24, marginBottom: 20 }]}>Episodes</Text>
                <ScrollView style={{height: "100%"}}
                    // horizontal
                    contentContainerStyle={{alignItems: "center"}}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    {seasons?.episodes?.map((item) => {
                        return (
                                <Pressable style={[styles.view, styles.light, {marginVertical: 6, width: "100%", borderWidth: 2, borderColor: "white", paddingVertical: 5, backgroundColor: "gray", maxWidth: Dimensions.get("window").width - 30 }]} key={item.id}>
                                    <Text style={[styles.light, {textAlign: "center", paddingBottom: 10, fontSize: 18, fontWeight: "700"}]}>
                                        {item?.episode_number}
                                    </Text>
                                    <Text style={[styles.light, {textAlign: "center", fontSize: 15}]}>{item?.name}</Text>
                                </Pressable>
                        )
                    })}
                    <View style={{height: 150}}></View>
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
        flex: 1,
    },
    light: {
        color: "white"
    }
})