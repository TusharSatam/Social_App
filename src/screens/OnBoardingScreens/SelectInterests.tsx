import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Alert, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import AuthHeader from '../../components/AuthComponents/AuthHeader';
import { CommonActions, useNavigation } from '@react-navigation/native';
import PrimaryBtn from '../../components/Buttons/PrimaryBtn';
import CustomText from '../../components/Text/CustomText';

// Import your SVG icons
import GamingIcon from '../../components/SvgIcons/GamingIcon';
import MusicIcon from '../../components/SvgIcons/MusicIcon';
import BookIcon from '../../components/SvgIcons/BookIcon';
import LanguageIcon from '../../components/SvgIcons/LanguageIcon';
import Photography from '../../components/SvgIcons/Photography';
import Fashion from '../../components/SvgIcons/Fashion';
import Nature from '../../components/SvgIcons/Nature';
import Animal from '../../components/SvgIcons/Animal';
import Fitness from '../../components/SvgIcons/Fitness';
import Arts from '../../components/SvgIcons/Arts';
import Football from '../../components/SvgIcons/Football';
import Finance from '../../components/SvgIcons/Finance';
import Technology from '../../components/SvgIcons/Technology';
import Business from '../../components/SvgIcons/Business';
import Travel from '../../components/SvgIcons/Travel';
import Cars from '../../components/SvgIcons/Cars';
import { useUpdateUserDataMutation } from '../../redux/services/auth/authApi';
import { useSelector } from 'react-redux';
import { typography } from '@social/utils/typography';
interface UpdateData {
    Interests?: string[];
}
const SelectInterests = () => {
    const navigation = useNavigation();
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [fomrError, setFormError] = useState<string>('');
    const [updateUserData, { isLoading }] = useUpdateUserDataMutation();

    const Interests = [
        { image: GamingIcon, name: "Gaming", isSvg: true },
        { image: MusicIcon, name: "Music" },
        { image: BookIcon, name: "Books" },
        { image: LanguageIcon, name: "Language" },
        { image: Photography, name: "Photography" },
        { image: Fashion, name: "Fashion" },
        { image: Nature, name: "Nature" },
        { image: Fitness, name: "Fitness" },
        { image: Animal, name: "Animal" },
        { image: Arts, name: "Arts" },
        { image: Football, name: "Football" },
        { image: Finance, name: "Finance" },
        { image: Technology, name: "Technology" },
        { image: Business, name: "Business" },
        { image: Travel, name: "Travel" },
        { image: Cars, name: "Cars" },
    ];

    const toggleInterest = (interestName: any) => {
        setSelectedInterests((prevState: any) => {
            if (prevState.includes(interestName)) {
                return prevState.filter((name: any) => name !== interestName);
            } else if (prevState.length < 5) {
                return [...prevState, interestName];
            } else {
                return prevState;
            }
        });
    };

    const handleDone = async () => {
        setFormError('')
        if (selectedInterests.length < 1) {
            setFormError('Please select at least one interest.');
            return;
        } else if (selectedInterests.length > 5) {
            setFormError('Select up to 5 interests');
            return;
        }
        else {
            try {
                const Interests: UpdateData = {
                    Interests: selectedInterests
                }
                const updateResponse = await updateUserData(Interests).unwrap();
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'MainStack' }],
                    })
                );
                (navigation as any).navigate('HomeScreen');

            } catch (error) {
                console.error('Error saving interests:', error);
                setFormError('There was a problem saving your interests')
            }
        }
    };

    return (
        <View className="flex-1 justify-start items-center bg-white">
            {
                isLoading ?
                    <View className="absolute h-full w-full inset-0 flex justify-center items-center bg-white bg-opacity-50">
                        < ActivityIndicator size="large" color="#FF4D67" />
                    </View >
                    :
                    <>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="w-full">
                            <View style={styles.sidePadding}>
                                <AuthHeader title="Select up to 5 interests" description="Discover Meaningful Connections by Selecting Your Interests" backArrow descriptionClass={styles.descriptionClass} containerClass={styles.containerClass} />
                            </View>
                            <View style={styles.interestsContainer}>
                                {fomrError ? <View className='flex justify-center items-center'>
                                    <CustomText className='text-[#F04438] text-[sm]'>{fomrError}</CustomText>
                                </View> : null}
                                <View style={styles.interestsWrapper}>
                                    {Interests.map((Interest, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.interestItem,
                                                (selectedInterests as any).includes(Interest.name) ? styles.selectedInterest : styles.unselectedInterest
                                            ]}
                                            // className={`rounded-full p-[5px] h-[42px] pl-[14px] pr-[16px] flex flex-row items-center justify-center ${(selectedInterests as any).includes(Interest.name) ? 'bg-primaryColor' : 'bg-lightGray'}`}
                                            onPress={() => toggleInterest(Interest.name)}
                                        >
                                            {Interest?.image && <Interest.image isSelected={(selectedInterests as any).includes(Interest.name)} />}
                                            <CustomText style={styles.fontMedium} className={`!font-medium text-Gray text-[14px] ml-[7px] ${(selectedInterests as any).includes(Interest.name) ? 'text-white' : 'text-Gray'}`}>{Interest.name}</CustomText>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <View style={styles.sidePadding} >
                                    <PrimaryBtn onPress={handleDone} btnText="Done" btnClass="my-3" />
                                </View>
                            </View>
                        </ScrollView>
                    </>
            }
        </View>
    );
};
const styles = StyleSheet.create({
    fontMedium: {
        fontFamily: typography.sfMedium,
    },
    interestsContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        marginTop: 28,
        borderColor: "black",
        paddingHorizontal: 8,
    },
    interestsWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 17,
    },
    descriptionClass: {
        width: 320,
    },
    containerClass: {
        marginBottom: 40,
    },
    sidePadding: {
        paddingHorizontal: 26,
        width: "100%"
    },
    interestItem: {
        borderRadius: 50,
        padding: 5,
        height: 42,
        paddingLeft: 14,
        paddingRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedInterest: {
        backgroundColor: '#FF4D67',
    },
    unselectedInterest: {
        backgroundColor: "#F6F6F6",
    },
});
export default SelectInterests;
