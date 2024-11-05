import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type AccountProps = {
  fontsLoaded: boolean;
};

const Account = ({fontsLoaded}: AccountProps) => {
  // Return null if fonts are not loaded yet
  if (!fontsLoaded) {
    return null; 
  }

  // Format the balance with Costa Rican colones symbol
  const balance = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 2,
  }).format(36850.00);

  //return our account data
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuenta Colones</Text>
      <Text style={styles.text}>Saldo disponible</Text>
      <Text style={styles.balance}>{balance}6</Text>
      <Text style={styles.text}>¿Qué querés hacer?</Text>

    </View>
  );
};

// component styles
const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontFamily: 'RedHatDisplay_700Bold',
    color: '#4C51F7',
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    fontFamily: 'RedHatDisplay_400Regular',
  },
  balance: {
    fontSize: 32,
    fontFamily: 'RedHatDisplay_700Bold',
    marginTop: 10,
    marginBottom: 20,
  }
});

export default Account;
