import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableHighlight,
} from "react-native";
import axios from "axios";

import { FontAwesome } from "@expo/vector-icons";

import Animated, { Easing } from "react-native-reanimated";

import { TapGestureHandler, State } from "react-native-gesture-handler";

const {
  Value,
  event,
  block,
  eq,
  cond,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  divide,
} = Animated;

import ScrollCard from "../components/ScrollCard";
import NewsCard from "../components/NewsCard";

const { width, height } = Dimensions.get("window");

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position,
  ]);
}

const Feed = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [load, setLoad] = useState(false);

  const scrollX = useRef(new Value(0)).current;
  const dotPosition = useRef(divide(scrollX, width)).current;

  const buttonOpacity = useRef(new Value(1)).current;

  const onStateChange = event([
    {
      nativeEvent: ({ state }) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 1, 0))
          ),
        ]),
    },
  ]);
  const normalState = event([
    {
      nativeEvent: ({ state }) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 0, 1))
          ),
        ]),
    },
  ]);

  const dots = () => {
    return (
      <View
        style={[
          styles.row,
          styles.flex,
          {
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20,
          },
        ]}
      >
        {articles.map((_, i) => {
          const borderWidth = interpolate(dotPosition, {
            inputRange: [i - 1, i, i + 1],
            outputRange: [0, 2.5, 0],
            extrapolate: Extrapolate.CLAMP,
          });
          return (
            <Animated.View
              key={i}
              style={[
                styles.dots,
                styles.activeDot,
                { borderWidth: borderWidth },
              ]}
            />
          );
        })}
      </View>
    );
  };

  useEffect(() => {
    async function fetchArticle() {
      setLoad(true);
      const res = await axios.get(
        "http://newsapi.org/v2/everything?domains=wsj.com&apiKey=4b5c2d8a7cc840c1ad307493fb50d44c"
      );
      setArticles(res.data.articles.slice(0, 10));
      setLoad(false);
    }
    fetchArticle();
  }, []);

  const headerX = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [500, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const headerOpacity = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const inputX = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [0, width],
    extrapolate: Extrapolate.CLAMP,
  });

  const backOpacity = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const contentOpacity = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const contentY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [500, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  navigation.setOptions({
    header: () => {
      return (
        <View style={[styles.flex, styles.header]}>
          <Animated.View
            style={[
              styles.row,
              {
                transform: [{ translateX: headerX }],
                opacity: headerOpacity,
                justifyContent: "space-between",
              },
            ]}
          >
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                The Indian Times
              </Text>
            </View>
            <TapGestureHandler onHandlerStateChange={onStateChange}>
              <Animated.View
                style={{
                  backgroundColor: "#dde0e3",
                  height: 35,
                  width: 35,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: buttonOpacity,
                }}
              >
                <FontAwesome name="search" size={20} color="black" />
              </Animated.View>
            </TapGestureHandler>
          </Animated.View>
          <Animated.View
            style={[
              styles.input_box,
              styles.row,
              { transform: [{ translateX: inputX }] },
            ]}
          >
            <TapGestureHandler onHandlerStateChange={normalState}>
              <Animated.View style={{ opacity: backOpacity }}>
                <TouchableHighlight
                  activeOpacity={1}
                  underlayColor={"#ccd0d5"}
                  style={styles.back_icon_box}
                >
                  <FontAwesome name="chevron-left" size={24} color="black" />
                </TouchableHighlight>
              </Animated.View>
            </TapGestureHandler>
            <TextInput
              placeholder="Search News"
              clearButtonMode="always"
              onChangeText={() => {}}
              style={styles.input}
            />
          </Animated.View>
        </View>
      );
    },
  });

  if (load) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="dodgerblue" size="large" />
      </View>
    );
  }

  const renderArticles = (item) => {
    return <ScrollCard data={item.item} navigation={navigation} />;
  };

  return (
    <View style={styles.screen}>
      <Animated.View
        style={{
          opacity: contentOpacity,
          transform: [{ translateY: contentY }],
        }}
      >
        <View
          style={[
            styles.flex,
            styles.row,
            { justifyContent: "space-between", paddingHorizontal: 36 },
          ]}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Around the Globe
          </Text>
          <View
            style={{
              backgroundColor: "#dde0e3",
              paddingHorizontal: 5,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Show All</Text>
          </View>
        </View>
        <View style={{ height: height / 2.4 }}>
          <FlatList
            data={articles.slice(0, 5)}
            key={new Date()}
            renderItem={renderArticles}
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
            style={{ overflow: "visible", height: 200 }}
          />
          {dots()}
        </View>
        <View
          style={[
            styles.flex,
            styles.row,
            {
              justifyContent: "space-between",
              paddingHorizontal: 36,
              marginTop: 10,
            },
          ]}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>India</Text>
          <View
            style={{
              backgroundColor: "#dde0e3",
              paddingHorizontal: 5,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Show All</Text>
          </View>
        </View>
        <ScrollView>
          {articles.slice(5, 10).map((ele, i) => {
            return <NewsCard data={ele} />;
          })}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default Feed;

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
  header: {
    top: 0,
    left: 0,
    right: 0,
    height: 130,
    backgroundColor: "white",
    paddingTop: 70,
    paddingBottom: 80,
    paddingHorizontal: 36,
    justifyContent: "space-between",
  },
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  dots: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2.5,
    marginHorizontal: 6,
    backgroundColor: "#ccc",
    borderColor: "transparent",
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    borderColor: "black",
  },
  input_box: {
    height: 50,
    backgroundColor: "white",
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    marginLeft: 10,
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  input: {
    height: 40,
    width: "80%",
    backgroundColor: "#e4e6eb",
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
  },
});
