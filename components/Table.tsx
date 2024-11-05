import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';


type TableRow = {
  title: string;
  subtitle: string;
  number: string;
};

type TableProps = {
  data: TableRow[]; //Array of row data to display in the table.
  fontsLoaded: boolean;
};

const Table = ({ data, fontsLoaded }: TableProps) => {
  

  // Return null if fonts are not loaded yet
  if (!fontsLoaded) {
    return null; 
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
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.subtitleText}>{item.subtitle}</Text>
            </View>
            <Text style={styles.rightText}>{item.number}</Text>
          </View>
        )}
      />
    </View>
  );
};

// component styles
const styles = StyleSheet.create({
  container: {
    height: 'auto',
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
    fontFamily: 'RedHatDisplay_700Bold',
    color: '#F44336',
  },
});

export default Table;
