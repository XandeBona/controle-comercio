import React, { createContext, ReactNode, useContext, useState } from "react";

type ItemCarrinho = {
    id: string;
    nome: string;
    preco: number;
    quantidade: number;
};

type CarrinhoContextType = {
    carrinho: ItemCarrinho[];
    adicionarItem: (item: ItemCarrinho) => void;
    removerItem: (id: string) => void;
    limparCarrinho: () => void;
    atualizarQuantidade: (id: string, quantidade: number) => void;
    total: number;
};

const CarrinhoContext = createContext({} as CarrinhoContextType);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
    const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

    function adicionarItem(novoItem: ItemCarrinho) {
        setCarrinho(prev => {
            const existente = prev.find(i => i.id === novoItem.id);

            if (existente) {
                return prev.map(i =>
                    i.id === novoItem.id
                        ? { ...i, quantidade: i.quantidade + novoItem.quantidade }
                        : i
                );
            }

            return [...prev, novoItem];
        });
    }

    function atualizarQuantidade(id: string, quantidade: number) {
        setCarrinho(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantidade } : item
            )
        );
    }

    function removerItem(id: string) {
        setCarrinho(prev => prev.filter(i => i.id !== id));
    }

    function limparCarrinho() {
        setCarrinho([]);
    }

    const total = carrinho.reduce(
        (acc, item) => acc + item.preco * item.quantidade,
        0
    );

    return (
        <CarrinhoContext.Provider
            value={{
                carrinho,
                adicionarItem,
                removerItem,
                limparCarrinho,
                atualizarQuantidade,
                total,
            }}
        >
            {children}
        </CarrinhoContext.Provider>
    );
}

export function useCarrinho() {
    return useContext(CarrinhoContext);
}