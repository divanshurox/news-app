import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const NewsCard = ({ data }) => {
  console.log(new Date("2020-08-29T14:28:00Z"));

  return (
    <View
      style={[
        styles.flex,
        styles.row,
        {
          paddingHorizontal: 36,
          marginVertical: 15,
        },
      ]}
    >
      <Image
        source={{ uri: data.urlToImage }}
        style={[styles.img, styles.shadow]}
      />
      <View style={[styles.column, { paddingHorizontal: 20 }]}>
        <Text numberOfLines={2} style={{ width: 240, fontWeight: "bold" }}>
          {data.title}
        </Text>
        <Text style={{ color: "#ccc", marginTop: 10 }}>
          {new Date(data.publishedAt).toTimeString()}
        </Text>
      </View>
    </View>
  );
};

export default NewsCard;

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
  img: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});
