import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

// Components
import Logo from "../components/Logo";
import Sinpe from "../components/Sinpe";
import TableData from "../components/TableData";
import Account from "../components/Account";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type HomeProps = {
  fontsLoaded: boolean;
};

export type Transaction = {
  Amount: number;
  ContactName: string;
  DateHour: string;
  TransactionType: string;
  Detail: string;
};

const Home = ({ fontsLoaded }: HomeProps) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);  // Almacena todas las transacciones
  const [visibleTransactions, setVisibleTransactions] = useState<any[]>([]); // Almacena las transacciones que se mostrarán en la tabla
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [firstTransactionId, setFirstTransactionId] = useState<number | null>(null);

  // Lambda function to get balance
  const fetchBalance = async () => {
    try {
      setLoading(true);
      setError(null);

      const userId = "Andrey";
      const transactionAmount = 0;
      const url = `https://uatln5pjy4.execute-api.us-east-1.amazonaws.com/balance?userId=${userId}&transactionAmount=${transactionAmount}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener el balance");
      }

      const data = await response.json();
      if (data.balance !== undefined) {
        setBalance(data.balance);
      } else {
        setError(data.message || "No se pudo obtener el balance");
      }
    } catch (err) {
      setError("Error desconocido");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Lambda function to get all transactions (only once)
  const fetchTransactions = async () => {
    try {
      const userId = "Andrey";
      const url = `https://qtuq77g6a4.execute-api.us-east-1.amazonaws.com/details?userId=${userId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener las transacciones");
      }

      const data = await response.json();
      const transactionsData = data.transactions || [];
      setTransactions(transactionsData);

      // show first 10 items
      setVisibleTransactions(transactionsData.slice(0, 10));

      // save the first transactionID
      if (transactionsData.length > 0) {
        setFirstTransactionId(transactionsData[0].TransactionId);
      }
    } catch (err) {
      setError("Error desconocido al obtener transacciones");
    }
  };

  // Function to load more transactions (10 more)
  const loadMoreTransactions = async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);

    const nextTransactions = transactions.slice(visibleTransactions.length, visibleTransactions.length + 10);
    if (nextTransactions.length === 0) {
      setIsLoadingMore(false);  // No more transactions
      return;
    }

    setVisibleTransactions((prevTransactions) => [
      ...prevTransactions,
      ...nextTransactions,
    ]);

    setIsLoadingMore(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchBalance();
      fetchTransactions();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchBalance();
    fetchTransactions();
  };

  const onSelectTransaction = (transaction: any) => {
    navigation.navigate("Detail", { transaction });
  };

  const renderItem = () => {
    return (
      <>
        <View style={styles.logo}>
          <Logo />
        </View>

        <View style={styles.account}>
          <Account balance={balance} error={error} />
        </View>

        <View style={styles.touchableSinpe}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SelectContact", {
                transactionId: firstTransactionId,
              })
            }
          >
            <Sinpe />
          </TouchableOpacity>
        </View>

        <View style={styles.table}>
          <Text style={styles.tableHeader}>Movimientos</Text>
          <TableData
            transactions={visibleTransactions}
            onSelectTransaction={onSelectTransaction}
          />
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size={90} color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={[{}]}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMoreTransactions}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isLoadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    gap: 10,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 9999,
  },
  logo: {
    alignItems: "center",
    marginLeft: 10,
  },
  account: {
    alignItems: "flex-start",
    marginTop: 25,
  },
  touchableSinpe: {
    width: "100%",
    alignItems: "center",
    marginVertical: 15,
  },
  tableHeader: {
    fontSize: 20,
    marginBottom: 12,
    fontFamily: "RedHatDisplay_700Bold",
  },
  table: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    marginBottom: 30,
  },
});

export default Home;
