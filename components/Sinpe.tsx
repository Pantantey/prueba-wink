import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const Sinpe = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/sinpe.png')} style={styles.image} />
      <Text style={styles.text}>SINPE{"\n"}móvil</Text>
    </View>
  );
};

//component styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 56,
    height: 56,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'RedHatDisplay_700Bold',
    color: '#4C51F7',
    textAlign: 'center'
  }
});

export default Sinpe;
