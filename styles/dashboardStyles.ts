import { StyleSheet } from "react-native";

export const dashboardStyles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#555",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },

  cardTitulo: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  valor: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
  },

  valorSelecionado: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 8,
    textAlign: "center",
  },

  botoesRapidos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },

  botaoFiltro: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 8,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  itemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },

  nomeProduto: {
    fontSize: 14,
  },

  quantidadeProduto: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});