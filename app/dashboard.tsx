import {
    formatarParaBR,
    formatarParaISO,
    quantidadeVendasPorPeriodo,
    totalVendidoPorPeriodo,
    vendasPorDia,
} from "@/database/vendasRepository";
import { useEffect, useState } from "react";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
    const hojeISO = new Date().toISOString().split("T")[0];
    const hojeBR = formatarParaBR(hojeISO);

    const [dataInicial, setDataInicial] = useState(hojeBR);
    const [dataFinal, setDataFinal] = useState(hojeBR);

    const [totalPeriodo, setTotalPeriodo] = useState(0);
    const [quantidadeVendas, setQuantidadeVendas] = useState(0);
    const [dadosGrafico, setDadosGrafico] = useState<
        { data: string; total: number }[]
    >([]);

    useEffect(() => {
        carregarDados();
    }, [dataInicial, dataFinal]);

    function carregarDados() {
        try {
            const inicioISO = formatarParaISO(dataInicial);
            const fimISO = formatarParaISO(dataFinal);

            setTotalPeriodo(
                totalVendidoPorPeriodo(inicioISO, fimISO)
            );

            setQuantidadeVendas(
                quantidadeVendasPorPeriodo(inicioISO, fimISO)
            );

            setDadosGrafico(
                vendasPorDia(inicioISO, fimISO)
            );
        } catch (error) {
            console.log("Erro ao carregar dashboard:", error);
        }
    }

    return (
        <ScrollView style={styles.container}>

            <Text style={styles.titulo}>Dashboard</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Data Inicial</Text>
                <TextInput
                    value={dataInicial}
                    onChangeText={setDataInicial}
                    style={styles.input}
                    placeholder="01/02/2026"
                />

                <Text style={styles.label}>Data Final</Text>
                <TextInput
                    value={dataFinal}
                    onChangeText={setDataFinal}
                    style={styles.input}
                    placeholder="28/02/2026"
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitulo}>Total no Período</Text>
                <Text style={styles.valor}>
                    {totalPeriodo.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitulo}>Quantidade de Vendas</Text>
                <Text style={styles.valor}>{quantidadeVendas}</Text>
            </View>

            {dadosGrafico.length > 0 && (
                <View style={styles.card}>
                    <Text style={styles.cardTitulo}>Vendas por Dia</Text>

                    <View style={styles.chartContainer}>
                        <LineChart
                            data={{
                                labels: dadosGrafico.map((d) =>
                                    formatarParaBR(d.data).substring(0, 5)
                                ),
                                datasets: [
                                    {
                                        data: dadosGrafico.map((d) => d.total),
                                    },
                                ],
                            }}
                            width={screenWidth * 0.88}
                            height={220}
                            yAxisLabel="R$ "
                            chartConfig={{
                                backgroundGradientFrom: "#ffffff",
                                backgroundGradientTo: "#ffffff",
                                decimalPlaces: 2,
                                color: (opacity = 1) =>
                                    `rgba(76, 175, 80, ${opacity})`,
                                labelColor: () => "#444",
                                propsForDots: {
                                    r: "4",
                                    strokeWidth: "2",
                                    stroke: "#4CAF50",
                                },
                                propsForBackgroundLines: {
                                    strokeWidth: 0.5,
                                },
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            bezier
                            style={{
                                borderRadius: 16,
                            }}
                        />
                    </View>
                </View>
            )}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f6fa",
        padding: 16,
    },

    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },

    card: {
        backgroundColor: "#ffffff",
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
    },

    cardTitulo: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },

    valor: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#4CAF50",
    },

    label: {
        fontSize: 14,
        marginBottom: 4,
        marginTop: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 10,
        marginBottom: 8,
        backgroundColor: "#fafafa",
    },

    chartContainer: {
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 16,
        marginTop: 8,
    },
});