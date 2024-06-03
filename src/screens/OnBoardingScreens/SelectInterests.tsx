import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Alert, ScrollView, ActivityIndicator } from 'react-native';
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
interface UpdateData {
    Interests?: string[];
}
const SelectInterests = () => {
    const navigation = useNavigation();
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [fomrError, setFormError] = useState<string>('');
    const [updateUserData, { isLoading }] = useUpdateUserDataMutation();
    const userData = useSelector((state: any) => state.auth)

    // useEffect(() => {
    //     if (userData?.user?.Interests?.length === 0) {
    //         //dont allow user on this screen
    //     }
    // }, [userData])

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
        if (selectedInterests?.length > 5) {
            setFormError('Select up to 5 interests')
            return
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
        <View className="flex-1 justify-start items-center bg-white p-4 px-2">
            {
                isLoading ?
                    <View className="absolute h-full w-full inset-0 flex justify-center items-center bg-white bg-opacity-50">
                        < ActivityIndicator size="large" color="#FF4D67" />
                    </View >
                    :
                    <>
                        <AuthHeader containerClass='!mt-2 !mb-10' title="Select up to 5 interests" description="Discover Meaningful Connections by Selecting Your Interests" />
                        <View className="flex justify-between items-center w-full flex-1">
                            <View className='flex justify-center items-center mb-4'>
                                <CustomText className='text-[#F04438] text-[sm]'>{fomrError}</CustomText>
                            </View>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="w-full">
                                <View className='flex flex-wrap w-full flex-row items-center justify-center gap-[13px] py-4 mx-auto'>
                                    {Interests.map((Interest, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            className={`rounded-full p-[5px] h-[42px] px-[12px] flex flex-row items-center justify-center ${(selectedInterests as any).includes(Interest.name) ? 'bg-primaryColor' : 'bg-lightGray'}`}
                                            onPress={() => toggleInterest(Interest.name)}
                                        >
                                            {Interest?.image && <Interest.image isSelected={(selectedInterests as any).includes(Interest.name)} />}
                                            <CustomText className={`!font-medium text-Gray text-[14px] ml-[7px] ${(selectedInterests as any).includes(Interest.name) ? 'text-white' : 'text-Gray'}`}>{Interest.name}</CustomText>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                            <PrimaryBtn onPress={handleDone} btnText="Done" btnClass="my-3" />
                        </View>
                    </>
            }
        </View>
    );
};

export default SelectInterests;
