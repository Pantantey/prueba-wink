import React from "react";
import { StyleSheet, Text, View } from "react-native";


const Hello = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World dasdasdas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: "#318ecf",
    alignItems: "center",
  },
  text: {
    color: "#a314ea",
  }
});

export default Hello;
