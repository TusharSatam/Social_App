import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification'
import { Text } from 'react-native-svg'
import GoogleIcon from '../../../assets/icons/googleIcon.svg'
import FacebookIcon from '../../../assets/icons/facebookIcon.svg'
import CustomText from '../Text/CustomText'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native'
import { typography } from '@social/utils/typography'

GoogleSignin.configure({
    webClientId: '500310476138-34o1401e63au8jo4r3g74v9ald288pfg.apps.googleusercontent.com'
})
const SocialMediaSignin = () => {
    // const navigation = useNavigation()
    const handleGoogleSignup = async () => {
        try {
            console.log("start");

            // await GoogleSignin.signOut();
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
            console.log(idToken);

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(statusCodes.SIGN_IN_CANCELLED);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(statusCodes.IN_PROGRESS);

            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log(statusCodes.PLAY_SERVICES_NOT_AVAILABLE);
            }
            else {
                console.log("error.message", error.message);
            }
        }

        // //Todo:remove toast during api intgration 
        // Dialog.show({
        //     type: ALERT_TYPE.WARNING,
        //     title: 'Info',
        //     textBody: 'Google authentication is still under development.',
        //     button: 'close',
        // })
    };
    const handleFacebookSignup = () => {
        // Add signup logic here
        //Todo:remove toast during api intgration 
        Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'Info',
            textBody: 'Facebook authentication is still under development.',
            button: 'close',
        })
    };

    // useEffect(() => {
    //     const unsubscribe = auth().onAuthStateChanged(user => {
    //         if (user) {
    //             console.log(user);

    //         }
    //         else {
    //             console.log("no user affected");
    //             // navigation.navigate("AuthStack")
    //         }
    //     })
    //     return () => unsubscribe()
    // }, [])

    return (
        <View className='flex w-full'>
            <View className='flex justify-center items-center w-[304px] flex-row gap-2 mx-auto'>
                <View className='h-[1px] bg-Gray  w-[90px]'></View>
                <CustomText className='text-Gray font-medium text-[16px] whitespace-nowrap' style={styles.orSignInWith}>Or sign in with</CustomText>
                <View className='h-[1px] bg-Gray  w-[90px]'></View>
            </View>
            <View className='socialMedia flex flex-row  justify-center items-center gap-4 h-[72px] my-[36px]'>
                <TouchableOpacity onPress={handleGoogleSignup}>
                    <View style={styles.iconContainer}>
                        <GoogleIcon width={24} height={24} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFacebookSignup}>
                    <View style={styles.iconContainer}>
                        <FacebookIcon width={24} height={24} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    orSignInWith: {
        fontSize: 16,
        color: "#797979",
        fontFamily: typography.sfMedium,
    },
    iconContainer: {
        borderRadius: 36, // half of the height and width to make it circular
        height: 72,
        width: 72,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        borderWidth: 2,
        borderColor: '#F1F1F1', // replace 'lightGray' with the actual color
    },
});
export default SocialMediaSignin