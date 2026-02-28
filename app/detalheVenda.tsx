import {
    buscarItensPorVenda,
    ItemVenda,
} from "@/database/vendasRepository";
import { globalStyles } from "@/styles/globalStyles";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function DetalheVenda() {
    const { id } = useLocalSearchParams();
    const [itens, setItens] = useState<ItemVenda[]>([]);

    useEffect(() => {
        if (typeof id === "string") {
            const dados = buscarItensPorVenda(id);
            setItens(dados);
        }
    }, [id]);

    const total = itens.reduce(
        (acc, item) =>
            acc + item.preco_unitario * item.quantidade,
        0
    );

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titulo}>
                Detalhes da Venda
            </Text>

            <FlatList
                data={itens}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={globalStyles.card}>
                        <Text style={globalStyles.cardTitulo}>
                            {item.nome}
                        </Text>

                        <Text>
                            Quantidade: {item.quantidade}
                        </Text>

                        <Text>
                            Valor Unitário:{" "}
                            {item.preco_unitario.toLocaleString(
                                "pt-BR",
                                {
                                    style: "currency",
                                    currency: "BRL",
                                }
                            )}
                        </Text>

                        <Text>
                            Subtotal:{" "}
                            {(item.preco_unitario * item.quantidade)
                                .toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                        </Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        Nenhum item encontrado.
                    </Text>
                }
            />

            <View style={{ marginTop: 20 }}>
                <Text style={globalStyles.totalTexto}>
                    Total da Venda:{" "}
                    {total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </Text>
            </View>
        </View>
    );
}