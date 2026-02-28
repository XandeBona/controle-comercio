import {
    formatarParaBR,
    formatarParaISO,
    quantidadeVendasPorPeriodo,
    top5ProdutosPorPeriodo,
    totalVendidoPorPeriodo,
    vendasPorDia,
} from "@/database/vendasRepository";
import { dashboardStyles as styles } from "@/styles/dashboardStyles";
import { useEffect, useState } from "react";
import {
    Dimensions,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

function formatarInputData(texto: string) {
    const numeros = texto.replace(/\D/g, "");

    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 4)
        return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;

    return `${numeros.slice(0, 2)}/${numeros.slice(
        2,
        4
    )}/${numeros.slice(4, 8)}`;
}

function hojeBR() {
    const hoje = new Date();
    return formatarParaBR(hoje.toISOString().split("T")[0]);
}

function subtrairDiasBR(dias: number) {
    const data = new Date();
    data.setDate(data.getDate() - dias);
    return formatarParaBR(data.toISOString().split("T")[0]);
}


export default function Dashboard() {
    const [dataInicial, setDataInicial] = useState("01/01/2026");
    const [dataFinal, setDataFinal] = useState(hojeBR());

    const [totalPeriodo, setTotalPeriodo] = useState(0);
    const [quantidadeVendas, setQuantidadeVendas] = useState(0);
    const [dadosGrafico, setDadosGrafico] = useState<
        { data: string; total: number }[]
    >([]);
    const [topProdutos, setTopProdutos] = useState<
        { nome: string; quantidade: number }[]
    >([]);
    const [valorSelecionado, setValorSelecionado] =
        useState<number | null>(null);

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

            const top = top5ProdutosPorPeriodo(
                inicioISO,
                fimISO
            );

            setTopProdutos(
                top.map((p) => ({
                    nome: p.nome,
                    quantidade: p.total_vendido,
                }))
            );
        } catch (error) {
            console.log("Erro ao carregar dashboard:", error);
        }
    }

    function filtroHoje() {
        const hoje = hojeBR();
        setDataInicial(hoje);
        setDataFinal(hoje);
    }

    function filtro7Dias() {
        setDataInicial(subtrairDiasBR(6));
        setDataFinal(hojeBR());
    }

    function filtro30Dias() {
        setDataInicial(subtrairDiasBR(29));
        setDataFinal(hojeBR());
    }

    function filtroAnoCompleto() {
        setDataInicial("01/01/2026");
        setDataFinal("31/12/2026");
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titulo}>Dashboard</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Data Inicial</Text>
                <TextInput
                    value={dataInicial}
                    onChangeText={(text) =>
                        setDataInicial(formatarInputData(text))
                    }
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={10}
                />

                <Text style={styles.label}>Data Final</Text>
                <TextInput
                    value={dataFinal}
                    onChangeText={(text) =>
                        setDataFinal(formatarInputData(text))
                    }
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={10}
                />

                <View style={styles.botoesRapidos}>
                    <TouchableOpacity
                        style={styles.botaoFiltro}
                        onPress={filtroHoje}
                    >
                        <Text style={styles.textoBotao}>Hoje</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.botaoFiltro}
                        onPress={filtro7Dias}
                    >
                        <Text style={styles.textoBotao}>7 dias</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.botaoFiltro}
                        onPress={filtro30Dias}
                    >
                        <Text style={styles.textoBotao}>30 dias</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.botaoFiltro}
                        onPress={filtroAnoCompleto}
                    >
                        <Text style={styles.textoBotao}>Ano</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitulo}>
                    Total no Período
                </Text>
                <Text style={styles.valor}>
                    {totalPeriodo.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitulo}>
                    Quantidade de Vendas
                </Text>
                <Text style={styles.valor}>
                    {quantidadeVendas}
                </Text>
            </View>

            {dadosGrafico.length > 0 && (
                <View style={styles.card}>
                    <Text style={styles.cardTitulo}>
                        Vendas por Dia
                    </Text>

                    {valorSelecionado !== null && (
                        <Text style={styles.valorSelecionado}>
                            {valorSelecionado.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </Text>
                    )}

                    <LineChart
                        data={{
                            labels: dadosGrafico.map((d) =>
                                formatarParaBR(d.data).substring(0, 5)
                            ),
                            datasets: [
                                {
                                    data: dadosGrafico.map(
                                        (d) => d.total
                                    ),
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
                        }}
                        bezier
                        onDataPointClick={(data) =>
                            setValorSelecionado(data.value)
                        }
                        style={{ borderRadius: 16 }}
                    />
                </View>
            )}

            {topProdutos.length > 0 && (
                <View style={styles.card}>
                    <Text style={styles.cardTitulo}>
                        Top 5 Produtos Mais Vendidos
                    </Text>

                    {topProdutos.map(
                        (produto, index) => (
                            <View
                                key={index}
                                style={styles.itemTop}
                            >
                                <Text
                                    style={styles.nomeProduto}
                                >
                                    {index + 1}. {produto.nome}
                                </Text>
                                <Text
                                    style={
                                        styles.quantidadeProduto
                                    }
                                >
                                    {produto.quantidade} un
                                </Text>
                            </View>
                        )
                    )}
                </View>
            )}
        </ScrollView>
    );
}