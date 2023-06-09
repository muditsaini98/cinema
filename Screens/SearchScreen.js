import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SearchScreen = ({ navigation, route }) => {
  const { base_URL, API_KEY, image_base_url } = route.params;
  const flatListRef = useRef();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const searchURL = `${base_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${search}&page=${page}`
  useEffect(() => {
    async function fetchUrl() {
      setPage(1)
      search &&
        (await fetch(searchURL)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            // setSearchResults([...searchResults, ...data?.results]);
            setSearchResults(data?.results)
          }));
    }
    fetchUrl();
  }, [search]);

  const onPressChange = (item) => {
    navigation.push("Movie", { item, image_base_url, base_URL, API_KEY });
  };

  const onChange = (e) => {
    setSearch(e);
    // console.log(e)
    // console.log()
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          backgroundColor: "black",
          color: "white",
          padding: 10,
          fontSize: 15,
          borderRadius: 8,
          borderWidth: 0.5,
          borderColor: "white",
        }}
        // onChangeText={(e) => onChange(e)}
        onChangeText={(e) => onChange(e)}
        // value={search}
        placeholder="Search..."
        placeholderTextColor="gray"
      />
      {/* <ScrollView
        horizontal
        //   contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        <View> */}
      <FlatList
        contentContainerStyle={{ alignItems: "stretch" }}
        // style={{ borderColor: "red", borderWidth: 1 }}
        ref={flatListRef}
        //   horizontal={true}
        onEndReached={async () => {
          setPage(page + 1);
          // flatListRef?.current?.scrollToIndex({ animated: true, index: 0, viewPosition: 0 })
          // await fetch(`${base_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${search}&page=${page + 1}`)
          //   .then((response) => response.json())
          //   .then((data) => {
          //     // console.log(data);
          //     setSearchResults([...searchResults, data?.results]);
          //     console.log([...searchResults, data?.results])
          //   })
          async function fetchUrl() {
            await fetch(searchURL)
              .then((response) => response.json())
              .then((data) => {
                // console.log(data);
                const aa = [...new Map([...searchResults, ...data?.results].map((m) => [m.id, m])).values()]
                setSearchResults(aa);
                // setSearchResults(data?.results)
              });
          }
          fetchUrl();
        }}
        numColumns={2}
        data={searchResults}
        renderItem={({ item }) => (
          // <View
          //   style={[
          //     styles.grid,
          //     {
          //       width: Dimensions.get("window").width / 2.25,
          //       margin: 5,
          //       maxWidth: Dimensions.get("window").width,
          //     },
          //   ]}
          // >
          //   <TouchableOpacity onPress={() => onPressChange(item)}>
          //     <Image
          //       style={[styles.img, { width: "auto" }]}
          //       source={{
          //         uri: `${image_base_url}${item?.poster_path}`,
          //       }}
          //     />
          //     {item?.name ? (
          //       <Text style={styles.name}>{item?.name}</Text>
          //     ) : (
          //       <Text style={styles.name}>{item?.title}</Text>
          //     )}
          //   </TouchableOpacity>
          // </View>
          <View key={item?.id} style={{ justifyContent: "flex-start", marginVertical: 10, width: "50%" }}>
          <TouchableOpacity onPress={() => onPressChange(item)}>
              <View style={{ alignItems: "center" }}>
                  {item?.poster_path ? <Image
                      style={[
                          { height: 220, resizeMode: "stretch", borderRadius: 6, width: 150 },
                      ]}
                      source={{
                          uri: `${image_base_url}${item?.poster_path}`,
                      }}
                  />: <Image
                  style={[
                      { height: 220, resizeMode: "stretch", borderRadius: 6, width: 150, backgroundColor: "gray" },
                  ]}
              />}
                  <Text style={{ color: "white", fontSize: 14, fontWeight: "600", width: 120, textAlign: "center", marginTop: 5 }}>{item?.title || item?.original_title || item?.name || item?.original_name}</Text>
              </View>
          </TouchableOpacity>
      </View>
        )}
        keyExtractor={(item, index) => index}
      />
      {/* </View>
      </ScrollView> */}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    width: "100%",
    backgroundColor: "black",
    paddingHorizontal: 10,
  },
  contentContainer: {
    // alignItems: "flex-start",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  img: {
    width: 180,
    resizeMode: "cover",
    height: 180,
    borderRadius: 10,
    padding: 50,
  },
  white: {
    color: "white",
  },
  grid: {
    // flex: 1,
    // marginEnd: 10,
    marginTop: 10,
  },
  name: {
    color: "white",
    marginTop: 5,
    fontWeight: "500",
    flexWrap: "wrap",
  },
});
