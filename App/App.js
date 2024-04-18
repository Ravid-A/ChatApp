import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import NicknameSelectScreen from "./components/NicknameSelectScreen";
import ChatScreen from "./components/ChatScreen";
import UsersList from "./components/UsersList";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ChatScreenWithTab = ({ route, navigation }) => {
  const { username } = route.params;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        initialParams={{ username }}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Users" component={UsersList} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={NicknameSelectScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreenWithTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
