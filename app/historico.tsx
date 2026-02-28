import { buscarVendas, Venda } from "@/database/vendasRepository";
import { globalStyles } from "@/styles/globalStyles";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Historico() {
    const [vendas, setVendas] = useState<Venda[]>([]);

    useEffect(() => {
        carregarVendas();
    }, []);

    function carregarVendas() {
        const dados = buscarVendas();
        setVendas(dados);
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titulo}>
                Histórico de Vendas
            </Text>

            <FlatList
                data={vendas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: "/detalheVenda",
                                params: { id: item.id },
                            })
                        }
                    >
                        <View style={globalStyles.card}>
                            <Text style={globalStyles.cardTitulo}>
                                Venda #{item.id.slice(0, 8)}
                            </Text>

                            <Text>
                                Data:{" "}
                                {new Date(item.data).toLocaleString("pt-BR")}
                            </Text>

                            <Text>
                                Total:{" "}
                                {item.total.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        Nenhuma venda registrada.
                    </Text>
                }
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}