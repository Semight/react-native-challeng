import { addToCart } from "@/store/slices/cartSlice";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

const products = [
  { id: 1, name: "Shirt", price: 20 },
  { id: 2, name: "Jeans", price: 40 },
  { id: 3, name: "Sneakers", price: 60 },
];

export default function Products() {
  const dispatch = useDispatch();
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAdd = (item: any) => {
    dispatch(addToCart(item));
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1000);
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View className="bg-white p-4 mb-4 rounded-xl shadow-md">
          <Text className="text-lg font-bold">{item.name}</Text>
          <Text className="text-gray-600 mb-3">${item.price}</Text>

          <TouchableOpacity
            onPress={() => handleAdd(item)}
            className={`py-2 px-4 rounded-xl ${
              addedId === item.id ? "bg-green-600" : "bg-blue-600"
            }`}
          >
            <Text className="text-white font-semibold text-center">
              {addedId === item.id ? "Added ✅" : "Add to Cart"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
