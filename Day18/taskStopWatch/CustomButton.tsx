import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  title: string;
  background: string;
  disabled: boolean;
  onPress: () => void;
};

function CustomButton(props: Props) {
  let { title, background, disabled, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={disabled ? [styles.btnDisabled, { backgroundColor: background }] : [styles.button, { backgroundColor: background }]}
      disabled={disabled}
    >
      <View style={styles.btnTitleParent}>
        <Text style={styles.btnTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  btnDisabled: {
    opacity: 0.5,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  btnTitleParent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 95,
    height: 95,
  },
  btnTitle: {
    fontSize: 18,
  },
});

export default CustomButton;
