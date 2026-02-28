import { StyleSheet } from "react-native";

export const dashboardStyles = StyleSheet.create({
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