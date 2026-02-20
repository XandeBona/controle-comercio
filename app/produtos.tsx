import React, { useState } from "react";
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

export default function Produtos() {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [estoque, setEstoque] = useState("");
    const [editandoId, setEditandoId] = useState<string | null>(null);

    const {
        produtos,
        adicionarProduto,
        editarProduto,
        alternarStatus,
    } = useProdutos();

    function limparCampos() {
        setNome("");
        setPreco("");
        setEstoque("");
        setEditandoId(null);
    }

    function salvarProduto() {
        if (!nome) {
            Alert.alert("Erro", "Digite o nome.");
            return;
        }

        if (editandoId) {
            if (!estoque) {
                Alert.alert("Erro", "Digite o estoque.");
                return;
            }

            const estoqueConvertido = parseInt(estoque);

            if (isNaN(estoqueConvertido)) {
                Alert.alert("Erro", "Estoque inválido.");
                return;
            }

            editarProduto(editandoId, nome, estoqueConvertido);
            Alert.alert("Sucesso", "Produto atualizado!");
        } else {
            if (!preco || !estoque) {
                Alert.alert("Erro", "Preencha todos os campos.");
                return;
            }

            const precoConvertido = parseFloat(preco.replace(",", "."));
            const estoqueConvertido = parseInt(estoque);

            if (isNaN(precoConvertido) || isNaN(estoqueConvertido)) {
                Alert.alert("Erro", "Valores inválidos.");
                return;
            }

            adicionarProduto({
                id: Date.now().toString(),
                nome,
                preco: precoConvertido,
                estoque: estoqueConvertido,
                ativo: true,
            });

            Alert.alert("Sucesso", "Produto adicionado!");
        }

        limparCampos();
    }

    function iniciarEdicao(produto: any) {
        setNome(produto.nome);
        setEstoque(produto.estoque.toString());
        setEditandoId(produto.id);
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titulo}>Cadastro de Produtos</Text>

            <TextInput
                placeholder="Nome do produto"
                placeholderTextColor="#555"
                value={nome}
                onChangeText={setNome}
                style={globalStyles.input}
            />

            {/* Preço só aparece ao criar produto */}
            {!editandoId && (
                <TextInput
                    placeholder="Preço"
                    placeholderTextColor="#555"
                    keyboardType="numeric"
                    value={preco}
                    onChangeText={setPreco}
                    style={globalStyles.input}
                />
            )}

            {/* Estoque aparece sempre */}
            <TextInput
                placeholder="Quantidade em estoque"
                placeholderTextColor="#555"
                keyboardType="numeric"
                value={estoque}
                onChangeText={setEstoque}
                style={globalStyles.input}
            />

            <TouchableOpacity
                style={globalStyles.botao}
                onPress={salvarProduto}
            >
                <Text style={globalStyles.botaoTexto}>
                    {editandoId ? "Salvar Alterações" : "Adicionar Produto"}
                </Text>
            </TouchableOpacity>

            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={globalStyles.card}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 10,
                            }}
                        >
                            <Text style={globalStyles.cardTitulo}>
                                {item.nome}
                            </Text>

                            <View style={{ flexDirection: "row", gap: 6 }}>
                                <TouchableOpacity
                                    style={[
                                        globalStyles.botao,
                                        {
                                            paddingVertical: 6,
                                            paddingHorizontal: 10,
                                            marginBottom: 0,
                                            backgroundColor: "#f9a825",
                                        },
                                    ]}
                                    onPress={() => iniciarEdicao(item)}
                                >
                                    <Text style={globalStyles.botaoTexto}>
                                        Editar
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        globalStyles.botao,
                                        {
                                            paddingVertical: 6,
                                            paddingHorizontal: 10,
                                            marginBottom: 0,
                                            backgroundColor: item.ativo
                                                ? "#d32f2f"
                                                : "#2e7d32",
                                        },
                                    ]}
                                    onPress={() => alternarStatus(item.id)}
                                >
                                    <Text style={globalStyles.botaoTexto}>
                                        {item.ativo ? "Desativar" : "Ativar"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={globalStyles.cardPreco}>
                            {item.preco.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </Text>

                        <Text
                            style={[
                                globalStyles.cardEstoque,
                                item.estoque > 0
                                    ? globalStyles.estoqueDisponivel
                                    : globalStyles.estoqueEsgotado,
                            ]}
                        >
                            Estoque: {item.estoque}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}