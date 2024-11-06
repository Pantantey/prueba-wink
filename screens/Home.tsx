import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Components
import Logo from "../components/Logo";
import Sinpe from "../components/Sinpe";
import TableData from "../components/TableData";
import Account from "../components/Account";

type HomeProps = {
  fontsLoaded: boolean;
}

const Home = ({ fontsLoaded } : HomeProps) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Logo />
      </View>

      <View style={styles.account}>
        <Account />
      </View>

      <View style={styles.touchableSinpe}>
        <TouchableOpacity style={styles.sinpe} onPress={() => navigation.navigate("Detail", { fontsLoaded })}>
          <Sinpe />
        </TouchableOpacity>
      </View>

      <View style={styles.table}>
        <TableData />
      </View>
    </View>
  );
};

// component styles
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 20,
    paddingRight: 20,
    gap: 10,
  },
  logo: {
    height: "7%",
    alignItems: "center",
  },
  account: {
    height: "16%",
    alignItems: "flex-start",
    marginVertical: 5,
  },
  sinpe: {
    height: "100%",
  },
  touchableSinpe: {
    height: "8%",
    alignItems: 'center',
  },
  table: {
    height: "68%",
    marginTop: 25,
  },
});

export default Home;
