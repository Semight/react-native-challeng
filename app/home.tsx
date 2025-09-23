import { useTheme } from "@/components/context/ThemeContext";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const { theme, toggleTheme } = useTheme();
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  if (!token) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{
          backgroundColor: theme === "dark" ? "#111827" : "#f0f9ff",
        }}
      >
        <Text
          className="text-lg font-bold mb-4"
          style={{
            color: theme === "dark" ? "#fff" : "#0c4a6e",
          }}
        >
          🚫 You must log in to view Home
        </Text>
      </View>
    );
  }

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{
        backgroundColor: theme === "dark" ? "#111827" : "#f0f9ff",
      }}
    >
      <Text
        className="text-lg font-bold mb-4"
        style={{
          color: theme === "dark" ? "#fff" : "#0c4a6e",
        }}
      >
        🏠 Home Screen
      </Text>

      {/* Theme toggle */}
      <TouchableOpacity
        onPress={toggleTheme}
        className="mt-4 px-4 py-2 rounded-xl shadow-lg"
        style={{
          backgroundColor: theme === "dark" ? "#facc15" : "#0369a1",
        }}
      >
        <Text
          className="font-semibold"
          style={{
            color: theme === "dark" ? "#111827" : "#fff",
          }}
        >
          {theme === "dark"
            ? "☀️ Switch to Light Mode"
            : "🌙 Switch to Dark Mode"}
        </Text>
      </TouchableOpacity>

      {/* Logout button */}
      <TouchableOpacity
        onPress={() => dispatch(logout())}
        className="mt-6 px-4 py-2 rounded-xl shadow-lg"
        style={{
          backgroundColor: "#ef4444",
        }}
      >
        <Text className="font-semibold text-white">🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
