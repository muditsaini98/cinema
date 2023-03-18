import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MovieScreens = ({ navigation, route }) => {
  const { item, image_base_url, base_URL, API_KEY } = route.params;
  // console.log(item)
  const [details, setDetails] = useState([]);
  const [recoMovies, setRecoMovies] = useState([]);
  const movieDetail = `${base_URL}/movie/${item?.id}?api_key=${API_KEY}&language=en-US&page=1`;
  const tvDetail = `${base_URL}/tv/${item?.id}?api_key=${API_KEY}&language=en-US&page=1`;
  const recomendedMovies = `${base_URL}/movie/${item?.id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;
  const recomendedTv = `${base_URL}/tv/${item?.id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: item?.title || item?.name,
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

  const onPressSearch = () => {
    navigation.push("Search", { base_URL, API_KEY, image_base_url });
  };

  useEffect(() => {
    async function fetchUrl() {
      {
        item?.media_type === "movie" || item?.media_type === undefined
          ? await fetch(movieDetail)
            .then((response) => response.json())
            .then((data) => {
              setDetails(data);
              // console.log(data)
            })
            .catch((err) => console.log(err))
          : await fetch(tvDetail)
            .then((response) => response.json())
            .then((data) => {
              setDetails(data);
              // console.log(data);
            })
            .catch((err) => console.log(err));
      }
    }
    fetchUrl();
  }, [navigation]);

  useEffect(() => {
    async function fetchUrl() {
      {
        item?.media_type === "movie" || item?.media_type === undefined
          ? await fetch(recomendedMovies)
            .then((response) => response.json())
            .then((data) => {
              setRecoMovies(data?.results);
            })
            .catch((err) => console.log(err))
          : await fetch(recomendedTv)
            .then((response) => response.json())
            .then((data) => {
              setRecoMovies(data?.results);
              // console.log(data)
            })
            .catch((err) => console.log(err));
      }
    }
    fetchUrl();
  }, [navigation]);

  const play = async (item) => {
    navigation.navigate("Video", { item, details });
    try {
      await AsyncStorage.setItem("m_name", JSON.stringify(item));
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  const seasons = async (item) => {
    navigation.navigate("Seasons", { item, details, base_URL, API_KEY });
    try {
      await AsyncStorage.setItem("m_name", JSON.stringify(item));
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const onPressFunction = (item) => {
    navigation.push("Movie", { item, image_base_url, base_URL, API_KEY });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View
        style={{
          alignItems: "center",
          width: "100%",
          height: 450,
        }}
      >
        <ImageBackground
          source={{ uri: `${image_base_url}${details?.backdrop_path}` }}
          resizeMode="cover"
          style={[
            styles.image,
            {
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative",
            },
          ]}
        >
          <LinearGradient
            colors={["transparent", "black"]}
            locations={[0, 0.7]}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          <Image
            style={[styles.img, { height: 400, resizeMode: "stretch" }]}
            source={{
              uri: `${image_base_url}${details?.poster_path}`,
            }}
          />
        </ImageBackground>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          marginVertical: 15,
          alignItems: "flex-start",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 28,
            width: 260,
          }}
        >
          {details?.name || details?.title}
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", paddingTop: 5 }}
        >
          <Image
            style={{ width: 10, height: 10 }}
            source={require("../assets/rating.png")}
          />
          <Text style={[styles.white, { paddingLeft: 5 }]}>
            {details?.vote_average?.toFixed(1)}
          </Text>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {details?.genres?.map((item) => {
            return (
              <Text
                key={item?.id}
                style={[
                  styles.white,
                  {
                    marginRight: 10,
                    padding: 6,
                    flexWrap: "wrap",
                    borderWidth: 2,
                    marginBottom: 15,
                    borderColor: "lightgray",
                    borderRadius: 3,
                    backgroundColor: "gray",
                  },
                ]}
              >
                {item?.name}
              </Text>
            );
          })}
        </View>
        {details?.episode_run_time?.length !== 0 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <Image
              style={{ width: 10, height: 10 }}
              source={require("../assets/time.png")}
            />
            {item?.media_type === "movie" || item?.media_type === undefined ? (
              <Text style={[styles.white, { paddingLeft: 5 }]}>
                {details?.runtime} min
              </Text>
            ) : (
              <Text style={[styles.white, { paddingLeft: 5 }]}>
                {details?.episode_run_time} min per episode
              </Text>
            )}
          </View>
        )}
      </View>
      {item?.media_type !== "tv" ? <View style={{ width: 100 }}>
        <Button title="Play" onPress={() => play(item)} />
      </View> : <View style={{ width: 100 }}>
        <Button title="Seasons" onPress={() => seasons(item)} />
      </View>}
      <Text
        style={{
          color: "white",
          textAlign: "left",
          fontSize: 22,
          borderBottomColor: "white",
          borderWidth: 2,
          paddingTop: 25,
        }}
      >
        Overview
      </Text>
      <Text
        style={{
          color: "gray",
          textAlign: "justify",
          paddingVertical: 10,
          fontSize: 16,
        }}
      >
        {details?.overview}
      </Text>
      {recoMovies.length !== 0 && (
        <>
          {item?.media_type !== "tv" ? (
            <Text
              style={{
                color: "white",
                textAlign: "left",
                fontSize: 22,
                borderBottomColor: "white",
                borderWidth: 2,
                marginVertical: 5,
              }}
            >
              Recommended Movies
            </Text>
          ) : (
            <Text
              style={{
                color: "white",
                textAlign: "left",
                fontSize: 22,
                borderBottomColor: "white",
                borderWidth: 2,
                marginVertical: 5,
              }}
            >
              Recommended Tv Series
            </Text>
          )}
          <FlatList
            horizontal={true}
            data={recoMovies}
            renderItem={({ item }) => (
              <View style={[styles.grid, { width: 180 }]}>
                <TouchableOpacity onPress={() => onPressFunction(item)}>
                  <Image
                    style={[styles.img, { width: 180 }]}
                    source={{
                      uri: `${image_base_url}${item?.poster_path}`,
                    }}
                  />
                  {item?.name ? (
                    <Text style={styles.name}>{item?.name}</Text>
                  ) : (
                    <Text style={styles.name}>{item?.title}</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item?.id}
          />
        </>
      )}
    </ScrollView>
  );
};

export default MovieScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 10,
  },
  contentContainer: {
    alignItems: "flex-start",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  img: {
    width: 200,
    resizeMode: "cover",
    height: 180,
    borderRadius: 10,
    padding: 50,
  },
  white: {
    color: "white",
  },
  grid: {
    flex: 1,
    marginEnd: 10,
    marginTop: 10,
  },
  name: {
    color: "white",
    marginTop: 5,
    fontWeight: "500",
    flexWrap: "wrap",
  },
});
