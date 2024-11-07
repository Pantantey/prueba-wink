import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button = ({ title, onPress}: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

//button styles
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4C51F7',
    borderRadius: 24,
    width: '100%',
    height: 48,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'RedHatDisplay_700Bold',
    textAlign: 'center',
  },
});

export default Button;
