import Counter from "@/components/Counter/Counter";
import PostsList from "@/components/PostList/PostList";
import WelcomeMessage from "@/components/WelcomeMessage/WelcomeMessage";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-sky-100 pt-24 px-4">
      <WelcomeMessage name="David" />

      {/* <View className="mt-6 flex flex-col gap-2 space-y-4 items-center">
        <CustomButton
          title="Click Me"
          onPress={() => alert("Hello David 🚀")}
        />

        <CustomButton
          title="Delete"
          bgColor="red"
          onPress={() => alert("Deleted ❌")}
        />
      </View> */}

      {/* Counter */}
      <View className="mt-8 w-full items-center">
        <Counter initialValue={5} step={1} />
      </View>

      {/* Posts List */}
      <View className="mt-8 flex-1 w-full">
        <PostsList />
      </View>
    </View>
  );
}
