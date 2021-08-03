import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import { Context as AuthContext } from "../Providers/AuthProvider";
//import tabbars from '../Components/UI/'
import TabNavigator from '../Components/UI/BottonNav/Navigation/TabNavigator'
import TabBarProvider from '../Components/UI/BottonNav/context/TabBarProvider';
import Report from "../Components/Screens/Report";
import Login from '../Components/Screens/Login';
import CreateUser from "../Components/Screens/CreateUser";
//import UserPerfile from './src/Components/Screens/UserProfile'
import RecoverPassword from '../Components/Screens/RecoverPassword';

const Stack = createStackNavigator();

const Navigation = () => {
  const Tabs = () => {
    return (
      <TabNavigator />
    );
  }

  const { state, persistLogin } = useContext(AuthContext);

  // Verificar si ya existen credenciales de autenticación
  useEffect(() => {
    persistLogin();
  }, []);

  // Prevenir que se oculte la pantalla de splash
  SplashScreen.preventAutoHideAsync();

  // Ocultar la pantalla de splash al verificar que existe un token de inicio
  if (!state.loading) SplashScreen.hideAsync();

  return (
    <NavigationContainer>
      {!state.loading && (
        <>
          {state.loggedIn ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={Tabs}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>

              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CreateUser"
                component={CreateUser}
                options={{
                  headerTitleStyle: {
                    color: "white",
                  },
                  headerTitle: " ",
                  headerStyle: {
                    backgroundColor: "#2F3640",
                    borderWidth: 0,
                    borderBottomWidth: 0,
                    borderColor: "transparent"
                  }
                }}
              />
              <Stack.Screen
                name="Recover"
                component={RecoverPassword}
                options={{
                  headerShown: false,
                  headerTitle: "",
                  headerStyle: {
                    backgroundColor: "#2F3640",
                    borderWidth: 0
                  }
                }}
              />


            </Stack.Navigator>
          )}
        </>
      )}
    </NavigationContainer>
  );
};

export default Navigation;