import {
    Alert,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useCarrinho } from "../context/CarrinhoContext";
import { useProdutos } from "../context/ProdutosContext";
import { globalStyles } from "../styles/globalStyles";

export default function Carrinho() {
    const {
        carrinho,
        removerItem,
        limparCarrinho,
        total,
    } = useCarrinho();

    const { produtos, atualizarEstoque } = useProdutos();

    function executarVenda() {
        carrinho.forEach(item => {
            const produto = produtos.find(p => p.id === item.id);
            if (produto) {
                atualizarEstoque(
                    produto.id,
                    produto.estoque - item.quantidade
                );
            }
        });

        limparCarrinho();
        Alert.alert("Venda finalizada com sucesso!");
    }

    function confirmarVenda() {
        if (carrinho.length === 0) {
            Alert.alert("Carrinho vazio");
            return;
        }

        Alert.alert(
            "Confirmar Venda",
            `Total da venda:\n\n${total.toLocaleString(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL",
                }
            )}`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Confirmar", onPress: executarVenda },
            ]
        );
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titulo}>Carrinho</Text>

            <FlatList
                data={carrinho}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 220 }}
                renderItem={({ item }) => (
                    <View style={globalStyles.card}>
                        <Text style={globalStyles.cardTitulo}>
                            {item.nome}
                        </Text>

                        <Text>
                            Quantidade: {item.quantidade}
                        </Text>

                        <Text>
                            Subtotal:{" "}
                            {(item.quantidade * item.preco).toLocaleString(
                                "pt-BR",
                                {
                                    style: "currency",
                                    currency: "BRL",
                                }
                            )}
                        </Text>

                        <TouchableOpacity
                            style={[
                                globalStyles.botao,
                                { backgroundColor: "#b00020", marginTop: 5 },
                            ]}
                            onPress={() => removerItem(item.id)}
                        >
                            <Text style={globalStyles.botaoTexto}>
                                Remover
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 15,
                    backgroundColor: "#f4f6f9",
                }}
            >
                <View style={globalStyles.totalBox}>
                    <Text style={globalStyles.totalTexto}>
                        Total:{" "}
                        {total.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </Text>
                </View>

                <TouchableOpacity
                    style={globalStyles.botao}
                    onPress={confirmarVenda}
                >
                    <Text style={globalStyles.botaoTexto}>
                        Finalizar Venda
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        globalStyles.botao,
                        { backgroundColor: "#555" },
                    ]}
                    onPress={limparCarrinho}
                >
                    <Text style={globalStyles.botaoTexto}>
                        Limpar Carrinho
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}