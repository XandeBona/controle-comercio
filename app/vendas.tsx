import { useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { useCarrinho } from "../context/CarrinhoContext";
import { useProdutos } from "../context/ProdutosContext";
import { globalStyles } from "../styles/globalStyles";

export default function Vendas() {
  const router = useRouter();

  const { produtos } = useProdutos();
  const { carrinho, adicionarItem } = useCarrinho();

  const [quantidades, setQuantidades] = useState<{ [key: string]: string }>(
    {}
  );

  function adicionarAoCarrinho(
    id: string,
    nome: string,
    preco: number,
    estoque: number
  ) {
    const quantidadeDigitada = parseInt(quantidades[id]);

    if (!quantidadeDigitada || quantidadeDigitada <= 0) {
      Alert.alert("Digite uma quantidade válida");
      return;
    }

    const itemCarrinho = carrinho.find((i) => i.id === id);
    const jaNoCarrinho = itemCarrinho ? itemCarrinho.quantidade : 0;

    const estoqueDisponivel = estoque - jaNoCarrinho;

    if (quantidadeDigitada > estoqueDisponivel) {
      Alert.alert(
        `Estoque insuficiente. Disponível: ${estoqueDisponivel}`
      );
      return;
    }

    adicionarItem({
      id,
      nome,
      preco,
      quantidade: quantidadeDigitada,
    });

    setQuantidades({ ...quantidades, [id]: "" });
  }

  const totalItens = carrinho.reduce(
    (acc, item) => acc + item.quantidade,
    0
  );

  const produtosAtivos = produtos.filter((produto) => produto.ativo);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titulo}>Vendas</Text>

      <FlatList
        data={produtosAtivos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
          const itemCarrinho = carrinho.find((i) => i.id === item.id);
          const jaNoCarrinho = itemCarrinho
            ? itemCarrinho.quantidade
            : 0;

          const estoqueDisponivel = item.estoque - jaNoCarrinho;

          return (
            <View style={globalStyles.card}>
              <Text style={globalStyles.cardTitulo}>
                {item.nome}
              </Text>

              <Text style={globalStyles.cardPreco}>
                {item.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>

              <Text
                style={[
                  globalStyles.cardEstoque,
                  estoqueDisponivel > 0
                    ? globalStyles.estoqueDisponivel
                    : globalStyles.estoqueEsgotado,
                ]}
              >
                Disponível: {estoqueDisponivel}
              </Text>

              <TextInput
                placeholder="Qtd"
                keyboardType="numeric"
                value={quantidades[item.id] || ""}
                onChangeText={(text) =>
                  setQuantidades({
                    ...quantidades,
                    [item.id]: text,
                  })
                }
                style={globalStyles.input}
              />

              <TouchableOpacity
                style={[
                  globalStyles.botao,
                  estoqueDisponivel === 0 && {
                    backgroundColor: "#999",
                  },
                ]}
                disabled={estoqueDisponivel === 0}
                onPress={() =>
                  adicionarAoCarrinho(
                    item.id,
                    item.nome,
                    item.preco,
                    item.estoque
                  )
                }
              >
                <Text style={globalStyles.botaoTexto}>
                  {estoqueDisponivel === 0
                    ? "Sem estoque"
                    : "Adicionar ao Carrinho"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <TouchableOpacity
        style={{
          ...globalStyles.botaoCarrinhoSup,
          position: "absolute",
          bottom: 20,
          right: 20,
          borderRadius: 30,
          paddingHorizontal: 18,
        }}
        onPress={() => router.push("/carrinho")}
      >
        <Text style={globalStyles.botaoCarrinho}>
          Carrinho ({totalItens})
        </Text>
      </TouchableOpacity>
    </View>
  );
}