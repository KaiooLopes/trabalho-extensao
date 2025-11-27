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
export async function createOrder({ titulo, descricao, cliente, status = 'Pendente' }) {
    const db = await getDatabase();
    const dataCriacao = new Date().toISOString();

    try {
        const result = await db.runAsync(
            `INSERT INTO ordens_servico (titulo, descricao, cliente, status, data_criacao) VALUES (?, ?, ?, ?, ?)`,
            [titulo, descricao, cliente, status, dataCriacao]
        );
        return { success: true, id: result.lastInsertRowId };
    } catch (error) {
        return { success: false, error };
    }
}

// Atualizar ordem
export async function updateOrder(id, { titulo, descricao, cliente, status }) {
    const db = await getDatabase();

    try {
        await db.runAsync(
            `UPDATE ordens_servico SET titulo = ?, descricao = ?, cliente = ?, status = ? WHERE id = ?`,
            [titulo, descricao, cliente, status, id]
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