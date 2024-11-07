// SearchBar.tsx
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearch }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Search Contacts"
      value={searchQuery}
      onChangeText={onSearch}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
});

export default SearchBar;
