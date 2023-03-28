import { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Pressable,
  Modal,
  Button,
  Text,
} from "react-native";
import NowPlay from "../components/List";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation, route }) {
  const image_base_url = "https://image.tmdb.org/t/p/original";
  const base_URL = "https://api.themoviedb.org/3";
  const API_KEY = "89a3d8e8b80543d8dcfe73a8582355c1";
  const nowPlaying = `${base_URL}/trending/all/week?api_key=${API_KEY}&language=en-US&append_to_response=videos,images`;

  // const movieGenere =
  //   "https://api.themoviedb.org/3/genre/movie/list?api_key=89a3d8e8b80543d8dcfe73a8582355c1&language=en-US";

  const [movies, setMovies] = useState([]);
  const [localValue, setLocalValue] = useState({});
  const [width, setWidth] = useState("");

  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    //Get device Width
    setWidth(Dimensions.get("window").width - 25);
  }, []);

  useEffect(() => {
    async function fetchUrl() {
      const aa = await fetch(nowPlaying)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data?.results);
          // console.log(data)
        });
      return aa;
    }
    fetchUrl();
  }, []);

  useEffect(() => {
    async function ab() {
      const value = await AsyncStorage.getItem("m_name");
      // console.log(route.name);
      setLocalValue(JSON.parse(value));
    }
    ab();
  }, []);

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
            style={{ marginRight: 8 }}
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
  }, [navigation]);

  const onPressFunction = (item) => {
    navigation.push("Movie", {
      item,
      width,
      image_base_url,
      base_URL,
      API_KEY,
    });
  };

  const goToFlim = () => {
    navigation.push("Film", {image_base_url, base_URL, API_KEY})
  }
  
  const goToSeries = () => {
    navigation.push("Series", {image_base_url, base_URL, API_KEY})
    
  }
  
  const goToMyList = () => {
    navigation.push("List", {image_base_url, base_URL, API_KEY})

  }

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={{ flexDirection: "row", maxWidth: Dimensions.get("window").width - 20, justifyContent: "space-evenly", paddingVertical: 10 }}>
        <Pressable onPress={() => goToFlim()} style={{ backgroundColor: "rgb(12, 20, 56)", padding: 6, borderRadius: 6, paddingHorizontal: 15 }}><Text style={{ color: "white", fontWeight: "600" }}>Film</Text></Pressable>
        <Pressable onPress={() => goToSeries()} style={{ backgroundColor: "rgb(12, 20, 56)", padding: 6, borderRadius: 6, paddingHorizontal: 15 }}><Text style={{ color: "white", fontWeight: "600" }}>Series</Text></Pressable>
        <Pressable onPress={() => goToMyList()} style={{ backgroundColor: "rgb(12, 20, 56)", padding: 6, borderRadius: 6, paddingHorizontal: 15 }}><Text style={{ color: "white", fontWeight: "600" }}>My List</Text></Pressable>
      </View>
      <View>
        {/* <Text style={{color: "white", fontSize: 20, fontWeight: "600", marginVertical: 5}}>Trending Now</Text> */}
        <FlatList
          horizontal={true}
          data={movies}
          renderItem={({ item }) => (
            <View style={[styles.grid, { width }]}>
              <TouchableOpacity onPress={() => onPressFunction(item)}>
                <Image
                  style={[
                    styles.img,
                    { width, height: 450, resizeMode: "stretch" },
                  ]}
                  source={{
                    uri: `${image_base_url}${item?.poster_path}`,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item?.id}
        />
      </View>

      <NowPlay navigation={navigation} title="top action" genre="28" />
      <NowPlay navigation={navigation} title="top Comedy" genre="35" />
      <NowPlay navigation={navigation} title="top animation" genre="16" />
      <NowPlay navigation={navigation} title="top sci-Fi" genre="878" />
      <NowPlay navigation={navigation} title="top horror" genre="27" />
      <NowPlay navigation={navigation} title="top romance" genre="10749" />
      {localValue && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: Dimensions.get("window").width - 30,
                }}
                activeOpacity={0.5}
              >
                <Image
                  style={[
                    styles.img,
                    { height: "auto", minHeight: 220, resizeMode: "stretch", marginRight: 10 },
                  ]}
                  source={{
                    uri: `${image_base_url}${localValue?.poster_path}`,
                  }}
                />
                <View style={{ justifyContent: "space-between" }}>
                  <View>
                    <Text>Continue Watching</Text>
                    <Text
                      style={{
                        fontSize: 25,
                        flexWrap: "wrap",
                        width: Dimensions.get("window").width - 200,
                        fontWeight: "700",
                      }}
                    >
                      {localValue?.name || localValue?.title}
                    </Text>
                  </View>
                  <View>
                    <View style={{ marginVertical: 10 }}>
                      <Button
                        title="Continue"
                        onPress={() => {
                          navigation.navigate("Movie", {
                            item: localValue,
                            width,
                            image_base_url,
                            base_URL,
                            API_KEY,
                          });
                        }}
                      />
                    </View>
                    <View>
                      <Button
                        title="Close"
                        onPress={() => {
                          setModalVisible(!modalVisible);
                          AsyncStorage.removeItem("m_name")
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}

      {/* <StatusBar style="auto" StatusBarStyle="default" /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  contentContainer: {
    justifyContent: "center",
  },
  upper: {
    textTransform: "capitalize",
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "600",
  },
  img: {
    width: 160,
    resizeMode: "cover",
    height: 180,
    borderRadius: 10,
    padding: 50,
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
  last: {
    minHeight: 50,
  },

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  modalView: {
    margin: 0,
    backgroundColor: "rgba(255, 255, 255, .9)",
    // opacity: 5,
    // borderRadius: 8,
    // padding: 35,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
