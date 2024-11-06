import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface TransactionHeaderProps {
  transactionType: string;
  transactionAmount: string;
  initials: string;
}

const TransactionHeader = ({ transactionType, transactionAmount, initials } : TransactionHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.transactionType}>{transactionType}</Text>
        <Text style={styles.transactionAmount}>{transactionAmount}</Text>
      </View>
    </View>
  );
};

// component styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarContainer: {
    backgroundColor: '#C6C7FF',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 7,
  },
  avatarText: {
    color: '#3130C6',
    fontSize: 18,
  },
  detailsContainer: {
    marginTop: 15,
    marginBottom: 40,
    gap: 5,
  },
  transactionType: {
    fontSize: 14,
    fontFamily: "RedHatDisplay_400Regular",
    textAlign: 'center',
    marginTop: 5,
    color: '#3E3E3E',
  },
  transactionAmount: {
    fontSize: 22,
    fontFamily: 'RedHatDisplay_700Bold',
    textAlign: 'center',
    color: '#3E3E3E',
  },
});

export default TransactionHeader;
