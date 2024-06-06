import {SafeAreaView} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import ProtectedRoute from "./src/components/ProtectedRoute";

function App() {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            <GestureHandlerRootView style={{flex: 1}}>
                <ProtectedRoute />
            </GestureHandlerRootView>
        </SafeAreaView>
    );
}

export default App;
