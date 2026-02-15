import { useState } from "react";
import {
    Alert,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useProdutos } from "../context/ProdutosContext";
import { globalStyles } from "../styles/globalStyles";

type ItemCarrinho = {
    id: string;
    nome: string;
    preco: number;
    quantidade: number;
};

export default function Vendas() {
    const { produtos, atualizarEstoque } = useProdutos();

    const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
    const [quantidades, setQuantidades] = useState<{ [key: string]: string }>({});

    function adicionarAoCarrinho(id: string, nome: string, preco: number, estoque: number) {
        const quantidadeDigitada = parseInt(quantidades[id]);

        if (!quantidadeDigitada || quantidadeDigitada <= 0) {
            Alert.alert("Digite uma quantidade válida");
            return;
        }

        const itemExistente = carrinho.find((item) => item.id === id);
        const quantidadeJaNoCarrinho = itemExistente ? itemExistente.quantidade : 0;

        if (quantidadeDigitada + quantidadeJaNoCarrinho > estoque) {
            Alert.alert("Quantidade total excede o estoque disponível");
            return;
        }

        if (itemExistente) {
            setCarrinho((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? { ...item, quantidade: item.quantidade + quantidadeDigitada }
                        : item
                )
            );
        } else {
            setCarrinho((prev) => [
                ...prev,
                { id, nome, preco, quantidade: quantidadeDigitada },
            ]);
        }

        setQuantidades({ ...quantidades, [id]: "" });
    }

    function removerItem(id: string) {
        setCarrinho((prev) => prev.filter((item) => item.id !== id));
    }

    function limparCarrinho() {
        setCarrinho([]);
    }

    function calcularTotal() {
        return carrinho.reduce(
            (total, item) => total + item.preco * item.quantidade,
            0
        );
    }

    function confirmarFinalizacao() {
        if (carrinho.length === 0) {
            Alert.alert("Carrinho vazio");
            return;
        }

        Alert.alert(
            "Confirmar Venda",
            `Total: ${calcularTotal().toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            })}`,
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Confirmar", onPress: finalizarVenda },
            ]
        );
    }

    function finalizarVenda() {
        carrinho.forEach((item) => {
            const produto = produtos.find((p) => p.id === item.id);
            if (produto) {
                atualizarEstoque(
                    produto.id,
                    produto.estoque - item.quantidade
                );
            }
        });

        setCarrinho([]);
        Alert.alert("Venda realizada com sucesso!");
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titulo}>Vendas</Text>

            {/* LISTA DE PRODUTOS */}
            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={globalStyles.card}>
                        <Text style={globalStyles.cardTitulo}>{item.nome}</Text>

                        <Text style={globalStyles.cardPreco}>
                            {item.preco.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </Text>

                        <Text style={globalStyles.cardEstoque}>
                            Estoque: {item.estoque}
                        </Text>

                        <TextInput
                            placeholder="Qtd"
                            keyboardType="numeric"
                            value={quantidades[item.id] || ""}
                            onChangeText={(text) =>
                                setQuantidades({ ...quantidades, [item.id]: text })
                            }
                            style={globalStyles.input}
                        />

                        <TouchableOpacity
                            style={globalStyles.botao}
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
                                Adicionar ao Carrinho
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* CARRINHO */}
            <Text style={[globalStyles.titulo, { marginTop: 20 }]}>
                Carrinho
            </Text>

            {carrinho.map((item) => (
                <View key={item.id} style={globalStyles.card}>
                    <Text style={globalStyles.cardTitulo}>{item.nome}</Text>

                    <Text>
                        {item.quantidade} x{" "}
                        {item.preco.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </Text>

                    <Text>
                        Subtotal:{" "}
                        {(item.quantidade * item.preco).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </Text>

                    <TouchableOpacity
                        style={[globalStyles.botao, { backgroundColor: "#b00020", marginTop: 5 }]}
                        onPress={() => removerItem(item.id)}
                    >
                        <Text style={globalStyles.botaoTexto}>Remover</Text>
                    </TouchableOpacity>
                </View>
            ))}

            {carrinho.length > 0 && (
                <>
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
                        Total:{" "}
                        {calcularTotal().toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </Text>

                    <TouchableOpacity
                        style={[globalStyles.botao, { marginTop: 10 }]}
                        onPress={confirmarFinalizacao}
                    >
                        <Text style={globalStyles.botaoTexto}>Finalizar Venda</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[globalStyles.botao, { backgroundColor: "#555", marginTop: 5 }]}
                        onPress={limparCarrinho}
                    >
                        <Text style={globalStyles.botaoTexto}>Limpar Carrinho</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}