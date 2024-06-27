/**
 * @format
 */

import {AppRegistry} from "react-native";
import App from "./App.tsx";
import {name as appName} from "./app.json";
import {Provider} from "react-redux";
import store from "./src/redux/store.js";
import {NativeModules} from "react-native";
import messaging from "@react-native-firebase/messaging";
// useEffect(() => {
// if (__DEV__) {
//   NativeModules.DevSettings.setIsDebuggingRemotely(true);
// }
// }, []);

messaging().setBackgroundMessageHandler(async remoteMessage=>{
    console.log('Message handledin the background!',remoteMessage);
})
messaging().getInitialNotification(async remoteMessage=>{
    console.log('Message handledin the background!',remoteMessage);
})

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);
AppRegistry.registerComponent(appName, () => Root);
