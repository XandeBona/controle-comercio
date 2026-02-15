import { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Vendas() {
  // Produtos mockados por enquanto
  const [produtos, setProdutos] = useState([
    { id: "1", nome: "Coca-Cola", preco: 5, estoque: 10 },
    { id: "2", nome: "Arroz", preco: 20, estoque: 5 },
  ]);

  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);
  const [quantidade, setQuantidade] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (produtoSelecionado && quantidade) {
      setTotal(produtoSelecionado.preco * parseInt(quantidade));
    } else {
      setTotal(0);
    }
  }, [quantidade, produtoSelecionado]);

  function confirmarVenda() {
    if (!produtoSelecionado || !quantidade) return;

    const qtd = parseInt(quantidade);

    if (qtd > produtoSelecionado.estoque) {
      alert("Estoque insuficiente!");
      return;
    }

    const novosProdutos = produtos.map((p) =>
      p.id === produtoSelecionado.id
        ? { ...p, estoque: p.estoque - qtd }
        : p
    );

    setProdutos(novosProdutos);
    setProdutoSelecionado(null);
    setQuantidade("");
    setTotal(0);

    alert("Venda realizada com sucesso!");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>💰 Nova Venda</Text>

      <Text style={styles.subtitulo}>Selecione um produto:</Text>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              produtoSelecionado?.id === item.id && styles.cardSelecionado,
            ]}
            onPress={() => setProdutoSelecionado(item)}
          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>R$ {item.preco.toFixed(2)}</Text>
            <Text>Estoque: {item.estoque}</Text>
          </TouchableOpacity>
        )}
      />

      {produtoSelecionado && (
        <View style={styles.vendaBox}>
          <Text style={styles.label}>Quantidade:</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={quantidade}
            onChangeText={setQuantidade}
            placeholder="Digite a quantidade"
            placeholderTextColor="#666"
          />

          <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

          <TouchableOpacity style={styles.botao} onPress={confirmarVenda}>
            <Text style={styles.botaoTexto}>Confirmar Venda</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f9",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  cardSelecionado: {
    borderWidth: 2,
    borderColor: "#1e88e5",
  },
  nome: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1e88e5",
  },
  vendaBox: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: "#000",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  botao: {
    backgroundColor: "#1e88e5",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoTexto: {
    color: "white",
    fontWeight: "bold",
  },
});