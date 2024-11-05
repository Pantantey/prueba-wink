import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Constants from "expo-constants";

import Hello from "./components/Hello";
import Logo from "./components/Logo";
import TableData from "./components/TableData";

export default function App() {
  return (
    <View style={styles.container}>
      
      <View style={styles.logo}>
        <Logo />
      </View>

      <Text>Open up App.tsx to start working on your appdsadas!</Text>

      <View style={styles.test}>
        <Hello/>
      </View>

      
      <View style={styles.table}>
        <TableData />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
  test: {
    backgroundColor: 'red',
    height: 100,
  },
  table: {
    height: '100%'
  },
  logo: {
    left: 3,
  },
});
