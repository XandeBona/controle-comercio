import { StatusBar, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 40,
    backgroundColor: "#f4f6f9",
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
    textAlign: "center",
    color: "#000",
  },

  input: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#000",
  },

  botao: {
    backgroundColor: "#1e88e5",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },

  botaoCarrinhoSup: {
    backgroundColor: "#858585",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },

  botaoCarrinho: {
    backgroundColor: "#858585",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },

  cardTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  cardPreco: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },

  cardEstoque: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: "bold",
  },

  estoqueDisponivel: {
    color: "#2e7d32",
  },

  estoqueEsgotado: {
    color: "#d32f2f",
  },

  totalBox: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  totalTexto: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});