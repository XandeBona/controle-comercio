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

export type Venda = {
    id: string;
    data: string;
    total: number;
};

export function buscarVendas(): Venda[] {
    return db.getAllSync<Venda>(
        "SELECT * FROM vendas ORDER BY data DESC;"
    );
}

export type ItemVenda = {
    id: string;
    venda_id: string;
    produto_id: string;
    nome: string;
    quantidade: number;
    preco_unitario: number;
};

export function buscarItensPorVenda(vendaId: string): ItemVenda[] {
    return db.getAllSync<ItemVenda>(
        "SELECT * FROM itens_venda WHERE venda_id = ?;",
        [vendaId]
    );
}

