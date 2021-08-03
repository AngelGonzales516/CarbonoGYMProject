// Basado en el toturial https://www.youtube.com/watch?v=bNuwwkgRQOk&t=301s
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabProvider from "../context/TabBarProvider";
//import Profile from '../Navigation/ProfileNavigator';
import TabBar from '../TabNav/TabBar';
import Feed from '../../../Screens/Feed'
import ImagePickerExample from '../../ImagePicker/ImagePicker'
import UserPerfile from '../../../Screens/UserProfile'
import SavedPost from '../../../Screens/SavedPosts'
import CreateUser from '../../../Screens/CreateUser';
import OpenPublication from '../../Publication/OpenPublication';
import SearchButton from '../../../Shared/SearchButton';
import { SearchBar } from 'react-native-elements';
import Login from "../../../Screens/Login";
import SearchPublication from '../../../Screens/SearchPublication';
import UserOptions from "../../../Screens/UserOptions";
import editPerfile from "../../../Screens/editPerfile"
import NewPublication from "../../../Screens/NewPublication"
import othersProfile from "../../../Screens/othersProfile"

const Stack = createStackNavigator();
const ProfileNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Profile"}
        component={UserPerfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Configurations"}
        component={UserOptions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"editar"}
        component={editPerfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const Publications = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Feed"}
        component={Feed}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"OpenPublication"}
        component={OpenPublication}
        options={{ headerShown: false }}
        initialParams={{
          title: "",
          city: "",
          date: "",
          artworkPrice: "",
          description: "",
          inspiration: "",
          time: "",
          userName: "",
          genre: "",
          userId: "",
          publicationId: "",
          image: {
          }
        }}
      />
       <Stack.Screen
        name={"userPerfil"}
        component={othersProfile}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name='Home'
        component={Publications}
        initialParams={{ icon: 'home' }}
      />
      <Tab.Screen
        name='Create'
        component={NewPublication}
        initialParams={{ icon: 'plus' }}
      />
      <Tab.Screen
        name='View'
        component={SavedPost}
        initialParams={{ icon: 'hearto' }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileNavigation}
        initialParams={{ icon: 'user' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;