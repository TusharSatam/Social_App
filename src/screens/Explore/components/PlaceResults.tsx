import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import PlaceItem from './PlaceItem';
import { useGetSearchLocationsQuery } from '@social/redux/services/auth/authApi';
import FetchingLoader from '@social/components/Loader/FetchingLoader';
import CustomText from '@social/components/Text/CustomText';

const PlaceResults = ({ searchQuery }) => {
    const { data: searchedLocations, isLoading: isSearchingLocations, error, refetch } = useGetSearchLocationsQuery({ searchText: searchQuery });
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if (searchedLocations) {
            setLocations(searchedLocations?.data);
        }
    }, [searchedLocations]);

    useEffect(() => {
        refetch();
    }, [searchQuery]);

    const renderItem = ({ item, index }) => (
        <PlaceItem item={item} index={index} key={`location${index}`} />
    );

    if (isSearchingLocations) {
        return <FetchingLoader />;
    }

    if (error) {
        return <CustomText>Error loading data</CustomText>;
    }

    return (
        <View style={styles.placeResultsContainer}>
            {locations && locations.length > 0 ? (
                <FlatList
                    data={locations}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `item${index}`}
                />
            ) : (
                <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CustomText>No results found</CustomText>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    placeResultsContainer: {
        flex: 1,
        display: 'flex',
        gap: 14,
        width: '100%',
    },
});

export default PlaceResults;
