// components/CustomText.tsx
import * as React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

const CustomText: React.FC<TextProps> = ({ style, children, className, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props} className={`sfProDisplay ${className}`}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});

export default CustomText;
