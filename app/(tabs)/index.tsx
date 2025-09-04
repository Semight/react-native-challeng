import Counter from "@/components/Counter/Counter";
import CustomButton from "@/components/CustomButton/CustomButton";
import WelcomeMessage from "@/components/WelcomeMessage/WelcomeMessage";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-sky-100 px-4">
      <WelcomeMessage name="David" />

      <View className="mt-6 flex flex-col gap-2 space-y-4">
        <CustomButton
          title="Click Me"
          onPress={() => alert("Hello David 🚀")}
        />

        <CustomButton
          title="Delete"
          bgColor="red"
          onPress={() => alert("Deleted ❌")}
        />
      </View>

      {/* Counter */}
      <View className="mt-8 w-full items-center">
        <Counter initialValue={5} step={1} />
      </View>
    </View>
  );
}
