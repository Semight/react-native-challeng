import { useTheme } from "@/components/context/ThemeContext";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { theme, toggleTheme } = useTheme();

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

      <TouchableOpacity
        onPress={toggleTheme}
        className="mt-6 px-4 py-2 rounded-xl shadow-lg"
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
    </View>
  );
}
