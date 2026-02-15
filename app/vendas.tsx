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
        const quantidade = parseInt(quantidades[id]);

        if (!quantidade || quantidade <= 0) {
            Alert.alert("Digite uma quantidade válida");
            return;
        }

        if (quantidade > estoque) {
            Alert.alert("Quantidade maior que o estoque disponível");
            return;
        }

        const itemExistente = carrinho.find((item) => item.id === id);

        if (itemExistente) {
            setCarrinho((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? { ...item, quantidade: item.quantidade + quantidade }
                        : item
                )
            );
        } else {
            setCarrinho((prev) => [
                ...prev,
                { id, nome, preco, quantidade },
            ]);
        }

        setQuantidades({ ...quantidades, [id]: "" });
    }

    function calcularTotal() {
        return carrinho.reduce(
            (total, item) => total + item.preco * item.quantidade,
            0
        );
    }

    function finalizarVenda() {
        if (carrinho.length === 0) {
            Alert.alert("Carrinho vazio");
            return;
        }

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
                        {item.quantidade} x R$ {item.preco.toFixed(2)}
                    </Text>
                    <Text>
                        Subtotal: R$ {(item.quantidade * item.preco).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </Text>
                </View>
            ))}

            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
                Total: R$ {calcularTotal().toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })}
            </Text>

            <TouchableOpacity
                style={[globalStyles.botao, { marginTop: 10 }]}
                onPress={finalizarVenda}
            >
                <Text style={globalStyles.botaoTexto}>Finalizar Venda</Text>
            </TouchableOpacity>
        </View>
    );
}