import { db } from "./database";

export function criarVenda(
    vendaId: string,
    data: string,
    total: number
) {
    db.runSync(
        `INSERT INTO vendas (id, data, total)
     VALUES (?, ?, ?);`,
        [vendaId, data, total]
    );
}

export function inserirItemVenda(
    id: string,
    vendaId: string,
    produtoId: string,
    nome: string,
    quantidade: number,
    precoUnitario: number
) {
    db.runSync(
        `INSERT INTO itens_venda
     (id, venda_id, produto_id, nome, quantidade, preco_unitario)
     VALUES (?, ?, ?, ?, ?, ?);`,
        [id, vendaId, produtoId, nome, quantidade, precoUnitario]
    );
}