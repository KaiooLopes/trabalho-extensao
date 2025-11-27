import { getDatabase } from "./database";

// Listar todas as ordens
export async function getAllOrders() {
    const db = await getDatabase();

    try {
        const result = await db.getAllAsync(
            `SELECT * FROM ordens_servico ORDER BY id DESC`
        );
        return { success: true, orders: result };
    } catch (error) {
        return { success: false, error };
    }
}

// Criar nova ordem
// 🚨 CAMPO 'valor' ADICIONADO como parâmetro com valor padrão null
export async function createOrder({ titulo, descricao, cliente, valor = null, status = 'Pendente' }) {
    const db = await getDatabase();
    const dataCriacao = new Date().toISOString();

    try {
        const result = await db.runAsync(
            // 🚨 VALOR ADICIONADO na lista de colunas (entre 'cliente' e 'status')
            `INSERT INTO ordens_servico (titulo, descricao, cliente, valor, status, data_criacao) VALUES (?, ?, ?, ?, ?, ?)`,
            // 🚨 VALOR ADICIONADO na lista de parâmetros
            [titulo, descricao, cliente, valor, status, dataCriacao]
        );
        return { success: true, id: result.lastInsertRowId };
    } catch (error) {
        return { success: false, error };
    }
}

// Atualizar ordem
// 🚨 CAMPO 'valor' ADICIONADO como parâmetro
export async function updateOrder(id, { titulo, descricao, cliente, valor, status }) {
    const db = await getDatabase();

    try {
        await db.runAsync(
            // 🚨 VALOR ADICIONADO na query de UPDATE
            `UPDATE ordens_servico SET titulo = ?, descricao = ?, cliente = ?, valor = ?, status = ? WHERE id = ?`,
            // 🚨 VALOR ADICIONADO na lista de parâmetros
            [titulo, descricao, cliente, valor, status, id]
        );
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}

// Deletar ordem
export async function deleteOrder(id) {
    const db = await getDatabase();

    try {
        await db.runAsync(
            `DELETE FROM ordens_servico WHERE id = ?`,
            [id]
        );
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}

// Buscar ordem por ID
export async function getOrderById(id) {
    const db = await getDatabase();

    try {
        const result = await db.getFirstAsync(
            `SELECT * FROM ordens_servico WHERE id = ?`,
            [id]
        );
        return { success: true, order: result };
    } catch (error) {
        return { success: false, error };
    }
}