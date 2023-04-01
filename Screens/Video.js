import React from "react";
import WebView from "react-native-webview";
import { StyleSheet, Dimensions } from "react-native";

const Video = ({ route }) => {
  const { item, details, localValue, episode_number, seasonsNo, no } = route.params;
  // console.log(item)
  // console.log(no)
  // let webview = null;
  return (
    <>
      {item?.media_type !== "tv" ? (no === 2 ? <WebView
        style={styles.video}
        // ref={(ref) => {
        //   webview = ref;
        // }}
        scalesPageToFit={true}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        // source={{ uri: `https://vidsrc.me/embed/${item?.id}/` }}
        source={{ uri: `https://www.2embed.to/embed/tmdb/movie?id=${item?.id || localValue?.id}` }}
        incognito={true}
        onLoadEnd={() => {
          // console.log("error")
          window.onbeforeunload = function () {
            return;
          }
          window.onunload = function () {
            return;
          }
        }}
        // javaScriptEnabled={false}
        mediaPlaybackRequiresUserAction={false}
      /> : <WebView
        style={styles.video}
        // ref={(ref) => {
        //   webview = ref;
        // }}
        scalesPageToFit={true}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        source={{ uri: `https://vidsrc.me/embed/${item?.id}/` }}
        // source={{ uri: `https://www.2embed.to/embed/tmdb/movie?id=${item?.id || localValue?.id}` }}
        incognito={true}
        onLoadEnd={() => {
          // console.log("error")
          window.onbeforeunload = function () {
            return;
          }
          window.onunload = function () {
            return;
          }
        }}
        // javaScriptEnabled={false}
        mediaPlaybackRequiresUserAction={false}
      />) : no === 2 ? <WebView
        style={styles.video}
        // ref={(ref) => {
        //   webview = ref;
        // }}
        scalesPageToFit={true}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        onLoadEnd={() => {
          // console.log("error")
          window.onbeforeunload = function () {
            return;
          }
          window.onunload = function () {
            return;
          }
        }}
        // source={{ uri: `https://vidsrc.me/embed/${item?.id}/` }}
        source={{ uri: `https://www.2embed.to/embed/tmdb/tv?id=${item?.id || localValue?.id}&s=${seasonsNo}&e=${episode_number}` }}
        incognito={true}
        mediaPlaybackRequiresUserAction={false}
      /> : <WebView
      style={styles.video}
      // ref={(ref) => {
      //   webview = ref;
      // }}
      scalesPageToFit={true}
      allowsFullscreenVideo={true}
      allowsInlineMediaPlayback={true}
      onLoadEnd={() => {
        // console.log("error")
        window.onbeforeunload = function () {
          return;
        }
        window.onunload = function () {
          return;
        }
      }}
      // source={{ uri: `https://vidsrc.me/embed/${item?.id}/` }}
      source={{ uri: `https://vidsrc.me/embed/${item?.id}/${seasonsNo}-${episode_number}/` }}
      // source={{ uri: `https://www.2embed.to/embed/tmdb/tv?id=${item?.id || localValue?.id}&s=${seasonsNo}&e=${episode_number}` }}
      incognito={true}
      mediaPlaybackRequiresUserAction={false}
    />}
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
