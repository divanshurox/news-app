import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Article = ({ navigation, route }) => {
  navigation.setOptions({
    header: () => {
      return (
        <View style={[styles.flex, styles.header, styles.row]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <FontAwesome name="bookmark" size={20} color="white" />
          </TouchableOpacity>
        </View>
      );
    },
    headerTransparent: true,
  });
  const data = { ...route.params.article };
  return (
    <View>
      <ImageBackground source={{ uri: data.urlToImage }} style={styles.img}>
        <View style={{ flex: 1 }} />
        <View style={{ paddingHorizontal: 36, paddingVertical: 20 }}>
          <Text style={{ color: "#ccc", fontSize: 16, fontWeight: "600" }}>
            {new Date(data.publishedAt).toLocaleDateString() +
              " . " +
              new Date(data.publishedAt).toLocaleTimeString()}
          </Text>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            {data.title}
          </Text>
          <View
            style={[
              styles.flex,
              styles.row,
              {
                justifyContent: "space-between",
                paddingVertical: 30,
              },
            ]}
          >
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/44.jpg",
              }}
              style={styles.avatar}
            />
            <View style={[styles.flex, styles.column]}>
              <Text style={{ color: "white", fontSize: 15 }}>
                {data.author}
              </Text>
              <Text style={{ color: "#ccc", fontSize: 10 }}>
                {data.source.name}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View>
        <View
          style={[
            styles.flex,
            styles.row,
            {
              paddingHorizontal: 15,
              justifyContent: "space-between",
              marginTop: 20,
            },
          ]}
        >
          <View style={[styles.row]}>
            {["facebook", "instagram", "twitter", "mail-reply"].map(
              (ele, i) => {
                return (
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      backgroundColor: "#ccc",
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <FontAwesome name={ele} size={16} color="black" />
                  </View>
                );
              }
            )}
          </View>
          <View
            style={{
              backgroundColor: "#ccc",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              paddingHorizontal: 10,
              height: 30,
              marginTop: 10,
            }}
          >
            <Text>1000 comments</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "open-sans",
              paddingHorizontal: 25,
              marginVertical: 20,
            }}
          >
            {data.content}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Article;

const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    top: 0,
    left: 0,
    right: 0,
    height: 130,
    backgroundColor: "transparent",
    paddingTop: 70,
    paddingBottom: 80,
    paddingHorizontal: 36,
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    height: width * 1.3,
    width: width,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 20,
  },
});
