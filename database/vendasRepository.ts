import { db } from "./database";

export function formatarParaBR(dataISO: string): string {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
}

export function formatarParaISO(dataBR: string): string {
    const [dia, mes, ano] = dataBR.split("/");
    return `${ano}-${mes}-${dia}`;
}

export function criarVenda(
    vendaId: string,
    dataISO: string,
    total: number
) {
    db.runSync(
        `INSERT INTO vendas (id, data, total)
     VALUES (?, ?, ?);`,
        [vendaId, dataISO, total]
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

export function totalVendidoHoje(): number {
    const resultado = db.getFirstSync<{ total: number }>(
        `
    SELECT SUM(total) as total
    FROM vendas
    WHERE date(data) = date('now');
    `
    );

    return resultado?.total ?? 0;
}

export function totalVendidoMes(): number {
    const resultado = db.getFirstSync<{ total: number }>(
        `
    SELECT SUM(total) as total
    FROM vendas
    WHERE strftime('%Y-%m', data) = strftime('%Y-%m', 'now');
    `
    );

    return resultado?.total ?? 0;
}

export function quantidadeVendasHoje(): number {
    const resultado = db.getFirstSync<{ quantidade: number }>(
        `
    SELECT COUNT(*) as quantidade
    FROM vendas
    WHERE date(data) = date('now');
    `
    );

    return resultado?.quantidade ?? 0;
}

export function produtoMaisVendidoMes(): {
    nome: string;
    total_vendido: number;
} | null {
    const resultado = db.getFirstSync<{
        nome: string;
        total_vendido: number;
    }>(
        `
    SELECT nome, SUM(quantidade) as total_vendido
    FROM itens_venda
    WHERE strftime('%Y-%m',
        (SELECT data FROM vendas WHERE vendas.id = itens_venda.venda_id)
    ) = strftime('%Y-%m', 'now')
    GROUP BY produto_id
    ORDER BY total_vendido DESC
    LIMIT 1;
    `
    );

    return resultado ?? null;
}

export function totalVendidoPorPeriodo(
    dataInicialISO: string,
    dataFinalISO: string
): number {
    const resultado = db.getFirstSync<{ total: number }>(
        `
    SELECT SUM(total) as total
    FROM vendas
    WHERE date(data) BETWEEN date(?) AND date(?);
    `,
        [dataInicialISO, dataFinalISO]
    );

    return resultado?.total ?? 0;
}

export function quantidadeVendasPorPeriodo(
    dataInicialISO: string,
    dataFinalISO: string
): number {
    const resultado = db.getFirstSync<{ quantidade: number }>(
        `
    SELECT COUNT(*) as quantidade
    FROM vendas
    WHERE date(data) BETWEEN date(?) AND date(?);
    `,
        [dataInicialISO, dataFinalISO]
    );

    return resultado?.quantidade ?? 0;
}

export function vendasPorDia(
    dataInicialISO: string,
    dataFinalISO: string
): { data: string; total: number }[] {
    return db.getAllSync<{ data: string; total: number }>(
        `
    SELECT date(data) as data, SUM(total) as total
    FROM vendas
    WHERE date(data) BETWEEN date(?) AND date(?)
    GROUP BY date(data)
    ORDER BY date(data);
    `,
        [dataInicialISO, dataFinalISO]
    );
}

export function top5ProdutosPorPeriodo(
    dataInicialISO: string,
    dataFinalISO: string
): {
    nome: string;
    total_vendido: number;
}[] {
    return db.getAllSync<{
        nome: string;
        total_vendido: number;
    }>(
        `
    SELECT nome, SUM(quantidade) as total_vendido
    FROM itens_venda
    WHERE venda_id IN (
      SELECT id FROM vendas
      WHERE date(data) BETWEEN date(?) AND date(?)
    )
    GROUP BY produto_id
    ORDER BY total_vendido DESC
    LIMIT 5;
    `,
        [dataInicialISO, dataFinalISO]
    );
}