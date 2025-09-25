import { View, Text, TouchableOpacity } from "react-native";

export default function Greeting() {
  return (
    <View className="flex-row justify-between items-center px-5 py-4">
      <Text className="text-xl font-semibold">Good Morning, Cole</Text>
      <TouchableOpacity className="relative">
        <Text className="text-2xl">🔔</Text>
        <View className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full border border-white" />
      </TouchableOpacity>
    </View>
  );
}
