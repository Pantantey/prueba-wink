// TransactionDetails.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TransactionDetailsProps {
  date: string;
  description: string;
  movementType: string;
}

const TransactionDetails = ({  date, description, movementType }: TransactionDetailsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fecha</Text>
      <Text style={styles.detail}>{date}</Text>

      <Text style={styles.label}>Descripción</Text>
      <Text style={styles.detail}>{description}</Text>

      <Text style={styles.label}>Tipo de Movimiento</Text>
      <Text style={styles.detail}>{movementType}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '70%',
  },
  label: {
    fontSize: 12,
    marginTop: 8,
    fontFamily: "RedHatDisplay_400Regular",
    marginBottom: 8,
    color: '#787878',
  },
  detail: {
    fontSize: 14,
    marginBottom: 30,
    fontFamily: "RedHatDisplay_400Regular",
    color: '#3E3E3E',
  },
});

export default TransactionDetails;
