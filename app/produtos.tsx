import React, { useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function Produtos() {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [estoque, setEstoque] = useState("");
    const [produtos, setProdutos] = useState<any[]>([]);

    function adicionarProduto() {
        if (!nome || !preco || !estoque) return;

        const novoProduto = {
            id: Date.now().toString(),
            nome,
            preco: parseFloat(preco),
            estoque: parseInt(estoque),
        };

        setProdutos([...produtos, novoProduto]);
        setNome("");
        setPreco("");
        setEstoque("");
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

            <TextInput
                placeholder="Preço"
                placeholderTextColor="#555"
                keyboardType="numeric"
                value={preco}
                onChangeText={setPreco}
                style={globalStyles.input}
            />

            <TextInput
                placeholder="Quantidade em estoque"
                placeholderTextColor="#555"
                keyboardType="numeric"
                value={estoque}
                onChangeText={setEstoque}
                style={globalStyles.input}
            />

            <TouchableOpacity style={globalStyles.botao} onPress={adicionarProduto}>
                <Text style={globalStyles.botaoTexto}>Adicionar Produto</Text>
            </TouchableOpacity>

            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={globalStyles.card}>
                        <Text style={globalStyles.cardTitulo}>{item.nome}</Text>
                        <Text style={globalStyles.cardPreco}>
                            R$ {item.preco.toFixed(2)}
                        </Text>

                        <Text
                            style={[
                                globalStyles.cardEstoque,
                                item.estoque > 0
                                    ? globalStyles.estoqueDisponivel
                                    : globalStyles.estoqueEsgotado,
                            ]}
                        >
                            Estoque: {item.estoque} unidades
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}