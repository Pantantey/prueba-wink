import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";

//components
import Button from "../components/Button";

const SendMoney = ({ route }: any) => {

  const navigation = useNavigation();
  
  // Obtener el contacto desde los parámetros de la ruta
  const { contact } = route.params;

  // Estado para manejar los inputs
  const [amount, setAmount] = useState('');
  const [detail, setDetail] = useState('');

  // Función para formatear el monto y asegurarse de que solo sean números
  const handleAmountChange = (text: string) => {
    if (/^\d*$/.test(text)) {
      setAmount(text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputTitle}>Transferir a</Text>

      <View style={styles.contactContainer}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>
            {contact.firstName.charAt(0).toUpperCase()}{contact.lastName.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.name}>
            {contact.firstName} {contact.lastName}
          </Text>
          <Text style={styles.phone}>
            {contact.phoneNumbers && contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : 'No phone number available'}
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
        <Button title="Confirmar" onPress={() => navigation.navigate("Home")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  contactContainer: {
    flexDirection: 'row',
    marginBottom: 28,
    marginTop: 13,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#C6C7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  iconText: {
    color: '#3130C6',
    fontSize: 18,
    marginBottom: 2,
    fontFamily: "RedHatDisplay_400Regular",
  },
  contactInfo: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    fontFamily: "RedHatDisplay_400Regular",
    color: '#3E3E3E',
    marginBottom: 3,
    marginTop: 3,
  },
  phone: {
    fontSize: 12,
    fontFamily: "RedHatDisplay_400Regular",
    color: '#4C51F7',
  },
  inputTitle: {
    fontSize: 16,
    marginTop: 20,
    alignSelf: 'flex-start',
    fontFamily: 'RedHatDisplay_700Bold',
    color: '#4C51F7',
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#CECECE',
    borderRadius: 24,
    paddingLeft: 15,
  },
  colonSymbol: {
    color: '#3E3E3E',
    fontSize: 14,
    fontFamily: "RedHatDisplay_400Regular",
  },
  input: {
    fontSize: 14,
    paddingLeft: 16,
    color: '#3E3E3E',
    fontFamily: "RedHatDisplay_400Regular",
    width: 100,
  },
  detailInput: {
    width: '100%',
    borderRadius: 24,
    height: 48,
    borderWidth: 1,
    borderColor: '#CECECE',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});

export default SendMoney;
