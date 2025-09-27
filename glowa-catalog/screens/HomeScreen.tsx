import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function HomeScreen() {
  // State variables
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 10;

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      setCategories(["all", ...data]); // Add "all" option
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch products (with optional category)
  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      let url = "";
      if (selectedCategory === "all") {
        url = `https://dummyjson.com/products?limit=${LIMIT}&skip=${
          page * LIMIT
        }`;
      } else {
        url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${LIMIT}&skip=${
          page * LIMIT
        }`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.products.length > 0) {
        setProducts((prev) =>
          page === 0 ? data.products : [...prev, ...data.products]
        );
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [page, selectedCategory, loading, hasMore]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
  }, [selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [page, selectedCategory]);

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
      {/* Category Filter Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="p-2 bg-white"
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            className={`px-4 py-2 mr-2 rounded-full ${
              selectedCategory === cat
                ? "bg-blue-600"
                : "bg-gray-200"
            }`}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              className={`${
                selectedCategory === cat
                  ? "text-white font-semibold"
                  : "text-gray-700"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product List with Pagination */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        onEndReached={() => setPage((prev) => prev + 1)}
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
