import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
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
// import arrayListContext from "../App"

const MovieScreens = ({ navigation, route }) => {
  const { item, image_base_url, base_URL, API_KEY } = route.params;
  // console.log(item)

  // const arrList = useContext(arrayListContext);

  const [details, setDetails] = useState([]);
  const [recoMovies, setRecoMovies] = useState([]);
  const [bookmark, setBookmark] = useState(false);
  // const [tick, setTick] = useState(false);
  const movieDetail = `${base_URL}/movie/${item?.id}?api_key=${API_KEY}&language=en-US&page=1`;
  const tvDetail = `${base_URL}/tv/${item?.id}?api_key=${API_KEY}&language=en-US&page=1`;
  const recomendedMovies = `${base_URL}/movie/${item?.id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;
  const recomendedTv = `${base_URL}/tv/${item?.id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;

  // console.log(arrList)

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
    navigation.navigate("Server", { item, details });
    try {
      await AsyncStorage.setItem("m_name", JSON.stringify(item));
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const seasons = async (item) => {
    navigation.navigate("Seasons", { item, details, base_URL, API_KEY, image_base_url });
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

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m        ` : ""}`;
  }

  useEffect(() => {
    async function fetchData() {
      if (await AsyncStorage.getItem('Bookmark_list') === null || await AsyncStorage.getItem('Bookmark_list') === undefined) {
        await AsyncStorage.setItem('Bookmark_list', JSON.stringify([]));
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      const values = await AsyncStorage.getItem('Bookmark_list');
      const arr = JSON.parse(values)
      arr?.map(itemss => {
        itemss?.id === item.id && setBookmark(true)
      })
    }
    fetchData()
  }, [])



  const onPressBookmark = async (item) => {
    setBookmark(!bookmark)
    // AsyncStorage.removeItem("Bookmark_list")
    if(!bookmark){
      const value = await AsyncStorage.getItem('Bookmark_list');
      const aa = [...JSON.parse(value), item]
      const locValues = await AsyncStorage.setItem('Bookmark_list', JSON.stringify([...new Map(aa.map((m) => [m.id, m])).values()]));
      // console.log(values)
    }else{
      const values = await AsyncStorage.getItem('Bookmark_list');
      const arr = JSON.parse(values)
      const bb = arr.filter((obj) => obj?.id !== item?.id);
      // console.log(bb)
      const locValues = await AsyncStorage.setItem('Bookmark_list', JSON.stringify(bb));
    }
  }

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
            fontWeight: 600
          }}
        >
          {details?.name || details?.title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{ flexDirection: "row", alignItems: "center", paddingTop: 5, backgroundColor: "rgb(12, 20, 56)", justifyContent: "center", padding: 3, paddingHorizontal: 6, borderRadius: 5 }}
          >
            <Image
              style={{ width: 10, height: 10 }}
              source={require("../assets/rating.png")}
            />
            <Text style={[styles.white, { paddingLeft: 5 }]}>
              {details?.vote_average?.toFixed(1)}
            </Text>
          </View>
          <Pressable onPress={() => onPressBookmark(item)} style={{ marginLeft: 10 }}>
            {!bookmark ? <Image
              style={{ width: 15, height: 20 }}
              tintColor={"white"}
              source={require("../assets/bookmark.png")}
            /> : <Image
              style={{ width: 15, height: 20 }}
              tintColor={"white"}
              source={require("../assets/bookmark-full.png")}
            />}
          </Pressable>
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
                    padding: 3,
                    paddingHorizontal: 6,
                    fontWeight: "600",
                    flexWrap: "wrap",
                    // borderWidth: 2,
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          {details?.episode_run_time?.length !== 0 && (
            <>
              <Image
                style={{ width: 10, height: 10 }}
                source={require("../assets/time.png")}
              />
              {item?.media_type === "movie" || item?.media_type === undefined ? (
                <Text style={[styles.white, { paddingLeft: 5 }]}>
                  {/* {details?.runtime} min {"     "} */}
                  {toHoursAndMinutes(details?.runtime)}
                </Text>
              ) : (
                <Text style={[styles.white, { paddingLeft: 5 }]}>
                  {details?.episode_run_time?.length > 1 ? details?.episode_run_time[0] : details?.episode_run_time} min per episode {"      "}
                </Text>
              )}
            </>
          )}
          <Image
            tintColor={"white"}
            style={{ width: 10, height: 10 }}
            source={require("../assets/calendar.png")}
          />
          {item?.media_type === "movie" || item?.media_type === undefined ? (
            <Text style={[styles.white, { paddingLeft: 10 }]}>
              {details?.release_date?.split("-")[0]}
            </Text>
          ) : (
            <Text style={[styles.white, { paddingLeft: 10 }]}>
              {details?.first_air_date?.split("-")[0] !== details?.last_air_date?.split("-")[0] ? details?.first_air_date?.split("-")[0] + " - " + details?.last_air_date?.split("-")[0] : details?.first_air_date?.split("-")[0]}
            </Text>
          )}
        </View>
      </View>
      {item?.media_type !== "tv" ? <View style={{ width: 100 }}>
        <Button title="Play" color={"rgb(12, 20, 56)"} onPress={() => play(item)} />
      </View> : <View style={{ width: 100 }}>
        <Button title="Seasons" color={"rgb(12, 20, 56)"} onPress={() => seasons(item)} />
      </View>}
      <Text
        style={{
          color: "white",
          textAlign: "left",
          fontSize: 22,
          borderBottomColor: "white",
          borderWidth: 1,
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
                borderWidth: 1,
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
                borderWidth: 1,
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
              <View style={[styles.grid, { width: 130 }]}>
                <TouchableOpacity onPress={() => onPressFunction(item)}>
                  <Image
                    style={[styles.img, { width: 130 }]}
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
    borderRadius: 6,
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
