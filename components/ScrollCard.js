import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const ScrollCard = ({ data, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Article", {
          article: data,
        });
      }}
      activeOpacity={0.9}
    >
      <View style={[styles.flex]}>
        <ImageBackground
          source={{ uri: data.urlToImage }}
          imageStyle={{ borderRadius: 12 }}
          style={[styles.flex, styles.cardImage, styles.shadow]}
        >
          <View style={[styles.row, { justifyContent: "flex-end" }]}>
            <FontAwesome name="bookmark" size={20} color="white" />
          </View>
          <View style={[styles.textCont, { marginTop: 20 }]}>
            <Text style={styles.text}>{data.title}</Text>
          </View>
          <View
            style={[
              styles.row,
              { justifyContent: "space-between", marginTop: 30 },
            ]}
          >
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/44.jpg",
              }}
              style={styles.avatar}
            />
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontWeight: "bold",
                top: 10,
              }}
            >
              {data.author ? data.author : "Divanshu Agarwal"}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default ScrollCard;

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
  cardImage: {
    height: width * 0.7,
    width: width - 70,
    marginHorizontal: 36,
    paddingHorizontal: 36,
    paddingVertical: 36 * 0.66,
    borderRadius: 12,
    marginVertical: 20,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  overlay: {
    backgroundColor: "black",
    flex: 1,
  },
  text: {
    fontSize: 15,
    color: "white",
    fontFamily: "open-sans",
  },
  textCont: {
    paddingTop: 20,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
