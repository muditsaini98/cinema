import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";
import MovieScreens from "./Screens/MovieScreens";
import Video from "./Screens/Video";
import SearchScreen from "./Screens/SearchScreen";
import SeasonScreen from "./Screens/SeasonScreen";
import ServerScreen from "./Screens/ServerScreen";
import SeriesScreen from "./Screens/SeriesScreen";
import FilmScreen from "./Screens/FilmScreen";
import MyListScreen from "./Screens/MyListScreen";
import React, { useState } from "react"
import ViewAllScreen from "./Screens/ViewAllScreen";

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "black" },
  headerTitleStyle: { color: "white", fontWeight: "600" },
  headerTintColor: "white",
};

// const arrayListContext = React.createContext();

export default function App() {
  // const [arr, setArr] = useState([])
  return (
    // <arrayListContext.Provider value={[ arr, setArr ]}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={globalScreenOptions}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Movie" component={MovieScreens} />
          <Stack.Screen name="Video" component={Video} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Seasons" component={SeasonScreen} />
          <Stack.Screen name="Server" component={ServerScreen} />
          <Stack.Screen name="Series" component={SeriesScreen} />
          <Stack.Screen name="Film" component={FilmScreen} />
          <Stack.Screen name="List" component={MyListScreen} />
          <Stack.Screen name="View All" component={ViewAllScreen} />
        </Stack.Navigator>
        <StatusBar backgroundColor="black" style="light" />
      </NavigationContainer>
    // </arrayListContext.Provider>
  );
}
