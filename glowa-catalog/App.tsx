import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import HomeScreen from "./screens/HomeScreen";

// Prevent splash auto-hiding before we’re ready
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      // Simulate loading (API calls, fonts, etc.)
      setTimeout(async () => {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }, 2000);
    };
    prepare();
  }, []);

  if (!isReady) {
    // Show your custom splash screen first
    return (
      <View style={styles.container}>
        <Image source={require("./assets/Logo.png")} style={styles.logo} />
      </View>
    );
  }

  // Once ready → load HomeScreen
  return <HomeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
