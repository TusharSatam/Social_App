import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import ExploreFeeds from "./components/ExploreFeeds";
import SearhExploreIcon from "@social/components/SvgIcons/ExploreScreenIcons/SearchExploreIcon";
import CloseSearchIcon from "@social/components/SvgIcons/ExploreScreenIcons/CloseSearchIcon";

import { typography } from "@social/utils/typography";
import RecentSearch from "./components/RecentSearch";
import SearchResults from "./components/SearchResults";
import { TouchableOpacity } from "react-native-gesture-handler";

const Explore = () => {
    const [view, setView] = useState('ExploreFeeds'); // Track the current view
    const [searchQuery, setSearchQuery] = useState(''); // Track the search input value

    const handleFocus = () => {
        setView('RecentSearch');
    };

    const handleChangeText = (text) => {
        setSearchQuery(text);
        if (text.length > 0) {
            setView('SearchResults');
        } else {
            setView('RecentSearch');
        }
    };

    const handleCloseSearch = () => {
        setSearchQuery('');
        setView('ExploreFeeds');
    }
    const renderContent = () => {
        switch (view) {
            case 'ExploreFeeds':
                return <ExploreFeeds />;
            case 'RecentSearch':
                return <RecentSearch />;
            case 'SearchResults':
                return <SearchResults />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.exploreContainer}>
            <View style={styles.exploreSearchWrapper}>
                <SearhExploreIcon />
                <TextInput
                    placeholder="Search"
                    style={styles.searchTextInput}
                    placeholderTextColor={"#797979"}
                    onFocus={handleFocus}
                    onChangeText={handleChangeText}
                    value={searchQuery}
                />
                {searchQuery?.length > 0 && <TouchableOpacity onPress={handleCloseSearch}>
                    <CloseSearchIcon />
                </TouchableOpacity>}
            </View>
            {renderContent()}
        </View>
    );
};

const styles = StyleSheet.create({
    exploreContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingTop: 26.98,
    },
    exploreSearchWrapper: {
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 9,
        paddingHorizontal: 11,
        width: "100%",
        backgroundColor: "#f6f6f6",
    },
    searchTextInput: {
        fontSize: 15,
        fontFamily: typography.sfRegular,
        color: "black",
        paddingVertical: 8,
        flex: 1,
    },
});

export default Explore;
