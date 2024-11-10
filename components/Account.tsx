import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type AccountProps = {
  balance: number | null;
  error: string | null;
};

const Account = ({ balance, error }: AccountProps) => {
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  // Format balance
  const formattedBalance = balance !== null 
    ? `₡${balance.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : '₡0.00'; // Default value in case of error

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuenta Colones</Text>
      <Text style={styles.text}>Saldo disponible</Text>
      <Text style={styles.balance}>{formattedBalance}</Text>
      <Text style={styles.text}>¿Qué querés hacer?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  },
  error: {
    fontSize: 16,
    fontFamily: 'RedHatDisplay_400Regular',
    color: 'red',
  }
});

export default Account;
