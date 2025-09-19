import { RootState } from "@/store";
import { removeFromCart } from "@/store/slices/cartSlice";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [removedId, setRemovedId] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-500">🛒 Your cart is empty</Text>
      </View>
    );
  }

  // compute total
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
    setRemovedId(id);
    setTimeout(() => setRemovedId(null), 1000);
  };

  return (
    <View className="flex-1 p-4 bg-gray-50">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mb-4 rounded-xl shadow-md">
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-gray-600 mb-2">
              ${item.price} × {item.quantity}
            </Text>

            <TouchableOpacity
              onPress={() => handleRemove(item.id)}
              className={`py-2 px-4 rounded-xl ${
                removedId === item.id ? "bg-gray-500" : "bg-red-500"
              }`}
            >
              <Text className="text-white font-semibold text-center">
                {removedId === item.id ? "Removed ❌" : "Remove"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View className="p-4 bg-white rounded-xl shadow-md mt-4">
        <Text className="text-lg font-bold">Total: ${total}</Text>
      </View>
    </View>
  );
}
