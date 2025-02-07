import React from 'react';
import { SafeAreaView } from 'react-native';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginScreen />
    </SafeAreaView>
  );
};

export default App;
