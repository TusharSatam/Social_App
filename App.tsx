import {Platform, SafeAreaView} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import ProtectedRoute from "./src/components/ProtectedRoute";
import {AlertNotificationRoot} from "react-native-alert-notification";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import { useEffect } from "react";
import { Notifications } from 'react-native-notifications';
function App() {
    const saveFcmToken = async () => {
        console.log("ininin");

        Notifications.registerRemoteNotifications();
    
        Notifications.events().registerRemoteNotificationsRegistered((event) => {
            const fcmToken = event.deviceToken;
            console.log(fcmToken);
            
        });
    
        Notifications.events().registerRemoteNotificationsRegistrationFailed((event) => {
            console.error(event);
        });
            Notifications.registerRemoteNotifications();
    };
    
    useEffect(() => {
        
        saveFcmToken();
    }, []);
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            <GestureHandlerRootView style={{flex: 1}}>
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
