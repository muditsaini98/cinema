import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const MyListScreen = ({ navigation, route }) => {
  const { image_base_url, base_URL, API_KEY } = route.params
  const [list, setList] = useState([])
  useEffect(() => {
    async function fetchData() {
      const locList = await AsyncStorage.getItem('Bookmark_list')
      setList(JSON.parse(locList))
    }
    fetchData()
  }, [list])

  const onPress = (item) => {
    navigation.push("Movie", { item, base_URL, API_KEY, image_base_url });
  }

  return (
    <View style={{ backgroundColor: "black", height: "100%" }}>
      {/* <ScrollView contentContainerStyle={{ alignItems: "center" }} style={{flexDirection: "row"}}> */}







        <FlatList contentContainerStyle={{ alignItems: "stretch" }} style={{ marginHorizontal: 10 }} data={list} keyExtractor={(item, index) => index}
          numColumns={2}
          // ref={flatListRef}
          renderItem={({ item }) =>
            <View key={item?.id} style={{ justifyContent: "flex-start", marginVertical: 10, width: "50%", maxWidth: "50%" }}>
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
                  <Text style={{ color: "white", fontSize: 14, fontWeight: "600", width: 120, textAlign: "center", marginTop: 5 }}>{item?.title || item?.original_title || item?.name || item?.original_name}</Text>
                </View>
              </TouchableOpacity>
            </View>} />











        {/* {list?.map((item, index) => {
          return (
            <View key={item?.id} style={{ justifyContent: "flex-start", marginVertical: 10, width: "100%", borderColor: "red", borderWidth: 1 }}>
              <TouchableOpacity onPress={() => onPress(item)}>
                <View style={{ alignItems: "center" }}>
                  <Image
                    style={[
                      { height: 220, resizeMode: "stretch", borderRadius: 6, width: 150, marginRight: 10 },
                    ]}
                    source={{
                      uri: `${image_base_url}${item?.poster_path}`,
                    }}
                  />
                  <Text style={{ color: "white", fontSize: 14, fontWeight: "600", width: 120, textAlign: "center", marginTop: 5 }}>{item?.title || item?.original_title || item?.name || item?.original_name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        })} */}
      {/* </ScrollView> */}
    </View>
  )
}

export default MyListScreen