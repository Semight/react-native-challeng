import { Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  className?: string;
};

export default function CustomButton({ title, onPress, className }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-sky-600 rounded-lg justify-center items-center ${className}`}
    >
      <Text className="text-white text-lg font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
