import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";

// Navigation
import { useNavigation } from "@react-navigation/native";

// Components
import Button from "../components/Button";
import TransactionHeader from "../components/TransactionHeader";
import TransactionDetails from "../components/TransactionDetails";

type DetailScreenRouteProp = RouteProp<RootStackParamList, "Detail">;

type DetailProps = {
  route: DetailScreenRouteProp;
};

// format balance
const formatCurrency = (value: number) => {
  return `¢${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Function to format date and hour
const formatDate = (dateString: string) => {
  const date = new Date(dateString); // transforms the string to a Date object

  // date format
  const dateFormatter = new Intl.DateTimeFormat("es-CR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedDate = dateFormatter.format(date);

  // time format
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const formattedTime = timeFormatter.format(date);

  return `${formattedDate}, ${formattedTime}`;
};

//function to get initials
const getInitials = (name: string) => {
  const nameParts = name.split(" "); // Divide the full name into parts
  const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
  const lastNameInitial =
    nameParts.length > 1 ? nameParts[1].charAt(0).toUpperCase() : ""; // if exist, get first letter of last name
  return `${firstNameInitial}${lastNameInitial}`; // return initials
};

const Detail = ({ route }: DetailProps) => {
  const navigation = useNavigation();
  const { transaction } = route.params; // here are the parameters

  const initials = getInitials(transaction.ContactName); // call function to get initials
  const formattedAmount = formatCurrency(transaction.Amount); // format the amount

  return (
    <View style={styles.container}>
      <TransactionHeader
        transactionType={`${transaction.TransactionType} - ${transaction.ContactName}`}
        transactionAmount={formattedAmount}
        initials={initials}
      />
      <TransactionDetails
        date={formatDate(transaction.DateHour)}
        description={transaction.Detail}
        movementType={transaction.TransactionType}
      />
      <View style={styles.button}>
        <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

// component styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',  // Ensure the content is stacked vertically
    justifyContent: 'space-between',  // Space between elements, pushing the button to the bottom
    padding: 20,
    backgroundColor: "#fff",
  },
  button:{
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});

export default Detail;
