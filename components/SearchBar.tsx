import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import SearchIcon from './SearchIcon';

interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const SearchBar = ({ searchQuery, onSearch }: SearchBarProps) => {
  return (
    <View style={styles.container}>

      <SearchIcon />
      
      <TextInput
        style={styles.input}
        placeholder="Buscá por nombre o número"
        value={searchQuery}
        onChangeText={onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderColor: '#CECECE',
    marginHorizontal: 13,
    borderWidth: 1,
    borderRadius: 24,
    paddingStart: 20,
    marginBottom: 20,
    gap: 15,
  },
  input: {
    flex: 1,
    height: '100%',
    marginBottom: 2,
    fontSize: 14,
    fontFamily: "RedHatDisplay_400Regular",
    color: '#787878',
  },
});

export default SearchBar;
