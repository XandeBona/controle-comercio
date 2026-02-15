import React, { createContext, ReactNode, useContext, useState } from "react";

type Produto = {
  id: string;
  nome: string;
  preco: number;
  estoque: number;
};

type ProdutosContextType = {
  produtos: Produto[];
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
  atualizarEstoque: (id: string, novoEstoque: number) => void;
};

const ProdutosContext = createContext<ProdutosContextType>(
  {} as ProdutosContextType
);

export function ProdutosProvider({ children }: { children: ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  function atualizarEstoque(id: string, novoEstoque: number) {
    setProdutos((produtosAnteriores) =>
      produtosAnteriores.map((produto) =>
        produto.id === id
          ? { ...produto, estoque: novoEstoque }
          : produto
      )
    );
  }

  return (
    <ProdutosContext.Provider
      value={{ produtos, setProdutos, atualizarEstoque }}
    >
      {children}
    </ProdutosContext.Provider>
  );
}

export function useProdutos() {
  return useContext(ProdutosContext);
}