import { useEffect, useState } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import Greeting from "../components/Greeting";
import SearchBar from "../components/SearchBar";
import PromoCard from "../components/PromoCard";
import ProductCard from "../components/ProductCard";
import BottomNav from "../components/BottomNav";

export default function HomeScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=10")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

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
        <Text className="px-5 mt-1 text-sm text-gray-500">
          Recommended For You
        </Text>

        {loading ? (
          <ActivityIndicator size="large" className="mt-10" />
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3 px-5"
          >
            {products.map((product) => (
              <View key={product.id} className="mr-3">
                <ProductCard
                  name={product.title}
                  desc={product.category}
                  price={`$${product.price}`}
                  image={product.thumbnail}
                />
              </View>
            ))}
          </ScrollView>
        )}
      </ScrollView>

      <BottomNav />
    </View>
  );
}
