import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

//components
import Button from "../components/Button";
import TransactionHeader from "../components/TransactionHeader";
import TransactionDetails from "../components/TransactionDetails";

type DetailProps = {
  fontsLoaded: boolean;
};

const Detail = ({ fontsLoaded }: DetailProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.transactionHeader}>
        <TransactionHeader
          transactionType="SINPE móvil - Carlos Naranjo"
          transactionAmount="₡30,000.00"
          initials="CN"
        />
      </View>
      <View style={styles.transactionDetails}>
        <TransactionDetails
          date="12 de Octubre 2022, 12:15 pm"
          description="Fiesta de Hallowink"
          movementType="SINPE móvil"
        />
      </View>

      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  transactionHeader: {
    
  },
  transactionDetails: {

  },
});

export default Detail;
