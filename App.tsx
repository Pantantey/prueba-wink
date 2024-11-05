import React, { useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { useFonts, RedHatDisplay_400Regular, RedHatDisplay_700Bold } from '@expo-google-fonts/red-hat-display';
import * as SplashScreen from 'expo-splash-screen';

import Logo from "./components/Logo";
import Sinpe from "./components/Sinpe";
import TableData from "./components/TableData";
import Account from "./components/Account";

SplashScreen.preventAutoHideAsync();

export default function App() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    RedHatDisplay_400Regular,
    RedHatDisplay_700Bold,
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); 
    }
  }, [fontsLoaded]);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Logo />
      </View>

      <View style={styles.account}>
        <Account fontsLoaded={fontsLoaded} />
      </View>

      <View style={styles.sinpe}>
        <Sinpe />
      </View>

      <View style={styles.table}>
        <TableData fontsLoaded={fontsLoaded}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
    marginLeft: 20,
    marginRight: 20,
    gap: 10,
  },
  logo: {
    height: '7%',
    marginTop: 15,
    alignItems: "center",
  },
  account: {
    height: '17%',
    alignItems: "flex-start",
    marginVertical: 5,
  },
  sinpe: {
    height: '8%',
    alignItems: "center",
  },
  table: {
    height: '68%',
    marginTop: 25,
  },
});
