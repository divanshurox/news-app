import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import * as Font from "expo-font";
import { AppLoading } from "expo";

// Importing Screens
import Feed from "./screens/Feed";
import Article from "./screens/Article";
import FinanceScreen from "./screens/Finance";
import PoliticsScreen from "./screens/Politics";
import TechScreen from "./screens/Tech";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/Fonts/OpenSans-Bold.ttf"),
    "berkshire-swash": require('./assets/Fonts/BerkshireSwash-Regular.ttf'),
    "kaushan-script": require('./assets/Fonts/KaushanScript-Regular.ttf')
  });
}

const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Article" component={Article} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [load, setLoad] = useState(false);
  if (!load) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setLoad(true)} />
    );
  }
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Stack"
          options={{ title: "Feed" }}
          component={StackScreen}
        />
        <Drawer.Screen name="Politics" component={PoliticsScreen} />
        <Drawer.Screen name="Tech" component={TechScreen} />
        <Drawer.Screen name="Finance" component={FinanceScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
