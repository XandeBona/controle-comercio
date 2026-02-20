import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  atualizarEstoque as atualizarEstoqueDB,
  atualizarProduto,
  buscarProdutos,
  inserirProduto,
} from "../database/produtosRepository";

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
  editarProduto: (
    id: string,
    novoNome: string,
    novoEstoque: number
  ) => void;
  atualizarEstoque: (id: string, novoEstoque: number) => void;
  alternarStatus: (id: string) => void;
};

const ProdutosContext = createContext({} as ProdutosContextType);

export function ProdutosProvider({ children }: { children: ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  function carregarProdutos() {
    const dados = buscarProdutos();

    const formatados = dados.map(prod => ({
      ...prod,
      ativo: Boolean(prod.ativo),
    }));

    setProdutos(formatados);
  }

  function adicionarProduto(produto: Produto) {
    inserirProduto({
      ...produto,
      ativo: produto.ativo ? 1 : 0,
    });

    carregarProdutos();
  }

  function editarProduto(
    id: string,
    novoNome: string,
    novoEstoque: number
  ) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    atualizarProduto({
      ...produto,
      nome: novoNome,
      estoque: novoEstoque,
      ativo: produto.ativo ? 1 : 0,
    });

    carregarProdutos();
  }

  function atualizarEstoque(id: string, novoEstoque: number) {
    atualizarEstoqueDB(id, novoEstoque);
    carregarProdutos();
  }

  function alternarStatus(id: string) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    atualizarProduto({
      ...produto,
      ativo: produto.ativo ? 0 : 1,
    });

    carregarProdutos();
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