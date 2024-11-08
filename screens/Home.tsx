import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

//navigation
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
      <View>
        <Logo />
      </View>

      <View style={styles.account}>
        <Account />
      </View>

      <View style={styles.touchableSinpe}>
        <TouchableOpacity onPress={() => navigation.navigate("SelectContact")}>
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
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 20,
    paddingRight: 20,
    gap: 10,
  },
  account: {
    alignItems: "flex-start",
    marginTop: 5,
  },
  touchableSinpe: {
    width: "100%",
    alignItems: 'center',
  },
  table: {
    flex: 1,
    width: "100%",
    marginTop: 25,
  },
});

export default Home;
