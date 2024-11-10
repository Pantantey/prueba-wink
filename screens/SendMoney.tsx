import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type SendMoneyNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SendMoney"
>;

// Components
import Button from "../components/Button";

const SendMoney = ({ route }: any) => {
  const navigation = useNavigation<SendMoneyNavigationProp>();

  // Get contact and transactionId from route params
  const { contact, transactionId } = route.params;

  // State to manage the inputs
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAmountChange = (text: string) => {
    if (/^\d*$/.test(text)) {
      setAmount(text);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true); // show loading screen
    try {
      const transactionAmount = Number(amount);
      if (isNaN(transactionAmount) || transactionAmount <= 0) {
        Alert.alert("Monto inválido", "El monto debe ser mayor a cero.", [
          { text: "Aceptar" },
        ]);
        setIsLoading(false);
        return;
      }

      // lambda function to rest amount to the balance
      const userId = "Andrey";
      const getAmount = transactionAmount;
      const balanceUrl = `https://uatln5pjy4.execute-api.us-east-1.amazonaws.com/balance?userId=${userId}&transactionAmount=${getAmount}`;

      const balanceResponse = await fetch(balanceUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const balanceData = await balanceResponse.json();

      if (!balanceResponse.ok) {
        Alert.alert(
          "Saldo Insuficiente",
          "El saldo en su cuenta es inferior al monto a transferir.",
          [{ text: "Aceptar" }]
        );
        setIsLoading(false);
        return;
      }

      const { availableBalance } = balanceData;
      if (availableBalance < transactionAmount) {
        Alert.alert(
          "Saldo Insuficiente",
          "El saldo en su cuenta es inferior al monto a transferir.",
          [{ text: "Aceptar" }]
        );
        setIsLoading(false);
        return;
      }

      const transactionDetail = detail.trim() === "" ? "Sin descripción" : detail;
      const updatedTransactionId = Number(transactionId);

      //lambda function to add an item to the table
      const transactionParams = {
        TransactionId: updatedTransactionId,
        Amount: transactionAmount,
        ContactName: `${contact.firstName} ${contact.lastName}`,
        Detail: transactionDetail,
      };

      const transactionResponse = await fetch(
        "https://bri674d514.execute-api.us-east-1.amazonaws.com/transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transactionParams),
        }
      );

      const transactionData = await transactionResponse.json();

      if (transactionResponse.ok) {
        Alert.alert("Transacción exitosa", "La transacción fue realizada.", [
          { text: "Aceptar" },
        ]);
        navigation.navigate("Home", { refresh: true });
      } else {
        Alert.alert("Error de Transacción", "Ha ocurrido un error inesperado.", [
          { text: "Aceptar" },
        ]);
      }
    } catch (error) {
      Alert.alert("Error de Transacción", "Ha ocurrido un error inesperado.", [
        { text: "Aceptar" },
      ]);
    } finally {
      setIsLoading(false); // Ocultar la pantalla de carga
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={90} color="#4C51F7" />
          <Text style={styles.loadingText}>Procesando transacción...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.inputTitle}>Transferir a</Text>

          <View style={styles.contactContainer}>
            <View style={styles.icon}>
              <Text style={styles.iconText}>
                {contact.firstName.charAt(0).toUpperCase()}
                {contact.lastName.charAt(0).toUpperCase()}
              </Text>
            </View>

            <View style={styles.contactInfo}>
              <Text style={styles.name}>
                {contact.firstName} {contact.lastName}
              </Text>
              <Text style={styles.phone}>
                {contact.phoneNumbers && contact.phoneNumbers.length > 0
                  ? contact.phoneNumbers[0].number
                  : "No hay número de teléfono disponible"}
              </Text>
            </View>
          </View>

          <Text style={styles.inputTitle}>Monto</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.colonSymbol}>₡</Text>
            <TextInput
              style={[styles.input, { paddingLeft: 4 }]}
              keyboardType="numeric"
              value={amount}
              onChangeText={handleAmountChange}
              maxLength={10}
            />
          </View>

          <Text style={styles.inputTitle}>Detalle</Text>
          <TextInput
            style={[styles.input, styles.detailInput]}
            placeholder="Escribe un detalle"
            value={detail}
            onChangeText={setDetail}
            multiline
          />

          <View style={styles.buttonContainer}>
            <Button title="Confirmar" onPress={handleConfirm} />
          </View>
        </>
      )}
    </View>
  );
};

//component styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#4C51F7",
    fontFamily: "RedHatDisplay_700Bold",
  },
  contactContainer: {
    flexDirection: "row",
    marginBottom: 28,
    marginTop: 13,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#C6C7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
  },
  iconText: {
    color: "#3130C6",
    fontSize: 18,
    marginBottom: 2,
    fontFamily: "RedHatDisplay_400Regular",
  },
  contactInfo: {
    flexDirection: "column",
  },
  name: {
    fontSize: 18,
    fontFamily: "RedHatDisplay_400Regular",
    color: "#3E3E3E",
    marginBottom: 3,
    marginTop: 3,
  },
  phone: {
    fontSize: 12,
    fontFamily: "RedHatDisplay_400Regular",
    color: "#4C51F7",
  },
  inputTitle: {
    fontSize: 16,
    marginTop: 20,
    alignSelf: "flex-start",
    fontFamily: "RedHatDisplay_700Bold",
    color: "#4C51F7",
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#CECECE",
    borderRadius: 24,
    paddingLeft: 15,
  },
  colonSymbol: {
    color: "#3E3E3E",
    fontSize: 14,
    fontFamily: "RedHatDisplay_400Regular",
  },
  input: {
    fontSize: 14,
    paddingLeft: 16,
    color: "#3E3E3E",
    fontFamily: "RedHatDisplay_400Regular",
    width: 100,
  },
  detailInput: {
    width: "100%",
    borderRadius: 24,
    height: 48,
    borderWidth: 1,
    borderColor: "#CECECE",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});

export default SendMoney;
