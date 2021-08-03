import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import TabBarProvider from './src/Components/UI/BottonNav/context/TabBarProvider';
import { Provider as AuthProvider } from './src/Providers/AuthProvider';
import Navigation from './src/Navigation/Navigation';
import LongTimers from './src/utils/longTimers';
import { Provider as InformationProvider } from './src/Providers/InformationProviders';
import { Provider as PerfileProvider } from "./src/Providers/perfileProviders"
import { Provider as ThemesProvider } from "./src/Providers/ThemeProvider"
import { Provider as LikesProviders } from "./src/Providers/likeProviders";
import { Provider as FollowProviders } from "./src/Providers/FollowProvider"

const Stack = createStackNavigator();
LongTimers();

export default function App() {
  return (
    <AuthProvider>
      <InformationProvider>
        <PerfileProvider>
          <FollowProviders>
            < ThemesProvider >
              <LikesProviders>
                < ThemeProvider >
                  <SafeAreaProvider>
                    <TabBarProvider>
                      <Navigation />
                    </TabBarProvider>
                  </SafeAreaProvider>
                </ThemeProvider >
              </LikesProviders>
            </ ThemesProvider>
          </FollowProviders>
        </PerfileProvider>
      </InformationProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
