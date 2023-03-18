import React from "react";
import WebView from "react-native-webview";
import { StyleSheet, Dimensions } from "react-native";

const Video = ({ route }) => {
  const { item, details, localValue } = route.params;
  console.log(item?.media_type)
  let webview = null;
  return (
    <>
      {item?.media_type !== "tv" ? <WebView
        style={styles.video}
        ref={(ref) => {
          webview = ref;
        }}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        // source={{ uri: `https://vidsrc.me/embed/${item?.id}/` }}
        source={{ uri: `https://www.2embed.to/embed/tmdb/movie?id=${item?.id || localValue?.id}` }}
        incognito={true}
        mediaPlaybackRequiresUserAction={false}
      /> : <WebView
      style={styles.video}
      ref={(ref) => {
        webview = ref;
      }}
      allowsFullscreenVideo={true}
      allowsInlineMediaPlayback={true}
      // source={{ uri: `https://vidsrc.me/embed/${item?.id}/` }}
      source={{ uri: `https://www.2embed.to/embed/tmdb/tv?id=${item?.id || localValue?.id}&s=1&e=1` }}
      incognito={true}
      mediaPlaybackRequiresUserAction={false}
    /> }
    </>
  );
};

export default Video;

const styles = StyleSheet.create({
  video: {
    // width: Dimensions.get("window").width,
    // height: 100
  }
})
