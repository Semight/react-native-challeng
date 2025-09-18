import ReduxCounter from "@/components/ReduxCounter/ReduxCounter";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <ReduxCounter />
    </View>
  );
}
