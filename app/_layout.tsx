// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

import "../global.css";

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   if (!loaded) {
//     // Async font loading only occurs in development.
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="todo" />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }

// import { Stack } from "expo-router";

// export default function Layout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ title: "Home" }} />
//       <Stack.Screen name="details" options={{ title: "Details" }} />
//     </Stack>
//   );
// }

// app/_layout.tsx
import { ThemeProvider, useTheme } from "@/components/context/ThemeContext";
import { store } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

function ThemedStatusBar() {
  const { theme } = useTheme();
  return (
    <StatusBar
      barStyle={theme === "light" ? "dark-content" : "light-content"}
      backgroundColor={theme === "light" ? "#fff" : "#000"}
    />
  );
}

export default function Layout() {
  const { theme } = useTheme();

  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <ThemedStatusBar />
          <Drawer
            screenOptions={{
              headerStyle: {
                backgroundColor: theme === "light" ? "#0369a1" : "#111",
              },
              headerTintColor: "#fff",
              drawerActiveTintColor: theme === "light" ? "#0369a1" : "#0af",
              drawerLabelStyle: { fontSize: 16 },
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
                  <Ionicons name="settings-outline" size={size} color={color} />
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
                  <Ionicons name="newspaper-outline" size={size} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="notification"
              options={{
                drawerLabel: "Notification",
                title: "Notification",
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="notifications-outline" size={size} color={color} />
                ),
              }}
            />
          </Drawer>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
