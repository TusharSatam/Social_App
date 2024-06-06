import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProtectedRoute from "./src/components/ProtectedRoute";
import { AlertNotificationRoot } from 'react-native-alert-notification';

function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AlertNotificationRoot>
          <ProtectedRoute />
        </AlertNotificationRoot>
      </GestureHandlerRootView>
    </SafeAreaView>
  );

}

export default App;
