import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🛒 Sistema Comercial</Text>

      <Link href="/produtos" asChild>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.botaoTexto}>Ir para Produtos</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/vendas" asChild>
        <TouchableOpacity style={styles.botao}>
          <Text style={styles.botaoTexto}>Ir para Vendas</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
  },
  botao: {
    backgroundColor: "#1e88e5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: 200,
    alignItems: "center",
  },
  botaoTexto: {
    color: "white",
    fontWeight: "bold",
  },
});