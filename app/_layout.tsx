// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

import { ThemeProvider, useTheme } from "@/components/context/ThemeContext";
import { store } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "react-native";
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../global.css";

function ThemedStatusBar() {
  const { theme } = useTheme();
  return (
    <StatusBar
      barStyle={theme === "light" ? "dark-content" : "light-content"}
      backgroundColor={theme === "light" ? "#fff" : "#000"}
    />
  );
}

function AppDrawer() {
  const { theme, toggleTheme } = useTheme();
  const paperTheme = theme === "light" ? MD3LightTheme : MD3DarkTheme;

  return (
          <PaperProvider theme={paperTheme}>
            <ThemedStatusBar />
            <Drawer
              screenOptions={{
                headerStyle: {
                  backgroundColor: theme === "light" ? "#0369a1" : "#111",
                },
                headerTintColor: "#fff",
                drawerActiveTintColor: theme === "light" ? "#0369a1" : "#0af",
                drawerLabelStyle: { fontSize: 16 },
                headerRight: () => (
            <Ionicons
              name={theme === "light" ? "moon" : "sunny"}
              size={24}
              color="#fff"
              style={{ marginRight: 16 }}
              onPress={toggleTheme}
            />
          ),
              }}
            >
              <Drawer.Screen
                name="home"
                options={{
                  drawerLabel: "Home",
                  title: "🏠 Home",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="profile"
                options={{
                  drawerLabel: "Profile",
                  title: "👤 Profile",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="person-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="settings"
                options={{
                  drawerLabel: "Settings",
                  title: "⚙️ Settings",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons
                      name="settings-outline"
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
              <Drawer.Screen
                name="login"
                options={{
                  drawerLabel: "Login",
                  title: "Login",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="log-in-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="contact"
                options={{
                  drawerLabel: "ContactList",
                  title: "ContactList",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="call-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="note"
                options={{
                  drawerLabel: "NoteList",
                  title: "NoteList",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="book-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="weather"
                options={{
                  drawerLabel: "WeatheApp",
                  title: "WeatherApp",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="cloud-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="products"
                options={{
                  drawerLabel: "Products",
                  title: "Products",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="shirt-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="cart"
                options={{
                  drawerLabel: "Cart",
                  title: "Cart",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="cart-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="news"
                options={{
                  drawerLabel: "News",
                  title: "News",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons
                      name="newspaper-outline"
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
              <Drawer.Screen
                name="notification"
                options={{
                  drawerLabel: "Notification",
                  title: "Notification",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons
                      name="notifications-outline"
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
              <Drawer.Screen
                name="map"
                options={{
                  drawerLabel: "Map",
                  title: "Map",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="map-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="paper-demo"
                options={{
                  drawerLabel: "PaperDemo",
                  title: "PaperDemo",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons
                      name="paper-plane-outline"
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
              <Drawer.Screen
                name="task-list"
                options={{
                  drawerLabel: "Task List",
                  title: "Task Manager",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="list-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="task-form"
                options={{
                  drawerLabel: "Add Task",
                  title: "Add Task",
                  drawerIcon: ({ color, size }) => (
                    <Ionicons
                      name="add-circle-outline"
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
            </Drawer>
          </PaperProvider>
  );
}


export default function Layout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <AppDrawer />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}