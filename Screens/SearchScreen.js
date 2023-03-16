import React, { useEffect, useState } from "react";
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
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const onChange = (e) => {
    setSearch(
      `${base_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${e}&page=1`
    );
  };
  useEffect(() => {
    async function fetchUrl() {
      search &&
        (await fetch(search)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            setSearchResults(data?.results);
          }));
    }
    fetchUrl();
  }, [search]);

  const onPressChange = (item) => {
    navigation.push("Movie", { item, image_base_url, base_URL, API_KEY });
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
          borderWidth: 1,
          borderColor: "white",
        }}
        onChangeText={(e) => onChange(e)}
        // value={search}
        placeholder="Search..."
        placeholderTextColor="gray"
      />
      <ScrollView
        horizontal
        //   contentContainerStyle={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            maxWidth: Dimensions.get("window").width - 25,
          }}
        >
          <FlatList
            //   horizontal={true}
            numColumns={2}
            data={searchResults}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.grid,
                  {
                    width: Dimensions.get("window").width / 2.25,
                    margin: 5,
                    maxWidth: Dimensions.get("window").width,
                  },
                ]}
              >
                <TouchableOpacity onPress={() => onPressChange(item)}>
                  <Image
                    style={[styles.img, { width: "auto" }]}
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
        </View>
      </ScrollView>
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
