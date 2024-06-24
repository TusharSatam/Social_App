import { Platform, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProtectedRoute from "./src/components/ProtectedRoute";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import { Notifications } from 'react-native-notifications';
import { useSaveUserFcmTokenMutation } from "@social/redux/services/auth/authApi";
import { useSelector } from "react-redux";
function App() {
    const [saveUserFcmToken, { isLoading: isSavingFCMToken }] = useSaveUserFcmTokenMutation();
    const [fcmToken, setfcmToken] = useState<string | null>(null)
    const loggedInProfileData = useSelector((state: any) => state.auth);
    const saveFcmToken = async () => {

        Notifications.registerRemoteNotifications();

        Notifications.events().registerRemoteNotificationsRegistered((event) => {
            const fcmToken = event.deviceToken;
            console.log(fcmToken);
            setfcmToken(fcmToken)


        });

        Notifications.events().registerRemoteNotificationsRegistrationFailed((event) => {
            console.error(event);
        });
        Notifications.registerRemoteNotifications();
    };

    useEffect(() => {
        saveFcmToken();
    }, []);
    const SaveDeviceFcmToken = async () => {
        console.log("in SaveDeviceFcmToken");
        let saveFCMTokenResponse = await saveUserFcmToken({ userId: loggedInProfileData?.user?._id, fcmToken: fcmToken }).unwrap();
        console.log("saveFCMTokenResponse",saveFCMTokenResponse);
    }
    useEffect(() => {
        if (fcmToken && loggedInProfileData?.user?._id) {
            SaveDeviceFcmToken()
        }
    }, [fcmToken,loggedInProfileData])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <AlertNotificationRoot>
                        <ProtectedRoute />
                    </AlertNotificationRoot>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
}

export default App;
