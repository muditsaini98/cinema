import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

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
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>

        {list?.map((item, index) => {
          return (
            <View key={index} style={{ width: Dimensions.get("window").width - 110, justifyContent: "center", marginVertical: 10 }}>
              <TouchableOpacity onPress={() => onPress(item)}>
                <>
                  <Image
                    style={[
                      { height: 350, resizeMode: "stretch", borderRadius: 10 },
                    ]}
                    source={{
                      uri: `${image_base_url}${item?.poster_path}`,
                    }}
                  />
                  <Text style={{ color: "white", fontSize: 20, textAlign: "center", marginTop: 5, fontWeight: "600" }}>{item?.original_title || item?.title || item?.name || item?.original_name}</Text>
                </>
              </TouchableOpacity>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default MyListScreen