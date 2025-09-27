import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 10; // items per request

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${page * LIMIT}`
      );
      const data = await response.json();

      if (data.products.length > 0) {
        setProducts((prev) => [...prev, ...data.products]);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // Render each product item
  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity className="bg-white m-2 p-4 rounded-lg shadow">
      <Image
        source={{ uri: item.thumbnail }}
        className="w-full h-40 rounded-md"
        resizeMode="cover"
      />
      <Text className="text-lg font-bold mt-2">{item.title}</Text>
      <Text className="text-gray-600" numberOfLines={2}>
        {item.description}
      </Text>
      <Text className="text-blue-600 font-semibold mt-1">R {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        onEndReached={() => setPage((prev) => prev + 1)} // Load more on scroll
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" color="#2563eb" className="my-4" />
          ) : null
        }
      />
    </View>
  );
}
