import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFonts, RedHatDisplay_400Regular, RedHatDisplay_700Bold } from '@expo-google-fonts/red-hat-display';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

type TableRow = {
  title: string;
  subtitle: string;
  number: string;
};

type TableComponentProps = {
  data: TableRow[];
};

const TableComponent = ({ data }: TableComponentProps) => {
  const [fontsLoaded] = useFonts({
    RedHatDisplay_400Regular,
    RedHatDisplay_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Oculta la pantalla de carga cuando las fuentes se han cargado
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // No muestra nada hasta que las fuentes se hayan cargado
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Movimientos</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.leftContainer}>
              <Text style={[styles.titleText]}>{item.title}</Text>
              <Text style={[styles.subtitleText]}>{item.subtitle}</Text>
            </View>
            <Text style={[styles.rightText]}>{item.number}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 'auto',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    marginBottom: 12,
    fontFamily: 'RedHatDisplay_700Bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 13,
  },
  leftContainer: {
    flex: 0.6,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: "RedHatDisplay_400Regular"
  },
  subtitleText: {
    fontSize: 12,
    color: '#555',
    fontFamily: "RedHatDisplay_400Regular"
  },
  rightText: {
    flex: 0.4,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'RedHatDisplay_700Bold',
    color: '#F44336',
  },
});

export default TableComponent;
