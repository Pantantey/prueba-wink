import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

type TableRow = {
  title: string;
  subtitle: string;
  number: string;
  transaction: any;
};

type TableProps = {
  data: TableRow[];
  onSelectTransaction: (transaction: any) => void; // Function to transaction selection
};

const Table = ({ data, onSelectTransaction }: TableProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectTransaction(item.transaction)}>
            <View style={styles.row}>
              <View style={styles.leftContainer}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.subtitleText}>{item.subtitle}</Text>
              </View>
              <Text style={styles.rightText}>{item.number}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

//component styles
const styles = StyleSheet.create({
  container: {

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
    fontFamily: "RedHatDisplay_400Regular",
  },
  subtitleText: {
    fontSize: 12,
    color: '#555',
    fontFamily: "RedHatDisplay_400Regular",
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
