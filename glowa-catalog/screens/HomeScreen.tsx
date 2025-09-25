import { ScrollView, View, Text } from "react-native";
import Greeting from "../components/Greeting";
import SearchBar from "../components/SearchBar";
import PromoCard from "../components/PromoCard";
import ProductCard from "../components/ProductCard";
import BottomNav from "../components/BottomNav";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      <Greeting />
      <SearchBar />
      <PromoCard />

      <ScrollView className="mt-5" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center px-5">
          <Text className="text-lg font-semibold">Popular Now</Text>
          <Text className="text-sm text-gray-500">See All</Text>
        </View>
        <Text className="px-5 mt-1 text-sm text-gray-500">Recommended For You</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-3 px-5"
        >
          <ProductCard
            name="Glowa Skin"
            desc="Dark Spot Correcting Glow Serum"
            price="R150 USD"
            image="https://via.placeholder.com/150"
          />
          <View className="w-3" />
          <ProductCard
            name="Pastry Skincare"
            desc="Made for daily shine"
            price="R90 USD"
            image="https://via.placeholder.com/150"
          />
          <View className="w-3" />
          <ProductCard
            name="Alive Cosmetics"
            desc="Crisp bold Radiant"
            price="R55 USD"
            image="https://via.placeholder.com/150"
          />
        </ScrollView>
      </ScrollView>

      <BottomNav />
    </View>
  );
}
