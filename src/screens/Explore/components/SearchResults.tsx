import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '@social/components/Text/CustomText';
import { typography } from '@social/utils/typography';
import AccountResults from './AccountResults';
import PlaceResults from './PlaceResults';

const SearchResults = () => {
    const [activeTab, setActiveTab] = useState('Accounts');

    const renderContent = () => {
        switch (activeTab) {
            case 'Accounts':
                return <AccountResults />;
            case 'Places':
                return <PlaceResults />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.searchResult}>
            <View style={{ height: 33, width: "100%" }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.TabsWrapper}>

                    <TouchableOpacity
                        style={[styles.Tab, activeTab === 'Accounts' && styles.activeTab]}
                        onPress={() => setActiveTab('Accounts')}
                    >
                        <CustomText style={[styles.tabText, activeTab === 'Accounts' && styles.activetabText]}>
                            Accounts
                        </CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.Tab, activeTab === 'Places' && styles.activeTab]}
                        onPress={() => setActiveTab('Places')}
                    >
                        <CustomText style={[styles.tabText, activeTab === 'Places' && styles.activetabText]}>
                            Places
                        </CustomText>
                    </TouchableOpacity>

                </ScrollView>
            </View>
            {renderContent()}
        </View>
    );
};

const styles = StyleSheet.create({
    searchResult: {
        flex: 1,
        display: 'flex',
        gap: 14,
        paddingVertical: 12,
        width: '100%',
    },
    TabsWrapper: {
        display: "flex",
        flexDirection: 'row',
        width: '100%',
        height: "100%",
    },
    Tab: {
        color: '#797979',
        backgroundColor: '#f6f6f6',
        paddingVertical: 7,
        borderRadius: 100,
        paddingHorizontal: 16,
        marginHorizontal: 5,
        textAlign: "center",
    },
    activeTab: {
        backgroundColor: '#FF4D67',
    },
    tabText: {
        fontFamily: typography.sfMedium,
        fontSize: 13,
        color: '#797979',
    },
    activetabText: {
        fontFamily: typography.sfSemiBold,
        color: 'white',
    },
    contentContainer: {
        flex: 1,
    }
});

export default SearchResults;
