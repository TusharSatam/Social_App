import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import CustomText from '../Text/CustomText';
import BackIcon from '../SvgIcons/NavigationHeaderIcons/BackIcon';

interface ScreenHeaderProps {
    navigation: NavigationProp<any>;
    headerName?: string;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ navigation, headerName }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
                <BackIcon />
            </TouchableOpacity>
            <CustomText style={styles.headerText}>{headerName || "None"}</CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        justifyContent: 'center',
        position: 'relative',
    } as ViewStyle,
    backArrow: {
        position: 'absolute',
        left: 0,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
    } as TextStyle,
});

export default ScreenHeader;
