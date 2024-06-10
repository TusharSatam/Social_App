// components/CustomText.tsx
import { typography } from '@social/utils/typography';
import * as React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

const CustomText: React.FC<TextProps> = ({ style, children, className, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props} className={` ${className}`}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontFamily:typography.sfRegular,
  },
});

export default CustomText;
