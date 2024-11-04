import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Constants from 'expo-constants'

import Hello from "./components/Hello";
import Logo from "./components/Logo";

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Logo />
      </View>

      <Text>Open up App.tsx to start working on your appdsadas!</Text>
      <StatusBar style="auto" />
      <Hello />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
});
