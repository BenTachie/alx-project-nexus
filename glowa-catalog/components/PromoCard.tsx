import { View, Text, Image } from "react-native";

export default function PromoCard() {
  return (
    <View className="flex-row items-center bg-white rounded-xl shadow px-4 py-3 mx-5 mt-4">
      <Image
        source={{ uri: "https://via.placeholder.com/76" }}
        className="w-20 h-20 rounded-lg"
      />
      <View className="ml-3 flex-1">
        <Text className="text-base font-semibold">
          Your Skin's Extra Glow💫
        </Text>
        <Text className="text-sm text-gray-500">
          Nourish Your Skin With Body Lotions
        </Text>
        <button className="mt-2 bg-black-500 px-3 py-1 rounded-full self-start">
          <Text className="text-white text-sm font-medium">Shop Now</Text>
        </button>
      </View>
    </View>
  );
}
