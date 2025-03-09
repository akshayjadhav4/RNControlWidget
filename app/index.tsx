import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import { DeviceProvider } from "@/context/DeviceContext";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <DeviceProvider>
        <HomeScreen />
      </DeviceProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
