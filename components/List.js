import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const NowPlay = ({ title, genre, navigation }) => {
  const image_base_url = "https://image.tmdb.org/t/p/original";
  const base_URL = "https://api.themoviedb.org/3";
  const API_KEY = "89a3d8e8b80543d8dcfe73a8582355c1";
  const topAction = `${base_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}&append_to_response=videos,images`;
  const [actionMovies, setActionMovies] = useState([]);

  useEffect(() => {
    async function fetchUrl() {
      const aa = await fetch(topAction)
        .then((response) => response.json())
        .then((data) => {
          setActionMovies(data?.results);
          // console.log(data)
        });
      return aa;
    }
    fetchUrl();
  }, []);

  const onPressFunction = (item) => {
    navigation.push("Movie", { item, image_base_url, base_URL, API_KEY })
  };

  return (
    <View>
      <View style={{justifyContent: "space-between"}}>
        <Text style={[styles.upper, styles.title, { marginTop: 20 }]}>
          {title}
        </Text>
        <Text style={{color: "white"}}>View all</Text>
      </View>
      <FlatList
        horizontal={true}
        data={actionMovies}
        renderItem={({ item }) => (
          <View style={[styles.grid, { width: 160 }]}>
            <TouchableOpacity onPress={() => onPressFunction(item)}>
              <Image
                style={styles.img}
                source={{
                  uri: `${image_base_url}${item?.poster_path}`,
                }}
              />
              {item.name ? (
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
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 20,
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
  upper: {
    textTransform: "capitalize",
  },
});

export default NowPlay;
