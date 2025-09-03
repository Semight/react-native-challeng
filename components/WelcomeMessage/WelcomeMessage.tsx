import { Text, View } from "react-native";

export default function WelcomeMessage({ name = "Developer" }) {
  return (
    <View className="w-full max-w-md p-6 rounded-xl items-center bg-white shadow-md">
      <Text className="text-xl font-bold text-sky-800">
        Welcome, {name}! 🎉
      </Text>
      <Text className="text-sm text-sky-900 mt-2 text-center">
        Glad to have you here. Let’s build something amazing!
      </Text>
    </View>
  );
}
