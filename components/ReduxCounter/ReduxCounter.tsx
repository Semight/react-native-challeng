import { AppDispatch, RootState } from "@/store";
import { decrement, increment } from "@/store/slices/counterSlices";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ReduxCounter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View className="items-center bg-white p-4 rounded-xl shadow-md">
      <Text className="text-xl font-bold mb-3">Count: {count}</Text>

      <View className="flex-row gap-4">
        <TouchableOpacity
          onPress={() => dispatch(decrement())}
          className="bg-red-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-bold text-lg">-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => dispatch(increment())}
          className="bg-green-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-bold text-lg">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
