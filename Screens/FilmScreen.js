import React, { useEffect } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

const FilmScreen = ({ route }) => {

    const { base_URL, API_KEY } = route.params;
    const filmListUrl = `${base_URL}/movie/popular?api_key=${API_KEY}&append_to_response=videos,images`;
    // console.log(filmListUrl)
    useEffect(() => {
        async function fetchUrl() {
            const aa = await fetch(filmListUrl)
              .then((response) => response.json())
              .then((data) => {
                // setMovies(data?.results);
                console.log(data)
              });
            return aa;
          }
          fetchUrl();
    }, [])


    return (
        <View style={{ backgroundColor: "black", height: "100%" }}>
            <View style={{ flexDirection: "row" }}>
                <Pressable style={[styles.back, styles.margin]}>
                    <Text style={[styles.white]}>Popular</Text>
                </Pressable>
                <Pressable style={[styles.back, styles.margin]}>
                    <Text style={[styles.white]}>Top Rated</Text>
                </Pressable>
                <Pressable style={[styles.back, , styles.margin]}>
                    <Text style={[styles.white]}>Upcoming</Text>
                </Pressable>
            </View>
            <ScrollView>

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
        margin: 5,
        marginHorizontal: 10,
    },
    back: {
        backgroundColor: "rgb(12, 20, 56)",
        padding: 5,
        borderRadius: 6,
        paddingHorizontal: 15,
    },
})