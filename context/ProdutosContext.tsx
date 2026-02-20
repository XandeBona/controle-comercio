import React, { createContext, ReactNode, useContext, useState } from "react";

export type Produto = {
  id: string;
  nome: string;
  preco: number;
  estoque: number;
  ativo: boolean;
};

type ProdutosContextType = {
  produtos: Produto[];
  adicionarProduto: (produto: Produto) => void;
  editarProduto: (id: string, novoNome: string) => void;
  atualizarEstoque: (id: string, novoEstoque: number) => void;
  alternarStatus: (id: string) => void;
};

const ProdutosContext = createContext({} as ProdutosContextType);

export function ProdutosProvider({ children }: { children: ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([
    {
      id: "1",
      nome: "Coca-Cola Lata",
      preco: 5,
      estoque: 20,
      ativo: true,
    },
    {
      id: "2",
      nome: "Salgado",
      preco: 8,
      estoque: 15,
      ativo: true,
    },
  ]);

  function adicionarProduto(produto: Produto) {
    setProdutos(prev => [...prev, produto]);
  }

  function editarProduto(id: string, novoNome: string) {
    setProdutos(prev =>
      prev.map(prod =>
        prod.id === id ? { ...prod, nome: novoNome } : prod
      )
    );
  }

  function atualizarEstoque(id: string, novoEstoque: number) {
    setProdutos(prev =>
      prev.map(prod =>
        prod.id === id ? { ...prod, estoque: novoEstoque } : prod
      )
    );
  }

  function alternarStatus(id: string) {
    setProdutos(prev =>
      prev.map(prod =>
        prod.id === id ? { ...prod, ativo: !prod.ativo } : prod
      )
    );
  }

  return (
    <ProdutosContext.Provider
      value={{
        produtos,
        adicionarProduto,
        editarProduto,
        atualizarEstoque,
        alternarStatus,
      }}
    >
      {children}
    </ProdutosContext.Provider>
  );
}

export function useProdutos() {
  return useContext(ProdutosContext);
}