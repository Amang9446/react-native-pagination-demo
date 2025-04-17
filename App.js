import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store";
import ProductList from "./src/components/products/ProductList";
import { normalize } from "./src/utils/normalize";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Products</Text>
        <ProductList />
        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: normalize(50),
  },
  header: {
    fontSize: normalize(24),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: normalize(20),
  },
});
