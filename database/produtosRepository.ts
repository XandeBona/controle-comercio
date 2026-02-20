import { db } from "./database";

export type Produto = {
    id: string;
    nome: string;
    preco: number;
    estoque: number;
    ativo: number;
};

export function buscarProdutos(): Produto[] {
    return db.getAllSync<Produto>("SELECT * FROM produtos;");
}

export function inserirProduto(produto: Produto) {
    db.runSync(
        `INSERT INTO produtos (id, nome, preco, estoque, ativo)
     VALUES (?, ?, ?, ?, ?);`,
        [
            produto.id,
            produto.nome,
            produto.preco,
            produto.estoque,
            produto.ativo,
        ]
    );
}

export function atualizarProduto(produto: Produto) {
    db.runSync(
        `UPDATE produtos 
     SET nome = ?, preco = ?, estoque = ?, ativo = ?
     WHERE id = ?;`,
        [
            produto.nome,
            produto.preco,
            produto.estoque,
            produto.ativo,
            produto.id,
        ]
    );
}

export function atualizarEstoque(id: string, novoEstoque: number) {
    db.runSync(
        `UPDATE produtos SET estoque = ? WHERE id = ?;`,
        [novoEstoque, id]
    );
}