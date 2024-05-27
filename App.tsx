import * as React from 'react';
import { SafeAreaView  } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProtectedRoute from './src/components/ProtectedRoute';

function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ProtectedRoute />
    </SafeAreaView>
  );
}

export default App;
