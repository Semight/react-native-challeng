import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoItem({ id, text, completed, onToggle, onDelete }: Props) {
  return (
    <View className="flex-row justify-between items-center bg-white p-3 mb-2 rounded-xl shadow">
      <TouchableOpacity onPress={() => onToggle(id)}>
        <Text className={`text-base ${completed ? "line-through text-gray-500" : "text-sky-800"}`}>
          {text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(id)}>
        <Text className="text-red-500 text-lg">❌</Text>
      </TouchableOpacity>
    </View>
  );
}
