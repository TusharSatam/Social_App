import {SafeAreaView} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import ProtectedRoute from "./src/components/ProtectedRoute";
import {AlertNotificationRoot} from "react-native-alert-notification";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {useEffect} from "react";

function App() {
    useEffect(() => {}, []);

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
