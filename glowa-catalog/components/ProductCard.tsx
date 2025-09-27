import { View, Text, Image } from "react-native";

type Props = {
  name: string;
  desc: string;
  price: string;
  image: string;
};

export default function ProductCard({ name, desc, price, image }: Props) {
  return (
    <View className="bg-gray-100 rounded-xl w-40 p-3">
      <Image
        source={{ uri: image }}
        className="w-full h-32 rounded-lg"
        resizeMode="cover"
      />
      <Text className="mt-2 font-semibold" numberOfLines={1}>
        {name}
      </Text>
      <Text className="text-xs text-gray-500" numberOfLines={1}>
        {desc}
      </Text>
      <Text className="mt-1 font-medium">{price}</Text>
    </View>
  );
}
