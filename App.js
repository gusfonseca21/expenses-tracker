import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import AllExpensesScreen from "./screens/AllExpensesScreen";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";

import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "#273c75",
              borderTopWidth: 1,
              borderTopColor: "#ccc",
            },
            tabBarActiveTintColor: "#e1b12c",
            tabBarInactiveTintColor: "#ccc",
            headerStyle: {
              backgroundColor: "#273c75",
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            },
            headerRight: () => (
              <Ionicons name="add-outline" size={30} color="white" />
            ),
          }}
          sceneContainerStyle={{
            backgroundColor: "#192a56",
          }}
        >
          <Tab.Screen
            name="RecentExpenses"
            component={RecentExpensesScreen}
            options={{
              title: "Despesas Recentes",
              headerTintColor: "#e1b12c",
              headerTitleAlign: "center",
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="alarm-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="AlExpenses"
            component={AllExpensesScreen}
            options={{
              title: "Todas as Despesas",
              headerTintColor: "#e1b12c",
              headerTitleAlign: "center",
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="calendar-outline" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
