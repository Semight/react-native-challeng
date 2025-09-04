import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type CounterProps = {
  initialValue?: number;
  step?: number;
};

export default function Counter({
  initialValue = 0,
  step = 1,
}: CounterProps) {
  const [count, setCount] = useState(initialValue);

  return (
    <View className="items-center bg-white p-4 rounded-xl shadow-md">
      <Text className="text-xl font-bold mb-3">Count: {count}</Text>

      <View className="flex-row gap-4">
        <TouchableOpacity
          onPress={() => setCount(count - step)}
          className="bg-red-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-bold text-lg">-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCount(count + step)}
          className="bg-green-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-bold text-lg">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
